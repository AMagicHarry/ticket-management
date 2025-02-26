<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enter ticket title"
      />
    </div>
    
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        rows="4"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Describe the issue or feature request"
      ></textarea>
    </div>
    
    <div>
      <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
      <select
        id="priority"
        v-model="form.priority"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </div>
    
    <div>
      <label for="assignedTo" class="block text-sm font-medium text-gray-700">Assign To (Optional)</label>
      <input
        id="assignedTo"
        v-model="form.assignedTo"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enter team or person name"
      />
    </div>
    
    <div class="flex justify-end">
      <button
        type="button"
        @click="$emit('cancel')"
        class="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {{ ticket ? 'Update Ticket' : 'Create Ticket' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ticket, CreateTicketPayload } from '~/types/ticket';

const props = defineProps<{
  ticket?: Ticket
}>();

const emit = defineEmits<{
  (e: 'submit', payload: CreateTicketPayload): void
  (e: 'cancel'): void
}>();

const form = ref<CreateTicketPayload>({
  title: '',
  description: '',
  priority: 'medium',
  assignedTo: ''
});

onMounted(() => {
  if (props.ticket) {
    form.value = {
      title: props.ticket.title,
      description: props.ticket.description,
      priority: props.ticket.priority,
      assignedTo: props.ticket.assignedTo || ''
    };
  }
});

const submitForm = () => {
  emit('submit', { ...form.value });
};
</script>