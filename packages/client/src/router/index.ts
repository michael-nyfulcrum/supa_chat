import { createRouter, createWebHistory } from 'vue-router'
import LobbyView from "@/views/LobbyView.vue";
import RoomView from "@/views/RoomView.vue";
import { useSupabaseStore } from "@/stores/supabase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/:roomId?',
      name: 'lobby',
      component: LobbyView,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/room/:roomId',
      name: 'room',
      component: RoomView,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

// auth check
router.beforeEach(async (to, from, next) => {
  const supabaseStore = useSupabaseStore()
  const { getSession } = supabaseStore

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!supabaseStore.session) await getSession()
  if (requiresAuth && supabaseStore.session == null) next('/')
  else next()
})

export default router
