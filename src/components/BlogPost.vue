<template>
  <v-hover v-slot="{ hover }" open-delay="0">
    <v-card
      outlined
      :elevation="hover ? 2 : 5"
      width="500"
      class="d-flex flex-column px-10 py-2"
    >
      <v-card-title>
        <div class="d-flex justify-space-between flex-grow-1">
          <h1 class="title text-center">{{ blog.title }}</h1>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                v-if="$store.state.auth.profile.id == blog.user_id"
                @click="deletePost(blog.id)"
              >
                <v-icon color="red">mdi-delete</v-icon></v-btn
              >
            </template>
            <span>Delete post</span>
          </v-tooltip>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="d-flex flex-column">
          <img class="image" :src="image(blog)" v-if="!!blog.img_path" />

          <p class="mt-5">
            {{ blog.content }}
          </p>

          <p class="caption">Posted at: {{ dateFormat(blog.created_at) }}</p>

          <v-divider></v-divider>

          <p class="mt-3">Comments: {{ blog.comments.length }}</p>

          <v-btn
            class="mr-auto"
            height="30"
            outlined
            color="primary"
            @click="comments = !comments"
            ><span v-if="!comments">Show</span><span v-else>Hide</span> comments</v-btn
          >

          <div class="d-flex flex-column align-start mt-10" v-if="comments">
            <v-textarea
              outlined
              class="mb-0 pb-0"
              label="Comment"
              v-model="comment"
              :error-messages="commentErrors"
            ></v-textarea>
            <v-btn color="primary mt-0 pt-0" @click="add(blog.id)">Add</v-btn>
          </div>

          <v-divider class="my-5"></v-divider>

          <div class="d-flex flex-column" :elevation="24" v-if="comments">
            <div
              class="d-flex flex-column pa-2 mt-2 comment"
              v-for="comment in blog.comments"
              :key="comment.id"
            >
              <div class="d-flex justify-space-between">
                <p class="primary--text">
                  {{ `${comment.user.firstName} ${comment.user.lastName}` }}
                </p>
                <p class="primary--text">
                  {{ dateFormat(comment.created_at) }}
                </p>
              </div>

              <div class="d-flex justify-space-between">
                <p>
                  {{ comment.comment }}
                </p>

                <v-btn
                  icon
                  v-if="$store.state.auth.profile.id == blog.user_id"
                  @click="deleteComment(blog.id, comment.id)"
                >
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import moment from "moment";
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  props: ["blog"],

  data() {
    return {
      comments: false,
      comment: null,
    };
  },

  methods: {
    dateFormat(date) {
      return moment(date).local().format("DD/MM/YYYY HH:mm");
    },

    image(blog) {
      if (!!!blog.img_path) return "";
      return `${process.env.VUE_APP_BASE_URL}/api/blogs/${blog.id}/image`;
      //   console.log(`${process.env.VUE_APP_BASE_URL}/api/user/blogs/${blog.id}/image`)
      //  return `${process.env.VUE_APP_BASE_URL}/api/user/blogs/${blog.id}/image`
      if (!blog.img_path) return;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/api/user/blogs/${blog.id}/image`, {
          responseType: "blob",
        })
        .then((res) => {
          //     console.log(window.URL.createObjectURL(new Blob([res.data])))
          //  return res.data
          return window.URL.createObjectURL(new Blob([res.data]));
        })
        .catch((err) => {
          console.log(err);
          return "";
        });
    },

    add(id) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/api/user/blogs/${id}/comment`, {
            comment: this.comment,
          })
          .then((res) => {
            this.blog.comments.push(res.data);
            this.$store.dispatch("showSnack", {
              text: "Successfull add",
              color: "primary",
              value: true,
            });
            this.$v.$reset();
            this.comment = null;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deletePost(id) {
      axios
        .delete(`${process.env.VUE_APP_BASE_URL}/api/user/blogs/${id}`)
        .then((res) => {
          console.log(res);
          this.$store.dispatch("getBlogs");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteComment(blog_id, comment_id) {
      axios
        .delete(
          `${process.env.VUE_APP_BASE_URL}/api/user/blogs/${blog_id}/comments/${comment_id}`
        )
        .then((res) => {
          this.blog.comments.splice(
            this.blog.comments.findIndex((comment) => comment.id == comment_id),
            1
          );
          this.$store.dispatch("showSnack", {
            text: "Successfull delete",
            color: "primary",
            value: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  validations: {
    comment: { required },
  },

  computed: {
    commentErrors() {
      const errors = [];
      if (!this.$v.comment.$dirty) return errors;
      if (!this.$v.comment.required) errors.push("Required field");
      return errors;
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  border: 3px solid var(--v-secondary-base);
}

.image {
  max-width: 500px;
  border: 1px solid var(--v-secondary-base);
}
</style>
