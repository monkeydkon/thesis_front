<template>
  <v-app>
    <v-app-bar app color="primary" dense dark clipped-left>
      <Header/>
    </v-app-bar>
    <v-main>
      <router-view ></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  line-height: 1em;
}

button{
    text-transform: none !important;
  letter-spacing: 0px !important;
}

#container{
   min-height: calc(
    100vh - 64px
  );
}
</style>
