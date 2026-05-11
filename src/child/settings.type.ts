/**
 * 자녀 프로필 설정 (책 추천 / 뷰어 / 알림)
 *
 * MySQL 매핑:
 *   - recommendation_settings → child.recommendation_settings JSON
 *   - viewer_settings         → child.viewer_settings JSON
 *   - notification_settings   → child.notification_settings JSON
 *
 * 표면 원칙:
 *   - DB 는 카테고리별 JSON 1컬럼, API/DTO 는 평탄한 boolean/number 필드
 *   - INSERT 시 DB DEFAULT 적용, SELECT 시 { ...DEFAULT_X, ...parsed } 로 누락 키 보강
 *   - PATCH 는 평탄 필드를 JSON_SET 으로 부분 update
 *   - 자녀 생성 시 입력 X — 프로필 수정탭에서만 토글 가능
 */

// ---------- 책 추천 설정 ----------
export interface ChildRecommendationSettings {
  /** 레벨 맞춤 추천 */
  rec_level_match: boolean;
  /** 장르 선호 추천 */
  rec_genre_pref: boolean;
  /** 완독 이력 기반 추천 */
  rec_completed_similar: boolean;
  /** 또래 인기 책 */
  rec_peer_popular: boolean;
  /** 이어지는 시리즈 */
  rec_series_next: boolean;
  /** 새로운 장르 탐색 */
  rec_explore_new_genre: boolean;
}

export const DEFAULT_CHILD_RECOMMENDATION_SETTINGS: ChildRecommendationSettings = {
  rec_level_match: true,
  rec_genre_pref: true,
  rec_completed_similar: true,
  rec_peer_popular: true,
  rec_series_next: true,
  rec_explore_new_genre: false,
};

// ---------- 뷰어 설정 ----------
export interface ChildViewerSettings {
  /** 페이지 이탈 감지 */
  viewer_page_leave_detect: boolean;
  /** 자동 시선 맞춤 (재캘리브레이션 유도) */
  viewer_auto_gaze_calibrate: boolean;
  /** 야간 읽기 제한 */
  viewer_night_limit: boolean;
  /** 집중듣기 도움 */
  viewer_focus_listen_help: boolean;
  /** 읽기 속도 자동 조정 */
  viewer_auto_speed_adjust: boolean;
  /** 권장도서 우선 노출 */
  viewer_recommended_first: boolean;
}

export const DEFAULT_CHILD_VIEWER_SETTINGS: ChildViewerSettings = {
  viewer_page_leave_detect: true,
  viewer_auto_gaze_calibrate: true,
  viewer_night_limit: false,
  viewer_focus_listen_help: true,
  viewer_auto_speed_adjust: false,
  viewer_recommended_first: true,
};

// ---------- 알림 설정 ----------
/** 읽기 중단 감지 임계 (초) */
export type NotifPauseThresholdSec = 30 | 60 | 120 | 180 | 300;
/** Reading 비율 저하 임계 (%) */
export type NotifReadingRatioThreshold = 30 | 40 | 50 | 60 | 70;
/** Lost 비율 급증 임계 (%) */
export type NotifLostRatioThreshold = 20 | 30 | 40 | 50;
/** 일일 목표 점수 */
export type NotifDailyGoalScore = 100 | 200 | 300 | 400 | 500;
/** 저녁 리마인더 시각 (HH:mm, 18~22 시) */
export type NotifEveningReminderTime = '18:00' | '19:00' | '20:00' | '21:00' | '22:00';

export interface ChildNotificationSettings {
  /** 읽기 시작/종료 알림 */
  notif_reading_start_end: boolean;
  /** 책 완독 알림 */
  notif_book_complete: boolean;

  /** 읽기 중단 감지 알림 */
  notif_pause_detected: boolean;
  /** 읽기 중단 판정 임계 (초) */
  notif_pause_threshold_sec: NotifPauseThresholdSec;

  /** Reading 비율 저하 알림 */
  notif_reading_ratio_drop: boolean;
  /** Reading 비율 저하 임계 (%) */
  notif_reading_ratio_threshold: NotifReadingRatioThreshold;

  /** Lost 비율 급증 알림 */
  notif_lost_ratio_surge: boolean;
  /** Lost 비율 급증 임계 (%) */
  notif_lost_ratio_threshold: NotifLostRatioThreshold;

  /** 오늘 목표 할당 알림 */
  notif_daily_goal: boolean;
  /** 일일 목표 점수 */
  notif_daily_goal_score: NotifDailyGoalScore;

  /** 저녁 리마인더 알림 */
  notif_evening_reminder: boolean;
  /** 저녁 리마인더 시각 */
  notif_evening_reminder_time: NotifEveningReminderTime;

  /** 주간 리포트 (일요일) */
  notif_weekly_report: boolean;
  /** 레벨 업 알림 */
  notif_level_up: boolean;
}

export const DEFAULT_CHILD_NOTIFICATION_SETTINGS: ChildNotificationSettings = {
  notif_reading_start_end: true,
  notif_book_complete: true,
  notif_pause_detected: true,
  notif_pause_threshold_sec: 120,
  notif_reading_ratio_drop: true,
  notif_reading_ratio_threshold: 50,
  notif_lost_ratio_surge: true,
  notif_lost_ratio_threshold: 30,
  notif_daily_goal: false,
  notif_daily_goal_score: 300,
  notif_evening_reminder: true,
  notif_evening_reminder_time: '20:00',
  notif_weekly_report: true,
  notif_level_up: true,
};

/** 자녀 설정 전체 평탄 표면 — DTO 평탄화 + 프론트 토글 SSOT */
export type ChildSettings = ChildRecommendationSettings &
  ChildViewerSettings &
  ChildNotificationSettings;

export const DEFAULT_CHILD_SETTINGS: ChildSettings = {
  ...DEFAULT_CHILD_RECOMMENDATION_SETTINGS,
  ...DEFAULT_CHILD_VIEWER_SETTINGS,
  ...DEFAULT_CHILD_NOTIFICATION_SETTINGS,
};
