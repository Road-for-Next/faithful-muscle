# Project Plan: Faithful Muscle

## 1. 프로젝트 개요

**Faithful Muscle**은 사용자가 요일별 운동 루틴을 계획하고 관리할 수 있는 웹 애플리케이션입니다. 운동 종목을 추가하고, 세트별 중량과 반복 횟수를 설정할 수 있으며, AI를 통한 루틴 피드백 및 URL을 통한 루틴 공유 기능을 제공합니다.

## 2. 현재 아키텍처 및 기술 스택

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19, Radix UI, Tailwind CSS
- **State Management**: Zustand (Persist middleware 사용)
- **Icons**: Lucide React
- **Utilities**: `clsx`, `tailwind-merge`, `sonner` (Toast), `vaul` (Drawer)
- **주요 기능**:
  - 요일별(일~토) 루틴 관리 (DaySelector)
  - 운동 종목 추가 및 검색 (AddRowDrawer, Mock Data)
  - 세트(중량/반복) 추가, 수정, 삭제 (RowCard)
  - AI 루틴 피드백 생성 (FeedbackDrawer)
  - URL 쿼리 파라미터를 이용한 루틴 공유 (Codec logic)
  - 다크 모드 지원

## 3. 향후 개발 계획 (Roadmap)

### Phase 1: 코드 품질 개선 및 리팩토링

- [ ] **테스트 코드 작성**: 핵심 로직인 `lib/codecColumn.ts`의 인코딩/디코딩 로직과 Zustand 스토어에 대한 유닛 테스트를 작성하여 안정성을 확보합니다.
- [ ] **컴포넌트 분리**: `RowCardFooter`나 `AddRowDrawer`와 같이 비즈니스 로직이 포함된 컴포넌트에서 로직을 커스텀 훅으로 분리하여 가독성과 재사용성을 높입니다.
- [x] **에러 핸들링 강화**: API 호출 및 데이터 파싱 과정에서의 예외 처리를 강화합니다.

### Phase 2: 핵심 기능 확장

- [ ] **운동 데이터베이스 확장**: 현재 `mock/exercise.ts`에 의존하는 운동 데이터를 외부 API나 더 큰 규모의 데이터셋으로 확장합니다.
- [ ] **드래그 앤 드롭 (DND)**: 운동 종목의 순서나 세트의 순서를 직관적으로 변경할 수 있도록 DND 기능을 도입합니다.
- [ ] **휴식 타이머**: 세트 간 휴식 시간을 측정할 수 있는 타이머 기능을 추가합니다.
- [ ] **루틴 템플릿**: 자주 사용하는 루틴을 템플릿으로 저장하고 불러오는 기능을 추가합니다.

### Phase 3: 백엔드 통합 및 사용자 기능 (장기 목표)

- [ ] **사용자 인증**: NextAuth.js 등을 도입하여 회원가입/로그인 기능을 구현합니다.
- [ ] **데이터베이스 연동**: LocalStorage 기반에서 벗어나 DB(Postgres, Supabase 등)를 연동하여 기기 간 데이터 동기화를 지원합니다.
- [ ] **운동 기록 및 통계**: 계획된 루틴뿐만 아니라 실제 수행한 운동을 기록하고, 볼륨 변화 등을 시각화하는 대시보드를 제공합니다.

### Phase 4: UI/UX 고도화

- [ ] **애니메이션 강화**: 리스트 추가/삭제, 드로어 열림/닫힘 등의 인터랙션에 자연스러운 애니메이션을 추가합니다.
- [ ] **접근성(a11y) 점검**: Radix UI를 기반으로 하지만, 커스텀된 컴포넌트들의 키보드 네비게이션 및 스크린 리더 지원을 점검합니다.
- [ ] **PWA 지원**: 모바일 사용성을 위해 PWA(Progressive Web App) 설정을 추가하여 앱처럼 사용할 수 있도록 합니다.
