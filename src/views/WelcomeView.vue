<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
    <div class="text-center max-w-2xl mx-auto">
      <!-- Animated Icon -->
      <div 
        class="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-float shadow-2xl"
        style="box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);"
      >
        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <!-- Title -->
      <h1 class="font-display text-5xl md:text-7xl text-white mb-4 animate-fade-in">
        Hey there
        <span class="text-gradient">!</span>
      </h1>
      
      <!-- Subtitle -->
      <p class="text-xl md:text-2xl text-gray-400 mb-12 animate-slide-up">
        I made something for you. It'll only take a minute.
      </p>
      
      <!-- Start Button -->
      <button
        @click="startJourney"
        class="btn-primary text-lg group animate-scale-in"
      >
        <span class="flex items-center gap-3">
          Let's Go
          <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </button>
      
      <!-- Subtle hint -->
      <p class="mt-12 text-gray-600 text-sm animate-fade-in" style="animation-delay: 0.5s;">
        Trust me, it's worth it ✨
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startJourney = () => {
  router.push('/status')
}
</script>