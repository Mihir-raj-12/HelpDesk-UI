export interface Ticket {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  categoryName: string;
  status: string;
  priority: string;
  raisedByUserId: string;
  raisedByUserName: string;
  assignedToUserId?: string;
  assignedToUserName?: string;
  createdDate: Date;
}