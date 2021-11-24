<template>
  <div class="full">
    <div class="d-flex flex-column pt-10 full">
      <div class="header d-flex align-center">
        <div class="d-flex flex-column pl-10">
          <div class="d-flex align-center">
            <v-btn v-if="$store.getters.role.name == 'teacher'" icon color="red" @click="deleteClassDialog = true">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <div>
              <h1 class="secondary--text">{{ selectedClass.name }}</h1>
              <p class="mb-0 secondary--text">
                <span class="caption">by</span>
                {{
                  selectedClass.teacher.firstName +
                  " " +
                  selectedClass.teacher.lastName
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="d-flex align-center ml-12">
          <v-btn
            rounded
            color="grey lighten-2"
            class="ml-4"
            @click="$router.push({ name: 'posts' })"
            :disabled="$route.name == 'posts'"
            >Posts</v-btn
          >
          <v-btn
            rounded
            color="grey lighten-2"
            class="ml-4"
            @click="$router.push({ name: 'studentPosts' })"
            :disabled="$route.name == 'studentPosts'"
            >Student Posts</v-btn
          >
          <v-btn
            rounded
            color="grey lighten-2"
            class="ml-4"
            @click="$router.push({ name: 'members' })"
            :disabled="$route.name == 'members'"
            >Members</v-btn
          >
          <v-btn
            rounded
            color="grey lighten-2"
            class="ml-4"
            @click="$router.push({ name: 'material' })"
            :disabled="$route.name == 'material'"
            >Material</v-btn
          >
          <v-btn
            rounded
            color="grey lighten-2"
            class="ml-4"
            @click="$router.push({ name: 'assignments' })"
            :disabled="$route.name == 'assignments'"
            >Assignments</v-btn
          >
          <v-btn
            rounded
            color="grey lighten-2"
            class="ml-4"
            v-if="$store.getters.role.name == 'student'"
            @click="$router.push({ path: 'chat/1' })"
            :disabled="$route.name == 'chat'"
            >Chat</v-btn
          >

          <v-btn
            rounded
            color="grey lighten-2"
            class="ml-4"
            v-else-if="$store.getters.role.name == 'teacher'"
            @click="$router.push({ path: 'teacher-chat' })"
            :disabled="$route.name == 'teacher-chat'"
            >Chat</v-btn
          >
          <!-- <v-btn rounded color="grey lighten-2" class="ml-4">Material</v-btn> -->
        </div>

        <div class="d-flex align-center ml-auto mr-12">
          <v-text-field
            height="25"
            v-model="query"
            label="Search"
          ></v-text-field>
          <router-link
            :to="`/classes/${$route.params.id}/search/${query}`"
            tag="button"
          >
            <v-btn color="primary" rounded icon>
              <v-icon color="primary">mdi-arrow-right</v-icon>
            </v-btn>
          </router-link>
        </div>
      </div>

      <v-divider class="my-5"></v-divider>

      <router-view class="px-12"></router-view>
    </div>

    <v-dialog v-model="deleteClassDialog" width="400">
      <v-card>
        <v-card-text>
          <div class="d-flex flex-column align-center py-10">
            <h2 class="primary--text title-2 text-center">
              You are about to <span class="red--text">delete</span> the class
              named "<span class="secondary--text">{{
                selectedClass.name
              }}</span
              >".
            </h2>
            <h2 class="primary--text title-2 text-center">Are you sure?</h2>

            <div class="d-flex align-center mt-5">
              <v-btn
                color="red"
                class="white--text"
                rounded
                depressed
                @click="deleteClass"
                >Yes, I'm sure</v-btn
              >
              <v-btn
                color="primary"
                class="white--text ml-4"
                rounded
                depressed
                @click="deleteClassDialog = false"
                >No</v-btn
              >
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searching: false,
      query: null,
      deleteClassDialog: false,
    };
  },
  methods: {
    deleteClass() {
      axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/courses/${this.selectedClass.id}`
      )
      .then(res => {
         this.$store.dispatch("showSnack", {
            text: "Successfull delete",
            color: "primary",
            value: true,
          });
          this.$router.push('/dashboard')
        console.log(res)
      })
      .catch(err => {
         this.$store.dispatch("showSnack", {
            text: err.response.data,
            color: "red",
            value: true,
          });
        console.log(err)
      })
    },
  },
  computed: {
    selectedClass() {
      return this.$store.state.course.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.full {
  width: 100% !important;
}
</style>