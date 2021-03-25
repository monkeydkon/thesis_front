<template>
  <div class="d-flex flex-column">
    <v-btn
      class="align-self-start"
      outlined
      color="primary"
      @click="newPostDialog = true"
      >Create a post</v-btn
    >
    <div v-if="selectedClass.studentPosts.length > 0">
      <div
        v-for="post in selectedClass.studentPosts"
        :key="post.id"
        class="mt-5"
      >
        <Post v-bind:post="post" v-bind:student="true" />
      </div>
    </div>
    <p v-else>No posts yet...</p>

    <v-dialog v-model="newPostDialog">
        <v-card>
            xaxa
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Post from "@/components/Post";
export default {
  components: { Post },
  data() {
    return {
      newPostDialog: false,
    };
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
</style>