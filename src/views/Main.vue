<template>
  <div>
    <!-- <v-navigation-drawer app clipped color="secondary" expand-on-hover width="200">
      <div class="d-flex flex-column pt-10">
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
        <v-btn color="white" text>
            <v-icon large>mdi-home</v-icon>
            <span>text</span>
        </v-btn>
      </div>
    </v-navigation-drawer> -->
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.interval = setInterval(() => {
      this.$store.dispatch("refresh");
    }, 1000 * 60);
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