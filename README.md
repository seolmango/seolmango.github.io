# seolmango.github.io

재료과학과 소프트웨어 작업을 함께 기록하는 한국어 개인 사이트입니다. 소개, 프로젝트, Velog에서 가져온 글, 브라우저에서 직접 만져 보는 플레이그라운드로 구성됩니다. Astro 정적 사이트이며 GitHub Pages로 배포합니다.

## 로컬에서 실행하기

Node.js 22.12 이상이 필요합니다.

```bash
npm ci
npm run dev      # http://localhost:4321 개발 서버
npm run check    # 타입·템플릿 검사
npm run build    # dist/ 에 정적 사이트 생성
npm run preview  # 빌드 결과 미리 보기
```

Velog 계정이 없거나 인터넷이 끊겨 있어도 빌드는 됩니다. 이 경우 글 목록에는 빈 상태 안내가 표시됩니다.

## 내용 수정하기 (레이아웃 코드는 건드리지 않아도 됩니다)

직접 고치는 파일은 모두 `src/data/`에 있습니다. JSON 형식이므로 쉼표와 따옴표에 주의하세요. 수정 후 `npm run check`를 실행하면 잘못된 값이 있을 때 어느 파일의 어느 항목인지 알려 줍니다.

| 파일 | 내용 |
| --- | --- |
| `src/data/profile.json` | 사이트 이름, 이름, 한 줄 소개, 소개 글, 링크, Velog 사용자명 |
| `src/data/projects.json` | 프로젝트 목록 |
| `src/data/categories.json` | 글 분류와 분류 지정 규칙 |
| `src/data/generated/velog-posts.json` | 자동 생성 파일. **직접 수정하지 마세요.** |

### 1. 프로필 — `src/data/profile.json`

| 키 | 의미 | 비워 두면 |
| --- | --- | --- |
| `siteTitle` | 사이트 이름. 탭 제목과 머리글에 쓰입니다. | 필수 |
| `siteDescription` | 사이트 설명. 첫 화면과 검색 결과 설명에 쓰입니다. | 필수 |
| `name` | 공개할 이름 | `siteTitle`을 대신 표시 |
| `tagline` | 첫 화면의 한 줄 소개 | `siteDescription`을 대신 표시 |
| `intro` | 첫 화면 소개 문단 목록 (`["첫 문단", "둘째 문단"]`) | 표시하지 않음 |
| `about` | 소개 페이지 문단 목록 | "소개 글을 준비하고 있습니다." |
| `records` | 학력·논문·자격·활동 같은 이력 목록. `group`이 같은 항목끼리 묶여 소개 페이지에 표시 | 비워 두면 이력 섹션 숨김 |
| `links` | 링크 목록. 개수 제한 없음. 적은 순서대로 소개 페이지와 바닥글에 표시 | 링크 숨김 |
| `photo` | 프로필 사진 `{ "src": "/images/profile.jpg", "alt": "사진 설명" }` | `null`이면 사진 없음 |
| `velog.username` | Velog 사용자명 (`@` 없이) | 글 목록에 빈 상태 안내 |

이력은 다음처럼 적습니다. `group`(묶을 제목)과 `title`(항목 이름)은 필수이고, `detail`(설명), `period`(기간 또는 시기), `url`(원문 링크)은 선택 사항입니다. 그룹은 처음 등장한 순서대로 표시되며, `url`에는 `http://` 또는 `https://` 주소만 사용할 수 있습니다.

```json
"records": [
  { "group": "학력", "title": "학교 이름", "detail": "학위 또는 과정", "period": "20XX.03 – 20XX.02" },
  { "group": "논문", "title": "논문 제목", "period": "20XX.02", "url": "https://example.com/paper" }
]
```

링크는 이렇게 적습니다. 주소는 `https://…` 또는 `mailto:…` 형식이어야 합니다.

```json
"links": [
  { "label": "GitHub", "url": "https://github.com/seolmango" },
  { "label": "이메일", "url": "mailto:me@example.com" },
  { "label": "이력서 PDF", "url": "https://example.com/cv.pdf" }
]
```

사진 파일은 `public/images/` 폴더에 넣고 `src`에 `/images/파일이름`을 적습니다. `alt`(사진 설명)는 화면 낭독기 사용자를 위해 반드시 적어야 합니다.

### 2. 프로젝트 — `src/data/projects.json`

