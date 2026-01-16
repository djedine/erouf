<template>
  <div class="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-50 animate-pulse-slow" />
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full filter blur-[150px] opacity-50 animate-pulse-slow animation-delay-2000" />
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-600 rounded-full filter blur-[120px] opacity-40 animate-float" />
      
      <!-- Grid Pattern -->
      <div 
        class="absolute inset-0 opacity-20"
        style="background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 50px 50px;"
      />
      
      <!-- Floating Particles -->
      <div 
        v-for="n in 30" 
        :key="n"
        class="particle absolute rounded-full bg-white"
        :style="{
          width: Math.random() * 4 + 2 + 'px',
          height: Math.random() * 4 + 2 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: Math.random() * 10 + 10 + 's'
        }"
      />
    </div>

    <!-- Main Content -->
    <div class="relative z-10 text-center px-4">
      <!-- Stage 1: Initial Reveal -->
      <div v-if="stage === 1" class="animate-fade-in">
        <div class="mb-8">
          <span class="text-6xl animate-bounce-in">👀</span>
        </div>
        <h1 
          class="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wider"
          style="text-shadow: 0 0 40px rgba(168, 85, 247, 0.5);"
        >
          Ready?
        </h1>
        <button 
          @click="nextStage"
          class="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-full transform hover:scale-110 transition-all duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] animate-pulse-glow"
        >
          Show Me
        </button>
      </div>

      <!-- Stage 2: Ha Howa -->
      <div v-else-if="stage === 2" class="animate-zoom-in">
        <div class="relative">
          <!-- Glowing Ring -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-purple-500 animate-spin-slow opacity-30" />
            <div class="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border-2 border-pink-500 animate-reverse-spin opacity-40" />
          </div>
          
          <h1 
            class="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-gradient-text py-4"
            style="filter: drop-shadow(0 0 30px rgba(236, 72, 153, 0.5));"
          >
            HA HOWA
          </h1>
        </div>
        
        <p class="text-2xl md:text-3xl text-gray-400 mt-8 animate-fade-in-delay">
          Wait for it...
        </p>
        
        <!-- Auto advance after 2 seconds -->
        <div class="mt-12">
          <div class="w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-loading-bar" />
          </div>
        </div>
      </div>

      <!-- Stage 3: Siri 9owdi - The Reveal -->
      <div v-else-if="stage === 3" class="animate-explode-in">
        <!-- Explosion Effect -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            v-for="n in 20" 
            :key="'exp'+n"
            class="absolute w-4 h-4 rounded-full animate-explode-particle"
            :style="{
              backgroundColor: ['#a855f7', '#ec4899', '#8b5cf6', '#f472b6'][n % 4],
              animationDelay: n * 0.05 + 's',
              '--angle': (n * 18) + 'deg'
            }"
          />
        </div>

        <!-- Main Text -->
        <div class="relative">
          <h1 
            class="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 animate-shake"
            style="text-shadow: 0 0 60px rgba(236, 72, 153, 0.8), 0 0 120px rgba(168, 85, 247, 0.6);"
          >
            SIRI
          </h1>
          <h1 
            class="text-7xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-fast"
            style="filter: drop-shadow(0 0 40px rgba(236, 72, 153, 0.7));"
          >
            9OWDI
          </h1>
        </div>

        <!-- Emojis Rain -->
        <div class="mt-12 flex justify-center gap-4 text-5xl">
          <span class="animate-bounce" style="animation-delay: 0s">😂</span>
          <span class="animate-bounce" style="animation-delay: 0.1s">🤣</span>
          <span class="animate-bounce" style="animation-delay: 0.2s">💀</span>
          <span class="animate-bounce" style="animation-delay: 0.3s">😭</span>
          <span class="animate-bounce" style="animation-delay: 0.4s">🔥</span>
        </div>

        <!-- Subliminal Message -->
        <p class="text-xl text-gray-500 mt-12 animate-fade-in-delay">
          You really thought... 💀
        </p>

        <!-- Restart -->
        <button 
          @click="restart"
          class="mt-12 px-8 py-3 border border-gray-700 text-gray-500 rounded-full hover:border-purple-500 hover:text-purple-400 transition-all duration-300 text-sm"
        >
          🔄 Again?
        </button>
      </div>
    </div>

    <!-- Corner Decorations -->
    <div class="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-purple-500/30 m-8" />
    <div class="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-pink-500/30 m-8" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const stage = ref(1)

const nextStage = () => {
  stage.value = 2
}

const restart = () => {
  stage.value = 1
}

// Auto-advance from stage 2 to 3
watch(stage, (newStage) => {
  if (newStage === 2) {
    setTimeout(() => {
      stage.value = 3
    }, 2500)
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(0) translateX(20px); }
  75% { transform: translateY(20px) translateX(10px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes reverse-spin {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes gradient-text {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes gradient-fast {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes loading-bar {
  0% { width: 0%; }
  100% { width: 100%; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes explode-particle {
  0% { 
    transform: translate(0, 0) scale(1); 
    opacity: 1; 
  }
  100% { 
    transform: translate(
      calc(cos(var(--angle)) * 200px), 
      calc(sin(var(--angle)) * 200px)
    ) scale(0); 
    opacity: 0; 
  }
}

@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

@keyframes zoom-in {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes explode-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes fade-in-delay {
  0%, 50% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
  50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
}

@keyframes particle-float {
  0%, 100% { 
    transform: translateY(0) translateX(0); 
    opacity: 0.3;
  }
  50% { 
    transform: translateY(-100px) translateX(50px); 
    opacity: 0.8;
  }
}

/* Animation Classes */
.animate-float { animation: float 8s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
.animate-spin-slow { animation: spin-slow 20s linear infinite; }
.animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
.animate-gradient-text { 
  background-size: 200% 200%;
  animation: gradient-text 3s ease infinite; 
}
.animate-gradient-fast { 
  background-size: 200% 200%;
  animation: gradient-fast 2s ease infinite; 
}
.animate-loading-bar { animation: loading-bar 2.5s ease-out forwards; }
.animate-shake { animation: shake 0.5s ease-in-out; }
.animate-bounce-in { animation: bounce-in 0.6s ease-out; }
.animate-zoom-in { animation: zoom-in 0.5s ease-out; }
.animate-explode-in { animation: explode-in 0.6s ease-out; }
.animate-fade-in { animation: fadeIn 0.5s ease-out; }
.animate-fade-in-delay { animation: fade-in-delay 1.5s ease-out forwards; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.animate-explode-particle { animation: explode-particle 1s ease-out forwards; }
.particle { animation: particle-float 15s ease-in-out infinite; }

.animation-delay-2000 { animation-delay: 2s; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>