export interface ChatMessage {
  content: string;
  created_at: string;
  id: number;
  room_id: string;
  sender_id: number;
  users: User
}

export interface JoinRoomProps {
  roomId: string,
  user: User
}

export interface User {
  id: string;
  email: string;
  avatar: string;
}

export interface JoinedProps {
  messages: Array<ChatMessage>;
  users: User[];
}
