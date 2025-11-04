---
title: Noon - mk.1
image: /img/stuffs/cam_mk1.png
hide_table_of_contents: true
---
<a href="https://github.com/your-repo">
  <img src="/img/github.svg" width="32" alt="GitHub" />
</a>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🚀 My Projects

---


<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img 
    src="/img/stuffs/cam_mk1.png" 
    alt="Project Image" 
    width="700" 
  />
</div>

<Tabs groupId="language">
<TabItem value="en" label="English">

### 📋 Overview

| Item         | Details                              |
| :----------- | :----------------------------------- |
| **Name**     | Noon Mark One                        |
| **Material** | ESP32cam devboard (just this itself) |
| **Date**     | 2025-09-14                           |

### What is it?

* Allows the LLM to actively take photos.
* Can shoot in low/medium/high quality.
* Flash can be turned on or off.

### Random Thoughts

* My first creation (though I didn’t physically build)
* If you use the same device, there’s no need to change anything at all.
* The image isn’t received as input but rather fetched by a tool on the output side... I was worried if that would even be possible. Turns out it worked fine with Claude. However, I haven’t tested it thoroughly yet, and somehow it feels a bit “dumber”...
* Especially, when the image wasn’t visible, it sometimes pretended to see it depending on the context — but this issue was resolved as Claude evolved to version 2.5.
* Cache handling was annoying.

</TabItem>
<TabItem value="ko" label="한국어">

### 📋 개요

| 항목 | 내용 |
|:-----|:-----|
| **이름** | 눈 마크원 |
| **재료** | ESP32cam devboard(그냥 이거 그 자체) |
| **날짜** | 2025-09-14 |

### 무엇?

- LLM이 능동적으로 사진을 찍게 해줍니다.  
- 저퀄/중퀄/고퀄으로 찍을 수 있습니다
- 플래시도 키고 끌 수 있습니다. 

### 잡담

- 처음 만든거(사실 물리적으로 멀 만들지는 않음...)
- 동일한 장치를 쓴다면 뭘 바꿀 필요가 전혀 없습니다.
- 이게 이미지를 입력 부분에서 받는게 아니라 출력 부분에서 tool에서 받아오는건데... 과연 가능할까 라는 걱정이 들었음. 결과적으로 일단 클로드에서는 잘 작동. 하지만 정말 정밀하게는 아직 테스트해보지 않았는데, 뭔가 기분 상 좀더 멍청한 것 같은 느낌도 들기도 함... 
- 특히, 이미지가 안보이는데 분위기 타서 보이는 척 구라를 치기도 했으나... 클로드에서는 2.5로 진화하면서 이러한 문제가 해결됨.
- 캐시 처리가 귀찮았음

</TabItem>
</Tabs>

