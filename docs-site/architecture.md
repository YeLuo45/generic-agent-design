# Architecture

> GenericAgent 核心架构：极简、可自我进化、系统级控制

## 1. Overview

GenericAgent 是一个极简的自我进化 Agent 框架，核心特点：

| 指标 | 数值 |
|------|------|
| 核心代码量 | ~3K 行 |
| Agent Loop | ~100 行 (agent_loop.py) |
| 原子工具数 | 7 + 2 记忆管理 |
| 上下文窗口 | <30K token |
| 支持模型 | Claude / Gemini / Kimi / MiniMax 等 |

## 2. Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontends (IM/Bot)                     │
│  tuiapp.py | qtapp.py | stapp.py | tgapp.py | fsapp.py ... │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      agentmain.py                            │
│                   (Entry Point / CLI)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      agent_loop.py                          │
│              (~100 lines - Core Agent Loop)                  │
│   Perceive → Reason → Execute Tools → Write Memory → Loop    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                       llmcore.py                            │
│            (LLM Interface / Tool Calling)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Tools    │    │   Memory   │    │  Reflect    │
│ (9 atoms)  │    │  (L0-L4)  │    │   Modes    │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 3. Directory Structure

```
GenericAgent/
├── agent_loop.py          # Core Agent Loop (~100 lines)
├── agentmain.py           # Entry point / CLI
├── llmcore.py             # LLM interface + tool definitions
├── mykey_template.py      # API key configuration template
├── TMWebDriver.py         # Browser automation driver
├── simphtml.py            # HTML parsing utility
├── ga.py                  # Main agent class
│
├── frontends/             # UI / Bot interfaces
│   ├── tuiapp.py         # Terminal UI (Textual)
│   ├── qtapp.py          # Qt desktop app
│   ├── stapp.py          # Streamlit app
│   ├── stapp2.py         # Alternative Streamlit
│   ├── tgapp.py          # Telegram Bot
│   ├── fsapp.py          # Feishu (Lark) Bot
│   ├── wechatapp.py      # WeChat Bot
│   ├── qqapp.py          # QQ Bot
│   ├── dingtalkapp.py    # DingTalk Bot
│   ├── wecomapp.py       # WeCom Bot
│   └── ...
│
├── memory/                # Layered Memory System
│   ├── L0_Meta_Rules.md  # Core behavioral rules
│   ├── L1_Insight_Index.md # Fast routing index
│   ├── L2_Global_Facts.md  # Stable knowledge
│   ├── L3_Skills/        # Reusable skill SOPs
│   │   ├── plan_sop.md
│   │   ├── supervisor_sop.md
│   │   ├── autonomous_operation_sop.md
│   │   └── ...
│   ├── L4_Sessions/      # Archived session records
│   └── autonomous_operation_sop/
│       └── helper.py     # Autonomous task helpers
│
├── reflect/               # Advanced modes
│   ├── goal_mode.py      # Goal-driven mode
│   ├── agent_team_worker.py
│   ├── scheduler.py      # Cron scheduler
│   └── autonomous.py     # Autonomous exploration
│
├── assets/               # Resources
│   ├── images/           # Logos, banners
│   ├── demo/             # Demo GIFs/screenshots
│   ├── tools_schema.json # Tool definitions
│   └── ...
│
└── plugins/              # Extensions
    └── langfuse_tracing.py
```

## 4. Design Philosophy

### 4.1 Don't Preload Skills — Evolve Them

Traditional agent frameworks preload hundreds of skills/tools. GenericAgent takes the opposite approach:

```
[New Task] → [Autonomous Exploration] → [Crystallize as Skill] → [Direct Recall Next Time]
```

Every task solved automatically becomes a reusable Skill in L3 memory.

### 4.2 Minimal Toolset

Only 9 atomic tools form the complete capability foundation:

| Tool | Purpose |
|------|---------|
| `code_run` | Execute arbitrary code |
| `file_read` | Read files |
| `file_write` | Write files |
| `file_patch` | Patch/modify files |
| `web_scan` | Perceive web content |
| `web_execute_js` | Control browser behavior |
| `ask_user` | Human-in-the-loop |
| `update_working_checkpoint` | Memory management |
| `start_long_term_update` | Memory management |

### 4.3 Layered Memory × Minimal Toolset × Autonomous Loop

The entire framework is built on this trinity. Memory crystallizes throughout execution, tools are minimal but composable, and the loop is self-contained.

## 5. Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `agent_loop.py` | ~100 | Core execution loop |
| `llmcore.py` | ~500 | LLM interface, tool definitions |
| `ga.py` | ~400 | Main Agent class |
| `agentmain.py` | ~200 | CLI entry point |
| `TMWebDriver.py` | ~600 | Browser automation |

## 6. Technology Stack

| Layer | Technology |
|-------|------------|
| LLM Interface | OpenAI-compatible / Claude API |
| Browser Automation | Chrome DevTools Protocol (CDP) via TMWebDriver |
| Terminal UI | Textual |
| Desktop GUI | PyWebView + Streamlit |
| IM Platforms | Telegram / QQ / Feishu / WeChat / DingTalk / WeCom |
