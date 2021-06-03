<template>
  <div>
    <v-progress-linear
      indeterminate
      v-if="loading"
      color="primary darken-2"
    ></v-progress-linear>

    <div class="d-flex flex-column align-center pt-12">
      <h1 class="display-2 primary--text">People</h1>
      <p class="subtitle mt-2 primary--text">
        Here you can see people you follow
      </p>

      <div class="people" v-if="!!following">
        <div class="grid-item mx-3" v-for="i in following" :key="i.id">
          <Person :user="i.following" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Person from "@/components/Person";
import axios from "axios";
export default {
  components: {
    Person,
  },
  created() {
    this.getPeople();
  },
  data() {
    return {
      loading: false,
      following: [],
    };
  },
  methods: {
    getPeople() {
      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/api/user/following`)
        .then((res) => {
          this.following = res.data;
          this.loading = false;
          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.people {
  display: grid;
  // grid-template-columns: auto auto auto;
  // grid-template-rows: auto;
  grid-template-columns: repeat(3, 1fr);

  //  grid-template-rows: repeat(auto-fill, 120px);
  grid-row-gap: 0.5em;
  grid-column-gap: 1em;
  //   grid-template-columns: 3 10 123;
  //   grid-template-rows: 2;
}
@media (max-width: 1300px) {
  .people {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .people {
    grid-template-columns: repeat(1, 1fr);
  }
}
.grid-item {
  //   border: 2px solid var(--v-primary-base);
  //   border-radius: 2px;

  width: 400px;
  text-align: center;
}
</style>