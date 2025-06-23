// export type providerEnum = 'google' | 'naver' | 'kakao';
export enum OauthUserType {
  CHILD = 'child',
  PARENT = 'parent',
  ADMIN = 'admin',
}
export enum OauthProvider {
  GOOGLE = 'google',
  NAVER = 'naver',
  KAKAO = 'kakao',
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
  user_logo_url?: string; //대표 oauth로 연동된 사진 복사 혹은 변경된 url 임
  client_id: string; //로긴할때의 클라이언트아이디
  email: string;
  name: string;
  provider: OauthProvider;
}

export interface ChildSessionData extends CommonSessionData {
  parent_idx:number;
  child_idx: number;
  child_image_url?: string;
  child_ID:string;  
}

export type userSessionData = ParentSessionData | ChildSessionData;
