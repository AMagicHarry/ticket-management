<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">All Tickets</h1>
      <NuxtLink 
        to="/tickets/create" 
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Create New Ticket
      </NuxtLink>
    </div>
    
    <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div class="p-4 border-b">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center space-x-4">
            <label class="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select 
              v-model="statusFilter" 
              class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-4">
            <label class="text-sm font-medium text-gray-700">Filter by Priority:</label>
            <select 
              v-model="priorityFilter" 
              class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="ticket in filteredTickets" :key="ticket.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ ticket.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <TicketStatusBadge :status="ticket.status" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <TicketPriorityBadge :priority="ticket.priority" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ formatDate(ticket.createdAt) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ ticket.assignedTo || 'Unassigned' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink :to="`/tickets/${ticket.id}`" class="text-blue-600 hover:text-blue-900 mr-3">
                  View
                </NuxtLink>
              </td>
            </tr>
            <tr v-if="filteredTickets.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                No tickets found matching the current filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTicketStore } from '~/stores/ticket';

const ticketStore = useTicketStore();

// Load sample tickets for demo
onMounted(() => {
  if (ticketStore.tickets.length === 0) {
    ticketStore.loadSampleTickets();
  }
});

const statusFilter = ref('all');
const priorityFilter = ref('all');

const filteredTickets = computed(() => {
  let filtered = [...ticketStore.tickets];
  
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(ticket => ticket.status === statusFilter.value);
  }
  
  if (priorityFilter.value !== 'all') {
    filtered = filtered.filter(ticket => ticket.priority === priorityFilter.value);
  }
  
  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
});

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};
</script>