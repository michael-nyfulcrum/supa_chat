<template>
  <div class="flex flex-col">
    <ConnectionState/>
    <ConnectionManager/>
  </div>
</template>

<script setup lang="ts">
import ConnectionManager from "@/components/ConnectionManager.vue";
import ConnectionState from "@/components/ConnectionState.vue";
</script>

<style scoped>
</style>
