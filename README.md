# ONJ Assignment

이 프로젝트는 React, TypeScript, Vite, Zustand, TailwindCSS를 기반으로 한 **템플릿(설문/폼) 생성 및 관리 웹 애플리케이션**입니다.  
템플릿을 생성, 수정, 삭제, 미리보기, 상세조회할 수 있으며, 모든 데이터는 브라우저의 LocalStorage에 저장됩니다.

---

## 목차

1. [기술 스택](#기술-스택)
2. [폴더 구조](#폴더-구조)
3. [주요 기능](#주요-기능)
4. [데이터 구조](#데이터-구조)
5. [실행 방법](#실행-방법)
6. [스크립트](#스크립트)
7. [코딩 컨벤션](#코딩-컨벤션)
8. [기여 방법](#기여-방법)
9. [라이선스](#라이선스)

---

## 기술 스택

- **React 18**: UI 라이브러리
- **TypeScript**: 정적 타입
- **Vite**: 번들러 및 개발 서버
- **Zustand**: 전역 상태 관리
- **React Router v6**: 라우팅
- **TailwindCSS**: CSS 프레임워크
- **ESLint, Prettier**: 코드 스타일 및 린팅
- **uuid**: 고유 ID 생성

---

## 폴더 구조

```
src/
  components/   // UI 컴포넌트
  db/           // LocalStorage 데이터 관리 함수
  hooks/        // 커스텀 훅
  pages/        // 라우트별 페이지 컴포넌트
  store/        // Zustand 상태 관리
  types/        // 타입 정의
  utils/        // 유틸리티 함수
  App.tsx       // 라우팅 및 전체 레이아웃
  main.tsx      // 엔트리포인트
  index.css     // 글로벌 스타일
```

---

## 주요 기능

### 1. 템플릿 목록
- `/`  
- 저장된 템플릿 리스트를 조회, 검색, 삭제, 수정 진입 가능

### 2. 템플릿 생성/수정
- `/create`, `/edit/:id`  
- 템플릿 제목, 설명, 질문(문항) 추가/수정/삭제  
- 질문 타입: 텍스트, 체크박스, 드롭다운, 라디오  
- 실시간 미리보기 지원

### 3. 템플릿 상세
- `/detail/:id`  
- 템플릿의 질문, 옵션, 필수 여부 등 상세 정보 확인

### 4. 템플릿 미리보기
- `/preview`  
- 현재 작성 중인 템플릿을 미리보기

### 5. 404 페이지
- 존재하지 않는 경로 접근 시 404 안내

---

## 데이터 구조

### Template

```ts
interface Template {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}
```

### Question

```ts
type QuestionType = 'text' | 'checkbox' | 'dropdown' | 'radio';

interface Question {
  id: string;
  type: QuestionType;
  label: string;
  options?: string[];
  required?: boolean;
}
```

- 모든 데이터는 LocalStorage에 `templates`, `previewTemplate` 키로 저장됩니다.

---

## 상태 관리

- **Zustand**를 사용하여 템플릿 생성/수정, 검색어 등 전역 상태를 관리합니다.
- `useCreateStore`, `useSearchStore` 등 커스텀 훅 형태로 제공

---

## 실행 방법

1. **의존성 설치**
   ```bash
   npm install
   ```
2. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   - 기본 포트: `5173` (Vite 기본값)
3. **빌드**
   ```bash
   npm run build
   ```
4. **프리뷰(빌드 결과 확인)**
   ```bash
   npm run preview
   ```
5. **코드 포맷팅**
   ```bash
   npm run format
   ```
6. **ESLint 검사**
   ```bash
   npm run lint
   ```

---

## 주요 라이브러리

- `react`, `react-dom`, `react-router-dom`, `zustand`, `uuid`, `@toss/use-overlay`, `tailwindcss`, `vite` 등


---