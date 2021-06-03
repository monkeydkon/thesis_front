<template>
  <div class="d-flex justify-center">
    <v-navigation-drawer app clipped color="secondary" permanent width="200">
      <div class="d-flex flex-column pt-10 fullHeight">
        <v-btn
          text
          :class="$route.params.id == c.id ? 'primary--text' : 'white--text'"
          v-for="c in $store.state.course.classes"
          :key="c.id"
          @click="selectClass(c.id)"
          >{{ c.name }}</v-btn
        >

        <v-btn
          v-if="$store.getters.role.name == 'teacher'"
          class="mt-auto"
          text
          color="primary"
          @click="createClassDialog = true"
          >Create class</v-btn
        >
      </div>
    </v-navigation-drawer>

    <Class v-if="selectedClass" />

    <div v-else>
      <h1 class="pt-12 primary--text">You dont have any classes yet.</h1>
    </div>

    <v-dialog v-model="createClassDialog" width="400" :persistent="loading">
      <v-card>
        <v-card-text class="py-10">
          <v-form
            class="d-flex flex-column align-center"
            @submit.prevent="createClass"
          >
            <h1 class="primary--text mb-4">Create class</h1>
            <v-text-field
              label="Class name"
              v-model="className"
              :error-messages="classNameErrors"
            ></v-text-field>

            <v-btn
              type="submit"
              color="primary"
              width="200"
              class="mt-5"
              :loading="loading"
              >Submit</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Class from "@/components/Class";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Class,
  },
  data() {
    return {
      createClassDialog: false,
      loading: false,
      className: null,
    };
  },
  methods: {
    selectClass(id) {
      this.$store.dispatch("selectClass", id);
    },
    async createClass() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        await this.$store.dispatch("createClass", {
          name: this.className,
        });
        this.loading = false;
      }
    },
  },
  validations: {
    className: {
      required,
    },
  },
  computed: {
    selectedClass() {
      return this.$store.state.course.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },
    classNameErrors() {
      const errors = [];
      if (!this.$v.className.$dirty) return errors;
      if (!this.$v.className.required) errors.push("Required field");
      return errors;
    },
  },
  watch: {
    createClassDialog(val) {
      if (!val) {
        this.$v.className.$reset();
        this.className = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fullHeight {
  height: 100%;
}
</style>