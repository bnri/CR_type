"use strict";
// src/socket/unified-session.types.ts
// 통합 읽기 세션 시스템 타입 정의 (v2)
//
// 기존 ReadingSessionService + RecordingService를 하나로 통합
//
// 핵심 변경:
// - 세션 = 뷰어 열림~닫힘 (섹션 변경은 세그먼트)
// - 자동 녹화 (Admin recording:start 제거)
// - 시선 데이터(~30FPS) 청크에 배치 저장
// - Parent + Admin 동일한 subscribe 체계
//
// S3 경로:
// reading-sessions/{familyId}/{userId}/{YYYY-MM-DD}/{sessionId}/
//   ├── manifest.json                    (UnifiedSessionManifest)
//   └── segments/
//       ├── 0/
//       │   ├── meta.json                (UnifiedSegmentMeta)
//       │   └── chunks/{startTs}-{endTs}.json  (UnifiedChunkFile)
//       └── 1/
//           └── ...
Object.defineProperty(exports, "__esModule", { value: true });
