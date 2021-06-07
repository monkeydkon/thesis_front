<template>
  <div class="d-flex flex-column align-center pt-12 pb-12">
    <h1 class="display-2 primary--text">My profile</h1>

    <v-form
      class="d-flex flex-column align-center mt-12"
      @submit.prevent="submit"
    >
     <v-hover v-slot="{ hover }">
      <v-img
        alt="Profile image"
        id="image"
        src="https://picsum.photos/id/11/500/300"
      >
        <v-expand-transition>
          <div  class="red flex-grow-1" style="height:100%;">
                <v-btn
            v-if="hover"
            class="d-flex transition-fast-in-fast-out "

          >
            text
          </v-btn>
          </div>
      
        </v-expand-transition></v-img
      >
        </v-hover>
      <v-text-field
        label="E-mail"
        :value="$store.state.auth.profile.email"
        readonly
      ></v-text-field>
      <v-text-field
        label="First name"
        :value="$store.state.auth.profile.firstName"
        readonly
      ></v-text-field>
      <v-text-field
        label="Last name"
        :value="$store.state.auth.profile.lastName"
        readonly
      ></v-text-field>
      <v-text-field
        label="LinkedIn"
        v-model="linkedin"
        :error-messages="linkedinErrors"
      ></v-text-field>
      <v-text-field
        label="Github"
        v-model="github"
        :error-messages="githubErrors"
      ></v-text-field>
      <v-textarea label="Summary" outlined v-model="summary"></v-textarea>
      <v-btn color="primary" width="200" type="submit" :loading="loading"
        >Save</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { url } from "vuelidate/lib/validators";
export default {
  created() {
    this.summary = this.$store.state.auth.profile.summary;
    this.linkedin = this.$store.state.auth.profile.linkedin;
    this.github = this.$store.state.auth.profile.github;
  },

  data() {
    return {
      summary: null,
      linkedin: null,
      github: null,
      loading: false,
    };
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("updateProfile", {
            summary: this.summary,
            github: this.github,
            linkedin: this.linkedin,
          })
          .then(() => {
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },

  validations: {
    linkedin: { url },
    github: { url },
  },

  computed: {
    linkedinErrors() {
      const errors = [];
      if (!this.$v.linkedin.$dirty) return errors;
      if (!this.$v.linkedin.url) errors.push("Invalid url");
      return errors;
    },
    githubErrors() {
      const errors = [];
      if (!this.$v.github.$dirty) return errors;
      if (!this.$v.github.url) errors.push("Invalid url");
      return errors;
    },
  },
};
</script>

<style lang="scss" scoped>
#image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 250px;
  border-radius: 50%;
  border: 4px solid var(--v-primary-base);
}
</style>