# Self-Evolution Mechanism

> This is what fundamentally distinguishes GenericAgent from every other agent framework.

## 1. Core Philosophy

**Traditional Agent Frameworks**: Pre-load hundreds of skills/tools, static capability set.

**GenericAgent**: Don't preload skills — evolve them through use.

```
[遇到新任务] → [自主摸索] → [固化为Skill] → [下次直接调用]
```

## 2. Evolution Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      New Task Arrives                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              L1 Insight Index (Routing)                       │
│         "Does a relevant L3 Skill exist?"                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
         [YES: Skill found]       [NO: No matching skill]
              │                         │
              ▼                         ▼
┌─────────────────────┐    ┌─────────────────────────────────┐
│ Direct Skill Recall │    │   Autonomous Exploration Mode   │
│ + Execute          │    │   1. Install dependencies       │
└─────────────────────┘    │   2. Write execution scripts   │
                           │   3. Debug and verify          │
                           │   4. Complete task             │
                           └──────────────┬──────────────────┘
                                          │
                                          ▼
                           ┌─────────────────────────────────┐
                           │   Skill Crystallization         │
                           │   (via start_long_term_update)  │
                           │                                 │
                           │   1. Analyze execution path     │
                           │   2. Generate SOP from path     │
                           │   3. Save to L3 Skills         │
                           │   4. Update L1 Insight Index   │
                           └──────────────┬──────────────────┘
                                          │
                                          ▼
                           ┌─────────────────────────────────┐
                           │   Next Similar Task            │
                           │   → Direct recall from L3      │
                           │   → "一句话启动"               │
                           └─────────────────────────────────┘
```

## 3. Self-Evolution Example

| Task | First Time | After Evolution |
|------|------------|----------------|
| "Read my WeChat messages" | Install deps → Reverse DB → Write script → Save skill | **one-line invoke** |
| "Monitor stocks and alert me" | Install mootdx → Build selection flow → Configure cron → Save skill | **one-line start** |
| "Send this file via Gmail" | Configure OAuth → Write send script → Save skill | **ready to use** |

## 4. Skill Library

After weeks of use, your GenericAgent instance will have a **unique skill tree** that no one else in the world has — all grown from 3K lines of seed code.

### Skill Categories

| Category | Description | Example |
|----------|-------------|---------|
| Platform Integration | Connect to external services | Gmail sending, WeChat reading |
| Data Processing | Transform and analyze data | Stock screening, expense tracking |
| Browser Automation | Web interaction patterns | Login, form filling, scraping |
| System Control | OS-level operations | ADB, keyboard/mouse, cron |

## 5. Layered Memory × Evolution

The self-evolution mechanism is tightly coupled with the layered memory system:

| Layer | Role in Evolution |
|-------|------------------|
| L0 | Provides constraints (can't evolve past red lines) |
| L1 | Routes to evolved skills (fast recall) |
| L2 | Stores stable facts about what works |
| L3 | Stores crystallized skills (main evolution output) |
| L4 | Provides historical context for similar tasks |

## 6. Code-as-Documentation

GenericAgent agents can read their own code to understand and explain capabilities:

```
用户: 告诉我你的reflect模式怎么启用
Agent: file_read(goal_mode_sop.md) → 提取约束 → 解释如何使用
```

This means:
- **No external documentation required** for basic usage
- Agents self-document through code reading
- New capabilities discovered through exploration

## 7. Self-Bootstrap Proof

> 🤖 **Self-Bootstrap Proof** — Everything in the GenericAgent repository, from installing Git and running `git init` to every commit message, was completed autonomously by GenericAgent. The author never opened a terminal once.

This demonstrates:
1. Agent can set up its own environment
2. Agent can use Git for version control
3. Agent can commit with meaningful messages
4. Agent can troubleshoot and fix issues

## 8. Comparison with Static Frameworks

| Aspect | GenericAgent | Static Framework |
|--------|--------------|------------------|
| Initial capabilities | Minimal (3K code) | Rich (pre-loaded tools) |
| Capability growth | Auto-evolve via use | Manual plugin addition |
| Skill retention | Permanent (in L3) | Session-only or external |
| Customization | Agent learns your patterns | User configures plugins |
| Maintenance | Self-improving | Manual updates |

## 9. Benefits

| For Users | For Developers |
|-----------|----------------|
| Lower barrier to entry | Minimal seed code to maintain |
| Personalized skill tree | Capabilities grow automatically |
| No plugin management | Agent handles dependencies |
| "Set and forget" | Self-debugging and recovery |

## 10. Technical Report

For academic details on the self-evolution mechanism, see:
- [arXiv:2604.17091](https://arxiv.org/abs/2604.17091) — *GenericAgent: A Token-Efficient Self-Evolving LLM Agent via Contextual Information Density Maximization*
