<template>
  <div class="d-flex flex-column align-center pt-12 mb-10">
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
        class="mt-10 staticWidth"
        label="Title"
        v-model="newBlog.title"
        :error-messages="newBlogTitleErrors"
      ></v-text-field>
      <v-textarea
        outlined
        class="mt-2 staticWidth"
        lang="Contect"
        v-model="newBlog.content"
        :error-messages="newBlogContentErrors"
      ></v-textarea>

      <v-file-input
        accept="image/*"
        class="staticWidth"
        v-model="photo"
        label="Photo"
      ></v-file-input>

      <img class="image my-5" v-if="photo" :src="photoPreview" />

      <v-btn color="primary" width="300" type="submit" class="mb-10"
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
      photo: null,
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
          .then((res) => {
            if (!!this.photo) {
              console.log("PEOS", res)
              const formData = new FormData();
              formData.append("image", this.photo);

              axios
                .post(
                  `${process.env.VUE_APP_BASE_URL}/api/user/blogs/${res.data.id}/image`,
                  formData,
                  {
                    headers: {
                      "content-type": "multipart/form-data",
                    },
                  }
                )
                .then(async () => {
                  await this.$store.dispatch("getBlogs");
                  this.addingPost = false;
                })
                .catch((err) => {
                  this.addingPost = false;
                });
            }else{
              console.log("NO PEOS")
               this.$store.dispatch("getBlogs");
            }
          })
          .catch((err) => {
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
    photoPreview() {
      if (!this.photo) return;
      return URL.createObjectURL(this.photo);
    },
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

.staticWidth {
  width: 300px;
}

.image {
  max-width: 400px;
  border: 3px solid var(--v-secondary-base);
}
</style>