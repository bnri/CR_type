/**
 * 연결된 사용자 정보 (Socket 기반)
 */
export interface ConnectedUser {
    /** 소켓 ID */
    socketId: string;
    /** 사용자 유형 */
    userType: 'parent' | 'child';
    /** 사용자 ID (parent: user_idx, child: child_idx) */
    userId: number;
    /** 사용자 이름 (parent: oauth_email, child: child_ID) */
    userName: string;
    /** 부모 idx (child인 경우) */
    parentIdx?: number;
    /** 연결 시간 */
    connectedAt: string;
    /** 현재 읽기 세션 ID (읽기 중인 경우) */
    readingSessionId?: string;
}
/**
 * 연결된 사용자 목록 (부모/자녀 그룹화)
 */
export interface ConnectedUsersGrouped {
    /** 부모 목록 */
    parents: ConnectedUser[];
    /** 자녀 목록 (parentIdx로 그룹화 가능) */
    children: ConnectedUser[];
}
/** 연결된 사용자 목록 응답 */
export interface ConnectedUsersListResponse {
    users: ConnectedUsersGrouped;
}
/** 사용자 연결 이벤트 */
export interface UserConnectedPayload {
    user: ConnectedUser;
}
/** 사용자 연결 해제 이벤트 */
export interface UserDisconnectedPayload {
    socketId: string;
    userId: number;
    userType: 'parent' | 'child';
}
/** 사용자 읽기 상태 변경 이벤트 */
export interface UserReadingStatusPayload {
    socketId: string;
    userId: number;
    userType: 'parent' | 'child';
    readingSessionId: string | null;
}
