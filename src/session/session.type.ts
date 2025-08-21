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
  lastRefreshedAt:number;
  device_ID: string;
  session_type: OauthUserType;
}

export interface ParentSessionData extends CommonSessionData {
  user_idx: number;
  user_logo_url?: string; //대표 oauth로 연동된 사진 복사 혹은 변경된 url 임
  client_id: string; //로긴할때의 클라이언트아이디
  email: string;
  user_name:string; //내가 지정한이름
  name: string; //oauth 네임
  provider: OauthProvider;
  lastUpdatedOauthAt?: number; // ✅ 외부 OAuth 프로필 갱신 시각

}

export interface ParentDetail {
  user_extended_idx:number;
  user_phone?: string;
  user_address?:string;
  user_address_detail?:string;
  user_address_postal?:string;
  //추후 더 확장 일단 DB가 있는것만
}


export interface ChildSessionData extends CommonSessionData {
  parent_idx:number;
  child_idx: number;
  child_image_url?: string;
  child_ID:string;  
  parent_name:string;
  parent_logo_url?: string;

}

export interface AdminSessionData extends CommonSessionData{
  admin_idx:number;
  admin_id:string;
  admin_name:string;
  admin_scope:string;
}


export type userSessionData = ParentSessionData | ChildSessionData;
