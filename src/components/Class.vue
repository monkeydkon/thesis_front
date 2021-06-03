<template>
  <div class="full">
    <div class="d-flex flex-column pt-10 full">
      <div class="header d-flex align-center">
        <div class="d-flex flex-column pl-10">
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
  </div>
</template>

<script>
export default {

  data() {
    return {
      searching: false,
      query: null,
    };
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