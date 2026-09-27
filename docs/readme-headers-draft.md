# README 설정 블록 초안

`docs/project-readme-format.md` 규칙에 맞춰, 현재 `src/data/projects.json`에 있는 16개 저장소 각각의 README 맨 위에 붙일 설정 블록을 정리했습니다. 값은 `.impeccable/readmes/current-projects/*.md`에 정리된 값을 그대로 옮긴 것이니 자유롭게 고쳐서 쓰세요. 썸네일은 각 저장소의 실제 README에 이미 있는 이미지 경로만 사용했고, 없는 경우에는 줄을 비우고 참고 사항에 안내를 남겼습니다.

---

## 수소 원자 오비탈 시각화 — seolmango/HydrogenOrbitalVisualizer

https://github.com/seolmango/HydrogenOrbitalVisualizer

```markdown
<!-- portfolio
title: 수소 원자 오비탈 시각화
summary: 수소 원자의 파동 함수로 전자 구름의 모양을 계산해 3차원으로 시각화하는 프로그램입니다.
thumbnail: example/2px.webp
thumbnail-alt: 2px 오비탈의 전자 구름을 시각화한 결과
field: both
period: 2024
tags: Python, 양자역학, 시각화
-->
```

숨기면 좋은 부분:
- `## 기타`의 `pyinstaller` exe 빌드 명령어(개발용 빌드 절차라 방문자에게는 크게 중요하지 않습니다).

참고:
- `## 이론적 배경`은 이 프로젝트의 핵심 설명이라 그대로 두는 것을 추천합니다.

---

## 두 은하의 충돌 시뮬레이션 — seolmango/galaxy_simulation

https://github.com/seolmango/galaxy_simulation

```markdown
<!-- portfolio
title: 두 은하의 충돌 시뮬레이션
summary: 두 은하의 충돌을 Python으로 시뮬레이션하고 matplotlib로 영상을 만드는 코드입니다.
thumbnail: example.jpg
thumbnail-alt: 두 은하가 충돌하는 시뮬레이션의 한 장면
field: software
period: 2023
tags: Python, NumPy, matplotlib
link: 시뮬레이션 영상 (YouTube) | https://youtu.be/efWby_ctrzI
-->
```

숨기면 좋은 부분:
- `## How to Use`의 실행 명령어와 변수 설명 블록(설치·실행 절차라 상세 페이지보다는 저장소 쪽에 더 어울립니다).

---

## KHAOS 비행 궤적 추정 (EKF) — seolmango/KHAOS-Tracking-Algorithm

https://github.com/seolmango/KHAOS-Tracking-Algorithm

```markdown
<!-- portfolio
title: KHAOS 비행 궤적 추정 (EKF)
summary: 로켓 비행 중의 IMU·GPS·기압 센서 데이터를 확장 칼만 필터로 종합해 비행 궤적을 추정하는 저장소의 포크입니다.
field: both
period: 2026
tags: Python, EKF, 센서 융합, 로켓
link: 원본 저장소 (snu-hanaro) | https://github.com/snu-hanaro/KHAOS-Tracking-Algorithm
-->
```

숨기면 좋은 부분:
- `## Dependencies`의 패키지 목록(짧고 부수적인 정보라 본문 흐름에서는 덜 중요합니다).

참고:
- 썸네일로 쓸 이미지를 저장소에 추가하면 좋습니다. 현재 README(포크 원본 포함)에는 mermaid 다이어그램만 있고 실제 이미지 파일이 없습니다.
- README 제목이 영어(`Flight Path Tracking Project`)이고 본문도 영어와 한국어가 섞여 있습니다. `title` 값을 한국어로 지정해 두면 사이트에는 한국어 제목이 우선 표시됩니다.

---

## project-surf: 위키백과 서핑 — seolmango/project-surf

https://github.com/seolmango/project-surf

```markdown
<!-- portfolio
title: project-surf: 위키백과 서핑
summary: 위키백과 문서 두 개 사이를 링크만 타고 가는 최단 경로를 찾고, 각 링크가 쓰인 문장을 보여 주는 서비스입니다.
field: software
period: 2026
tags: Go, 그래프 탐색, 위키백과
-->
```

