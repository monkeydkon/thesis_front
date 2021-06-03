results.posts<template>
  <div class="d-flex flex-column">
    <v-btn
      class="align-self-start"
      outlined
      color="primary"
      @click="newPostDialog = true"
      v-if="$store.getters.role.name == 'student'"
      >Create a post</v-btn
    >
    <div v-if="selectedClass.student_posts.length > 0">
      <div
        v-for="post in selectedClass.student_posts"
        :key="post.id"
        class="mt-5"
      >
        <Post v-bind:post="post" v-bind:student="true" />
      </div>
    </div>
    <p v-else>No posts yet...</p>

    <v-dialog v-model="newPostDialog" width="500">
      <v-card class="pa-5">
        <v-card-text>
          <v-form
            @submit.prevent="submit"
            class="d-flex flex-column align-center"
          >
            <h2 class="title primary--text">Create a new post</h2>
            <v-text-field
              label="Title"
              v-model="title"
              :error-messages="titleErrors"
            ></v-text-field>
            <v-textarea
              label="Content"
              v-model="content"
              outlined
              class="mt-2"
              :error-messages="contentErrors"
            ></v-textarea>
            <v-btn color="primary" class="mt-5" type="submit" :loading="loading"
              >Submit</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Post from "@/components/Post";
import { required } from "vuelidate/lib/validators";
export default {
  components: { Post },
  data() {
    return {
      newPostDialog: false,
      title: null,
      content: null,
      loading: false,
    };
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const credentials = {
          title: this.title,
          content: this.content,
          course_id: this.$route.params.id,
        };

        this.loading = true;

        this.$store
          .dispatch("studentNewPost", credentials)
          .then((res) => {
            this.newPostDialog = false;
            this.loading = false;
          })
          .catch((err) => {
            this.newPostDialog = false;
            this.loading = false;
          });
      }
    },
  },

  validations: {
    title: { required },
    content: { required },
  },
  computed: {
    selectedClass() {
      return this.$store.state.course.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },

    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      if (!this.$v.title.required) errors.push("Required field");
      return errors;
    },

    contentErrors() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      if (!this.$v.content.required) errors.push("Required field");
      return errors;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>