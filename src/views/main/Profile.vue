<template>
  <div class="d-flex flex-column align-center pt-12">
    <h1 class="display-2 primary--text">My profile</h1>

    <v-form
      class="d-flex flex-column align-center mt-12"
      @submit.prevent="submit"
    >
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
      <v-textarea label="Summary" outlined v-model="summary"></v-textarea>
      <v-btn color="primary" width="200" type="submit" :loading="loading"
        >Save</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  created() {
    this.summary = this.$store.state.auth.profile.summary;
  },

  data() {
    return {
      summary: null,
      loading: false,
    };
  },

  methods: {
    submit() {
      this.loading = true;
      this.$store
        .dispatch("updateSummary", {
          summary: this.summary,
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>