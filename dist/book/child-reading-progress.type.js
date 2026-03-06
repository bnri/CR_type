"use strict";
// src/book/child-reading-progress.type.ts
// 자녀 읽기 진행 데이터 — MongoDB 5컬렉션 + WS/REST 타입
//
// 메트릭 개요:
//   누가(childIdx) 언제(timestamps) 무엇을(bookIdx+sectionId)
//   진도(coverage, 중첩비허용) 읽은양(raw, 중첩허용) 읽기속도(WPM)
//   시선일치도(gazeAlignment, 오디오재생+시선추적시)
//   집중도(concentration, gazeOnText/total %)
//   찾아본단어(lookedUpWords) 퀴즈점수/정답률
//   미검증 읽은양/속도(exposedOnly) 종합 읽기점수(readingScore, 누적)
Object.defineProperty(exports, "__esModule", { value: true });
