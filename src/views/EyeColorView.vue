<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
    <div class="glass rounded-3xl p-8 md:p-12 max-w-lg w-full text-center animate-scale-in">
      <!-- Icon -->
      <div 
        class="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
        style="box-shadow: 0 15px 40px rgba(6, 182, 212, 0.3);"
      >
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
      
      <!-- Question -->
      <h2 class="font-display text-3xl md:text-4xl text-white mb-3">
        Eye Color
      </h2>
      
      <p class="text-gray-400 mb-8 text-lg">
        What color are your eyes?
      </p>
      
      <!-- Color Options -->
      <div class="grid grid-cols-3 gap-3 mb-8">
        <button
          v-for="color in eyeColors"
          :key="color.name"
          @click="selectColor(color)"
          class="group flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:scale-105"
          :class="[
            selectedColor?.name === color.name 
              ? 'glass-light ring-2 ring-indigo-500' 
              : 'hover:glass-light'
          ]"
        >
          <div
            class="w-10 h-10 rounded-full mb-2 shadow-lg ring-2 ring-white/20"
            :style="{ backgroundColor: color.hex }"
          />
          <span class="text-gray-300 text-xs">{{ color.name }}</span>
        </button>
      </div>
      
      <!-- Custom Color Picker -->
      <div class="glass-light rounded-2xl p-6 mb-8">
        <p class="text-gray-400 mb-4 text-sm">Or pick your exact shade:</p>
        <div class="flex items-center justify-center gap-6">
          <input
            type="color"
            v-model="customColor"
            @input="selectCustomColor"
            class="w-14 h-14 rounded-xl cursor-pointer border-2 border-white/20 shadow-lg"
          />
          <div class="text-left">
            <p class="text-white font-mono text-lg">{{ selectedColor?.hex || customColor }}</p>
            <p class="text-gray-500 text-sm">{{ selectedColor?.name || 'Custom' }}</p>
          </div>
        </div>
      </div>
      
      <!-- Continue Button -->
      <button
        @click="submitColor"
        :disabled="!selectedColor && !customColor || loading"
        class="btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <span v-if="loading" class="flex items-center gap-2">
          <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sending...
        </span>
        <span v-else class="flex items-center gap-2">
          Continue
          <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </button>
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
const selectedColor = ref(null)
const customColor = ref('#8B4513')

const eyeColors = [
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Hazel', hex: '#8E7618' },
  { name: 'Green', hex: '#2E8B57' },
  { name: 'Blue', hex: '#4682B4' },
  { name: 'Gray', hex: '#708090' },
  { name: 'Amber', hex: '#FFBF00' },
  { name: 'Black', hex: '#1C1C1C' },
  { name: 'Honey', hex: '#EB9605' },
  { name: 'Violet', hex: '#8B008B' },
]

const selectColor = (color) => {
  selectedColor.value = color
  customColor.value = color.hex
}

const selectCustomColor = () => {
  selectedColor.value = { name: 'Custom', hex: customColor.value }
}

const submitColor = async () => {
  loading.value = true
  
  const colorToSend = selectedColor.value?.hex || customColor.value
  const colorName = selectedColor.value?.name || 'Custom'
  
  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        subject: 'Eye Color Selected',
        message: `Her eye color: ${colorName} (${colorToSend})`,
        eyeColor: colorToSend,
        eyeColorName: colorName,
        timestamp: new Date().toLocaleString()
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    )
  } catch (error) {
    console.error('Email failed:', error)
  }
  
  loading.value = false
  router.push('/phone')
}
</script>