숨기면 좋은 부분:
- `## 빠른 시작 (Docker)`와 `## 로컬 개발 (Docker 없이)`의 설치·실행 명령어.
- `## 설정 (config/config.toml)` 표(세부 환경 변수 설명이라 저장소를 직접 볼 사람에게 더 유용합니다).

참고:
- 썸네일로 쓸 이미지를 저장소에 추가하면 좋습니다. 현재 README에는 이미지가 없습니다.

---

## 모의 담금질로 푸는 그래프 색칠 문제 — seolmango/graphColoringProblemSolveBySA

https://github.com/seolmango/graphColoringProblemSolveBySA

```markdown
<!-- portfolio
title: 모의 담금질로 푸는 그래프 색칠 문제
summary: 최솟값을 찾는 모의 담금질 기법으로 그래프 색칠 문제를 푸는 Python 코드입니다.
field: software
period: 2022
tags: Python, 최적화, 그래프 색칠
-->
```

숨기면 좋은 부분:
- 해당 없음: README 본문에 소제목이 없는 짧은 설명 한 단락뿐이라 감쌀 부분이 마땅치 않습니다.

참고:
- 썸네일로 쓸 이미지를 저장소에 추가하면 좋습니다.
- README에 저장소 설명(About)이나 실행 방법이 없어, 방문자가 코드를 어떻게 돌려 보는지 알기 어렵습니다. 간단한 실행 안내를 추가하면 좋습니다.

---

## 로켓 동아리 I.F 추력 측정 코드 — seolmango/IF-rocket-project-code

https://github.com/seolmango/IF-rocket-project-code

```markdown
<!-- portfolio
title: 로켓 동아리 I.F 추력 측정 코드
summary: 광주과학고등학교 로켓 동아리 I.F의 프로젝트에 쓰는 코드를 모은 저장소입니다.
thumbnail: example/Dummy Data Test/result.png
thumbnail-alt: 추력 테스트 데이터를 분석한 힘-시간·속도-시간·위치-시간 그래프
field: both
period: 2024
tags: Arduino, Python, 로드셀
-->
```

숨기면 좋은 부분:
- 맨 위의 `셋업`(`pip install ...`) 안내.
- `data.py` 설명 아래의 원시 CSV 데이터 예시 표(값 나열이라 길고 상세 페이지에서는 덜 필요합니다).

참고:
- `thumbnail` 경로에 공백이 포함된 폴더명(`Dummy Data Test`)이 그대로 들어 있습니다. 파서가 공백 있는 경로를 잘 처리하지 못한다면 폴더 이름을 공백 없이 바꾸는 것도 고려해 보세요.

---

## 제한된 3입자계 시뮬레이션 — seolmango/threeParticle

https://github.com/seolmango/threeParticle

```markdown
<!-- portfolio
title: 제한된 3입자계 시뮬레이션
summary: 무거운 두 입자와 가벼운 한 입자로 이루어진 제한된 3입자계 문제를 시뮬레이션하는 코드입니다.
thumbnail: poten.png
thumbnail-alt: 라그랑주점 주변 퍼텐셜을 등고선으로 나타낸 그림
field: software
period: 2024
tags: Python, 수치 해석
-->
```

숨기면 좋은 부분:
- 특별히 숨길 부분 없음: 설치 안내 없이 이론 설명과 결과 이미지 위주라 대부분 상세 페이지에 그대로 보여 줄 만합니다.

참고:
- README에 이미지가 여러 장(`poten.png`, `poten3d.png`, `tro.png`, `img.png`) 있습니다. 대표 이미지로 다른 것을 쓰고 싶다면 `thumbnail` 값만 바꾸면 됩니다.

---

## 피보나치 수열과 벤포드 법칙 — seolmango/FibonacciBenfordLawCheck

https://github.com/seolmango/FibonacciBenfordLawCheck

```markdown
<!-- portfolio
title: 피보나치 수열과 벤포드 법칙
summary: 피보나치 수열의 첫 자릿수 분포가 진법별 벤포드 법칙을 따르는지 확인하는 프로그램입니다.
thumbnail: results/result(Base10_10000).png
thumbnail-alt: 10진법에서 피보나치 수열 10000개의 첫 자릿수 분포 그래프
field: software
period: 2023
tags: Python, 수학, 벤포드 법칙
-->
```

