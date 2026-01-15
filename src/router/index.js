import { createRouter, createWebHashHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import StatusView from '../views/StatusView.vue'
import TakenView from '../views/TakenView.vue'
import PuzzleView from '../views/PuzzleView.vue'
import EyeColorView from '../views/EyeColorView.vue'
import PhoneView from '../views/PhoneView.vue'
import FinalView from '../views/FinalView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),  // ← Changed this
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/status',
      name: 'status',
      component: StatusView
    },
    {
      path: '/taken',
      name: 'taken',
      component: TakenView
    },
    {
      path: '/puzzle',
      name: 'puzzle',
      component: PuzzleView
    },
    {
      path: '/eye-color',
      name: 'eyeColor',
      component: EyeColorView
    },
    {
      path: '/phone',
      name: 'phone',
      component: PhoneView
    },
    {
      path: '/final',
      name: 'final',
      component: FinalView
    }
  ]
})

export default router