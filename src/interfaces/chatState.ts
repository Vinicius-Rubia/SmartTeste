export interface ChatState {
  messages: ChatMessage[];
  status: boolean;
  context: string;
}

export interface ChatMessage {
  id?: string,
  author: string,
  message: string,
  createdAt?: string | Date;
}