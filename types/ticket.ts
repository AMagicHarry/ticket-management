export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  createdBy: string;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  priority: Ticket['priority'];
  assignedTo?: string;
}