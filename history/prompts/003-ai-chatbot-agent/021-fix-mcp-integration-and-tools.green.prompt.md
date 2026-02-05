```yaml
id: 021
title: Fix MCP Integration and Tools
stage: green
date: 2026-01-15
surface: agent
model: gpt-4o
feature: ai-chatbot-agent
branch: main
user: user
command: fix-mcp-tools
labels: [mcp, debugging, refactor, tools]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/src/api/chat.py
  - backend/src/tools.py
  - backend/src/database.py
  - backend/src/services/auth.py
  - backend/src/dependencies/auth.py
  - backend/src/mcp_server.py
tests:
  - Verified via manual testing in chat interface
```

## Prompt

Resolve this error as we are runnning mcp server and fastapi at a time... Fix 'MCPServerStdio' import... Fix 'FastMCP' is not callable... Fix tool errors 'read_tasks', 'update_task', 'delete_task' signatures... Resolve JSON validation errors.

## Response snapshot

Fixed multiple issues preventing the MCP server and tools from working correctly:
1.  **Import Error**: Pointed `MCPServerStdio` to `agents.mcp`.
2.  **MCP Lifecycle**: Refactored `main.py` to manage `MCPServerStdio` connection/cleanup via lifespan.
3.  **Output Pollution**: Disabled SQLAlchemy `echo` to prevent stdout corruption breaking MCP JSON-RPC.
4.  **Tool Errors**: Updated `src/tools.py` to use correct service methods (`get_tasks`, `get_task`) and arguments.
5.  **Deprecations**: Replaced deprecated `session.query` and `datetime.utcnow`.

## Outcome

- ✅ Impact: The Chatbot Agent is now fully functional using the local MCP server over stdio.
- 🧪 Tests: Verified manual tool execution via agent.
- 📁 Files: `backend/src/api/chat.py`, `backend/src/tools.py`, `backend/src/database.py` modified.
- 🔁 Next prompts: None immediate.
- 🧠 Reflection: MCP stdio transport is sensitive to stdout pollution. Always ensure subprocesses run in unbuffered mode and extraneous logging is disabled.

## Evaluation notes (flywheel)

- Failure modes observed: JSONRPC validation errors due to logging output. Import errors due to implicit package structure assumptions.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
