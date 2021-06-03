<template>
  <div>
    <v-form
      @submit.prevent="submit"
      class="mt-12 d-flex flex-column align-center form"
    >
      <h1 class="display-2 primary--text">Login</h1>
      <p class="caption primary--text mt-2">
        to see your classes and connect with people
      </p>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        class="textField"
        label="Email"
      ></v-text-field>
      <v-text-field
        class="textField"
        label="Password"
        type="password"
        :error-messages="passwordErrors"
        v-model="password"
      ></v-text-field>
      <v-btn
        color="primary"
        class="white--text mt-10"
        rounded
        width="300"
        height="30"
        type="submit"
        :loading="loading"
        >Submit</v-btn
      >

      <a
        class="text-decoration-underline mt-12 caption"
        @click="$router.push('/forgot')"
        >I forgot my password</a
      >

      <p class="caption primary--text">
        Dont have an account? Click
        <a class="text-decoration-underline" @click="$router.push('/register')">here</a> to register.
      </p>
    </v-form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

const loginFail = function () {
  return !this.loginFailed;
};

export default {
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      loginFailed: false,
    };
  },

  methods: {
    ...mapActions(["login"]),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        const credentials = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("login", credentials)
          .then((res) => {
            this.loading = false;
            this.$router.push("/dashboard");
          })
          .catch((err) => {
            this.loginFailed = true;
            this.loading = false;
            console.log(err);
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
      if (!this.$v.email.loginFail) errors.push("");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push("Required field");
      if (!this.$v.password.loginFail) errors.push("Wrong credentials");
      return errors;
    },
  },

  validations: {
    email: { required, email, loginFail },
    password: { required, loginFail },
  },

  watch: {
    email(val) {
      this.loginFailed = false;
    },
    password(val) {
      this.loginFailed = false;
    },
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