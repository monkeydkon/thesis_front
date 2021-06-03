<template>
  <v-hover v-slot="{ hover }" open-delay="0">
    <v-card
      outlined
      :elevation="hover ? 2 : 5"
      width="500"
      class="d-flex flex-column px-10 py-2"
    >
      <v-card-title>
        <div class="d-flex justify-center">
          <h1 class="title text-center">{{ blog.title }}</h1>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="d-flex flex-column">
          <p>
            {{ blog.content }}
          </p>

          <p class="caption">Posted at: {{ dateFormat(blog.created_at) }}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import moment from "moment";
export default {
  props: ["blog"],
  methods: {
    dateFormat(date) {
      return moment(date).local().format("DD/MM/YYYY HH:mm");
    },
  },
};
</script>