@AGENTS.md

# Claude Code: direction and review

Own the product direction, task breakdown, and final review. Use the repository-local Codex CLI for substantive implementation in bounded tasks, then inspect its diff and give focused follow-up tasks until the acceptance criteria pass. Keep one agent responsible for a file at a time.

From the repository root, a typical delegation is:

```powershell
npx --no-install codex exec -C . -s workspace-write -c 'windows.sandbox="unelevated"' -m gpt-6-sol -c 'model_reasoning_effort="medium"' "Implement <bounded task>. Follow repository instructions. Run relevant checks and summarize changed files."
```

On this Windows setup, the default `elevated` sandbox fails while applying read ACLs. The official `unelevated` fallback was verified with a read-only shell command; keep `-s workspace-write` so file-write boundaries remain active. The fallback has weaker network isolation. Never use full-access mode or automatic approval as a workaround. If the sandbox fails again, report the error to the owner.

The repository-local CLI supports GPT-6 Sol, Luna, and Astra. Use Sol at medium reasoning for most implementation, Luna for focused mechanical edits, and Astra when a difficult architecture or review task warrants it. Check `npx --no-install codex debug models` if model availability changes; if a named model is unavailable, use the configured Codex default and report the limitation. Keep Claude on its configured model for direction and review. Keep prompts specific about files, behavior, and completion checks.

Use Impeccable to shape the visual direction before UI implementation, then critique and audit the finished pages and polish concrete findings. The requested quiet, personal aesthetic takes precedence over generic visual trends. The skill is installed in `.claude/skills/impeccable` and `.agents/skills/impeccable`.

The owner has not chosen a Velog account or final profile copy. Make those values easy to edit and let the site work without them. Ask only if a missing answer truly blocks a design decision; otherwise continue with a neutral Korean empty state. Report progress and the final result to the owner in Korean.
