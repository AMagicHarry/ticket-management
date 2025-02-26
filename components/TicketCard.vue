<template>
  <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-semibold text-gray-800">{{ ticket.title }}</h3>
      <div class="flex space-x-2">
        <TicketPriorityBadge :priority="ticket.priority" />
        <TicketStatusBadge :status="ticket.status" />
      </div>
    </div>
    
    <p class="text-gray-600 mb-4 line-clamp-2">{{ ticket.description }}</p>
    
    <div class="flex justify-between items-center text-sm text-gray-500">
      <div>
        <span v-if="ticket.assignedTo" class="block">Assigned to: {{ ticket.assignedTo }}</span>
        <span class="block">Created: {{ formatDate(ticket.createdAt) }}</span>
      </div>
      
      <NuxtLink :to="`/tickets/${ticket.id}`" class="text-blue-600 hover:text-blue-800">
        View Details
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from '~/types/ticket';

const props = defineProps<{
  ticket: Ticket
}>();

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};
</script>