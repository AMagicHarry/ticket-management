<template>
  <div>
    <div v-if="ticket" class="mb-6">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h1 class="text-2xl font-bold">{{ ticket.title }}</h1>
          <div class="flex space-x-2 mt-2">
            <TicketStatusBadge :status="ticket.status" />
            <TicketPriorityBadge :priority="ticket.priority" />
          </div>
        </div>
        
        <div class="flex space-x-2">
          <button 
            v-if="!isEditing" 
            @click="isEditing = true" 
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button 
            v-if="!isEditing" 
            @click="confirmDelete" 
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div v-if="isEditing" class="bg-white rounded-lg shadow-md p-6 mb-6">
        <TicketForm 
          :ticket="ticket" 
          @submit="updateTicket" 
          @cancel="isEditing = false" 
        />
      </div>
      
      <div v-else>
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-lg font-semibold mb-2">Description</h2>
          <p class="text-gray-700 whitespace-pre-line">{{ ticket.description }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-lg font-semibold mb-4">Ticket Details</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <div class="flex items-center mt-1">
                <TicketStatusBadge :status="ticket.status" />
                <button 
                  @click="showStatusDropdown = !showStatusDropdown" 
                  class="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Change
                </button>
                
                <div v-if="showStatusDropdown" class="relative ml-2">
                  <div class="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg">
                    <div class="py-1">
                      <button 
                        v-for="status in ['open', 'in-progress', 'resolved', 'closed']" 
                        :key="status"
                        @click="updateTicketStatus(status)"
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {{ statusLabels[status] }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Priority</p>
              <div class="mt-1">
                <TicketPriorityBadge :priority="ticket.priority" />
              </div>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Created By</p>
              <p class="mt-1 text-gray-900">{{ ticket.createdBy }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Assigned To</p>
              <p class="mt-1 text-gray-900">{{ ticket.assignedTo || 'Unassigned' }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Created At</p>
              <p class="mt-1 text-gray-900">{{ formatDate(ticket.createdAt) }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Last Updated</p>
              <p class="mt-1 text-gray-900">{{ formatDate(ticket.updatedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="bg-white rounded-lg shadow-md p-6">
      <p class="text-gray-500">Ticket not found.</p>
      <NuxtLink to="/tickets" class="text-blue-600 hover:text-blue-800 mt-4 inline-block">
        Back to Tickets
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTicketStore } from '~/stores/ticket';
import type { CreateTicketPayload, Ticket } from '~/types/ticket';

const route = useRoute();
const router = useRouter();
const ticketStore = useTicketStore();

const ticketId = computed(() => route.params.id as string);
const ticket = computed(() => ticketStore.getTicketById(ticketId.value));

const isEditing = ref(false);
const showStatusDropdown = ref(false);

const statusLabels = {
  'open': 'Open',
  'in-progress': 'In Progress',
  'resolved': 'Resolved',
  'closed': 'Closed'
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString();
};

const updateTicket = (payload: CreateTicketPayload) => {
  ticketStore.updateTicket(ticketId.value, payload);
  isEditing.value = false;
};

const updateTicketStatus = (status: Ticket['status']) => {
  ticketStore.updateTicketStatus(ticketId.value, status);
  showStatusDropdown.value = false;
};

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    ticketStore.deleteTicket(ticketId.value);
    router.push('/tickets');
  }
};
</script>