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
        <h1 class="title">{{ post.title }}</h1>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-column">
          <p>{{ post.body }}</p>

          <p v-if="student" class="mb-0">
              written by:
              <span class="primary--text">
                  {{post.student.name}}
              </span>
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["post", "student"],
};
</script>