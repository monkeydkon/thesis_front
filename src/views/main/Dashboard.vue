<template>
  <div
    class="d-flex flex-column justify-center align-center wrapper"
    id="container"
  >
    <div class="d-flex">
      <div class="box primary" @click="classesClick">
        <v-icon x-large class="white--text">mdi-google-classroom</v-icon>
        <h3 class="white--text mt-2">Classes</h3>
      </div>
      <div class="box primary" @click="$router.push('/profile')">
        <v-icon x-large class="white--text">mdi-account</v-icon>
        <h3 class="white--text mt-2">My profile</h3>
      </div>
    </div>
    <div class="d-flex">
      <div class="box primary" @click="$router.push('/blog')">
        <v-icon x-large class="white--text">mdi-post</v-icon>
        <h3 class="white--text mt-2">My blog</h3>
      </div>
      <div class="box primary" @click="$router.push('/people')">
        <v-icon x-large class="white--text">mdi-account-group</v-icon>
        <h3 class="white--text mt-2">People</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    classesClick() {
      this.$store.dispatch("goToClasses");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  margin: 20px 20px;
}

.box:hover {
  background-color: var(--v-secondary-base) !important;
  padding-bottom: 5px;
  height: 202px;
  width: 202px;
  -webkit-box-shadow: 10px 8px 59px -28px rgba(0, 0, 0, 1);
  -moz-box-shadow: 10px 8px 59px -28px rgba(0, 0, 0, 1);
  box-shadow: 10px 8px 59px -28px rgba(0, 0, 0, 1);
}
</style>