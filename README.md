# L-league 블로그 애플리케이션

## 프로젝트 설명

이 프로젝트는 블로그 포스팅 및 조회를 위한 모바일 웹 애플리케이션입니다. 사용자들이 다양한 카테고리(일상생활, 맛집소개, 제품후기, IT정보 등)의 블로그 글을 작성하고 조회할 수 있는 플랫폼을 제공합니다. 모바일 환경에 최적화된 UI/UX를 제공하며, 반응형 디자인으로 다양한 디바이스에서 사용할 수 있습니다.

## 설치 및 실행 방법

### 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/0dytpq0/L-league-FE-Interview.git

# 프로젝트 디렉토리로 이동
cd L-league-FE-Interview

# 의존성 설치
npm install
# 또는
yarn install
```

### 실행

```bash
# 개발 서버 실행
npm run dev
# 또는
yarn dev

# 빌드
npm run build
# 또는
yarn build

# 프로덕션 모드 실행
npm run start
# 또는
yarn start
```

개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.

## 구현한 기능 목록

### 1. 로그인, 로그아웃

- [x] 로그인 화면 구현
- [ ] 마이페이지 아이콘 클릭 시 로그아웃 처리

### 2. 블로그 등록(이미지)

- [x] 글 등록 화면 구현
- [ ] 글 등록 완료 시 상세화면으로 페이지 이동
- [ ] 글 등록 완료 시 페이지 히스토리 삭제(history.back을 통한 페이지 접근 제한)
- [ ] 글 작성중 뒤로가기 시 "작성중인 내용이 삭제됩니다." 컨펌창 출력

### 3. 카테고리, 블로그 목록 조회

- [x] 메인화면 레이아웃 구현
- [x] 메인화면 UI 완성
- [ ] 페이지네이션 구현 (10개씩 표시)
- [ ] 카테고리별 필터링 기능
- [ ] 블로그 제목 검색

### 4. 블로그 상세 조회

- [x] 상세화면 레이아웃 구현
- [ ] 데이터 조회 구현
- [ ] UI 완성

### 5. 블로그 수정

- [x] 수정화면 UI 구현
- [ ] 타이틀바 우측 상단 수정 버튼 클릭 시 수정화면으로 이동
- [ ] 수정 완료 시 상세화면으로 페이지 이동
- [ ] 글 수정 완료 시 페이지 히스토리 삭제(history.back을 통한 페이지 접근 제한)
- [ ] 글 수정중 뒤로가기 시 "작성중인 내용이 삭제됩니다." 컨펌창 출력

## 사용한 기술 스택 및 라이브러리

### 프론트엔드

- **Next.js 15.3.0**: React 기반의 서버 사이드 렌더링 프레임워크
- **React 19.0.0**: 사용자 인터페이스 구축을 위한 JavaScript 라이브러리
- **TypeScript**: 정적 타입 지원을 통한 개발 안정성 향상
- **TailwindCSS 4**: 유틸리티 우선 CSS 프레임워크
- **Swiper 11.2.6**: 터치 슬라이더 구현

### 상태 관리

- **TanStack Query (React Query) 5.72.2**: 서버 상태 관리 라이브러리

### 유틸리티

- **clsx & tailwind-merge**: 조건부 클래스 이름 관리

### 개발 도구

- **ESLint**: 코드 품질 관리
- **TurboRepo**: 빠른 개발 환경 제공
