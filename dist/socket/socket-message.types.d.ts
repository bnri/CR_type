import { OauthUserType } from "../session";
export interface MessageRequest {
    receiver_type: OauthUserType;
    receiver_idx: number;
    msg: string;
}
export interface MessageResponse {
    msg: string;
    sender_type: OauthUserType;
    sender_idx: number;
    receiver_type: 'parent' | 'child';
    receiver_idx: number;
    createdAt: string;
    room_key: string;
    is_read: boolean;
}
export interface ChatMessageRefreshRequest {
    roomKey: string;
    start?: string;
    end?: string;
}
export interface MessageLogDocument extends MessageResponse {
    _id?: string;
    createdAt: string;
    updatedAt?: string;
}
