export declare enum OauthUserType {
    CHILD = "child",
    PARENT = "parent",
    ADMIN = "admin"
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
    device_ID: string;
    session_type: OauthUserType;
}
export interface ParentSessionData extends CommonSessionData {
    user_idx: number;
    user_logo_url?: string;
    client_id: string;
    email: string;
    name: string;
    provider: OauthProvider;
}
export interface ChildSessionData extends CommonSessionData {
    parent_idx: number;
    child_idx: number;
    child_image_url?: string;
    child_ID: string;
    parent_name: string;
    parent_logo_url?: string;
}
export type userSessionData = ParentSessionData | ChildSessionData;
