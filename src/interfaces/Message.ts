export interface IMessage {
  roomId: string | number;
  text: string;
  sentBy: string;
  sentAt: Date;
  isChatOwner?: boolean;
}