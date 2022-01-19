<template>
  <div>

    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.interval = setInterval(() => {
      this.$store.dispatch("refresh");
    }, 1000 * 60 * 5);
  },

  data() {
    return {
      interval: null,
    };
  },

  destroyed() {
    clearInterval(this.interval);
  },
};
</script>