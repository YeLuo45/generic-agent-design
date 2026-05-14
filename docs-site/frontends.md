# Frontends

> GenericAgent supports multiple UI and IM platform frontends for flexible interaction.

## 1. Frontend Overview

| Frontend | File | Technology | Platform |
|----------|------|------------|----------|
| Terminal UI | `tuiapp.py` | Textual | Cross-platform |
| Desktop GUI | `qtapp.py` | PyQt | Cross-platform |
| Streamlit App | `stapp.py`, `stapp2.py` | Streamlit | Web-based |
| Telegram Bot | `tgapp.py` | python-telegram-bot | IM |
| Feishu Bot | `fsapp.py` | lark-oapi | IM |
| WeChat Bot | `wechatapp.py` | WeChat PC API | IM |
| QQ Bot | `qqapp.py` | qq-botpy | IM |
| DingTalk Bot | `dingtalkapp.py` | dingtalk-stream | IM |
| WeCom Bot | `wecomapp.py` | wecom_aibot_sdk | IM |

## 2. Desktop Frontends

### 2.1 Terminal UI (tuiapp.py)

A lightweight, keyboard-driven interface built on [Textual](https://github.com/Textualize/textual).

**Features**:
- Multiple concurrent sessions
- Real-time streaming
- Runs anywhere a terminal does
- No browser needed

**Launch**:
```bash
python frontends/tuiapp.py
```

### 2.2 Desktop GUI (qtapp.py)

Qt-based desktop application with PyWebView.

**Launch**:
```bash
python frontends/qtapp.py
```

### 2.3 Streamlit Apps

Alternative web-based UIs running on Streamlit.

**Launch**:
```bash
streamlit run frontends/stapp.py
# or
streamlit run frontends/stapp2.py
```

## 3. IM Platform Bots

### 3.1 Telegram Bot

**Configuration** (`mykey.py`):
```python
tg_bot_token = 'YOUR_BOT_TOKEN'
tg_allowed_users = [YOUR_USER_ID]
```

**Launch**:
```bash
python frontends/tgapp.py
```

### 3.2 Feishu (Lark) Bot

**Configuration**:
```python
fs_app_id = "cli_xxx"
fs_app_secret = "xxx"
fs_allowed_users = ["ou_xxx"]  # or ['*']
```

**Launch**:
```bash
python frontends/fsapp.py
```

**Capabilities**:
- Inbound: text, rich text, images, files, audio, interactive cards
- Outbound: streaming cards, images, files
- Vision: multi-modal image input

### 3.3 WeChat Bot

**Launch** (personal WeChat):
```bash
pip install pycryptodome qrcode requests
python frontends/wechatapp.py
```
First launch shows QR code for WeChat binding.

### 3.4 QQ Bot

Uses WebSocket long connection (no public webhook needed).

**Configuration**:
```python
qq_app_id = "YOUR_APP_ID"
qq_app_secret = "YOUR_APP_SECRET"
qq_allowed_users = ["USER_OPENID"]  # or ['*']
```

**Launch**:
```bash
pip install qq-botpy
python frontends/qqapp.py
```

### 3.5 DingTalk Bot

**Launch**:
```bash
pip install dingtalk-stream
python frontends/dingtalkapp.py
```

### 3.6 WeCom Bot

**Launch**:
```bash
pip install wecom_aibot_sdk
python frontends/wecomapp.py
```

## 4. Common Chat Commands

All frontends (except pure desktop GUI) support these commands:

| Command | Description |
|---------|-------------|
| `/new` | Start fresh conversation, clear context |
| `/continue` | List recoverable conversation snapshots |
| `/continue N` | Restore Nth recoverable snapshot |

## 5. Codeg Integration

[Codeg](https://github.com/yiqi-017/codeg) provides a unified desktop/web UI for multiple agents including GenericAgent.

**Setup**: Place GenericAgent directory alongside codeg project. Codeg auto-detects `frontends/genericagent_acp_bridge.py`.

## 6. Frontend Architecture

```
                    ┌─────────────────┐
                    │   IM Platform   │
                    │  (Telegram/QQ/  │
                    │   Feishu/etc.)  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  chatapp_common │
                    │   (Shared UI    │
                    │   Logic)        │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   tgapp.py      │ │   fsapp.py      │ │  wechatapp.py   │
│   (Telegram)    │ │   (Feishu)      │ │   (WeChat)      │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## 7. ACP Bridge

`frontends/genericagent_acp_bridge.py` provides integration with the Agent Communication Protocol (ACP) for multi-agent orchestration.
