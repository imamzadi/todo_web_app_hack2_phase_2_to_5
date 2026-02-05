---
id: 012
title: Refactor MCP Server with FastAPI-like Dependencies
stage: cancelled
date: 2026-01-15
surface: agent
model: gemini-1.5-pro
feature: ai-chatbot-agent
branch: main
user: user
command: File "F:\ai_dd\hackathon2\todo_webapp\backend\src\main.py", line 12, in <module> ...
labels: [ "bugfix", "fastmcp", "backend", "dependency-injection" ]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- backend/src/dependencies/mcp.py
- backend/src/tools.py
- backend/src/mcp_server.py
tests:
- (none)
---

## Prompt

File "F:\ai_dd\hackathon2\todo_webapp\backend\src\main.py", line 12, in <module>
    from . import mcp_server
  File "F:\ai_dd\hackathon2\todo_webapp\backend\src\mcp_server.py", line 17, in <module>
    @app.context_provider
     ^^^^^^^^^^^^^^^^^^^
AttributeError: 'FastMCP' object has no attribute 'context_provider'

## Response snapshot

This PHR has been cancelled because the programmatic application of the `@mcp.tool` decorator was still incorrect. The correct way to apply it was found in a subsequent interaction and recorded in PHR 013.

## Outcome

- ✅ Impact: This PHR was superseded by PHR 013 due to an incorrect programmatic decorator application.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `backend/src/dependencies/mcp.py`, `backend/src/tools.py`, and `backend/src/mcp_server.py` in the original attempt.
- 🔁 Next prompts: See PHR 013 for the corrected fix.
- 🧠 Reflection: Debugging decorator application requires careful attention to whether the decorator itself or its result needs to be called.

## Evaluation notes (flywheel)

- Failure modes observed: The initial guesses for the context provider decorator (`@app.context`, `@app.context_provider`) were incorrect.
- Graders run and results (PASS/FAIL): (none)
- Prompt variant (if applicable): (none)
- Next experiment (smallest change to try): (none)
