"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CHILD_SETTINGS = exports.DEFAULT_CHILD_NOTIFICATION_SETTINGS = exports.DEFAULT_CHILD_VIEWER_SETTINGS = exports.DEFAULT_CHILD_RECOMMENDATION_SETTINGS = void 0;
exports.DEFAULT_CHILD_RECOMMENDATION_SETTINGS = {
    rec_level_match: true,
    rec_genre_pref: true,
    rec_completed_similar: true,
    rec_peer_popular: true,
    rec_series_next: true,
    rec_explore_new_genre: false,
};
exports.DEFAULT_CHILD_VIEWER_SETTINGS = {
    viewer_page_leave_detect: true,
    viewer_auto_gaze_calibrate: true,
    viewer_night_limit: false,
    viewer_focus_listen_help: true,
    viewer_auto_speed_adjust: false,
    viewer_recommended_first: true,
};
exports.DEFAULT_CHILD_NOTIFICATION_SETTINGS = {
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
exports.DEFAULT_CHILD_SETTINGS = {
    ...exports.DEFAULT_CHILD_RECOMMENDATION_SETTINGS,
    ...exports.DEFAULT_CHILD_VIEWER_SETTINGS,
    ...exports.DEFAULT_CHILD_NOTIFICATION_SETTINGS,
};
