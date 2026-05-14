# Atomic Toolset

> GenericAgent provides only **7 core tools + 2 memory management tools**, forming the complete foundational capabilities for interacting with the outside world.

## 1. Core Tools

### 1.1 code_run

**Purpose**: Execute arbitrary code in the environment.

**Capabilities**:
- Install Python packages dynamically
- Run shell commands
- Execute Python scripts
- Control hardware (via ADB)

**Usage Pattern**:
```python
code_run({
    'script': 'python code here',
    'timeout': 30,
    'inline_eval': True  # For single-line expressions
})
```

**Key Feature**: GenericAgent can dynamically install packages at runtime — no need to pre-install everything.

---

### 1.2 file_read

**Purpose**: Read files from the filesystem.

**Capabilities**:
- Read any text file
- Line-numbered output for reference
- Support for large files with offset/limit

---

### 1.3 file_write

**Purpose**: Write content to files.

**Capabilities**:
- Create new files
- Overwrite existing files
- Automatic parent directory creation

---

### 1.4 file_patch

**Purpose**: Targeted find-and-replace edits.

**Capabilities**:
- Fuzzy matching (9 strategies)
- Unique match detection
- Syntax validation after edit

**Usage**: Preferred over file_write for targeted changes to avoid corrupting unrelated content.

---

### 1.5 web_scan

**Purpose**: Perceive web content (similar to browser.t扁)。

**Capabilities**:
- Fetch page content
- Extract specific information
- Support for JavaScript-rendered pages (via TMWebDriver)

---

### 1.6 web_execute_js

**Purpose**: Control browser behavior directly.

**Capabilities**:
- Click elements
- Fill forms
- Navigate pages
- Inject JavaScript into real browser (preserving login sessions)

**Key Feature**: Uses Chrome DevTools Protocol (CDP) via TMWebDriver for real browser control.

---

### 1.7 ask_user

**Purpose**: Human-in-the-loop confirmation.

**Capabilities**:
- Pause execution for user input
- Yes/No decisions
- Arbitrary text input

**Usage**: Used when task requires user confirmation before proceeding.

---

## 2. Memory Management Tools

### 2.1 update_working_checkpoint

**Purpose**: Save current working context for session persistence.

**Usage**: Called periodically during long tasks or at session end to preserve state.

---

### 2.2 start_long_term_update

**Purpose**: Trigger long-term memory update for skill crystallization.

**Usage**: Called after task completion to crystallize execution path into a reusable skill.

---

## 3. Tool Schema

Tools are defined in `assets/tools_schema.json`:

```json
{
  "code_run": {
    "description": "Execute arbitrary code",
    "parameters": {
      "script": "string",
      "timeout": "number",
      "inline_eval": "boolean"
    }
  },
  "file_read": {
    "description": "Read file contents",
    "parameters": {
      "path": "string",
      "offset": "number",
      "limit": "number"
    }
  },
  ...
}
```

## 4. Tool Composition

These 9 atomic tools can be composed to handle complex tasks:

| Complex Task | Tool Composition |
|--------------|-----------------|
| Browser automation | web_scan + web_execute_js |
| File processing | file_read + file_patch + file_write |
| Package installation | code_run (pip install) |
| API integration | code_run (requests) + file_write |
| Mobile control | code_run (ADB commands) |

## 5. TMWebDriver — Browser Automation

`TMWebDriver.py` provides Chrome DevTools Protocol (CDP) bridge for real browser control:

| Feature | Description |
|---------|-------------|
| Real Browser | Uses actual Chrome instance, preserves login sessions |
| CDP Bridge | Chrome DevTools Protocol for fine-grained control |
| Extension Injection | `tmwd_cdp_bridge/` extension for dialog handling |

### Setup Flow:
```
1. Install Chrome extension (tmwd_cdp_bridge)
2. Enable Chrome DevTools
3. Connect via CDP WebSocket
4. Execute browser commands
```

## 6. Dynamic Tool Creation

A key capability: via `code_run`, GenericAgent can **dynamically create new tools** at runtime:

```python
# Example: Install and use a new package
code_run({
    'script': '''
pip install mootdx
from mootdx import Daily
df = Daily(symbol="600036").fetch()
'''
})
```

This temporary ability can then be crystallized into a permanent skill via `start_long_term_update`.
