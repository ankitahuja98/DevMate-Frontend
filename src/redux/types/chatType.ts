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
}

export interface ChatState {
  isChatLoading: boolean;
  ChatData: ChatResponse | null;
  isChatError: boolean;
  isChatlistLoading: boolean;
  ChatList: ChatUser[];
  isChatlistError: boolean;
}
