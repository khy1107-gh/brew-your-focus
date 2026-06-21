# ☕ Brew Your Focus

> 카페에서 공부하는 당신을 위한 **카공 무드 큐레이션 웹사이트**

오늘의 작업, 감정, 카페 자리, 음료, 원하는 무드를 선택하면  
그 조합에 딱 맞는 **카공 루틴 결과 카드 (Today's Blend)** 를 만들어드려요.

---

## 주요 기능

- **5가지 항목 선택** — 오늘의 작업 / 감정 / 카페 자리 / 음료 / 원하는 무드
- **Today's Blend 카드 생성**
  - 오늘의 카공 블렌드 이름
  - 추천 플레이리스트 검색어 (YouTube 링크 포함)
  - First Sip Mission: 바로 시작할 수 있는 작은 첫 미션
  - Focus Weather: 오늘의 집중 날씨
  - 동기부여 문장
  - Before You Leave 체크리스트 (클릭하면 완료 처리)
- **My Café Logs** — 결과 카드를 localStorage에 저장, 기록 조회 및 삭제
- **반응형 디자인** — 모바일 / 아이패드 / 데스크탑 모두 지원

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 언어 | HTML5 / CSS3 / Vanilla JavaScript |
| 서버 | 없음 (완전 정적) |
| 저장소 | 브라우저 localStorage |
| 외부 의존성 | Google Fonts만 사용 (API 키 불필요) |

---

## 파일 구조

```
brew-your-focus/
├── index.html   — 메인 HTML 마크업
├── style.css    — 전체 스타일 (카페 메뉴판 × 영수증 × 무드보드 감성)
├── script.js    — 선택 로직, 결과 생성, localStorage 관리
└── README.md    — 이 파일
```

---

## 사용 방법

1. 5가지 항목을 선택합니다.
2. **"Today's Blend 만들기"** 버튼을 클릭합니다.
3. 나만의 카공 루틴 카드를 확인합니다.
4. **저장하기** 버튼으로 My Café Logs에 기록을 남깁니다.
5. 상단 **"My Café Logs"** 탭에서 저장된 기록을 다시 볼 수 있습니다.

---

## GitHub Pages 배포 방법

### 방법 A: 직접 업로드

1. GitHub에 새 저장소 생성
2. `index.html`, `style.css`, `script.js` 세 파일 업로드
3. **Settings → Pages → Source: Deploy from a branch → main / (root)**
4. 저장 후 `https://<username>.github.io/<repo-name>` 으로 접속

### 방법 B: Git으로 배포

```bash
git init
git add index.html style.css script.js README.md
git commit -m "Initial commit: Brew Your Focus"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

이후 GitHub Settings → Pages에서 Branch를 `main`으로 설정하면 완료.

---

## 플레이리스트 검색어 매핑

| 무드 | YouTube 검색어 |
|------|----------------|
| 로파이 | lofi cafe study playlist |
| 재즈 | jazz cafe study background |
| 비 오는 카페 | rainy cafe jazz study |
| 도서관 같은 조용함 | library ambient study music |
| 밤샘 마감 | dark academia study playlist |
| 산뜻한 아침 카공 | morning cafe chill study playlist |
| 감성 과몰입 | aesthetic emotional study playlist |

---

Made with ☕ — no backend, no login, just you and your coffee.
