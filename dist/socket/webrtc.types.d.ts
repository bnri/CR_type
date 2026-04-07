/** WebRTC 얼굴보기 — 자녀 디바이스 식별용 플랫폼 라벨 */
export type ChildDevicePlatform = 'windows' | 'macos' | 'android' | 'ios' | 'linux' | 'unknown';
/**
 * WebRTC 얼굴보기 디바이스 선택 모달용 자녀 디바이스 정보.
 * 같은 자녀 계정으로 여러 단말에 로그인 중일 때, 부모가 어느 단말 영상을 볼지 선택.
 */
export interface ChildDeviceInfo {
    socketId: string;
    platform: ChildDevicePlatform;
    userAgent: string | null;
    /** ISO 시각 — 해당 socket이 connect한 시점 */
    connectedAt: string;
}