`projects` 배열에 항목을 추가합니다. 위에 있을수록 먼저 표시되고, `featured: true`인 항목이 첫 화면에 먼저 나옵니다.

```json
{
  "projects": [
    {
      "id": "my-project",
      "title": "프로젝트 이름",
      "summary": "한두 문장 설명",
      "description": ["조금 더 긴 설명 문단"],
      "field": "materials",
      "repo": "https://github.com/seolmango/my-project",
      "links": [
        { "label": "발표 자료", "url": "https://example.com/slides" },
        { "label": "보고서", "url": "https://example.com/report.pdf" }
      ],
      "images": [
        { "src": "/images/my-project-1.jpg", "alt": "현미경 관찰 사진", "caption": "시편 A의 결정립" }
      ],
      "tags": ["Python", "상평형"],
      "period": "2026",
      "playground": "bragg",
      "featured": true
    }
  ]
}
```

- 필수: `id`(영문 소문자·숫자·하이픈, 중복 불가), `title`, `summary`, `field`
- `field`: `materials`(재료과학), `software`(소프트웨어), `both`(재료 + 코드). 첫 화면과 프로젝트 페이지의 축 위 위치가 이 값으로 정해집니다.
- `repo`: 원본 GitHub 저장소 주소. 있으면 "GitHub 저장소" 링크가 붙습니다.
- `links`: 저장소 외의 링크를 원하는 만큼 추가합니다.
- `images`: 프로젝트 사진·그림 목록. 파일은 `public/images/`에 넣습니다. 프로젝트 페이지에 "그림 1.", "그림 2." 순서로 캡션과 함께 표시됩니다.
- `playground`: 플레이그라운드 페이지와 연결할 때 그 페이지의 slug (예: `bragg`)
- 나머지는 모두 선택 사항입니다.

### 3. Velog 연결 — `src/data/profile.json`의 `velog.username`

1. `velog.username`에 사용자명을 적습니다. 예: 주소가 `https://velog.io/@abc/posts`라면 `"abc"`.
2. 로컬에서 바로 가져오려면 `npm run import:velog`을 실행합니다. `src/data/generated/velog-posts.json`이 갱신됩니다.
3. 커밋·푸시하면 이후에는 GitHub Actions가 매일 06:17(한국 시간)에 새 글을 가져옵니다.

가져오기 규칙:

- 원문 주소, 발행일, 피드에 있는 태그와 본문을 그대로 보존합니다. 피드에 없는 내용은 만들지 않습니다.
- 본문 HTML은 허용 목록 방식으로 정리합니다. 스크립트·스타일·삽입 프레임은 제거되고, 삽입 프레임은 "삽입된 콘텐츠 보기" 링크로 바뀝니다. 상대 경로 이미지와 링크는 원문 기준 절대 주소로 바뀝니다.
- 모든 글 페이지에 "Velog에서 원문 보기" 링크가 있고, 검색 엔진용 대표 주소(canonical)도 Velog 원문을 가리킵니다.
- 같은 주소의 글은 한 번만 저장됩니다. Velog RSS는 최근 글만 보여 주므로, 피드에서 빠진 예전 글도 지우지 않고 유지합니다. Velog에서 삭제한 글을 사이트에서도 지우려면 생성 파일에서 해당 항목을 지우고 커밋하세요.
- 네트워크 오류 등으로 가져오기에 실패하면 마지막으로 성공한 데이터를 그대로 둡니다. 내용이 바뀌지 않았으면 파일도 커밋도 생기지 않습니다.
- `velog.username`을 바꾸면 이전 계정의 글은 새 계정의 글로 대체됩니다.

### 4. 글 분류 — `src/data/categories.json`

Velog RSS에는 보통 분류 정보가 없어서 분류는 이 파일로 직접 정합니다. 어느 분류에도 속하지 않은 글은 "전체"에서만 보입니다.

```json
{
  "categories": [
    { "id": "materials", "label": "재료과학" },
    { "id": "software", "label": "소프트웨어" }
  ],
  "tagMap": { "Python": "software" },
  "postMap": { "https://velog.io/@abc/some-post": "materials" }
}
```

- `categories`: 분류 목록. `label`이 화면에 보이는 이름이고, 순서대로 표시됩니다. 글이 하나도 없는 분류는 숨겨집니다.
- `postMap`: 글 하나를 특정 분류로 지정합니다. 키는 Velog 원문 주소(또는 사이트의 글 주소 `/blog/<id>/`의 `<id>`)입니다.
- `tagMap`: 피드에 태그가 있을 때, 태그 이름으로 분류를 지정합니다.
- 우선순위: `postMap` → `tagMap` → 분류 없음.

