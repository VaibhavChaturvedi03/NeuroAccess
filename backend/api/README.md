# NeuroAccess Backend API

This folder contains the backend scaffold for NeuroAccess.

## Scope

The backend is responsible for:

- Optional cloud AI proxy endpoints
- User settings sync
- Accessibility report upload and retrieval
- Profile preferences and site overrides
- Auth, validation, rate limiting, and API reliability

## Quick Start

1. Install dependencies:
	- `npm install`
2. Create environment file:
	- copy `config/environments/.env.example` to `config/environments/.env`
3. Ensure MongoDB is running and `MONGODB_URI` is set in `.env`
4. Start API:
	- `npm run dev` or `npm start`

Base URL: `http://localhost:8080/api/v1`

## Implemented Folder Structure

```
backend/api/
	config/
		environments/
	docs/
	src/
		config/
		controllers/
			ai-proxy/
			auth/
			health/
			profiles/
			reports/
			settings/
			site-overrides/
		middleware/
		models/
		repositories/
		routes/
			v1/
		services/
			providers/
				openai/
				huggingface/
				assemblyai/
				elevenlabs/
		utils/
		validators/
```

## How This Maps To Your Task List

- Lightweight API service: `src/routes`, `src/controllers`, `src/services`
- Stable API contracts: `docs` and `src/validators`
- Auth strategy: `src/controllers/auth`, `src/middleware`
- Validation and rate limiting: `src/validators`, `src/middleware`
- Secure secrets handling: `src/config`, `config/environments`
- Health/readiness/logging: `src/controllers/health`, `src/middleware`, `src/utils`
- Storage layer (reports, preferences, overrides): `src/repositories`, `src/models`
- Cloud AI proxy adapters: `src/services/providers/*`

## Recommended Build Order

1. `src/config` + `src/utils` + `src/middleware`
2. `health`, `auth`, and `settings` routes/controllers
3. repositories + models
4. `reports`, `profiles`, and `site-overrides` endpoints
5. `ai-proxy` provider adapters
6. API docs and downstream integration validation
