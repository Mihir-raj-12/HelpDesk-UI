export interface Comment {
  id: number;
  ticketId: number;
  content: string;
  userId: string;
  writtenByUserName: string;// Assuming your CommentResponseDto sends back the user's name!
  createdDate: Date;
}