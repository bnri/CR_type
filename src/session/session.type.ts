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
  refresh_token_expire: number; //redis ttl expire와동일
  createdAt: number;
  lastRefreshedAt:number; //oauth 관련정보
  device_ID: string;
  session_type: OauthUserType;
}

export interface ParentSessionData extends CommonSessionData {
  user_idx: number;
  // user_logo_url?: string; //대표 oauth로 연동된 사진 복사 혹은 변경된 url 임
  // oauth_logo_url?:string; //대표 oauth로 연동된 사진임
  client_id: string; //로긴할때의 클라이언트아이디
  oauth_email: string; //oauth email 못바꿈
  // user_name:string; //내가 지정한이름 바꿀수있음
  // oauth_name: string; //oauth 네임
  provider: OauthProvider;
}

// export interface ParentDetail {
//   user_extended_idx:number;
//   user_phone?: string;
//   user_address?:string;
//   user_address_detail?:string;
//   user_address_postal?:string;
//   //추후 더 확장 일단 DB가 있는것만
// }


export interface ChildSessionData extends CommonSessionData {
  parent_idx:number;
  child_idx: number;
  // child_image_url?: string;  일부로제거
  child_ID:string;  
  // parent_name:string;  일부로제거
  // parent_logo_url?: string;  일부로제거
}

export interface AdminSessionData extends CommonSessionData{
  admin_idx:number;
  admin_id:string;
  admin_name:string;
  admin_scope:string;
}


export type userSessionData = ParentSessionData | ChildSessionData;
