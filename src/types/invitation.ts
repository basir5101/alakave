export interface Invitation {
  id?: string;
  receiverId?: string;
  receiverName?: string;
  senderId?: string;
  senderName?: string;
  message?: string;
  photoURL?: string;
  status?: string;
  createdAt?: string | Date;
  senderImg?: string;
  receiverImg?: string;
}
