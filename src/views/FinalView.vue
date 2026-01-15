<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative z-10 overflow-hidden">
    <!-- Success Particles -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="n in 30"
        :key="n"
        class="particle"
        :style="{
          left: `${Math.random() * 100}%`,
          backgroundColor: ['#6366f1', '#8b5cf6', '#d946ef', '#06b6d4', '#10b981', '#fff'][Math.floor(Math.random() * 6)],
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${Math.random() * 3 + 3}s`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
        }"
      />
    </div>

    <div class="glass rounded-3xl p-8 md:p-12 max-w-lg w-full text-center animate-scale-in relative">
      <!-- Success Icon -->
      <div 
        class="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center animate-float"
        style="box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);"
      >
        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <!-- Thank You Message -->
      <h1 class="font-display text-4xl md:text-5xl text-white mb-4">
        That's it!
      </h1>
      
      <p class="text-xl text-gray-400 mb-8">
        Thanks for playing along
      </p>
      
      <!-- Personal Message -->
      <div class="glass-light rounded-2xl p-6 mb-8">
        <p class="text-gray-300 text-lg leading-relaxed">
          Well done
        </p>
        <p class="text-indigo-400 mt-4 font-medium">
          Talk to you soon!
        </p>
      </div>
      
      <!-- Decorative Elements -->
      <div class="flex justify-center gap-6 mb-8">
        <div class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <div class="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style="animation-delay: 0.2s" />
        <div class="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style="animation-delay: 0.4s" />
      </div>
      
      <!-- Restart Button -->
      <button
        @click="restart"
        class="btn-secondary text-sm opacity-60 hover:opacity-100"
      >
        Start Over
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const restart = () => {
  router.push('/')
}
</script>