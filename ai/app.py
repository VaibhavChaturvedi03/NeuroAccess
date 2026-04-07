import os
import base64
import io
from PIL import Image
from gtts import gTTS  # NEW IMPORT
from flask import Flask, render_template, request, flash, jsonify
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = "super_secret_development_key" 
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

MAX_IMAGE_SIZE = (1024, 1024) 

TASK_ALIASES = {
    "caption": "alt_text",
    "alt_text": "alt_text",
    "ocr": "ocr",
    "summarize": "summarize",
    "read_aloud": "read_aloud",
    "tts": "read_aloud",
}

def process_image_with_ai(base64_image, task_type):
    """Routes the image to the correct prompt using Llama 4 Scout."""
    ai_model = "meta-llama/llama-4-scout-17b-16e-instruct"
    
    if task_type == "alt_text":
        system_prompt = (
            "Write a descriptive alt text for this image suitable for web accessibility. "
            "Focus on the overall subject. "
            "CRITICAL RULES: 1. Your response MUST be under 50 words. "
            "2. Do NOT transcribe the text in the image. "
            "3. Do NOT start with 'A picture of' or 'An image of'."
        )
    elif task_type == "ocr":
        system_prompt = "Extract all the readable text from this image exactly as it appears. Preserve the formatting and line breaks where possible. Do not add any introductory or concluding remarks, just output the extracted text."
    
    # --- NEW SUMMARIZE BLOCK ---
    elif task_type == "summarize":
        system_prompt = (
            "Read the text in this document image and provide a clear, concise summary of its main points. "
            "Use bullet points for readability. Do not transcribe the entire text, just give me the summary."
        )
    # ---------------------------
    
    else:
        raise ValueError("Invalid task type selected.")

    completion = client.chat.completions.create(
        model=ai_model,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": system_prompt},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                ]
            }
        ],
        temperature=0.2, # Slightly higher temperature than OCR so it can write naturally
        max_tokens=2048 
    )
    return completion.choices[0].message.content.strip()


def normalize_task(task_type):
    normalized = TASK_ALIASES.get((task_type or "").strip().lower())
    if not normalized:
        raise ValueError("Invalid task type selected.")
    return normalized


def image_to_base64(image_bytes):
    img = Image.open(io.BytesIO(image_bytes))
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.thumbnail(MAX_IMAGE_SIZE, Image.Resampling.LANCZOS)

    buffer = io.BytesIO()
    img.save(buffer, format="JPEG", quality=85)
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


def process_task(task_type, image_bytes=None, text=None):
    normalized_task = normalize_task(task_type)
    ai_task = "ocr" if normalized_task == "read_aloud" else normalized_task

    if normalized_task == "read_aloud" and text:
        result_text = text.strip()
    else:
        if not image_bytes:
            raise ValueError("image is required for this task.")
        base64_image = image_to_base64(image_bytes)
        result_text = process_image_with_ai(base64_image, ai_task)

    audio_data = None
    if normalized_task == "read_aloud" and result_text:
        tts = gTTS(text=result_text, lang="en")
        audio_fp = io.BytesIO()
        tts.write_to_fp(audio_fp)
        audio_fp.seek(0)
        audio_data = base64.b64encode(audio_fp.read()).decode("utf-8")

    return {
        "task": normalized_task,
        "result_text": result_text,
        "audio_data": audio_data,
    }


@app.get('/api/v1/health')
def api_health():
    return jsonify({"success": True, "data": {"status": "ok"}}), 200


@app.post('/api/v1/process')
def api_process():
    try:
        data = request.get_json(silent=True) or {}
        task_type = data.get("task")
        image_base64 = data.get("imageBase64")
        text = data.get("text")

        image_bytes = None
        if image_base64:
            image_bytes = base64.b64decode(image_base64)

        result = process_task(task_type=task_type, image_bytes=image_bytes, text=text)

        return jsonify(
            {
                "success": True,
                "data": {
                    "task": result["task"],
                    "resultText": result["result_text"],
                    "audioBase64": result["audio_data"],
                },
            }
        ), 200
    except Exception as e:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "message": str(e),
                    },
                }
            ),
            400,
        )

@app.route('/', methods=['GET', 'POST'])
def index():
    result_text = None
    audio_data = None  # Variable to hold our generated audio
    task_type = None
    
    if request.method == 'POST':
        task_type = request.form.get('task_type')
        
        if 'image' not in request.files:
            flash("No file part in the request.")
            return render_template('index.html')
            
        file = request.files['image']
        
        if file.filename == '':
            flash("No file selected.")
            return render_template('index.html')
            
        if file:
            try:
                result = process_task(task_type=task_type, image_bytes=file.read())
                result_text = result["result_text"]
                audio_data = result["audio_data"]
                
            except Exception as e:
                flash(f"An error occurred: {e}")

    return render_template('index.html', result_text=result_text, task_type=task_type, audio_data=audio_data)

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 5000)),
        debug=os.environ.get('FLASK_DEBUG', '0') == '1'
    )