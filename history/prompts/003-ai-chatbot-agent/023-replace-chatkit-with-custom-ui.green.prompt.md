---yaml
id: 023
title: Replace ChatKit with Custom UI
stage: green
date: 2026-01-16
surface: agent
model: gpt-4o
feature: ai-chatbot-agent
branch: main
user: user
command: replace-chatkit
labels: [frontend, react, chat-ui, mcp]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/src/api/chat.py
  - frontend/src/components/chat-window.tsx
  - frontend/src/components/chatbot.tsx
tests:
  - Verified import fix in backend
  - Verified component replacement in frontend
---

## Prompt

No I wants my chabot inside my frontend webpage... Generate PHR changes you have made

## Response snapshot

Replaced the incompatible `@openai/chatkit-react` component with a custom, fully integrated Chat UI:
1.  **Backend Fix**: Resolved `ModuleNotFoundError` in `src/api/chat.py` by correcting `get_session` import.
2.  **Session Endpoint**: Implemented `POST /chat/session` to initialize conversations and return `conversation_id`.
3.  **Custom UI**: Created `frontend/src/components/chat-window.tsx`, a React component replicating chat functionality using local API endpoints.
4.  **Integration**: Updated `frontend/src/components/chatbot.tsx` to render `ChatWindow` instead of `ChatKit`, connecting the frontend directly to the local MCP backend.

## Outcome

- ✅ Impact: The chatbot is now embedded directly in the frontend and successfully communicates with the local agent backend.
- 🧪 Tests: Manual verification of component rendering and backend connection.
- 📁 Files: `frontend/src/components/chat-window.tsx` (new), `frontend/src/components/chatbot.tsx` (modified), `backend/src/api/chat.py` (modified).
- 🔁 Next prompts: None immediate.
- 🧠 Reflection: Using standard SaaS components (ChatKit) on local backends often requires replacement with custom implementations to support custom authentication and transport layers.

## Evaluation notes (flywheel)

- Failure modes observed: `ModuleNotFoundError` due to relative import refactoring.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