숨기면 좋은 부분:
- 특별히 숨길 부분 없음: 전체가 결과 설명이라 대부분 그대로 보여 줄 만합니다.

참고:
- README의 모든 이미지가 옛 사용자명 경로(`github.com/Seol7523/FibonacciBenfordLawCheck/blob/main/...`)로 절대 링크되어 있습니다. 저장소가 `seolmango` 소유로 옮겨졌다면(또는 그대로라면) 이미지들을 `results/...`처럼 저장소 상대 경로로 바꿔 두는 것을 추천합니다. 지금 상태로는 GitHub에서도 깨진 이미지로 보일 수 있습니다.

---

## IsThatYou — seolmango/IsThatYou

https://github.com/seolmango/IsThatYou

```markdown
<!-- portfolio
title: IsThatYou
summary: 카카오톡 대화 내보내기 파일로 모델을 학습해, 문장만 보고 누가 한 말인지 구분하는 프로젝트입니다.
thumbnail: fordocs/1.png
thumbnail-alt: IsThatYou 학습 과정 화면
field: software
period: 2025
tags: Python, TensorFlow, 자연어 처리
-->
```

숨기면 좋은 부분:
- 맨 위의 `python 3.9`, 필요 모듈(konlpy, tensorflow 등) 안내 블록.
- `## 사용법`의 실행 명령어(`python Train.py ...`, `python run.py ...`).

---

## isNELL — seolmango/isNell

https://github.com/seolmango/isNell

```markdown
<!-- portfolio
title: isNELL
summary: 가사가 록 밴드 NELL의 가사와 비슷한지 판별하는 모델을 학습하고 평가하는 프로젝트입니다.
field: software
period: 2024
tags: Python, 자연어 처리, Jupyter
-->
```

숨기면 좋은 부분:
- 해당 없음: 소제목 없이 짧은 설명뿐이라 감쌀 부분이 마땅치 않습니다.

참고:
- 썸네일로 쓸 이미지를 저장소에 추가하면 좋습니다.
- README 마지막 문장이 "아래와 같은 구조의 파일을 사용했습니다."로 끝나고, 정작 그 구조 설명이 이어지지 않습니다. 내용이 이어지도록 보완하면 좋습니다.

---

## 한국어 욕설 탐지 모듈 (0-inf) — 0-inf/KoreanBadwordDetection

https://github.com/0-inf/KoreanBadwordDetection

```markdown
<!-- portfolio
title: 한국어 욕설 탐지 모듈 (0-inf)
summary: 딥러닝 없이 동작하는 Python 한국어 욕설 필터링 모듈입니다. 0-inf 팀 저장소입니다.
thumbnail: example/1.gif
thumbnail-alt: 한국어 욕설 탐지 모듈로 만든 디스코드 봇 예시 화면
field: software
period: 2023
tags: Python, 0-inf
link: 후속 버전 badwordDetection2 | https://github.com/0-inf/badwordDetection2
-->
```

숨기면 좋은 부분:
- `## 사용방법`의 모듈 적용 코드 예시와 실행 결과 출력(길고 구체적인 사용 예시라 상세 페이지보다는 저장소 쪽에 더 어울립니다).

참고:
- README의 모든 링크·이미지가 `github.com/seolmango/KoreanBadwordDetection/...` 절대 경로로 되어 있는데, 실제 저장소는 `0-inf/KoreanBadwordDetection`입니다. 소유자가 다른 저장소를 가리키고 있어 링크가 깨졌을 수 있으니 확인이 필요합니다. 위 `thumbnail` 값은 두 저장소에 같은 파일(`example/1.gif`)이 있다고 가정한 상대 경로입니다.
- README에 개발자 개인 이메일(`seolchaehwan@naver.com`)이 그대로 노출되어 있습니다. 공개해도 괜찮은지 확인해 보세요.

---

## switch: 술래잡기 io 게임 (0-inf) — 0-inf/switchio

https://github.com/0-inf/switchio

```markdown
<!-- portfolio
title: switch: 술래잡기 io 게임 (0-inf)
summary: 술래잡기 규칙에 스킬을 더한 최대 8인 io 게임입니다. 0-inf 팀 저장소와 개인 리메이크 저장소가 있습니다.
field: software
period: 2026
tags: JavaScript, TypeScript, 게임
link: 리메이크 저장소 swITchRemake | https://github.com/seolmango/swITchRemake
-->
```

