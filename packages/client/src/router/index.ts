import { createRouter, createWebHistory } from 'vue-router'
import LobbyView from "@/views/LobbyView.vue";
import RoomView from "@/views/RoomView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lobby',
      component: LobbyView
    },    
    {
      path: '/room/:id',
      name: 'room',
      component: RoomView,
      props: true
    },
  ]
})

export default router
