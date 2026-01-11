<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
    <!-- Success Particles -->
    <div v-if="solved" class="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <div
        v-for="n in 40"
        :key="n"
        class="particle"
        :style="{
          left: `${Math.random() * 100}%`,
          backgroundColor: ['#6366f1', '#8b5cf6', '#d946ef', '#06b6d4', '#10b981'][Math.floor(Math.random() * 5)],
          animationDelay: `${Math.random() * 2}s`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
        }"
      />
    </div>

    <div class="glass rounded-3xl p-6 md:p-8 max-w-md w-full text-center animate-scale-in">
      <!-- Header -->
      <div v-if="!solved">
        <div 
          class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
          style="box-shadow: 0 15px 40px rgba(99, 102, 241, 0.3);"
        >
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        </div>
        
        <h2 class="font-display text-2xl md:text-3xl text-white mb-2">
          Solve the Puzzle
        </h2>
        <p class="text-gray-400 mb-6">
          Tap tiles next to the empty space to move them
        </p>
        
        <!-- Move Counter -->
        <div class="glass-light rounded-full px-6 py-2 inline-block mb-6">
          <span class="text-gray-400">Moves: </span>
          <span class="text-white font-bold">{{ moves }}</span>
        </div>
      </div>
      
      <!-- Success Message -->
      <div v-else class="mb-6">
        <div 
          class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center animate-scale-in"
          style="box-shadow: 0 15px 40px rgba(16, 185, 129, 0.3);"
        >
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="font-display text-3xl text-white mb-2">
          Nice work!
        </h2>
        <p class="text-gray-400">
          Completed in {{ moves }} moves
        </p>
      </div>

      <!-- Puzzle Grid - 2x2 -->
      <div 
        class="grid grid-cols-2 gap-2 mx-auto mb-6 rounded-2xl overflow-hidden p-2 glass-light"
        :style="{ width: (puzzleSize + 16) + 'px', height: (puzzleSize + 16) + 'px' }"
      >
        <div
          v-for="(tile, index) in tiles"
          :key="index"
          @click="moveTile(index)"
          class="puzzle-piece rounded-lg"
          :class="{ 'empty': tile === 3 }"
          :style="getTileStyle(tile)"
        />
      </div>
      
      <!-- Buttons -->
      <div class="flex gap-3 justify-center flex-wrap">
        <button
          v-if="!solved"
          @click="shufflePuzzle"
          class="btn-secondary text-sm px-6 py-3"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Shuffle
          </span>
        </button>
        
        <button
          v-if="!solved"
          @click="showPreview = !showPreview"
          class="btn-secondary text-sm px-6 py-3"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ showPreview ? 'Hide' : 'Preview' }}
          </span>
        </button>
        
        <button
          v-if="solved"
          @click="continueJourney"
          class="btn-primary text-lg group"
        >
          <span class="flex items-center gap-2">
            Continue
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
      </div>
      
      <!-- Preview Modal -->
      <div
        v-if="showPreview"
        class="fixed inset-0 bg-black/90 flex items-center justify-center z-40 p-4"
        @click="showPreview = false"
      >
        <div class="relative animate-scale-in">
          <img
            :src="imageUrl"
            class="max-w-sm w-full rounded-2xl shadow-2xl"
            alt="Preview"
          />
          <p class="text-gray-400 mt-4 text-center text-sm">Tap anywhere to close</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Image from public folder
const imageUrl = ref('/image01.jpg')

// Puzzle state - 4 tiles (2x2), tile 3 is empty
const tiles = ref([0, 1, 2, 3])
const moves = ref(0)
const solved = ref(false)
const showPreview = ref(false)
const puzzleSize = ref(280)

// Grid size
const gridSize = 2

// Check if puzzle is solved
const checkSolved = () => {
  for (let i = 0; i < 3; i++) {
    if (tiles.value[i] !== i) return false
  }
  return true
}

// Get tile style with background position
const getTileStyle = (tile) => {
  if (tile === 3) return {} // Empty tile
  
  const row = Math.floor(tile / gridSize)
  const col = tile % gridSize
  
  return {
    backgroundImage: `url(${imageUrl.value})`,
    backgroundPosition: `${col * 100}% ${row * 100}%`,
    backgroundSize: '200% 200%'
  }
}

// Find empty tile index
const findEmptyIndex = () => tiles.value.indexOf(3)

// Check if move is valid
const canMove = (index) => {
  const emptyIndex = findEmptyIndex()
  const row = Math.floor(index / gridSize)
  const emptyRow = Math.floor(emptyIndex / gridSize)
  const col = index % gridSize
  const emptyCol = emptyIndex % gridSize
  
  return (
    (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
    (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  )
}

// Move tile
const moveTile = (index) => {
  if (solved.value) return
  if (!canMove(index)) return
  
  const emptyIndex = findEmptyIndex()
  const newTiles = [...tiles.value]
  ;[newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]
  tiles.value = newTiles
  moves.value++
  
  if (checkSolved()) {
    solved.value = true
  }
}

// Shuffle puzzle
const shufflePuzzle = () => {
  moves.value = 0
  solved.value = false
  
  // Perform random valid moves to ensure solvability
  for (let i = 0; i < 20; i++) {
    const emptyIndex = findEmptyIndex()
    const validMoves = []
    
    // Check adjacent positions
    if (emptyIndex >= gridSize) validMoves.push(emptyIndex - gridSize) // Up
    if (emptyIndex < gridSize * (gridSize - 1)) validMoves.push(emptyIndex + gridSize) // Down
    if (emptyIndex % gridSize !== 0) validMoves.push(emptyIndex - 1) // Left
    if (emptyIndex % gridSize !== gridSize - 1) validMoves.push(emptyIndex + 1) // Right
    
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
    const newTiles = [...tiles.value]
    ;[newTiles[randomMove], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[randomMove]]
    tiles.value = newTiles
  }
}

// Continue to next step
const continueJourney = () => {
  router.push('/eye-color')
}

// Shuffle on mount
onMounted(() => {
  shufflePuzzle()
})
</script>