숨기면 좋은 부분:
- 맨 아래의 제작진 소개·음악 크레딧 부분(감사 인사 성격이라 게임 소개보다 뒤로 가려도 괜찮습니다).

참고:
- 썸네일로 쓸 이미지를 저장소에 추가하면 좋습니다.
- README 하단에 `<a>`/`<div>` 태그와 인라인 `style` 속성이 그대로 쓰여 있습니다. 사이트는 안전을 위해 스크립트·스타일 등을 제거하므로, 이 부분은 표시가 의도와 다르게 보일 수 있습니다.

---

## LivePrompt — seolmango/LivePrompt

https://github.com/seolmango/LivePrompt

```markdown
<!-- portfolio
title: LivePrompt
summary: 곡과 사용자, 셋 리스트를 정하면 각자 볼 가사·악보 화면이 실시간으로 동기화되는 온라인 프롬프터입니다.
field: software
period: 2025
tags: Flask, 실시간 동기화
-->
```

숨기면 좋은 부분:
- `## 사용법`의 설치·DB 초기화·실행 명령어.

참고:
- 썸네일로 쓸 이미지를 저장소에 추가하면 좋습니다.
- `## TMI` 섹션은 개인적인 이야기라 숨겨도 되지만, 방문자에게 재미를 주는 부분이라 그대로 두는 것도 괜찮아 보입니다.

---

## GSA-Lang — seolmango/gsa-lang

https://github.com/seolmango/gsa-lang

```markdown
<!-- portfolio
title: GSA-Lang
summary: 광주과학고등학교 학생들에게 익숙한 문장으로 코드를 쓰는 장난스러운 프로그래밍 언어입니다.
field: software
period: 2024
tags: Python, 인터프리터
-->
```

숨기면 좋은 부분:
- `## 버전 정보`의 버전별 변경 이력(개발 로그 성격이라 소개 페이지보다는 저장소 쪽에 더 어울립니다).
- `## 기여하기`의 PR·이슈 안내.

참고:
- 썸네일로 쓸 이미지를 저장소에 추가하면 좋습니다.

---

## HardModeLife: 물리 볼륨 조절기 — seolmango/hardmodelife

https://github.com/seolmango/hardmodelife

```markdown
<!-- portfolio
title: HardModeLife: 물리 볼륨 조절기
summary: 볼륨을 조절하려면 물리 값을 설정하고 시뮬레이션해야 하는, 일부러 복잡하게 만든 장난감입니다.
thumbnail: physicsVolume/example.png
thumbnail-alt: physicsVolume 화면
field: software
period: 2022
tags: HTML, JavaScript, 물리 시뮬레이션
link: 라이브 데모 | https://seolmango.github.io/hardmodelife/physicsVolume/
-->
```

숨기면 좋은 부분:
- 해당 없음: 짧은 소개와 목록, 아이디어 제보 안내뿐이라 감쌀 부분이 마땅치 않습니다.

참고:
- README 하단에 개인 이메일과 인스타그램 DM 안내가 있습니다. 공개해도 괜찮은지 확인해 보세요.

---

## 정상은 아닌 크롬 확장 기능들 — seolmango/UnusualChromeExtension

https://github.com/seolmango/UnusualChromeExtension

```markdown
<!-- portfolio
title: 정상은 아닌 크롬 확장 기능들
summary: 재미로 만든 테스트용 크롬 확장 기능 모음입니다.
thumbnail: assets/offnamu.png
thumbnail-alt: 나무위키에 접속하면 모든 글자가 바뀌는 확장 기능 실행 화면
field: software
period: 2022
tags: JavaScript, Chrome Extension
-->
```

숨기면 좋은 부분:
- `## 사용방법`의 설치 순서 안내와 스크린샷 6장(`howto1`~`howto6`). 저장소를 내려받아 직접 설치하려는 사람에게는 유용하지만 소개 페이지에는 길어서, 감싸 두면 개별 확장 기능 소개가 먼저 보입니다.

참고:
- README 하단에 개인 이메일과 인스타그램 링크가 있습니다. 공개해도 괜찮은지 확인해 보세요.
