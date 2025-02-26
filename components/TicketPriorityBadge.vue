<template>
  <span :class="badgeClasses">{{ priorityLabel }}</span>
</template>

<script setup lang="ts">
import type { Ticket } from '~/types/ticket';

const props = defineProps<{
  priority: Ticket['priority']
}>();

const priorityLabel = computed(() => {
  switch (props.priority) {
    case 'low': return 'Low';
    case 'medium': return 'Medium';
    case 'high': return 'High';
    case 'critical': return 'Critical';
    default: return props.priority;
  }
});

const badgeClasses = computed(() => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
  
  switch (props.priority) {
    case 'low':
      return `${baseClasses} bg-gray-100 text-gray-800`;
    case 'medium':
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case 'high':
      return `${baseClasses} bg-orange-100 text-orange-800`;
    case 'critical':
      return `${baseClasses} bg-red-100 text-red-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
});
</script>