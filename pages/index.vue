<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">Open Tickets</h2>
        <p class="text-3xl font-bold text-blue-600">{{ ticketStore.openTicketsCount }}</p>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">In Progress</h2>
        <p class="text-3xl font-bold text-yellow-600">{{ inProgressCount }}</p>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-2">Resolved</h2>
        <p class="text-3xl font-bold text-green-600">{{ ticketStore.resolvedTicketsCount }}</p>
      </div>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Recent Tickets</h2>
      <div v-if="recentTickets.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TicketCard v-for="ticket in recentTickets" :key="ticket.id" :ticket="ticket" />
      </div>
      <p v-else class="text-gray-500">No tickets found.</p>
    </div>
    
    <div>
      <h2 class="text-xl font-semibold mb-4">Critical Issues</h2>
      <div v-if="criticalTickets.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TicketCard v-for="ticket in criticalTickets" :key="ticket.id" :ticket="ticket" />
      </div>
      <p v-else class="text-gray-500">No critical issues found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTicketStore } from '~/stores/ticket';

const ticketStore = useTicketStore();

// Load sample tickets for demo
onMounted(() => {
  if (ticketStore.tickets.length === 0) {
    ticketStore.loadSampleTickets();
  }
});

// Get tickets in progress
const inProgressCount = computed(() => {
  return ticketStore.getTicketsByStatus('in-progress').length;
});

// Get recent tickets (5 most recent)
const recentTickets = computed(() => {
  return [...ticketStore.tickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
});

// Get critical tickets
const criticalTickets = computed(() => {
  return ticketStore.getTicketsByPriority('critical');
});
</script>