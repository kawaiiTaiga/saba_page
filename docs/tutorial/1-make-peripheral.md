---
id: 1-make-peripheral
title: 1. Make your own LLM peripheral
hide_table_of_contents: true

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="en" label="English" default>

## What You'll Need

**Hardware**
- ESP32 board (ESP32-C3 Mini, ESP32-CAM, or any Wi-Fi capable model)

**Software**
- [PlatformIO](https://platformio.org/) installed

**Other**
- USB cable
- Text editor (VSCode recommended)

---

## Project Setup

### 1. Download the SDK

```bash
git clone https://github.com/kawaiiTaiga/project_SABA.git
cd project_SABA
```

### 2. Create PlatformIO Project

1. Create a new project in PlatformIO
2. Delete the `src/main.cpp` file
3. Copy contents from SDK's `device_sdk/` folder to your project

### 3. Add Library Dependencies

Add to your `platformio.ini` file:

```ini
lib_deps =
    bblanchon/ArduinoJson@^7.0.4
    knolleary/PubSubClient@^2.8
```

---

## Building Your First Tool

The core of SABA is **semantic function design**. Define what your device does, not how it controls hardware.

### Traditional vs SABA Approach

**Traditional Approach:**
```cpp
motor.rotate(50, CLOCKWISE, 100);  // How many degrees for a door?
led.setRGB(255, 200, 150);         // Which LED is this?
```

**SABA Approach:**
```cpp
openLivingRoomDoor();              // Clear location and intent
setCinematicLighting();            // Specific use case
```

---

## Exercise: Creating a Lighting Control Tool

You only need to modify three files.

### 1. Implement Tool Logic (`modules/my_lighting.cpp`)

```cpp
#include "my_lighting.h"

JsonDocument MyLighting::getSchema() {
    JsonDocument schema;
    schema["type"] = "object";
    schema["properties"]["intensity"]["type"] = "string";
    schema["properties"]["intensity"]["enum"] = JsonArray({"gentle", "normal", "bright"});
    return schema;
}

JsonDocument MyLighting::execute(const JsonDocument& args) {
    String intensity = args["intensity"] | "normal";
    
    // Hardware control logic
    if (intensity == "gentle") {
        analogWrite(LED_PIN, 64);
    } else if (intensity == "bright") {
        analogWrite(LED_PIN, 255);
    } else {
        analogWrite(LED_PIN, 128);
    }
    
    JsonDocument result;
    result["text"] = "Lighting adjusted to " + intensity + " intensity";
    return result;
}
```

### 2. Declare Interface (`modules/my_lighting.h`)

```cpp
#pragma once
#include "ITool.h"

class MyLighting : public ITool {
public:
    JsonDocument getSchema() override;
    JsonDocument execute(const JsonDocument& args) override;
};
```

### 3. Register Tool (`modules/tool_register.cpp`)

```cpp
#include "tool_register.h"
#include "my_lighting.h"

void register_tools(ToolRegistry& reg, const ToolConfig& cfg) {
    reg.addTool("adjust_room_lighting", std::make_unique<MyLighting>());
    // Add other tools here...
}
```

**Important:** The `register_tools` function must be defined exactly once per project.

---

## Semantic Function Naming Guide

Good function names should be immediately understandable by LLMs.

### Principles

**Include Location**
- ✅ `openLivingRoomDoor`
- ❌ `openDoor`

**Specify Use Case**
- ✅ `setCinematicLighting`
- ❌ `setWarmLight`

**Reflect User Intent**
- ✅ `checkRoomComfort`
- ❌ `readTemperature`

**Embed Purpose**
- ✅ `prepareMovieNight`
- ❌ `dimLights`

### Examples

When a user says "open the living room door," the LLM should immediately recognize `openLivingRoomDoor()`.

When they say "prepare for movie night," it should find `prepareMovieNight()`.

Function names are the bridge between natural language and device capabilities.

---

## Result Format

Always return meaningful feedback:

```cpp
JsonDocument result;
result["text"] = "Living room door opened successfully";
result["assets"] = JsonArray();  // For images, files, etc.
return result;
```

---

## Build and Upload

### 1. Build

Build your project in PlatformIO:

```bash
pio run
```

### 2. Upload

Upload to ESP32:

```bash
pio run --target upload
```

### 3. Check Serial Monitor

```bash
pio device monitor
```

---

## Next Steps

Once your device is successfully built and uploaded, it's time to connect it to SABA Core.


</TabItem>
<TabItem value="ko" label="한국어">

## 준비물

**하드웨어**
- ESP32 보드 (ESP32-C3 Mini, ESP32-CAM 등 Wi-Fi 지원 모델)

**소프트웨어**
- [PlatformIO](https://platformio.org/) 설치

**기타**
- USB 케이블
- 텍스트 에디터 (VSCode 권장)

---

## 프로젝트 설정

### 1. SDK 다운로드

```bash
git clone https://github.com/kawaiiTaiga/project_SABA.git
cd project_SABA
```

### 2. PlatformIO 프로젝트 생성

1. PlatformIO에서 새 프로젝트 생성
2. `src/main.cpp` 파일 삭제
3. SDK의 `device_sdk/` 폴더 내용을 프로젝트에 복사

### 3. 라이브러리 의존성 추가

`platformio.ini` 파일에 다음 추가:

```ini
lib_deps =
    bblanchon/ArduinoJson@^7.0.4
    knolleary/PubSubClient@^2.8
```

---

## 첫 번째 도구 만들기

SABA의 핵심은 **의미론적 함수 설계**입니다. 하드웨어를 제어하는 방식이 아니라, 무엇을 하는지로 정의합니다.

### 전통적인 방식 vs SABA 방식

**전통적인 방식:**
```cpp
motor.rotate(50, CLOCKWISE, 100);  // 문을 여는데 몇 도?
led.setRGB(255, 200, 150);         // 이게 어떤 LED?
```

**SABA 방식:**
```cpp
openLivingRoomDoor();              // 명확한 위치와 의도
setCinematicLighting();            // 구체적인 사용 사례
```


## ITool 인터페이스 이해하기

모든 SABA 도구는 `ITool` 인터페이스를 구현합니다. 4개의 필수 함수만 작성하면 됩니다.


### 1. `init()` - 하드웨어 초기화

```cpp
bool init() override {
    // 센서, 모터, LED 등 하드웨어 초기화
    // 성공하면 true, 실패하면 false 반환
    return true;
}
```

**역할:**
- GPIO 핀 설정
- I2C, SPI 등 통신 프로토콜 시작
- 센서나 액추에이터 초기 설정

**예시:**
```cpp
bool init() override {
    Wire.begin(SDA_PIN, SCL_PIN);
    pinMode(LED_PIN, OUTPUT);
    return sensor.begin();
}
```


### 2. `name()` - 도구 이름 정의

```cpp
const char* name() const override {
    return "my_tool_name";
}
```

**역할:**
- 이 도구를 식별하는 고유한 이름
- LLM이 이 이름을 보고 도구를 호출함

**중요:**
- 의미 있는 이름 사용 (예: `"open_living_room_door"`)
- 스네이크 케이스 권장
- 위치, 용도, 의도가 명확하게


### 3. `describe()` - LLM에게 설명하기

```cpp
void describe(JsonObject& tool) override {
    tool["name"] = name();
    tool["description"] = "이 도구가 무엇을 하는지 설명";
    
    auto params = tool.createNestedObject("parameters");
    params["type"] = "object";
    auto props = params.createNestedObject("properties");
    
    // 파라미터 정의
    props["color"]["type"] = "string";
    props["brightness"]["type"] = "string";
}
```

**역할:**
- LLM에게 이 도구가 무엇을 하는지 알려줌
- 필요한 파라미터 정의 (JSON Schema 형식)

**예시:**
```cpp
void describe(JsonObject& tool) override {
    tool["name"] = name();
    tool["description"] = "거실 LED를 원하는 색으로 켭니다";
    
    auto params = tool.createNestedObject("parameters");
    params["type"] = "object";
    auto props = params.createNestedObject("properties");
    props["r"]["type"] = "string";
    props["g"]["type"] = "string";
    props["b"]["type"] = "string";
}
```

### 4. `invoke()` - 실제 실행 로직

```cpp
bool invoke(JsonObjectConst args, ObservationBuilder& out) override {
    // 1. 파라미터 받기
    const char* param = args["param_name"] | "default_value";
    
    // 2. 하드웨어 제어 로직
    // 여기에 모터 제어, 센서 읽기 등 작성
    
    // 3. 결과 반환
    out.success("작업 완료!");
    return true;
}
```

**역할:**
- LLM이 도구를 호출했을 때 실제로 실행되는 코드
- 파라미터를 받아서 하드웨어를 제어
- 결과를 LLM에게 반환

**예시:**
```cpp
bool invoke(JsonObjectConst args, ObservationBuilder& out) override {
    // 파라미터 받기
    int r = atoi(args["r"] | "0");
    int g = atoi(args["g"] | "0");
    int b = atoi(args["b"] | "0");
    
    // LED 제어
    setRGB(LED_PIN, r, g, b);
    
    // 결과 반환
    out.success("LED 색상이 변경되었습니다");
    return true;
}
```
---

## 전체 구조 예시

```cpp
#pragma once
#include "tool.h"

class MyLedTool : public ITool {
public:
  // 1. 초기화
  bool init() override {
    pinMode(LED_PIN, OUTPUT);
    return true;
  }
  
  // 2. 이름
  const char* name() const override {
    return "control_living_room_led";
  }
  
  // 3. 설명
  void describe(JsonObject& tool) override {
    tool["name"] = name();
    tool["description"] = "거실 LED 색상 제어";
    auto params = tool.createNestedObject("parameters");
    params["type"] = "object";
    auto props = params.createNestedObject("properties");
    props["color"]["type"] = "string";
  }
  
  // 4. 실행
  bool invoke(JsonObjectConst args, ObservationBuilder& out) override {
    const char* color = args["color"] | "white";
    
    // 하드웨어 제어 로직
    if (strcmp(color, "red") == 0) {
      digitalWrite(LED_PIN, HIGH);
    } else {
      digitalWrite(LED_PIN, LOW);
    }
    
    out.success("LED 제어 완료");
    return true;
  }
};
```

---

## 도구 등록하기

작성한 도구를 시스템에 등록해야 사용할 수 있습니다.

`modules/tool_register.cpp`:

```cpp
#include "tool_register.h"
#include "my_led_tool.h"

void register_tools(ToolRegistry& reg) {
    reg.add(new MyLedTool());
    // 다른 도구들도 여기 추가
}
```
---

## SDK 예제 참고하기

`modules/` 폴더에 실제 하드웨어를 제어하는 다양한 예제가 있습니다:

- LED 제어 예제
- 센서 읽기 예제
- 카메라 제어 예제

여러분의 하드웨어에 맞게 수정해서 사용하세요!

---

## 의미론적 함수 네이밍 가이드

좋은 함수 이름은 LLM이 즉시 이해할 수 있어야 합니다.

### 원칙

**위치 포함**
- ✅ `openLivingRoomDoor`
- ❌ `openDoor`

**사용 사례 명시**
- ✅ `setCinematicLighting`
- ❌ `setWarmLight`

**사용자 의도 반영**
- ✅ `checkRoomComfort`
- ❌ `readTemperature`

**목적 내포**
- ✅ `prepareMovieNight`
- ❌ `dimLights`

### 예시

사용자가 "거실 문 열어줘"라고 말하면, LLM은 즉시 `openLivingRoomDoor()`를 인식해야 합니다.

"영화 볼 준비해줘"라고 하면 `prepareMovieNight()`를 찾아야 합니다.

함수 이름은 자연어와 장치 기능 사이의 다리입니다.

---

## 결과 반환 형식

항상 의미 있는 피드백을 반환하세요:

```cpp
JsonDocument result;
result["text"] = "거실 문이 성공적으로 열렸습니다";
result["assets"] = JsonArray();  // 이미지, 파일 등
return result;
```

---

## 빌드 및 업로드

### 1. 빌드

PlatformIO에서 프로젝트 빌드:

```bash
pio run
```

### 2. 업로드

ESP32에 업로드:

```bash
pio run --target upload
```

### 3. 시리얼 모니터 확인

```bash
pio device monitor
```

---

## 다음 단계

장치가 성공적으로 빌드되고 업로드되었다면, 이제 SABA Core에 연결할 차례입니다.

</TabItem>
</Tabs>