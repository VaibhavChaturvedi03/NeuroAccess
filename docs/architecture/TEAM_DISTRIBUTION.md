# Team Distribution and Folder Ownership

This repository is now split by team responsibility.

## Frontend Team
- Primary folder: frontend/chrome-extension
- Current active extension code is now in frontend/chrome-extension.
- Run frontend commands from frontend/chrome-extension.
- Suggested ownership:
  - UI/UX: popup, options, onboarding pages
  - Browser extension interaction layer
  - Accessibility controls and client-side state

## Backend Team
- Primary folder: backend/api
- Build REST/GraphQL APIs here.
- Suggested ownership:
  - Subscription APIs
  - User/profile/preferences APIs
  - Telemetry and reporting APIs
  - Auth and rate limiting

## AI Team
- Primary folder: ai/services
- Service split:
  - ai/services/vision-captioning: alt-text and image captioning
  - ai/services/ocr: text extraction pipeline
  - ai/services/chat-assistant: context Q&A and summarization

## Shared Ownership
- shared/schemas: JSON schema for payload validation
- shared/contracts: request/response contracts used by frontend, backend, and AI services

## Infra/DevOps
- infra/docker: local container definitions
- infra/github-actions: CI/CD workflows

## Migration Note
Frontend migration has been completed for existing extension files.
Next steps are backend and AI service scaffolding, then shared contract integration.
