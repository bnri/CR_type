export type providerEnum = 'google' | 'naver' | 'kakao';
export interface CommonSessionData {
    access_token: string;
    access_token_expire: number;
    refresh_token: string;
    refresh_token_expire: number;
    createdAt: number;
    device_ID: string;
    session_type: 'parent' | 'child';
}
export interface ParentSessionData extends CommonSessionData {
    user_idx: number;
    user_logo_url: string;
    client_id: string;
    email: string;
    name: string;
    provider: providerEnum;
}
export interface ChildSessionData extends CommonSessionData {
    child_idx: number;
    child_logo_url: string;
}
export type userSessionData = ParentSessionData | ChildSessionData;
