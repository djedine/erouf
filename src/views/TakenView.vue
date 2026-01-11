<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
    <div class="glass rounded-3xl p-8 md:p-12 max-w-md w-full text-center animate-scale-in">
      <!-- Icon -->
      <div 
        class="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center"
      >
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      
      <!-- Message -->
      <h2 class="font-display text-3xl md:text-4xl text-white mb-4">
        No worries!
      </h2>
      
      <p class="text-gray-400 mb-6 text-lg">
        This experience is designed for someone who's currently single.
      </p>
      
      <p class="text-gray-500 mb-10">
        But hey, if things change... you know where to find me.
      </p>
      
      <!-- Back Button -->
      <button
        @click="goBack"
        class="btn-secondary text-lg group"
      >
        <span class="flex items-center justify-center gap-2">
          <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Go Back
        </span>
      </button>
      
      <!-- Subtle hint -->
      <p class="mt-8 text-gray-600 text-sm">
        Maybe reconsider? 🤔
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/status')
}
</script>