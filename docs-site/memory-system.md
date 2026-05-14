# Layered Memory System

> GenericAgent's memory crystallizes throughout task execution, enabling the agent to build stable, efficient working patterns over time.

## 1. Memory Architecture

GenericAgent uses a **5-layer memory system** (L0-L4) that progressively crystallizes experience from raw context into reusable skills:

```
┌──────────────────────────────────────────────────────────────┐
│                         Context                              │
│              (Current conversation + state)                  │
└──────────────────────────┬───────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
┌───────────────────────┐     ┌───────────────────────┐
│   Working Memory      │     │    Long-term Memory   │
│   (In-context)        │     │    (Persistent)       │
└───────────────────────┘     └───────────────────────┘
                                    │
         ┌──────────┬──────────┬─────┴─────┬──────────┐
         ▼          ▼          ▼           ▼          ▼
       L0 Meta    L1 Insight  L2 Global   L3 Skills  L4 Sessions
```

## 2. Layer Specifications

### L0 — Meta Rules

**Purpose**: Core behavioral rules and system constraints.

| Attribute | Value |
|-----------|-------|
| Persistence | Always in context |
| Update Frequency | Rarely (system-level) |
| Content Type | Hard constraints, red lines |

**Example content**:
- "禁止下场干活：只读、只判断、只干预"
- "每项必须有独立完成判据"
- "禁止凭记忆执行"

---

### L1 — Insight Index

**Purpose**: Minimal memory index for fast routing and recall.

| Attribute | Value |
|-----------|-------|
| Persistence | Long-term |
| Update Frequency | On new skill creation |
| Content Type | Index/routing pointers |

L1 acts as a "table of contents" for L3 Skills. When a new task arrives, L1 helps route to relevant skills without loading full content.

---

### L2 — Global Facts

**Purpose**: Stable knowledge accumulated over long-term operation.

| Attribute | Value |
|-----------|-------|
| Persistence | Permanent |
| Update Frequency | Infrequently |
| Content Type | User preferences, environment facts |

**Example content**:
- User's name, timezone, coding style
- Environment configuration
- Stable API endpoints

---

### L3 — Task Skills / SOPs

**Purpose**: Reusable workflows for completing specific task types.

| Attribute | Value |
|-----------|-------|
| Persistence | Permanent |
| Update Frequency | On task completion |
| Content Type | Standard Operating Procedures |

This is where **self-evolution happens**. Each completed task can be crystallized into an SOP for direct reuse.

**Key SOPs**:

| SOP | Purpose |
|-----|---------|
| `plan_sop.md` | Multi-step planning with verification |
| `supervisor_sop.md` | Oversight/monitoring mode |
| `autonomous_operation_sop.md` | Self-directed task execution |
| `goal_mode_sop.md` | Goal-driven reflection |
| `vision_sop.md` | Visual perception capability |

---

### L4 — Session Archive

**Purpose**: Archived task records distilled from finished sessions for long-horizon recall.

| Attribute | Value |
|-----------|-------|
| Persistence | Long-term |
| Update Frequency | On session end |
| Content Type | Compressed session logs |

L4 stores distilled session records that can be referenced for similar future tasks.

## 3. Memory Flow

```
Task Execution:
1. Task arrives → L1 Insight Index routes to relevant L3 Skills
2. If no skill matches → Autonomous exploration mode
3. During execution → L0 Meta Rules constrain behavior
4. On completion → Results write to L2 Global Facts (if stable knowledge)
5. On task crystallization → New skill saves to L3 Skills
6. Session end → Session distillate saves to L4 Sessions

Skill Invocation:
1. New task arrives
2. L1 checks for matching L3 Skill
3. If found → Direct skill recall and execution
4. If not found → Autonomous exploration → New skill creation
```

## 4. Memory Tools

| Tool | Function |
|------|----------|
| `update_working_checkpoint` | Save current context to working checkpoint |
| `start_long_term_update` | Trigger long-term memory update (skill crystallization) |

## 5. Self-Evolution via Memory

The key to GenericAgent's self-evolution is the **crystallization loop**:

```
[New Task] 
    ↓ (no matching skill in L1)
[Autonomous Exploration]
    ↓ (install deps, write scripts, debug)
[Task Completion]
    ↓
[Crystallize Execution Path]
    ↓
[Write to L3 Skills via start_long_term_update]
    ↓
[Update L1 Insight Index]
    ↓
[Next similar task → Direct recall from L3]
```

This means: **The longer you use GenericAgent, the more capable it becomes, forming a skill tree unique to you.**

## 6. Memory Persistence

| Layer | Storage Location | Format |
|-------|-----------------|--------|
| L0 | In-context | N/A |
| L1 | `memory/` | Markdown index files |
| L2 | `memory/` | Markdown fact files |
| L3 | `memory/` | Markdown SOP files |
| L4 | `memory/L4_raw_sessions/` | Compressed session files |

All memory is stored as **plain text Markdown files** — easily readable, editable, and portable.
