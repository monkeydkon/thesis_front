<template>
  <div class="d-flex justify-center">
    <v-navigation-drawer app clipped color="secondary" permanent width="200">
      <div class="d-flex flex-column pt-10">
        <v-btn
          text
          :class="$route.params.id == c.id ? 'primary--text' : 'white--text'"
          v-for="c in $store.state.course.classes"
          :key="c.id"
          @click="selectClass(c.id)"
          >{{ c.name }}</v-btn
        >
      </div>
    </v-navigation-drawer>

    <Class/>
  </div>
</template>

<script>
import Class from "@/components/Class";
export default {
  components: {
    Class,
  },
  data() {
    return {};
  },
  methods:{
    selectClass(id){
      this.$store.dispatch('selectClass', id)
    }
  }
};
</script>