export interface TopAgent {
  agentName: string;
  resolvedTicketsCount: number;
}

export interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  onHoldTickets: number;
  closedTickets: number;
  lowPriorityTickets: number;
  mediumPriorityTickets: number;
  highPriorityTickets: number;
  criticalPriorityTickets: number;
  ticketsThisMonth: number;
  ticketsLastMonth: number;
  topAgents: TopAgent[];
}