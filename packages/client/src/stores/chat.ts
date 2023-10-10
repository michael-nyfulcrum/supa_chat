import { defineStore, storeToRefs } from 'pinia'
import { ref } from "vue";
import { type ChatMessage, type User } from "common";
import { useSupabaseStore } from "@/stores/supabase";
import { supabase } from "@/lib/supabaseClient";

export const useChatStore = defineStore('socket', () => {
  const supabaseStore = useSupabaseStore()
  const { user } = storeToRefs(supabaseStore)

  const messages = ref([] as Array<ChatMessage>)
  const roomId = ref<string | null>(null)

  // cache user data to reduce querying from db
  const users = ref([] as Array<User>)


  async function joinRoom(id: string) {
    try {
      const { data: existingRoom } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)


      if (existingRoom && existingRoom.length === 0) {
        const { error } = await supabase
          .from('rooms')
          .insert([{ id }])
        if (error) throw error
      }

      roomId.value = id

      const { data, error } = await supabase
        .from('messages')
        .select('id, content, created_at, sender_id,  users (id, email, avatar)')
        .eq('room_id', id)
        .order('created_at', { ascending: true })
      if (error) throw error
      // TODO: fix inferred type by supabase is wrong
      // @ts-ignore
      messages.value = data
      console.debug({ msg: messages.value })

      supabase
        .channel('any')
        .on('postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: 'room_id=eq.' + id,
          },
          handleNewMessages)
        .subscribe()
    } catch (e) {
      if (e instanceof Error) alert(e.message)
    }
  }

  async function handleNewMessages(payload: any) {
    const existingUser = users.value.find(user => user.id === payload.new.sender_id)
    if (!existingUser) {
      console.debug('Fetching new user')
      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', payload.new.sender_id)
        .single()
      const message: ChatMessage = { ...payload.new, users: user }
      messages.value.push(message)
      users.value.push(user)
    } else {
      console.debug('Using cached user')
      const message: ChatMessage = { ...payload.new, users: existingUser }
      messages.value.push(message)
    }
  }


  async function sendMessage(content: string) {
    if (!user.value) throw new Error('Not logged in')

    console.debug('Sending message', content)
    const sender_id = user.value.id;
    const room_id = roomId.value;
    await supabase
      .from('messages')
      .insert([{ room_id, sender_id, content }])
  }

  return {
    messages,
    joinRoom,
    sendMessage
  }
})
