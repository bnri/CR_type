# CR_type CLAUDE.md

Claude Code 자동 로드 컨텍스트.

---

## 프로젝트 개요

CheckReading 공유 TypeScript 타입 패키지. 모든 프로젝트에서 사용하는 공통 타입 정의.

- 패키지명: `@readerseye2/cr_type`
- 사용처: CR_api, CR_ws, CR_app, CR_admin, CR_creator, CR_viewer, CR_oauth

---

## 작업 규칙

- **배포는 사용자(개발자)가 직접 수행** - Claude는 코드 수정만, `npm run deploy_npm` 실행은 사용자가 함
- 타입 정의만 포함 (런타임 코드 없음)
- 버전업은 배포 시 자동 (patch)
- 작업 완료 후 CR_docs/logs 폴더에 완료 로그 작성

---

## 빠른 참조

| 정보 | 경로 |
|------|------|
| 메인 index | `src/index.ts` |
| 세션 타입 | `src/session/session.type.ts` |
| 소켓 이벤트 | `src/socket/` |
| AST 타입 | `src/ast/ast.types.ts` |
| 책 타입 | `src/book/book.type.ts` |

---

## 소켓 이벤트 구조

| 파일 | 설명 |
|------|------|
| `socket-clientToServerEvents.type.ts` | Client → Server 이벤트 |
| `socket-serverToClientEvents.type.ts` | Server → Client 이벤트 |
| `socket-message.types.ts` | 메시지 페이로드 타입 |
| `reading-session.types.ts` | 읽기 세션 모니터링 타입 |

---

## 배포 절차 (사용자 수행)

```bash
# 1. 빌드 및 배포 (버전 자동 patch)
npm run deploy_npm

# 2. 의존하는 프로젝트에서 업데이트
npm update @readerseye2/cr_type
```

---

## 타입 추가 시 체크리스트

- [ ] 타입 정의 추가
- [ ] index.ts에 export 추가
- [ ] 빌드 확인 (`npm run build`)
- [ ] 배포 (`npm run deploy_npm`)
- [ ] 의존 프로젝트 업데이트
