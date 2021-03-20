<template>
  <div>
    <v-form
      @submit.prevent="submit"
      class="mt-12 d-flex flex-column align-center form"
    >
      <h1 class="display-2 primary--text">Password Reset</h1>
      <p class="caption primary--text mt-2">
        Please, write down your email and we will send you a reset link
      </p>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        class="textField"
        label="Email"
      ></v-text-field>
      <v-btn
        color="primary"
        class="white--text mt-10"
        rounded
        width="300"
        height="30"
        type="submit"
        >Submit</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: null,
    };
  },

  methods: {
    ...mapActions(["forgot"]),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.forgot(this.email).then((res) => {
          console.log(res);
        });
      }
    },
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.required) errors.push("Required field");
      if (!this.$v.email.email) errors.push("Invalid email address");
      return errors;
    },
  },

  validations: {
    email: { required, email }
  },
};
</script>

<style lang="scss" scoped>
.textField {
  width: 300px !important;
}

.form {
  border: 3px solid var(--v-primary-base);
  padding: 100px 200px;
}
</style>