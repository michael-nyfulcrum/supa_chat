// pinia store for supabase

import { defineStore } from 'pinia'
import { supabase } from "@/lib/supabaseClient";
import { computed, ref } from "vue";
import type { Session } from "@supabase/supabase-js";
import getRandomAnimalEmoji from "@/utils/getRandomAnimalEmoji";

type DatabaseUser = { id: number, email: string, created_at: string, avatar: string };

export const useSupabaseStore = defineStore('supabase', () => {
    const session = ref<null | Session>(null)
    const loading = ref(false)
    const user = ref<null | DatabaseUser>(null)

    async function signIn(email: string) {
      loading.value = true
      try {
        const { error } = await supabase.auth.signInWithOtp({ email, })
        if (error) throw error
        alert('Check your email for the login link!')
      } catch (e) {
        if (e instanceof Error) alert(e.message)
      } finally {
        loading.value = false
      }
    }

    async function getSession() {
      loading.value = true
      try {
        const { error, data } = await supabase.auth.getSession()
        if (error) throw error
        session.value = data.session
        await syncUser()
      } catch (e) {
        if (e instanceof Error) alert(e.message)
      } finally {
        loading.value = false
      }
    }

    async function syncUser() {
      if (!session.value) throw new Error('Not logged in')
      const email = session.value.user.email

      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (!existingUser) {
        try {
          const avatar = getRandomAnimalEmoji()
          const { error, data } = await supabase
            .from('users')
            .insert([{ email, avatar }])
          if (error) throw error
          user.value = data
        } catch (e) {
          if (e instanceof Error) alert(e.message)
        }
      } else {
        user.value = existingUser
      }
    }

    async function changeAvatar(avatar: string) {
      if (!session.value || !user.value) throw new Error('Not logged in')
      try {
        const { error } = await supabase
          .from('users')
          .update({ avatar })
          .eq('id', user.value.id)
        if (error) throw error
        user.value.avatar = avatar
      } catch (e) {
        if (e instanceof Error) alert(e.message)
      }
    }

    return {
      user,
      session,
      loading,
      signIn,
      getSession,
      changeAvatar
    }
  }
)