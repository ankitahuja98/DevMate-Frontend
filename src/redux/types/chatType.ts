export interface Message {
  _id: string;
  message: string;
  senderId: {
    _id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
  tempId?: string;
}

export interface ChatResponse {
  data: Message[];
  totalMessages: number;
  page: number;
  size: number;
}

export interface ChatUser {
  _id: string;
  name: string;
  profilePhoto: string;
  lastSeen?: string;
  isOnline?: boolean;
}

export interface LastMessage {
  _id?: string;
  message: string;
  createdAt?: string;
  senderId?: string;
}

interface chatList {
  _id: string;
  chatId: string;
  isUnread: boolean;
  lastmessage?: LastMessage;
  user: ChatUser;
}

export interface ChatState {
  isChatLoading: boolean;
  ChatData: ChatResponse | null;
  isChatError: boolean;
  isChatlistLoading: boolean;
  ChatList: chatList[];
  isChatlistError: boolean;
}
