# Frontend Chrome Extension Workspace

Use this folder for all frontend extension development.

## Suggested internal layout

- src/
- public/
- tests/
- assets/

## Source of truth

- App source code: `src/`
- Tests: `tests/`
- Build output to load in Chrome: `dist/`

Legacy duplicate root-level app files were removed to keep one clean pipeline.

## Run locally

1. `npm ci`
2. `npm test`
3. `npm run build`

## Load in Chrome

1. Open `chrome://extensions`
2. Enable Developer mode
3. Click **Load unpacked**
4. Select this folder: `frontend/chrome-extension/dist`
