<template>
  <form class="flex flex-col gap-3" @submit.prevent="handleLogin">
    <h1 class="header">Supa Chat!</h1>
    <p class="description">Sign in via magic link with your email below</p>

    <div class="p-inputgroup flex-1">
      <InputText v-model="email" placeholder="Email" @keyup.enter="handleLogin()"/>
      <Button v-if="!loading" @click="handleLogin()">Send magic link</Button>
      <Button v-else disabled>Send magic link</Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSupabaseStore } from "@/stores/supabase";
import router from "@/router";
import { storeToRefs } from "pinia";

const supabaseStore = useSupabaseStore()
const { signIn, session } = supabaseStore
const { loading } = storeToRefs(supabaseStore)
const email = ref('')

const handleLogin = async () => signIn(email.value)

// on mounted check if we have a session then redirect to lobby
if (session) router.push({ name: 'lobby' })


</script>