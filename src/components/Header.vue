<template>
    <div>
        <v-icon @click="$router.push('/dashboard')">mdi-home</v-icon>
         <v-btn @click="$store.dispatch('logout')">logout</v-btn>
    </div>
</template>