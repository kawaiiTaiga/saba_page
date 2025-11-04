---
title: Nothing here yet...
image: /img/avatar.png
---

<div style={{textAlign: 'center'}}>
  <img 
    src="/img/stuffs/your-project-image.png" 
    alt="프로젝트 1 이미지" 
    width="600" 
  />
</div>

### 📋 프로젝트 개요

{/* 요청하신 표입니다. 
  '이름'이 중복되어 마지막 항목은 'GitHub'로 변경하고, '사용한 LLM'을 추가해 봤습니다.
  이렇게 2열로 구성하는 것이 모바일에서도 깔끔하게 보입니다.
*/}
| 항목 | 내용 |
| :--- | :--- |
| **이름** | (프로젝트 이름) |
| **사용한 부품** | (예: Raspberry Pi 4, ESP32, 마이크, LED) |
| **사용한 LLM** | (예: OpenAI API, 로컬 Llama 3) |
| **만든 날짜** | (예: 2025-11-01) |
| **GitHub** | [Link](https://github.com/your-repo) (없으면 비워두기) |


### 1. What is this? (프로젝트 소개)

(여기에 프로젝트에 대한 자세한 설명을 작성하세요. 왜 만들었는지, 어떤 기능이 있는지 등)

* **주요 기능 1:** (음성 명령으로 조명 제어)
* **주요 기능 2:** (LLM이 날씨에 따라 조명 색상 추천)
* **주요 기능 3:** (기타 등등)


### 2. 코드 (Code)

프로젝트의 핵심 코드나 구조도입니다.

:::tip Docusaurus 팁
Docusaurus의 **Tabs 컴포넌트**를 사용하면 여러 언어의 코드를 깔끔하게 보여줄 수 있습니다.
(파일 상단에 `import Tabs from '@theme/Tabs';` `import TabItem from '@theme/TabItem';` 추가 필요)
:::

<Tabs>
  <TabItem value="python" label="Python (LLM 로직)" default>
  ```python
  # 여기에 Python 코드 예시
  def get_llm_response(prompt):
    # ...
    return "This is a response."
````

\</TabItem\>
\<TabItem value="cpp" label="Arduino/ESP32 (IoT 제어)"\>

```cpp
// 여기에 C++/Arduino 코드 예시
void setup() {
  Serial.begin(115200);
}

void loop() {
// ...
}

```

</TabItem>
</Tabs>

> 전체 코드는 [여기 GitHub 리포지토리](https://github.com/your-repo)에서 확인하실 수 있습니다.

### 3\. 잡담 (Thoughts & Challenges)

(여기에 프로젝트를 만들면서 겪었던 어려움, 배운 점, 향후 계획 등을 자유롭게 작성하세요.)

:::info 어려웠던 점
(예: ESP32에서 LLM API의 긴 응답을 스트리밍으로 파싱하는 것이 생각보다 까다로웠습니다.)
:::

:::caution 배운 점
(예: API 키는 반드시 환경 변수로 관리해야 한다는 것을 다시 한번 깨달았습니다.)
:::

