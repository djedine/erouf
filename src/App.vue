<template>
  <div class="min-h-screen bg-animated relative">
    <!-- Floating Orbs Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        class="orb w-96 h-96 bg-indigo-600" 
        style="top: -10%; left: -10%; animation-delay: 0s;"
      />
      <div 
        class="orb w-80 h-80 bg-purple-600" 
        style="top: 50%; right: -10%; animation-delay: 2s;"
      />
      <div 
        class="orb w-64 h-64 bg-fuchsia-600" 
        style="bottom: -10%; left: 30%; animation-delay: 4s;"
      />
    </div>

    <!-- Grid Pattern Overlay -->
    <div 
      class="fixed inset-0 pointer-events-none opacity-20"
      style="background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px;"
    />

    <!-- Main Content -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>