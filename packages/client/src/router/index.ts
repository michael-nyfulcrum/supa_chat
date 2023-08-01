import {createRouter, createWebHistory} from 'vue-router'
import LobbyView from "@/views/LobbyView.vue";
import RoomView from "@/views/RoomView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:roomId?',
            name: 'lobby',
            component: LobbyView,
            props: true
        },
        {
            path: '/room/:roomId',
            name: 'room',
            component: RoomView,
            props: true
        },
    ]
})

export default router
