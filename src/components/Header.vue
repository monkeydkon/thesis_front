<template>
  <div class="d-flex flex-grow-1 justify-space-between">
    <v-icon @click="$router.push('/dashboard')">mdi-home</v-icon>
    <v-btn text outlined @click="$store.dispatch('logout')">Logout</v-btn>
  </div>
</template>