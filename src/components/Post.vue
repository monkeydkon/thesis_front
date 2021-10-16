<template>
  <v-hover v-slot="{ hover }" open-delay="0">
    <v-card
      outlined
      :elevation="hover ? 2 : 5"
      width="500"
      id="post"
      class="d-flex flex-column px-10 py-2"
    >
      <v-card-title>
        <div class="d-flex flex-grow-1 justify-space-between">
          <h1 class="title">{{ post.title }}</h1>

          <v-btn
            icon
            v-if="$store.getters.role.name == 'teacher'"
            @click="deletePost(post.id)"
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-column">
          <p>{{ post.content }}</p>

          <p v-if="student" class="mb-0 secondary--text">
            written by:
            <span class="primary--text">
              {{ post.user.firstName + " " + post.user.lastName }}
            </span>
          </p>

          <p class="caption">Posted at: {{ dateFormat(post.created_at) }}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import moment from "moment";
export default {
  props: ["post", "student"],
  methods: {
    dateFormat(date) {
      return moment(date).local().format("DD/MM/YYYY HH:mm");
    },

    deletePost(id) {
      this.$store.dispatch("deletePost", { id, student: this.student });
    },
  },
};
</script>