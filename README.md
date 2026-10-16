# AUIP Web Client

A modern web frontend for **genai-tk** autonomous agents, built with [assistant-ui](https://www.assistant-ui.com) and the [AG-UI (Agent-User Interaction Protocol)](https://github.com/ag-ui-protocol/ag-ui).

## Features

- ⚡ **Real-time Token Streaming**: Displays assistant responses incrementally over Server-Sent Events (SSE).
- 🧠 **Chain-of-Thought / Reasoning Blocks**: Collapsible visualization of agent reasoning scratchpads.
- 🛠️ **Tool & Sandbox Inspection**: Visual badges for invoked tools, their input arguments, and returned execution results.
- 🎛️ **Agent Profile Selector**: Dynamically query `/profiles` on the AUIP server and switch agents (`research`, `coding`, `browser_agent`, `fake`, etc.) on the fly.
- 🔌 **Decoupled Architecture**: Communicates via standard AG-UI events without coupling to LangChain or DeerFlow backend internals.

## Getting Started

### 1. Start the genai-tk AUIP Server

In the `genai-tk` repository:

```bash
uv run cli auip serve --port 8000
```

To test offline with the mock fake agent:

```bash
uv run cli auip serve --profile fake --port 8000
```

### 2. Run the Client

In this directory:

```bash
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

