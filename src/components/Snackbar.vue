<template>
  <v-snackbar
    :timeout="2000"
    class="mb-12 pb-5"
    :color="$store.state.snack.color"
    v-model="$store.state.snack.value"
  >
    <div class="d-flex justify-space-between align-center">
      <p class="mb-0">{{ $store.state.snack.text }}</p>
      <v-btn
        icon
        @click="
          $store.dispatch('showSnack', {
            text: null,
            color: null,
            value: false,
          })
        "
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>
