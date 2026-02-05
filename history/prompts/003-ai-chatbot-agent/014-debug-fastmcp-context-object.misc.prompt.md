---
id: 014
title: Debug FastMCP Context Object
stage: cancelled
date: 2026-01-15
surface: agent
model: gemini-1.5-pro
feature: ai-chatbot-agent
branch: main
user: user
command: File "F:\ai_dd\hackathon2\todo_webapp\backend\src\main.py", line 12, in <module> ...
labels: [ "debugging", "fastmcp", "backend" ]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- backend/src/tools.py
- backend/src/dependencies/mcp.py (deleted)
tests:
- (none)
---

## Prompt

Getting this issue `Traceback (most recent call last):
...
pydantic.errors.PydanticInvalidForJsonSchema: Cannot generate a JsonSchema for core_schema.CallableSchema
...
`

## Response snapshot

This PHR has been cancelled. The debugging step failed because not all tool functions were updated, which still caused the Pydantic error and prevented the server from starting. The fix is recorded in PHR 015.

## Outcome

- ✅ Impact: This PHR was superseded by PHR 015. The debugging step was not successful.
- 🧪 Tests: No new tests were added.
- 📁 Files: 
  - Modified `backend/src/tools.py`.
  - Deleted `backend/src/dependencies/mcp.py`.
- 🔁 Next prompts: See PHR 015.
- 🧠 Reflection: A partial fix is not enough when a process iterates over a collection of items. All items must be in a valid state.

## Evaluation notes (flywheel)

- Failure modes observed: The `Depends` pattern from FastAPI is not compatible with `fastmcp`'s tool schema generation, leading to a Pydantic error.
- Graders run and results (PASS/FAIL): (none)
- Prompt variant (if applicable): (none)
- Next experiment (smallest change to try): (none)
