<template>
  <div class="d-flex flex-column align-center pt-12">
    <h1 class="display-2 primary--text">My blog</h1>
    <p class="subtitle mt-2 primary--text">
      Here you can see all your blog posts
    </p>
    <v-btn color="primary" @click="addingPost = !addingPost" width="150">
      {{ addingPost ? "Cancel" : "Create a new Post" }}
    </v-btn>

    <v-form
      v-if="addingPost"
      @submit.prevent="submit"
      class="form d-flex flex-column align-center"
    >
      <h2 class="subtitle primary--text">New Blog</h2>
      <v-text-field
        class="mt-10"
        label="Title"
        v-model="newBlog.title"
        :error-messages="newBlogTitleErrors"
      ></v-text-field>
      <v-textarea
        outlined
        class="mt-2"
        lang="Contect"
        v-model="newBlog.content"
        :error-messages="newBlogContentErrors"
      ></v-textarea>

      <v-btn color="primary" width="200" type="submit" class="mb-10"
        >Submit</v-btn
      >
    </v-form>

    <v-progress-circular
      v-if="loading"
      class="mt-10"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <div v-for="blog in $store.state.blog.blogs" :key="blog.id" class="mt-5">
      <BlogPost :blog="blog" />
    </div>
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost";
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  components: {
    BlogPost,
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("getBlogs")
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
  data() {
    return {
      addingPost: false,
      loading: false,
      newBlog: {
        title: null,
        content: null,
      },
    };
  },

  methods: {
    submit() {
      this.$v.newBlog.$touch();
      if (!this.$v.newBlog.$invalid) {
        this.$store
          .dispatch("postBlog", {
            title: this.newBlog.title,
            content: this.newBlog.content,
          })
          .then(() => {
            this.addingPost = false;
            
          });
      }
    },
  },

  validations: {
    newBlog: {
      title: { required },
      content: { required },
    },
  },

  computed: {
    newBlogTitleErrors() {
      const errors = [];
      if (!this.$v.newBlog.title.$dirty) return errors;
      if (!this.$v.newBlog.title.required) errors.push("Required field");
      return errors;
    },
    newBlogContentErrors() {
      const errors = [];
      if (!this.$v.newBlog.content.$dirty) return errors;
      if (!this.$v.newBlog.content.required) errors.push("Required field");
      return errors;
    },
  },

  watch: {
    addingPost(val) {
      if (!val) {
        this.newBlog.title = null;
        this.newBlog.content = null;
        this.$v.newBlog.$reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  border: 3px solid var(--v-primary-base);
  padding: 10px 50px;
  margin: 40px;
}
</style>