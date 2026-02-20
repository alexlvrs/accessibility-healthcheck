# Setup Guide

## Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **pnpm** (`npm install -g pnpm`)
- **Figma account** with Dev Mode access (for live design data)
- **Claude Code** ([install](https://docs.anthropic.com/en/docs/claude-code)) — optional, for AI-guided workflow

## Install

```bash
git clone https://github.com/alexlvrs/accessibility-healthcheck.git
cd accessibility-healthcheck/packages/ai-testing
pnpm install
```

## Configure Figma MCP (optional)

If you want Claude Code to pull live design data from Figma, configure the Figma MCP server:

1. Start the Figma MCP server (HTTP transport at `http://127.0.0.1:3845/mcp`)
2. Add to your Claude Code MCP settings:
   ```json
   {
     "mcpServers": {
       "figma": {
         "type": "url",
         "url": "http://127.0.0.1:3845/mcp"
       }
     }
   }
   ```
3. Verify the connection — Claude Code should have access to `get_design_context`, `get_screenshot`, and `get_variable_defs` tools.

## Verify Installation

```bash
pnpm run health
```

You should see `Health check passed` with a status of `ok`.

## Quick Start

**Interactive CLI** — walk through prompts to configure and run a check:
```bash
pnpm run check
```

**Full pipeline** — run all stages with sample data:
```bash
pnpm run run
```

**AI-guided** — open the project in Claude Code. The `CLAUDE.md` file will guide the conversation through an accessibility review.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `tsx: command not found` | Run `pnpm install` — tsx is a project dependency |
| `pnpm: command not found` | Install pnpm: `npm install -g pnpm` |
| Health check fails | Ensure you're in `packages/ai-testing/` directory |
| Figma MCP not connecting | Check the server is running at `http://127.0.0.1:3845/mcp` |
| No findings generated | Expected — the PoC uses sample data; findings output to `out/findings.json` |
