# 프로젝트 README 작성 규칙

사이트의 프로젝트 목록과 상세 페이지는 각 GitHub 저장소의 `README.md`에서 자동으로 만들어집니다. README 맨 위에 아래 **설정 블록**을 넣으면 사이트가 그 값을 사용합니다. 설정 블록은 HTML 주석이라 GitHub 화면에는 보이지 않습니다.

## 1. 설정 블록 (README 맨 위)

```markdown
<!-- portfolio
title: 수소 원자 오비탈 시각화
summary: 수소 원자의 파동 함수로 전자 구름의 모양을 3차원으로 그립니다.
thumbnail: example/2px.webp
thumbnail-alt: 2px 오비탈의 전자 구름
field: both
period: 2024
tags: Python, 양자역학, 시각화
link: 시연 영상 | https://youtu.be/xxxx
link: 발표 자료 | https://example.com/slides.pdf
-->

# Hydrogen Orbital Visualizer

(여기부터는 평소 README처럼 씁니다)
```

| 키 | 뜻 | 없으면 |
| --- | --- | --- |
| `title` | 사이트에 표시할 제목 | README의 첫 `#` 제목, 그것도 없으면 저장소 이름 |
| `summary` | 목록과 썸네일 아래에 보이는 한 줄 설명 | GitHub 저장소 설명(About) |
| `thumbnail` | 썸네일 이미지. 저장소 안의 상대 경로 또는 https 주소 | README 본문의 첫 이미지, 그것도 없으면 제목으로 만든 글자 썸네일 |
| `thumbnail-alt` | 썸네일 설명(화면 낭독기용) | 제목 |
| `field` | `materials`(재료과학) · `software`(소프트웨어) · `both`(재료 + 코드) | `software` |
| `period` | 기간. 예: `2024`, `2023–2024` | 저장소를 만든 해 |
| `tags` | 쉼표로 구분한 태그 | GitHub 주 언어 |
| `link` | `이름 \| 주소` 형식. 여러 줄 가능 | GitHub 저장소의 Website 주소가 있으면 "웹사이트"로 추가 |

- 키는 소문자, `키: 값` 한 줄에 하나씩 씁니다. 모르는 키는 무시됩니다.
- 사이트 쪽 `src/data/projects.json`에 같은 값을 적어 두면, README에 그 키가 없을 때 그 값을 씁니다. README 설정이 항상 우선입니다.

## 2. 본문

- 설정 블록 아래의 README 내용이 그대로 상세 페이지 본문이 됩니다. 첫 번째 `#` 제목은 사이트가 따로 보여 주므로 본문에서는 빠집니다.
- 이미지와 링크의 상대 경로(`./docs/a.png`, `docs/guide.md`)는 자동으로 GitHub 주소로 바뀝니다.
- 사이트에서 숨기고 싶은 부분(설치 방법 등)은 아래처럼 감쌉니다. GitHub에서는 그대로 보입니다.

```markdown
<!-- portfolio:hide -->
## 설치

pip install ...
<!-- portfolio:show -->
```

- 스크립트, 스타일, iframe 같은 요소는 안전을 위해 사이트에서 제거됩니다. 유튜브 영상은 링크로 적어 주세요.

## 3. 사이트에 저장소 추가·제거·순서 바꾸기

`src/data/projects.json`의 `projects` 목록을 고칩니다. 위에 있을수록 먼저 보이고, `featured: true`인 항목이 첫 화면 "대표 프로젝트"에 나옵니다. `id`를 적으면 상세 페이지 주소(`/projects/<id>/`)를 직접 정할 수 있습니다. 없으면 저장소 이름으로 만듭니다.

```json
{
  "projects": [
    { "repo": "seolmango/HydrogenOrbitalVisualizer", "featured": true },
    { "repo": "0-inf/switchio" },
    { "repo": "seolmango/graphColoringProblemSolveBySA", "id": "graph-coloring-sa" }
  ]
}
```

## 4. 반영 시점

GitHub Actions가 매일 한 번 README를 다시 읽어 사이트를 갱신합니다. 바로 반영하려면 저장소의 **Actions → Import content → Run workflow**를 누르거나, 로컬에서 `npm run import:projects`를 실행한 뒤 커밋하세요. README를 가져오지 못하면 마지막으로 성공한 내용을 그대로 유지합니다.
