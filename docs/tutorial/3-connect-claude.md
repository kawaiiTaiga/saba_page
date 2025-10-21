---
id: 3-connect-claude
title: 3. Connect to Claude Desktop
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="en" label="English">

## Claude Desktop and MCP

Claude Desktop can use external tools through **MCP (Model Context Protocol)**.

SABA Core acts as an MCP server and communicates with Claude Desktop via SSE (Server-Sent Events).

---

## 1. Install Node.js

Node.js is required for MCP connection.

Download and install the LTS version from the [official Node.js website](https://nodejs.org/).

### Verify Installation

```bash
node --version
npm --version
```

If versions are displayed, installation is successful.

---

## 2. Configure Claude Desktop

You need to modify Claude Desktop's MCP configuration file.

### Config File Location

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### Add Configuration

**Windows Example:**

```json
{
  "mcpServers": {
    "saba-core": {
      "command": "C:\\Program Files\\nodejs\\npx.cmd",
      "args": ["-y", "@modelcontextprotocol/cli", "http://localhost:8083/sse/sse"]
    }
  }
}
```

**macOS/Linux Example:**

```json
{
  "mcpServers": {
    "saba-core": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/cli", "http://localhost:8083/sse/sse"]
    }
  }
}
```

**Explanation:**
- `command`: Path to npx executable (Windows needs absolute path)
- `args`: MCP CLI package and SABA Core SSE endpoint
- `http://localhost:8083/sse`: SABA Core's MCP endpoint

---

## 3. Restart Claude Desktop

After saving the config file, **completely quit and restart Claude Desktop**.

**Windows:**
- Check Task Manager to ensure Claude process is fully terminated

**macOS:**
- Use `Cmd + Q` to fully quit

**Linux:**
- Verify process is completely terminated

---

## 4. Verify Connection

### Check in Claude Desktop

Open Claude Desktop and start a new conversation.

If you see a **🔌 icon** or **tools icon** next to the input field, connection is successful.

### Check Available Tools

Ask Claude:

```
What tools can you use?
```

You should see a list of tools from devices connected to SABA Core.

---

## 5. Control Devices

### Basic Usage

Just ask Claude in natural language:

```
Turn the living room LED red
```

```
Take a photo
```

```
Measure the current temperature
```

Claude will automatically select and execute the appropriate tool.

### Direct Tool Invocation

You can also explicitly call tools:

```
take_photo(quality="high", flash=true)
```

```
led_control(r=255, g=0, b=0, brightness=128)
```

---

## Troubleshooting

### "Transport closed" Error

**Cause:** Cannot connect to SABA Core's SSE endpoint

**Solution:**
```bash
# Check SSE endpoint
curl -i http://localhost:8083/sse

# Should return 200 OK with Content-Type: text/event-stream
```

Verify SABA Core is running:
```bash
docker ps
```

### "Tool not found" Error

**Cause:** Tool name is incorrect or disabled

**Solution:**
1. Access Projection Manager (http://localhost:8084)
2. Verify tool is enabled
3. Check tool alias is correct (no spaces or special characters)
4. Restart Bridge

### npx Error on Windows

**Cause:** Cannot find npx path

**Solution:**

Find npx location:
```bash
where npx
```

Use the output path in config:
```json
{
  "mcpServers": {
    "saba-core": {
      "command": "C:\\Users\\YourName\\AppData\\Roaming\\npm\\npx.cmd",
      "args": ["-y", "@modelcontextprotocol/cli", "http://localhost:8083/sse/sse"]
    }
  }
}
```

### Tools Not Visible

**Check:**
1. Is SABA Core running?
2. Are devices connected?
3. Are tools enabled in Projection Manager?
4. Did you restart Claude Desktop?

**Debug:**
```bash
# Check connected devices
curl http://localhost:8083/devices

# Check bridge logs
docker logs -f mcp-bridge
```

---

## Alternative: Global Installation

You can install MCP CLI globally instead of using npx.

### Install

```bash
npm install -g @modelcontextprotocol/cli
```

### Claude Desktop Config

```json
{
  "mcpServers": {
    "saba-core": {
      "command": "mcp-remote",
      "args": ["http://localhost:8083/sse/sse"]
    }
  }
}
```

---

## Done!

Congratulations! You can now control your IoT devices from Claude Desktop.

</TabItem>
<TabItem value="ko" label="한국어" default>

## Claude Desktop과 MCP

Claude Desktop은 **MCP (Model Context Protocol)**를 통해 외부 도구를 사용할 수 있습니다.

SABA Core는 MCP 서버로 작동하며, SSE (Server-Sent Events)를 통해 Claude Desktop과 통신합니다.

---

## 1. Node.js 설치

MCP 연결을 위해 Node.js가 필요합니다.

[Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전을 다운로드하고 설치하세요.

### 설치 확인

```bash
node --version
npm --version
```

버전이 표시되면 정상입니다.

---

## 2. Claude Desktop 설정

Claude Desktop의 MCP 설정 파일을 수정해야 합니다.

### 설정 파일 위치

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### 설정 추가

**Windows 예시:**

```json
{
  "mcpServers": {
    "saba-core": {
      "command": "C:\\Program Files\\nodejs\\npx.cmd",
      "args": ["-y", "@modelcontextprotocol/cli", "http://localhost:8083/sse/sse"]
    }
  }
}
```

**macOS/Linux 예시:**

```json
{
  "mcpServers": {
    "saba-core": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/cli", "http://localhost:8083/sse/sse"]
    }
  }
}
```

**설명:**
- `command`: npx 실행 파일 경로 (Windows는 절대 경로 필요)
- `args`: MCP CLI 패키지와 SABA Core SSE 엔드포인트
- `http://localhost:8083/sse`: SABA Core의 MCP 엔드포인트

---

## 3. Claude Desktop 재시작

설정 파일을 저장한 후 **Claude Desktop을 완전히 종료하고 다시 실행**하세요.

**Windows:**
- 작업 관리자에서 Claude 프로세스가 완전히 종료되었는지 확인

**macOS:**
- `Cmd + Q`로 완전 종료

**Linux:**
- 프로세스 완전 종료 확인

---

## 4. 연결 확인

### Claude Desktop에서 확인

Claude Desktop을 열고 새 대화를 시작합니다.

입력창 옆에 **🔌 아이콘**이나 **도구 아이콘**이 보이면 성공입니다.

### 사용 가능한 도구 확인

Claude에게 물어보세요:

```
어떤 도구들을 사용할 수 있어?
```

SABA Core에 연결된 장치의 도구들이 목록으로 나와야 합니다.

---

## 5. 장치 제어하기

### 기본 사용법

자연어로 Claude에게 요청하면 됩니다:

```
거실 LED를 빨간색으로 켜줘
```

```
사진 찍어줘
```

```
현재 온도 측정해줘
```

Claude가 자동으로 적절한 도구를 선택하고 실행합니다.

### 도구 직접 호출

도구를 명시적으로 호출할 수도 있습니다:

```
take_photo(quality="high", flash=true)
```

```
led_control(r=255, g=0, b=0, brightness=128)
```

---

## 문제 해결

### "Transport closed" 오류

**원인:** SABA Core의 SSE 엔드포인트에 연결할 수 없음

**해결:**
```bash
# SSE 엔드포인트 확인
curl -i http://localhost:8083/sse

# 200 OK와 Content-Type: text/event-stream이 나와야 함
```

SABA Core가 실행 중인지 확인:
```bash
docker ps
```

### "Tool not found" 오류

**원인:** 도구 이름이 잘못되었거나 비활성화됨

**해결:**
1. Projection Manager (http://localhost:8084) 접속
2. 도구가 활성화되어 있는지 확인
3. 도구 alias가 올바른지 확인 (공백, 특수문자 없이)
4. Bridge 재시작

### Windows에서 npx 오류

**원인:** npx 경로를 찾을 수 없음

**해결:**

npx 위치 찾기:
```bash
where npx
```

출력된 경로를 설정 파일에 사용:
```json
{
  "mcpServers": {
    "saba-core": {
      "command": "C:\\Users\\YourName\\AppData\\Roaming\\npm\\npx.cmd",
      "args": ["-y", "@modelcontextprotocol/cli", "http://localhost:8083/sse/sse"]
    }
  }
}
```

### 도구가 보이지 않음

**확인 사항:**
1. SABA Core 실행 중인가?
2. 장치가 연결되어 있는가?
3. Projection Manager에서 도구가 활성화되어 있는가?
4. Claude Desktop을 재시작했는가?

**디버깅:**
```bash
# 연결된 장치 확인
curl http://localhost:8083/devices

# Bridge 로그 확인
docker logs -f mcp-bridge
```

---

## 대안: 전역 설치

npx 대신 MCP CLI를 전역으로 설치할 수도 있습니다.

### 설치

```bash
npm install -g @modelcontextprotocol/cli
```

### Claude Desktop 설정

```json
{
  "mcpServers": {
    "saba-core": {
      "command": "mcp-remote",
      "args": ["http://localhost:8083/sse/sse"]
    }
  }
}
```

---

## 완료!

축하합니다! 이제 Claude Desktop에서 여러분의 IoT 장치를 제어할 수 있습니다.


</TabItem>
</Tabs>