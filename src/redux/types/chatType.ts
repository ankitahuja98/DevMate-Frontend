interface Message {
  _id: string;
  message: string;
  senderId: {
    _id: string;
    name: string;
  };
}
export interface ChatUser {
  _id: string;
  name: string;
  profilePhoto: string;
}

export interface ChatState {
  isChatLoading: boolean;
  ChatData: Message[] | null;
  isChatError: boolean;
  isChatlistLoading: boolean;
  ChatList: ChatUser[];
  isChatlistError: boolean;
}
