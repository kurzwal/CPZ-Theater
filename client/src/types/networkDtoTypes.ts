export interface LobbyPlayer {
   nickname: string;
   x: number;
   y: number;
   isMoving: boolean;
}

export interface LobbyState {
   players: Map<string, LobbyPlayer>;
}

interface ChatMessage {
   id: string;
   message: string;
}

export type Chat = ChatMessage | string;
