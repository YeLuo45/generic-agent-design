# SOPs (Standard Operating Procedures)

> GenericAgent's capabilities are defined as SOPs stored in layered memory, enabling self-evolution through skill crystallization.

## 1. SOP Overview

| SOP | File | Purpose |
|-----|------|---------|
| Plan Mode | `plan_sop.md` | Multi-step task planning with verification |
| Supervisor | `supervisor_sop.md` | Monitoring and intervention |
| Autonomous | `autonomous_operation_sop.md` | Self-directed task execution |
| Goal Mode | `goal_mode_sop.md` | Goal-driven reflection |
| Vision | `vision_sop.md` | Visual perception capability |
| Memory Cleanup | `memory_cleanup_sop.md` | Memory maintenance |
| Scheduled Task | `scheduled_task_sop.md` | Cron-based scheduling |
| Web Setup | `web_setup_sop.md` | Browser tool configuration |
| TMWebDriver | `tmwebdriver_sop.md` | Browser automation setup |

## 2. Plan Mode SOP (`plan_sop.md`)

**Trigger**: Tasks with 3+ dependent steps, multi-file coordination, conditional branches, or parallel execution.

**Phases**:

### Phase 1: Exploration (Required)
- Create `plan_XXX/` working directory
- Match relevant SOPs from L1/L3 memory
- Launch exploration subagent with `--verbose` flag
- Supervisor monitors subagent progress

### Phase 2: Planning
- Read matched SOPs
- Write `plan.md` with structured steps
- Mark complex steps with `[D]` for delegation
- User confirmation required before execution

### Phase 3: Execution
- Read `plan.md`, execute first `[ ]` item
- Execute SOP-annotated steps from referenced SOPs
- Delegate `[D]` steps to subagent
- Mini-verify after each step
- Termination check when all steps complete

### Phase 4: Verification
- Launch independent verification subagent
- Adversarial validation of deliverables
- Fix failures via `[FIX]` steps
- Maximum 2 retry cycles

**Key Format**:
```markdown
## 执行计划
1. [ ] 步骤1
   SOP: xxx_sop.md
2. [D] 步骤2（委托subagent）
   SOP: yyy_sop.md
   依赖：1
```

## 3. Supervisor SOP (`supervisor_sop.md`)

**Role**: Oversight/monitoring agent, not executor.

**Rules**:
- **Never execute**: No browser, no code writing, no task steps
- **Can read**: Environment info via file_read/web_scan/code_run (read-only)

**Intervention Types**:

| Detection | Action |
|-----------|--------|
| Step skipped | `_intervene`: 你跳过了StepN |
| Detail missed | `_intervene`: 你漏了XX约束 |
| Talk without action | `_intervene`: 别说了，直接做 |
| Unsupported claim | `_intervene`: 你怎么确认的？验证一下 |
| Repeated failure | `_intervene`: 停，先读错误日志 |
| About to enter high-risk step | `_keyinfo`: 提前注入细节 |

**Monitoring Loop**:
1. Poll `temp/{task_name}/output.txt` for new content
2. Compare against constraint checklist
3. Intervene when needed
4. Reply to ask_user from supervisor

## 4. Autonomous Operation SOP (`autonomous_operation_sop.md`)

**Purpose**: Self-directed task execution without user present.

**Flow**:
1. Read SOP, initialize with `update_working_checkpoint`
2. Select task from TODO or create plan via `task_planning.md`
3. Execute with ≤30 turn limit
4. **Completion**:
   - Write report to `./autonomous_reports/`
   - Call `complete_task()` helper
   - Mark TODO as `[x]`

**Task Selection Criteria**:
- Value formula: `AI-training-data-coverage × future-collaboration-benefit`
- No two consecutive selections of same subtask
- Priority to incomplete TODOs

**Permission Boundaries**:
- No approval needed: read-only probing, cwd writes, script experiments
- Write for review: modify global_mem/SOPs, install software, external API calls
- Absolute prohibition: read secrets, modify core code, irreversible operations

## 5. Goal Mode SOP (`goal_mode_sop.md`)

**Purpose**: Goal-driven reflection and self-correction.

**Entry**: Set goal → Reflect → Adjust → Execute

## 6. Memory Management SOPs

### Vision SOP (`vision_sop.md`)
Configures visual perception capability via LLM vision API.

### Memory Cleanup SOP (`memory_cleanup_sop.md`)
Periodic maintenance of memory layers.

### Scheduled Task SOP (`scheduled_task_sop.md`)
Integration with cron scheduler for periodic execution.

## 7. Setup SOPs

### Web Setup SOP (`web_setup_sop.md`)
Unlocks browser automation via Chrome extension injection.

### TMWebDriver SOP (`tmwebdriver_sop.md`)
Browser driver setup and CDP connection.

## 8. SOP Storage

All SOPs are stored in `memory/` directory as Markdown files:

```
memory/
├── L0_Meta_Rules.md
├── L1_Insight_Index.md
├── L2_Global_Facts.md
├── L3_Skills/
│   ├── plan_sop.md
│   ├── supervisor_sop.md
│   ├── autonomous_operation_sop.md
│   ├── goal_mode_sop.md
│   └── ...
└── L4_raw_sessions/
```

## 9. SOP Self-Documentation

GenericAgent follows **"Code is Documentation"** philosophy. Agents can read their own source code to understand functionality:

```
用户: 告诉我你的reflect模式怎么启用
Agent: file_read(plan_sop.md) → 提取reflect相关约束 → 解释如何使用
```

This means any feature can be queried directly without external documentation.