### 5. 플레이그라운드 페이지 추가

1. `src/playground/`에 인터랙티브 컴포넌트를 만듭니다. 스크립트는 그 컴포넌트 안에만 둡니다.
2. `src/pages/playground/<slug>.astro` 페이지를 만들고 컴포넌트를 불러옵니다.
3. `src/lib/playground.ts`의 목록에 `{ slug, title, summary, kind }`를 추가하면 플레이그라운드 목록에 나타납니다.

지금 있는 "X선 회절 피크 계산기"는 구조를 보여 주는 **데모**이며 실제 연구 프로젝트가 아닙니다. 필요 없으면 목록과 페이지에서 지워도 됩니다.

## 예시 데이터로 레이아웃 미리 보기

실제 정보를 채우기 전에 사이트가 어떻게 보일지 확인하려면 예시 데이터 모드를 씁니다.

```bash
npm run dev:sample     # 예시 데이터로 개발 서버 실행
npm run build:sample   # 예시 데이터로 빌드 (확인용, 배포하지 마세요)
```

- 예시 데이터는 `src/data/sample/`, 예시 그림은 `public/images/sample/`에 있습니다. 이름·글·프로젝트는 모두 가짜입니다.
- 이 모드에서는 화면 맨 위에 "예시 데이터로 채운 미리보기" 안내가 붙고 검색 엔진 수집이 막힙니다.
- 일반 `npm run dev`, `npm run build`와 GitHub Pages 배포는 예시 데이터를 전혀 쓰지 않습니다.
- 실제 정보가 다 채워지면 `src/data/sample/`과 `public/images/sample/`은 지워도 됩니다. (지울 때는 `src/lib/content.ts`의 예시 데이터 import도 함께 지워야 합니다.)

## 배포 (GitHub Pages)

워크플로는 두 개입니다.

- `.github/workflows/deploy.yml`: `main`에 푸시하거나 수동 실행하면 Astro 공식 액션으로 빌드해 GitHub Pages에 배포합니다.
- `.github/workflows/import-velog.yml`: 매일 한 번, 또는 수동 실행으로 Velog 글을 가져옵니다. 바뀐 내용이 있을 때만 커밋하고, 그 뒤 배포 워크플로를 실행합니다.

처음 한 번 GitHub 저장소에서 설정해야 할 것:

1. **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 바꿉니다.
2. **Settings → Actions → General → Workflow permissions**가 조직 정책 등으로 막혀 있지 않은지 확인합니다. 워크플로가 필요한 권한(커밋, 배포 실행)은 파일 안에 선언되어 있어 별도 비밀 값은 필요 없습니다.
3. **Actions** 탭에서 "Import Velog RSS"를 한 번 수동 실행해 동작을 확인합니다. (Velog 사용자명을 정한 뒤)

참고: GitHub는 60일 동안 저장소 활동이 없으면 예약 워크플로를 자동으로 멈춥니다. 그럴 때는 Actions 탭에서 다시 켜면 됩니다.

## 개발 도구 메모

- 이 저장소는 Claude Code가 방향과 검토를, 저장소 전용 Codex CLI가 구현을 맡는 방식으로 만들어졌습니다. 규칙은 [AGENTS.md](AGENTS.md)와 [CLAUDE.md](CLAUDE.md)에 있습니다.
- 이 Windows 환경에서는 Codex의 기본 샌드박스가 ACL 적용 중 실패하므로 `CLAUDE.md`의 위임 명령은 공식 `unelevated` 대체 모드를 사용합니다. 이 모드 안에서는 `npm run build`가 esbuild 실행 권한 문제(`spawn EPERM`)로 실패하므로 빌드는 샌드박스 밖에서 확인합니다.
- 디자인 도구 Impeccable은 `vendor/impeccable` Git 하위 모듈에 고정되어 있습니다. 새 클론이나 갱신 후에는 `git submodule update --init vendor/impeccable`과 `scripts/sync-impeccable.ps1`을 실행하세요. 디자인 결정 기록은 `DESIGN.md`와 `.impeccable/`에 있습니다.
- 제품 방향은 [PRODUCT.md](PRODUCT.md)에 있습니다.
