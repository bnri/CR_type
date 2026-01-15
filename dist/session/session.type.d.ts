export declare enum OauthUserType {
    CHILD = "child",
    PARENT = "parent",
    ADMIN = "admin",
    CREATOR = "creator"
}
export declare enum OauthProvider {
    GOOGLE = "google",
    NAVER = "naver",
    KAKAO = "kakao"
}
export interface CommonSessionData {
    access_token: string;
    access_token_expire: number;
    refresh_token: string;
    refresh_token_expire: number;
    createdAt: number;
    lastRefreshedAt: number;
    device_ID: string;
    session_type: OauthUserType;
}
export interface ParentSessionData extends CommonSessionData {
    user_idx: number;
    client_id: string;
    oauth_email: string;
    provider: OauthProvider;
}
export interface ChildSessionData extends CommonSessionData {
    parent_idx: number;
    child_idx: number;
    child_ID: string;
}
export interface AdminSessionData extends CommonSessionData {
    admin_idx: number;
    admin_id: string;
    admin_name: string;
    admin_scope: string;
}
export interface CreatorSessionData extends Omit<CommonSessionData, 'session_type'> {
    creator_idx: number;
    creator_id: string;
    creator_name: string;
    session_type: OauthUserType.CREATOR;
}
export type userSessionData = ParentSessionData | ChildSessionData;
