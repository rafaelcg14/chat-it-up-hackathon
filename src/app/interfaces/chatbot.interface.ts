export interface ChatMessage {
  text: string;
  user: boolean;
  references?: string;
}
