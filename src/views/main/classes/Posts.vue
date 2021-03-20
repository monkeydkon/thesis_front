<template>
  <div class="d-flex flex-column">
    <div v-if="selectedClass.posts.length > 0">
      <div v-for="post in selectedClass.posts" :key="post.id" class="mt-5">
        <Post v-bind:post="post"/>
      </div>
    </div>
    <p v-else>No posts yet...</p>
  </div>
</template>

<script>
import Post from '@/components/Post'
export default {
    components: {Post},
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