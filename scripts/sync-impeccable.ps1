$ErrorActionPreference = 'Stop'

$repo = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$source = Join-Path $repo 'vendor/impeccable'
if (-not (Test-Path (Join-Path $source '.claude/skills/impeccable/SKILL.md'))) {
  throw 'Initialize the Impeccable submodule first: git submodule update --init vendor/impeccable'
}

New-Item -ItemType Directory -Force -Path (Join-Path $repo '.claude/skills') | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $repo '.agents/skills') | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $repo 'third_party') | Out-Null

Copy-Item -LiteralPath (Join-Path $source '.claude/skills/impeccable') -Destination (Join-Path $repo '.claude/skills') -Recurse -Force
Copy-Item -LiteralPath (Join-Path $source '.claude/agents') -Destination (Join-Path $repo '.claude') -Recurse -Force
Copy-Item -LiteralPath (Join-Path $source '.agents/skills/impeccable') -Destination (Join-Path $repo '.agents/skills') -Recurse -Force
Copy-Item -LiteralPath (Join-Path $source 'LICENSE') -Destination (Join-Path $repo 'third_party/IMPECCABLE-LICENSE') -Force
Copy-Item -LiteralPath (Join-Path $source 'NOTICE.md') -Destination (Join-Path $repo 'third_party/IMPECCABLE-NOTICE.md') -Force

Push-Location $repo
try {
  & (Join-Path $repo '.agents/skills/impeccable/scripts/impeccable.cmd') hooks on
  if ($LASTEXITCODE -ne 0) { throw 'Impeccable hook setup failed.' }
} finally {
  Pop-Location
}

Write-Host 'Impeccable skills copied for Claude Code and Codex.'
