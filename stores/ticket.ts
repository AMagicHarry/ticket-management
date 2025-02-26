import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Ticket, CreateTicketPayload } from '~/types/ticket';

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    tickets: [] as Ticket[],
    loading: false,
    error: null as string | null,
  }),
  
  getters: {
    getTicketById: (state) => (id: string) => {
      return state.tickets.find(ticket => ticket.id === id);
    },
    
    getTicketsByStatus: (state) => (status: Ticket['status']) => {
      return state.tickets.filter(ticket => ticket.status === status);
    },
    
    getTicketsByPriority: (state) => (priority: Ticket['priority']) => {
      return state.tickets.filter(ticket => ticket.priority === priority);
    },
    
    openTicketsCount: (state) => {
      return state.tickets.filter(ticket => ticket.status === 'open').length;
    },
    
    resolvedTicketsCount: (state) => {
      return state.tickets.filter(ticket => ticket.status === 'resolved' || ticket.status === 'closed').length;
    }
  },
  
  actions: {
    createTicket(payload: CreateTicketPayload) {
      const newTicket: Ticket = {
        id: uuidv4(),
        title: payload.title,
        description: payload.description,
        status: 'open',
        priority: payload.priority,
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedTo: payload.assignedTo,
        createdBy: 'current-user', // In a real app, this would come from auth
      };
      
      this.tickets.push(newTicket);
      return newTicket;
    },
    
    updateTicket(id: string, updates: Partial<Omit<Ticket, 'id' | 'createdAt' | 'createdBy'>>) {
      const index = this.tickets.findIndex(ticket => ticket.id === id);
      if (index !== -1) {
        this.tickets[index] = {
          ...this.tickets[index],
          ...updates,
          updatedAt: new Date()
        };
        return this.tickets[index];
      }
      return null;
    },
    
    deleteTicket(id: string) {
      const index = this.tickets.findIndex(ticket => ticket.id === id);
      if (index !== -1) {
        this.tickets.splice(index, 1);
        return true;
      }
      return false;
    },
    
    updateTicketStatus(id: string, status: Ticket['status']) {
      return this.updateTicket(id, { status });
    },
    
    // Load some sample tickets for demo purposes
    loadSampleTickets() {
      const sampleTickets: Ticket[] = [
        {
          id: uuidv4(),
          title: 'Server Down in Production',
          description: 'The main application server is not responding in the production environment.',
          status: 'open',
          priority: 'critical',
          createdAt: new Date(Date.now() - 3600000), // 1 hour ago
          updatedAt: new Date(Date.now() - 3600000),
          createdBy: 'admin',
          assignedTo: 'DevOps Team'
        },
        {
          id: uuidv4(),
          title: 'Login Page Not Working',
          description: 'Users are reporting that they cannot log in to the application.',
          status: 'in-progress',
          priority: 'high',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          updatedAt: new Date(Date.now() - 43200000), // 12 hours ago
          createdBy: 'support',
          assignedTo: 'Frontend Team'
        },
        {
          id: uuidv4(),
          title: 'Add Export to PDF Feature',
          description: 'Users need the ability to export reports to PDF format.',
          status: 'open',
          priority: 'medium',
          createdAt: new Date(Date.now() - 172800000), // 2 days ago
          updatedAt: new Date(Date.now() - 172800000),
          createdBy: 'product',
          assignedTo: 'Backend Team'
        },
        {
          id: uuidv4(),
          title: 'Update Documentation',
          description: 'The API documentation needs to be updated with the latest endpoints.',
          status: 'resolved',
          priority: 'low',
          createdAt: new Date(Date.now() - 259200000), // 3 days ago
          updatedAt: new Date(Date.now() - 86400000), // 1 day ago
          createdBy: 'developer',
          assignedTo: 'Documentation Team'
        }
      ];
      
      this.tickets = sampleTickets;
    }
  }
});