<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-blue-600 text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">Ticket Management</NuxtLink>
        <nav>
          <ul class="flex space-x-6">
            <li><NuxtLink to="/" class="hover:text-blue-200">Dashboard</NuxtLink></li>
            <li><NuxtLink to="/tickets" class="hover:text-blue-200">Tickets</NuxtLink></li>
            <li><NuxtLink to="/tickets/create" class="hover:text-blue-200">Create Ticket</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main class="flex-grow container mx-auto px-4 py-6">
      <slot />
    </main>
    
    <footer class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4 text-center">
        <p>Ticket Management System &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>