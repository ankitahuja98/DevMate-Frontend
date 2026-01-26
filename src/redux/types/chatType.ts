interface Message {
  _id: string;
  message: string;
  senderId: {
    _id: string;
    name: string;
  };
}

export interface ChatResponse {
  data: {
    messages: Message[];
  };
  totalMessages: number;
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
