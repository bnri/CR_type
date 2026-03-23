"use strict";
// src/book/child-reading-progress.type.ts
// 읽기 진행 데이터 v2 — MongoDB 2컬렉션 + Redis 실시간 + WS/REST 타입
//
// MongoDB: reading_sessions (세션당 1개) + book_progress (책별 1개)
// Redis: reading:live:{testeeIdx} (실시간 부모 모니터링)
Object.defineProperty(exports, "__esModule", { value: true });
