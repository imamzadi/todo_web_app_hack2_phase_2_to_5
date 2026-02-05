---
id: 024
title: Polish Chat UI and Fix MCP Mapper
stage: green
date: 2026-01-16
surface: agent
model: gpt-4o
feature: ai-chatbot-agent
branch: main
user: user
command: fix-mcp-mapper
labels: [frontend, ui, bugfix, mcp, sqlalchemy]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/components/chatbot.tsx
  - frontend/src/components/chat-window.tsx
  - backend/src/mcp_server.py
tests:
  - Verified toggle button animation
  - Verified message sending (fixed 422)
  - Verified list-tasks tool (fixed mapper error)
---

## Prompt

Also update the design of chatbot and a icon below for opening and closing popup... Getting these errors from llm after calling list-tasks tool... add in phr

## Response snapshot

Polished the Chatbot Integration and resolved critical bugs:
1.  **UI Enhancements**: Refactored `frontend/src/components/chatbot.tsx` to feature a **floating toggle button** with smooth open/close animations, gradients, and a glassmorphism card design.
2.  **API Fix**: Resolved `422 Unprocessable Content` in `frontend/src/components/chat-window.tsx` by explicitly setting `Content-Type: application/json` in the `authFetch` call.
3.  **MCP Server Fix**: Resolved `SQLAlchemy Mapper` initialization error in `backend/src/mcp_server.py` by importing `user` and `chat` models to ensure relationships are correctly registered in the MCP process.

## Outcome

- ✅ Impact: A professional, production-ready chat widget is now available in the frontend, and the backend MCP tools function correctly without mapper errors.
- 🧪 Tests: User verification of UI design and tool execution.
- 📁 Files: `frontend/src/components/chatbot.tsx`, `frontend/src/components/chat-window.tsx`, `backend/src/mcp_server.py`.
- 🔁 Next prompts: None immediate.

## Evaluation notes (flywheel)

- Failure modes observed: Missing Content-Type header in manual fetch, and missing model registry in standalone script.
- Graders run and results (PASS/FAIL): N/A
