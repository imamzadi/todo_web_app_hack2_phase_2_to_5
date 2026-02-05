---
id: 005
title: Attempt and Revert Agent Refactoring
stage: refactor
date: 2026-01-14
surface: agent
model: gemini-cli
feature: 003-ai-chatbot-agent
branch: main
user: unspecified
command: implement
labels: [ "refactoring", "dead-end", "missing-dependency" ]
links:
  spec: "specs/003-ai-chatbot-agent/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - backend/src/api/chat.py
  - backend/src/mcp/main.py
  - backend/src/agents/task_agent.py
tests:
  - "none"
---

## Prompt

Use @function_tool function for creating tool for agent but as i mentioned we are using mcp sdk. Make sure to add all tools in mcp sdk and configure mcp sdk in agents use Agent for communication and make sure to make all things correct

## Response snapshot

I attempted to refactor the chatbot implementation to use the `mcp-sdk` and `openai-agents` libraries as requested. However, these libraries could not be installed from public repositories, and a search for the specified `@function_tool` decorator yielded no results in the codebase. After reaching this impasse, I reverted the changes to the previously working implementation, which uses the standard `openai` library directly for tool-calling.

## Outcome

- ✅ Impact: The codebase has been reverted to the working implementation of the AI chatbot. The feature remains functional as it was before the refactoring attempt.
- 🧪 Tests: No new tests were added.
- 📁 Files: 3 files were modified and then reverted.
- 🔁 Next prompts: The user needs to provide the missing libraries or clarify the intended architecture.
- 🧠 Reflection: This attempt highlighted a critical dependency issue. The specified architecture relies on private or non-existent libraries. In the future, I must be more insistent on getting clarification for missing dependencies before attempting a large-scale refactoring. Reverting to a known-good state was the correct decision to ensure the feature remains functional.

## Evaluation notes (flywheel)

- Failure modes observed: Inability to install dependencies, inability to find key architectural components (`@function_tool`).
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): If the user provides the missing libraries, I will re-attempt the refactoring.
