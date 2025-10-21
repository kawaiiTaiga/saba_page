---
id: intro
title: Introduction
slug: /
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="en" label="English" default>

## What are LLM Peripherals?

LLM peripherals are actively controllable, physically manipulable hardware devices.

People use peripherals like keyboards to control LLMs. Similarly, LLMs use their own peripherals to interact with the physical world.

The result is not a physical agent as a workflow, but a system where the LLM can decide when and what physical actions to take within a single reasoning process. Context prompting is fundamentally key.

What we're building is not a Swiss Army knife, but situation-specific tools that perform very particular functions.

---

## The Problem to be resolved first

There are situations that require intelligence for judgment, but the resulting physical actions are simple.

For example:
- Looking at a plant and deciding whether to water it
- Considering weather and time to decide whether to open curtains
- Responding to strangers when no one is home

These situations require complex judgment, but the actual actions are simple operations like "water the plant", "open curtains", or "send notification".

---

## Project SABA's Vision

Our goal is the **gradual intellectualization of life and space**.

When there's something inconvenient or that you want to make smarter, anyone should be able to easily intellectualize it.

To achieve this, the solution must be:

1. **Affordable**
2. **Easy to install**
3. **Easy to use**

Project SABA is a project to achieve these goals.

---

## Technical Features

**Plug & Play**

Configure Wi-Fi once, and your device is ready.

**No Schemas Required**

No complex configuration files or API schemas needed. Just describe what your device does in natural language.

**Intent-Based Design**

Instead of "rotate motor 50°," you define "open_living_room_curtain."

**LLM-Native**

Works seamlessly with Claude, GPT, and other LLMs via the Model Context Protocol (MCP).

---

## How It Works

#### 1. Hardware as Tools

Your devices become tools that LLMs can autonomously use during conversations—just like they use code interpreters or search engines.

#### 2. Simple Setup

Connect your device, configure Wi-Fi/MQTT once, and it's ready. The LLM can immediately understand and control it through SABA's core server.

#### 3. Semantic Function Design

A motor can do thousands of things. What matters is the intent:

- `water_plant` (not "activate pump for 3 seconds")
- `open_curtain` (not "rotate motor 90 degrees")
- `press_coffee_button` (not "extend actuator 2cm")

LLMs understand the purpose of a tool from its name. The name is more important than anything else.

#### 4. Works with Any Hardware

From simple motors and sensors to cameras and complex actuators. ESP32-based for affordability, with plans to support more platforms.

</TabItem>
<TabItem value="ko" label="한국어">

## LLM 주변기기란?

LLM 주변기기는 능동적으로 사용가능한, 물리적으로 제어가능한 하드웨어들을 의미합니다.

사람들은 LLM을 조종하기 위해 키보드라는 주변기기를 사용합니다. 마찬가지로 LLM은 물리적 세상을 사용하기 위해 LLM을 위한 주변기기를 사용합니다.

결과적으로, workflow로서의 물리적 에이전트가 아니라, LLM이 언제 어떠한 물리적 행위를 할 것인지 하나의 reasoning 과정에서 해결할 수 있도록 합니다. 기본적으로 context prompting이 핵심입니다.

만능 스위스칼이 아니라, 각각의 상황에 맞춘, 아주 특징적인 기능을 수행하는 도구를 지향합니다.

---

## 우선적으로 해결하고자 하는 문제

판단에는 지능을 요구하지만, 그로 인한 물리적 동작은 단순한 것들이 있습니다.

예를 들어:
- 식물의 상태를 보고 물을 줄지 말지 판단하기
- 날씨와 시간을 고려해 커튼을 열지 말지 결정하기
- 집에 사람이 없을 때 낯선 방문자 대응하기

이런 상황들은 복잡한 판단이 필요하지만, 실제 행동은 "물 주기", "커튼 열기", "알림 보내기" 같은 단순한 동작입니다.

---

## 프로젝트 SABA의 목표

하고자 하는 것은 **점진적인 삶과 공간의 지능화**입니다.

불편하거나 지능화하고 싶은 부분이 있으면, 누구나 쉽게 그것을 지능화할 수 있도록 하는 것입니다.

그러기 위해서는:

1. **싸고**
2. **설치하기 쉽고**
3. **사용하기도 쉬워야** 합니다

프로젝트 SABA는 이러한 목표를 이루기 위한 프로젝트입니다.

---

## 기술적 특징

**Plug & Play**

Wi-Fi를 한 번 설정하면 바로 사용 가능합니다.

**스키마 불필요**

복잡한 설정 파일이나 API 스키마가 필요 없습니다. 자연어로 장치가 무엇을 하는지 설명하면 됩니다.

**의도 기반 설계**

"모터를 50도 회전"이 아니라 "거실 커튼 열기" 같은 의도로 동작을 정의합니다.

**LLM 네이티브**

Model Context Protocol(MCP)을 통해 Claude, GPT 등 다양한 LLM과 자연스럽게 연동됩니다.

---

## 작동 방식

#### 1. 도구로서의 하드웨어

여러분의 장치들은 LLM이 대화 중 자율적으로 사용할 수 있는 도구가 됩니다. 마치 코드 인터프리터나 검색 엔진을 사용하는 것처럼 말이죠.

#### 2. 간단한 설정

장치를 연결하고 Wi-Fi/MQTT를 한 번 설정하면 끝입니다. LLM은 SABA의 코어 서버를 통해 즉시 장치를 이해하고 제어할 수 있습니다.

#### 3. 의미론적 함수 설계

모터는 수천 가지 일을 할 수 있습니다. 중요한 것은 의도입니다:

- `water_plant` ("펌프 3초 작동"이 아니라)
- `open_curtain` ("모터 90도 회전"이 아니라)
- `press_coffee_button` ("액추에이터 2cm 확장"이 아니라)

LLM은 Tool의 이름에서 목적을 이해합니다. 이름이 무엇보다 중요합니다.  

#### 4. 모든 하드웨어 지원

단순한 모터와 센서부터 카메라와 복잡한 액추에이터까지. 저렴한 ESP32 기반이며, 향후 더 많은 플랫폼을 지원할 예정입니다.

</TabItem>

</Tabs>