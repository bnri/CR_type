import { MessageReadResponse, MessageResponse, NoticeMessageResult } from "./socket-message.types";
export interface ServerToClientEvents {
    connect: () => void;
    disconnect: () => void;
    connect_error: (err: Error) => void;
    'chat-message:append-self': (msg: MessageResponse) => void;
    'chat-message:append-peer': (msg: MessageResponse) => void;
    'chat-message:refreshed': (payload: {
        roomKey: string;
        msgArr: MessageResponse[];
    }) => void;
    'chat-message:read-peer': (payload: MessageReadResponse) => void;
    'chat-message:read-self': (payload: MessageReadResponse) => void;
}
export interface NoticeToClientEvents {
    'notice-message:result': (payload: NoticeMessageResult) => void;
}
export interface AdminServerToClientEvents extends ServerToClientEvents, NoticeToClientEvents {
}
