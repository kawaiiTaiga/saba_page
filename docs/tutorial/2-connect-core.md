---
id: 2-connect-core
title: 2. Connect to SABA Core
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="en" label="English" default>

## What is SABA Core?

SABA Core is the central server that connects your LLM peripheral to Claude Desktop.

**Components:**
- **MQTT Broker** (Mosquitto) - Device communication
- **MCP Bridge** - Claude Desktop connection
- **Projection Manager** - Web interface for tool management

## Architecture

```
┌─────────────────┐    MQTT     ┌─────────────────┐    MCP/SSE    ┌─────────────────┐
│   IoT Devices   │ ◄─────────► │   Core Server   │ ◄───────────► │  Claude Desktop │
│ (Hardware SDK)  │   1883      │ (Bridge+Broker) │     8083      │   (mcp-remote)  │
└─────────────────┘             └─────────────────┘               └─────────────────┘
                                         │
                                    HTTP │ 8084
                                         ▼
                                ┌─────────────────┐
                                │ Projection Mgr  │
                                │  (Web Interface)│
                                └─────────────────┘
```

---

## 1. Install SABA Core

### Install Docker

First, you need Docker. Download it from the [official Docker website](https://www.docker.com/).

### Run Core Server

```bash
git clone https://github.com/kawaiiTaiga/project_SABA.git
cd project_SABA/core_server
docker compose up -d --build
```

### Check Ports

Default ports:
- **MQTT Broker**: `1883` (for device communication)
- **MCP Bridge**: `8083` (for Claude Desktop connection)
- **Projection Manager**: `8084` (web management interface)

### Verify Installation

```bash
# Check core server status
curl http://localhost:8083/healthz

# List connected devices (empty initially)
curl http://localhost:8083/devices

# Open web interface
# Navigate to http://localhost:8084 in browser
```

---

## 2. Device Provisioning

To connect your device to SABA Core, you need to complete the **provisioning** process.

### Provisioning Steps

**Step 1: Power On Device**

Upload firmware to ESP32 and power it on. It will automatically enter setup mode on first boot.

**Step 2: Connect to Wi-Fi**

The device creates a Wi-Fi AP named `MCP-SETUP-XXXX`. Connect to this Wi-Fi.

**Step 3: Configure via Browser**

Navigate to `http://192.168.4.1` and enter:

- **Wi-Fi SSID**: Your home/office Wi-Fi name
- **Wi-Fi Password**: Wi-Fi password
- **MQTT Broker Host**: IP address of the computer running SABA Core (e.g., `192.168.1.100`)
- **MQTT Broker Port**: `1883` (default)

**Step 4: Save and Reboot**

Save settings and the device will reboot and automatically connect to SABA Core.

### Finding MQTT Broker Host

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" (e.g., 192.168.1.100)
```

**macOS/Linux:**
```bash
ifconfig
# or
ip addr show
```

---

## 3. Verify Device in Projection Manager

### Access Web Interface

Open http://localhost:8084 in your browser.

You'll see the **"Project Saba MCP Manager"** page.

### Check Device

Your connected device should appear in the list:
- Device ID (e.g., `esp32-cam-01`)
- Connection status
- Available tools

**Device not showing?**

```bash
# Check broker logs
docker logs -f mcp-broker

# Check bridge logs
docker logs -f mcp-bridge
```

Verify your device's MQTT settings are correct.

---

## 4. Configure Tool Names

### Tool Naming Rules

MCP requires specific naming conventions:

**Allowed:**
- Letters (a-z, A-Z)
- Numbers (0-9)
- Underscore (_)
- Hyphen (-)

**Not Allowed:**
- Spaces
- Special characters
- Non-ASCII characters (Korean, Chinese, etc.)

**Examples:**
- ✅ `take_photo`, `camera_shot`, `sensor_read`
- ❌ `take photo`, `capture photo`, `capture(image)`

### Rename Tools

1. Select device in Projection Manager
2. Find tool in the list
3. Enter new name in "Alias" field
4. Update "Description" if needed
5. Save

### Apply Changes

**Important:** After changing settings, you must **restart the Bridge**.

Click "Restart Bridge" button in web interface, or:

```bash
docker restart mcp-bridge
```

---

## 5. Test Connection

### Check Device Status

```bash
curl http://localhost:8083/devices
```

Should return JSON list of connected devices.

### Check MCP Endpoint

```bash
curl -i http://localhost:8083/sse
```

Should return `200 OK` with `Content-Type: text/event-stream`.

---

## Troubleshooting

### Device Not Connecting

**Check MQTT Broker:**
```bash
docker logs -f mcp-broker
```

**Verify Device MQTT Settings:**
- Is Broker Host correct?
- Is port 1883?
- Are they on the same network?

### Tools Not Appearing

- Check if tools are enabled in Projection Manager
- Restart device to reconnect
- Check bridge logs: `docker logs -f mcp-bridge`

### Settings Not Applying

- Click "Restart Bridge" button
- Or run `docker restart mcp-bridge`
- Check config file: `./config/projection_config.json`

---

## Next Steps

Once SABA Core and your device are connected, it's time to connect Claude Desktop.

Move on to [3. Connect to Claude Desktop](/docs/tutorial/3-connect-claude).

</TabItem>
<TabItem value="ko" label="한국어">

## SABA Core란?

SABA Core는 여러분의 IoT 장치와 Claude Desktop을 연결하는 중앙 서버입니다.

**구성 요소:**
- **MQTT 브로커** (Mosquitto) - 장치 통신
- **MCP Bridge** - Claude Desktop과의 연결
- **Projection Manager** - 웹 인터페이스로 도구 관리

## 아키텍쳐

```
┌─────────────────┐    MQTT     ┌─────────────────┐    MCP/SSE    ┌─────────────────┐
│   IoT Devices   │ ◄─────────► │   Core Server   │ ◄───────────► │  Claude Desktop │
│ (Hardware SDK)  │   1883      │ (Bridge+Broker) │     8083      │   (mcp-remote)  │
└─────────────────┘             └─────────────────┘               └─────────────────┘
                                         │
                                    HTTP │ 8084
                                         ▼
                                ┌─────────────────┐
                                │ Projection Mgr  │
                                │  (Web Interface)│
                                └─────────────────┘
```

---

## 1. SABA Core 설치

### Docker 설치

먼저 Docker가 필요합니다. [Docker 공식 사이트](https://www.docker.com/)에서 다운로드하세요.

### Core Server 실행

```bash
git clone https://github.com/kawaiiTaiga/project_SABA.git
cd project_SABA/core_server
docker compose up -d --build
```

### 포트 확인

기본 포트:
- **MQTT 브로커**: `1883` (장치 통신용)
- **MCP Bridge**: `8083` (Claude Desktop 연결용)
- **Projection Manager**: `8084` (웹 관리 인터페이스)

### 정상 작동 확인

```bash
# Core 서버 상태 확인
curl http://localhost:8083/healthz

# 연결된 장치 목록 (초기에는 비어있음)
curl http://localhost:8083/devices

# 웹 인터페이스 열기
# 브라우저에서 http://localhost:8084 접속
```

---

## 2. 장치 프로비저닝

장치를 SABA Core에 연결하려면 **프로비저닝** 과정이 필요합니다.

### 프로비저닝 과정

**1단계: 장치 켜기**

ESP32에 펌웨어를 업로드하고 전원을 켭니다. 처음 부팅 시 자동으로 설정 모드로 진입합니다.

**2단계: Wi-Fi 연결**

장치가 `MCP-SETUP-XXXX` 형태의 Wi-Fi AP를 생성합니다. 이 Wi-Fi에 연결하세요.

**3단계: 웹 브라우저에서 설정**

브라우저에서 `http://192.168.4.1` 접속 후:

- **Wi-Fi SSID**: 집/사무실 Wi-Fi 이름
- **Wi-Fi Password**: Wi-Fi 비밀번호
- **MQTT Broker Host**: SABA Core가 실행 중인 컴퓨터의 IP 주소 (예: `192.168.1.100`)
- **MQTT Broker Port**: `1883` (기본값)

**4단계: 저장 및 재부팅**

설정을 저장하면 장치가 재부팅되고 자동으로 SABA Core에 연결됩니다.

### MQTT Broker Host 찾기

**Windows:**
```bash
ipconfig
# "IPv4 주소" 확인 (예: 192.168.1.100)
```

**macOS/Linux:**
```bash
ifconfig
# 또는
ip addr show
```

---

## 3. Projection Manager에서 장치 확인

### 웹 인터페이스 접속

브라우저에서 http://localhost:8084 를 엽니다.

**"Project Saba MCP Manager"** 페이지가 보입니다.

### 장치 확인

연결된 장치가 목록에 나타나야 합니다:
- 장치 ID (예: `esp32-cam-01`)
- 연결 상태
- 사용 가능한 도구 목록

**장치가 안 보이나요?**

```bash
# 브로커 로그 확인
docker logs -f mcp-broker

# 브리지 로그 확인
docker logs -f mcp-bridge
```

장치의 MQTT 설정이 올바른지 확인하세요.

---

## 4. 도구 이름 설정하기

### 도구 이름 규칙

MCP는 특정 이름 규칙을 따라야 합니다:

**허용:**
- 영문자 (a-z, A-Z)
- 숫자 (0-9)
- 언더스코어 (_)
- 하이픈 (-)

**불허:**
- 공백
- 특수문자
- 한글/중국어 등 비-ASCII 문자

**예시:**
- ✅ `take_photo`, `camera_shot`, `sensor_read`
- ❌ `take photo`, `사진촬영`, `capture(image)`

### 이름 바꾸기

1. Projection Manager에서 장치 선택
2. 도구 목록에서 이름을 바꿀 도구 찾기
3. "Alias" 필드에 새 이름 입력
4. "Description"도 필요하면 수정
5. 저장

### 설정 적용

**중요:** 설정을 변경한 후에는 반드시 **Bridge를 재시작**해야 합니다.

웹 인터페이스에서 "Restart Bridge" 버튼을 클릭하거나:

```bash
docker restart mcp-bridge
```

---

## 5. 연결 테스트

### 장치 상태 확인

```bash
curl http://localhost:8083/devices
```

JSON 형태로 연결된 장치 목록이 나와야 합니다.

### MCP 엔드포인트 확인

```bash
curl -i http://localhost:8083/sse
```

`200 OK`와 `Content-Type: text/event-stream`이 나오면 정상입니다.

---

## 문제 해결

### 장치가 연결되지 않을 때

**MQTT 브로커 확인:**
```bash
docker logs -f mcp-broker
```

**장치의 MQTT 설정 확인:**
- Broker Host가 정확한가?
- 포트가 1883인가?
- 같은 네트워크에 있는가?

### 도구가 나타나지 않을 때

- Projection Manager에서 도구가 활성화되어 있는지 확인
- 장치를 재시작하여 재연결 시도
- Bridge 로그 확인: `docker logs -f mcp-bridge`

### 설정 변경이 적용되지 않을 때

- "Restart Bridge" 버튼 클릭
- 또는 `docker restart mcp-bridge`
- 설정 파일 확인: `./config/projection_config.json`

---

## 다음 단계

SABA Core와 장치가 연결되었다면, 이제 Claude Desktop과 연결할 차례입니다.

[3. Claude Desktop과 연결하기](/docs/tutorial/3-connect-claude)로 이동하세요.

</TabItem>

</Tabs>