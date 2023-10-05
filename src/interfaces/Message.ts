export interface IMessage {
  text: string;
  sentBy: string;
  sentAt: Date;
  isChatOwner?: boolean;
}