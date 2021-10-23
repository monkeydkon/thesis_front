<template>
  <div class="d-flex flex-column">
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="primary darken-2"
    ></v-progress-linear>

    <v-alert
      width="500"
      dense
      outlined
      class="mt-12 align-self-center"
      type="error"
      v-if="error"
    >
      User count not be found. Please try again
    </v-alert>

    <div v-else-if="!!user" class="d-flex justify-space-around py-12">
      <div class="d-flex align-center">
        <v-tooltip top v-if="following">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              color="primary"
              @click="unfollow"
            >
              <v-icon>mdi-heart-off-outline</v-icon>
            </v-btn>
          </template>
          <span>Unfollow</span>
        </v-tooltip>

        <v-tooltip top v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              color="primary"
              @click="follow"
            >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
          </template>
          <span>Folllow</span>
        </v-tooltip>

        <v-avatar>
          <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
          <v-icon x-large color="secondary">mdi-account</v-icon>
        </v-avatar>
        <div class="d-flex flex-column justify-center">
          <p class="mb-0 primary--text">
            {{ user.firstName + " " + user.lastName }}
          </p>
          <p class="mb-0 primary--text">{{ user.email }}</p>
          
        </div>
         <div class="d-flex flex-column justify-center ml-10">
          <p class="mb-0 primary--text">
            {{ user.linkedin }}
          </p>
          <p class="mb-0 primary--text">{{ user.github }}</p>
          
        </div>
      </div>
      <p class="mb-0 primary--text">{{ user.summary }}</p>
    </div>
    <v-divider></v-divider>

    <div class="d-flex flex-column align-center" v-if="!!user">
      <h1 class="display-2 primary--text">Blogs</h1>
      <p class="subtitle mt-2 primary--text">
        Here you can see all of
        <span class="secondary--text font-weight-bold"
          >{{ user.firstName }}'s</span
        >
        blog posts
      </p>

      <div v-for="blog in user.blogs" :key="blog.id" class="mt-5">
        <BlogPost :blog="blog" />
      </div>
    </div>

    <!-- <v-text-field
      label="E-mail"
      class="mt-10"
      :value="user.email"
      readonly
    ></v-text-field>
    <v-text-field
      label="First name"
      :value="user.firstName"
      readonly
    ></v-text-field>
    <v-text-field
      label="Last name"
      :value="user.lastName"
      readonly
    ></v-text-field>
    <v-textarea
      label="Summary"
      readonly
      outlined
      :value="user.summary"
    ></v-textarea> -->
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost";
import axios from "axios";
export default {
  components: {
    BlogPost,
  },
  created() {
    this.getUser();
    this.getFollowStatus();
  },

  data() {
    return {
      loading: false,
      error: false,
      user: null,
      following: null,
    };
  },

  methods: {
    getUser() {
      this.loading = true;
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/api/user/${this.$route.params.id}`
        )
        .then((res) => {
          this.loading = false;
          this.user = res.data;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          console.log(err);
        });
    },

    getFollowStatus() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/api/user/following/${this.$route.params.id}`
        )
        .then((res) => {
          this.following = res.data == 1 ? true : false;
        })
        .catch((err) => {
          console.log(err);
        });
      //return;
    },

    follow() {
      this.loading = true;
      axios
        .post(
          `${process.env.VUE_APP_BASE_URL}/api/user/${this.$route.params.id}/follow`
        )
        .then(async (res) => {
          await this.getFollowStatus();
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    unfollow() {
      this.loading = true;
      axios
        .post(
          `${process.env.VUE_APP_BASE_URL}/api/user/${this.$route.params.id}/unfollow`
        )
        .then(async (res) => {
          await this.getFollowStatus();
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
};
</script>