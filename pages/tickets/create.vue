<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Create New Ticket</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <TicketForm @submit="createTicket" @cancel="navigateBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTicketStore } from '~/stores/ticket';
import type { CreateTicketPayload } from '~/types/ticket';

const ticketStore = useTicketStore();
const router = useRouter();

const createTicket = (payload: CreateTicketPayload) => {
  const newTicket = ticketStore.createTicket(payload);
  router.push(`/tickets/${newTicket.id}`);
};

const navigateBack = () => {
  router.push('/tickets');
};
</script>