<template>
  <span :class="badgeClasses">{{ statusLabel }}</span>
</template>

<script setup lang="ts">
import type { Ticket } from '~/types/ticket';

const props = defineProps<{
  status: Ticket['status']
}>();

const statusLabel = computed(() => {
  switch (props.status) {
    case 'open': return 'Open';
    case 'in-progress': return 'In Progress';
    case 'resolved': return 'Resolved';
    case 'closed': return 'Closed';
    default: return props.status;
  }
});

const badgeClasses = computed(() => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
  
  switch (props.status) {
    case 'open':
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case 'in-progress':
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case 'resolved':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'closed':
      return `${baseClasses} bg-gray-100 text-gray-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
});
</script>