<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
    <div class="glass rounded-3xl p-8 md:p-12 max-w-lg w-full text-center animate-scale-in">
      <!-- Icon -->
      <div 
        class="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
        style="box-shadow: 0 15px 40px rgba(16, 185, 129, 0.3);"
      >
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      
      <!-- Question -->
      <h2 class="font-display text-3xl md:text-4xl text-white mb-3">
        One last thing
      </h2>
      
      <p class="text-gray-400 mb-8 text-lg">
        Mind sharing your number?
      </p>
      
      <!-- Phone Input -->
      <div class="mb-6">
        <div class="flex items-center justify-center gap-2 glass-light rounded-2xl p-3">
          <!-- Country Code -->
          <div class="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
            <span class="text-xl">🇩🇿</span>
            <span class="text-white font-semibold">+213</span>
          </div>
          
          <!-- Phone Number Input -->
          <input
            v-model="phoneNumber"
            type="tel"
            placeholder="XX XXX XX XX"
            maxlength="12"
            @input="formatPhone"
            class="flex-1 bg-white/10 border-none rounded-xl px-4 py-3 text-white text-lg font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <!-- Validation Message -->
        <p v-if="phoneError" class="text-red-400 mt-3 text-sm">
          {{ phoneError }}
        </p>
      </div>
      
      <!-- Trust Message -->
      <div class="glass-light rounded-xl p-4 mb-8">
        <p class="text-gray-400 text-sm flex items-center justify-center gap-2">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your info stays between us
        </p>
      </div>
      
      <!-- Submit Button -->
      <button
        @click="submitPhone"
        :disabled="!isValidPhone || loading"
        class="btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <span v-if="loading" class="flex items-center gap-2">
          <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sending...
        </span>
        <span v-else class="flex items-center gap-2">
          Submit
          <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </button>
      
      <!-- Skip Option -->
      <button
        @click="skipPhone"
        class="mt-6 text-gray-500 hover:text-gray-300 transition-colors text-sm"
      >
        Skip for now
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../config/emailjs'

const router = useRouter()
const loading = ref(false)
const phoneNumber = ref('')
const phoneError = ref('')

const formatPhone = () => {
  let cleaned = phoneNumber.value.replace(/\D/g, '')
  cleaned = cleaned.substring(0, 9)
  
  let formatted = ''
  if (cleaned.length > 0) formatted += cleaned.substring(0, 2)
  if (cleaned.length > 2) formatted += ' ' + cleaned.substring(2, 5)
  if (cleaned.length > 5) formatted += ' ' + cleaned.substring(5, 7)
  if (cleaned.length > 7) formatted += ' ' + cleaned.substring(7, 9)
  
  phoneNumber.value = formatted
  
  if (cleaned.length > 0 && cleaned.length < 9) {
    phoneError.value = 'Please enter a complete number'
  } else if (cleaned.length === 9 && !['05', '06', '07'].includes(cleaned.substring(0, 2))) {
    phoneError.value = 'Must start with 05, 06, or 07'
  } else {
    phoneError.value = ''
  }
}

const isValidPhone = computed(() => {
  const cleaned = phoneNumber.value.replace(/\D/g, '')
  return cleaned.length === 9 && ['05', '06', '07'].includes(cleaned.substring(0, 2))
})

const submitPhone = async () => {
  if (!isValidPhone.value) return
  
  loading.value = true
  
  const fullNumber = '+213 ' + phoneNumber.value
  
  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        subject: 'Phone Number Received!',
        message: `Her phone number: ${fullNumber}`,
        phone: fullNumber,
        timestamp: new Date().toLocaleString()
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    )
  } catch (error) {
    console.error('Email failed:', error)
  }
  
  loading.value = false
  router.push('/final')
}

const skipPhone = () => {
  router.push('/final')
}
</script>