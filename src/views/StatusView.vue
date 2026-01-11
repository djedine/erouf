<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
    <div class="glass rounded-3xl p-8 md:p-12 max-w-md w-full text-center animate-scale-in">
      <!-- Icon -->
      <div 
        class="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
        style="box-shadow: 0 15px 40px rgba(99, 102, 241, 0.3);"
      >
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <!-- Question -->
      <h2 class="font-display text-3xl md:text-4xl text-white mb-3">
        Quick question
      </h2>
      
      <p class="text-gray-400 mb-10 text-lg">
        Before we continue...
      </p>
      
      <!-- Options -->
      <div class="space-y-4">
        <button
          @click="selectStatus('single')"
          class="w-full btn-primary text-lg group"
          :disabled="loading"
        >
          <span class="flex items-center justify-center gap-3">
            <span class="w-3 h-3 rounded-full bg-green-400" />
            I'm Single
          </span>
        </button>
        
        <button
          @click="selectStatus('taken')"
          class="w-full btn-secondary text-lg group"
          :disabled="loading"
        >
          <span class="flex items-center justify-center gap-3">
            <span class="w-3 h-3 rounded-full bg-orange-400" />
            I'm Taken
          </span>
        </button>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="mt-8 flex items-center justify-center gap-3">
        <div class="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span class="text-gray-400">Processing...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../config/emailjs'

const router = useRouter()
const loading = ref(false)

const selectStatus = async (status) => {
  loading.value = true
  
  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        subject: 'Status Update',
        message: `She said she is: ${status.toUpperCase()}`,
        status: status,
        timestamp: new Date().toLocaleString()
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    )
  } catch (error) {
    console.error('Email failed:', error)
  }
  
  loading.value = false
  
  if (status === 'single') {
    router.push('/puzzle')
  } else {
    router.push('/taken')
  }
}
</script>