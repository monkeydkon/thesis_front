<template>
  <div class="d-flex flex-column pt-10 full">
    <div class="header d-flex align-center">
      <div class="d-flex flex-column pl-10">
        <h1 class="secondary--text">{{ selectedClass.name }}</h1>
        <p class="mb-0 secondary--text">
          <span class="caption">by</span>
          {{ selectedClass.teacher }}
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
        <!-- <v-btn rounded color="grey lighten-2" class="ml-4">Material</v-btn> -->
      </div>
    </div>

    <v-divider class="my-5"></v-divider>

    <router-view class=" px-12"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    selectedClass() {
      return this.$store.state.classes.find(
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