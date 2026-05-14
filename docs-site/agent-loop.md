# Agent Loop

> The entire core loop is just **~100 lines of code** (`agent_loop.py`).

## 1. Loop Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      PERCEIVE                               │
│         (Environment state + user input + memory)           │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      REASON                                 │
│            (LLM reasoning + tool selection)                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      EXECUTE                                │
│                   (Tool call + result)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      MEMORY                                 │
│           (Update checkpoint + skill crystallization)        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │
                           └──────────→ LOOP
```

## 2. Core Loop (Pseudocode)

```python
# agent_loop.py (~100 lines)

def run_agent_loop(agent, task):
    # 1. Initialize
    checkpoint = load_checkpoint()
    context = build_context(task, checkpoint)
    
    # 2. Main loop
    while not terminated:
        # PERCEIVE: Get current state
        current_state = perceive_environment()
        
        # REASON: LLM decides next action
        response = llm.complete(
            messages=context,
            tools=TOOL_DEFINITIONS
        )
        
        # Check for termination
        if response.is_final_answer:
            return response.final_answer
            
        # EXECUTE: Run tool if selected
        if response.tool_calls:
            for tool_call in response.tool_calls:
                result = execute_tool(tool_call.name, tool_call.args)
                context.append(tool_call_result)
        
        # MEMORY: Persist state
        update_checkpoint(context)
        
        # Check max iterations
        if iteration_count > MAX_ITERATIONS:
            raise MaxIterationsError()
```

## 3. Tool Definitions

Tools are defined in `llmcore.py` and passed to the LLM:

```python
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "code_run",
            "description": "Execute Python code",
            "parameters": {
                "type": "object",
                "properties": {
                    "script": {"type": "string"},
                    "timeout": {"type": "number"},
                    "inline_eval": {"type": "boolean"}
                }
            }
        }
    },
    # ... other tools
]
```

## 4. Context Building

Context is built from multiple sources:

| Source | Content |
|--------|---------|
| System prompt | Core behavioral rules (L0) |
| Checkpoint | Current working memory |
| Conversation history | Recent exchanges |
| Skill references | L3 skill pointers (L1) |

## 5. Termination Conditions

| Condition | Action |
|-----------|--------|
| Final answer received | Return to user |
| ask_user tool called | Wait for human input |
| Max iterations reached | Raise error |
| Unrecoverable error | Log and exit |

## 6. Reflect Modes

Beyond the basic loop, GenericAgent supports advanced modes in `reflect/`:

| Mode | File | Purpose |
|------|------|---------|
| Goal Mode | `goal_mode.py` | Goal-driven reflection and planning |
| Autonomous | `autonomous.py` | Self-directed task execution |
| Scheduler | `scheduler.py` | Cron-based scheduled tasks |
| Agent Team | `agent_team_worker.py` | Multi-agent collaboration |

## 7. Supervisor Mode

When running tasks via supervisor mode (`supervisor_sop.md`):

```
Supervisor (monitoring) → Subagent (executing)
         ↑
         └─── Intervenes via _intervene / _keyinfo
```

Supervisor monitors subagent progress and intervenes when:
- Subagent skips steps
- Subagent misses constraints
- Subagent fails repeatedly
- Subagent is about to enter high-risk steps

## 8. Key Design Decisions

### 8.1 Minimal Loop

The loop is intentionally minimal (~100 lines). Complexity is pushed to:
- Memory system (L0-L4)
- Skill SOPs (plan_sop, supervisor_sop, etc.)
- Tool implementations (separate files)

### 8.2 Context Efficiency

With <30K context window, context management is critical:
- L1 Insight Index for fast skill routing
- Working checkpoint for state persistence
- Periodic checkpoint updates (not every turn)

### 8.3 Self-Evolution

Skills crystallize from the loop, not during it. After task completion:
1. Execution path is analyzed
2. Skill SOP is generated
3. L1 index is updated
4. Next similar task uses skill directly
