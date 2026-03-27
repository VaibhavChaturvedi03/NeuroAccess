# Repository Structure Plan

## Team-based top-level structure
- frontend/chrome-extension
- backend/api
- ai/services
- shared
- infra
- docs/architecture

## Why this structure
- Frontend, backend, and AI can work independently with minimal merge conflicts.
- Shared contracts are versioned in one place.
- Infra and CI/CD assets are separated from product code.

## Next migration step (safe)
1. Frontend extension code has been moved to frontend/chrome-extension.
2. Build should be executed from frontend/chrome-extension.
3. Scaffold backend APIs and AI services in backend/api and ai/services.
4. Define shared request/response contracts in shared/contracts and shared/schemas.
