# GenericAgent Design

Design documentation site for [GenericAgent](https://github.com/lsdefine/GenericAgent) — a minimal, self-evolving autonomous agent framework.

**GitHub Repository**: https://github.com/yeluo45/generic-agent-design

## Project Structure

```
generic-agent-design/
├── docs-site/                 # VitePress documentation site
│   ├── .vitepress/
│   │   ├── config.mjs         # VitePress configuration
│   │   ├── theme/             # Custom theme
│   │   └── public/            # Static assets
│   ├── index.md               # Home page
│   ├── architecture.md        # Architecture overview
│   ├── memory-system.md       # Layered memory system
│   ├── toolset.md             # Atomic tools
│   ├── agent-loop.md          # Core agent loop
│   ├── frontends.md           # UI and IM frontends
│   ├── sops.md                # Standard operating procedures
│   └── self-evolution.md      # Self-evolution mechanism
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages deployment
└── package.json
```

## Quick Start

```bash
cd docs-site
pnpm install
pnpm run dev      # Development preview
pnpm run build    # Production build
pnpm run preview  # Preview build
```

## Live Site

https://yeluo45.github.io/generic-agent-design/

## Content

| Document | Description |
|----------|-------------|
| [Architecture](https://yeluo45.github.io/generic-agent-design/architecture) | ~3K core code, 9 atomic tools, ~100 line Agent Loop |
| [Memory System](https://yeluo45.github.io/generic-agent-design/memory-system) | L0-L4 five-layer memory architecture |
| [Toolset](https://yeluo45.github.io/generic-agent-design/toolset) | 7 core tools + 2 memory management tools |
| [Agent Loop](https://yeluo45.github.io/generic-agent-design/agent-loop) | Perceive → Reason → Execute → Memory |
| [Frontends](https://yeluo45.github.io/generic-agent-design/frontends) | Terminal UI, Desktop GUI, IM bots |
| [SOPs](https://yeluo45.github.io/generic-agent-design/sops) | Plan Mode, Supervisor, Autonomous modes |
| [Self-Evolution](https://yeluo45.github.io/generic-agent-design/self-evolution) | Task → Skill crystallization mechanism |

## Based on

[lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) — MIT License
