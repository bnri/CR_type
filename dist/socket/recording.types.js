"use strict";
// src/socket/recording.types.ts
// P2.2: S3 녹화 시스템 타입 정의
//
// 구조:
// - Recording (Request 단위): Admin/Parent가 모니터링 요청 ~ 종료
// - Segment (뷰어 열림 단위): 뷰어 열기 ~ 닫기 (섹션 변경 포함)
//
// S3 경로:
// live-recordings/{familyId}/{viewerUserId}/{recordingId}/
//   ├── manifest.json              (RecordingManifest)
//   └── segments/
//       ├── 0/
//       │   ├── meta.json          (SegmentMeta)
//       │   ├── snapshots/{ts}.json
//       │   └── chunks/{startTs}-{endTs}.json
//       └── 1/
//           └── ...
Object.defineProperty(exports, "__esModule", { value: true });
