<template>
  <div>
    <v-form
      @submit.prevent="submit"
      class="mt-12 d-flex flex-column align-center form"
    >
      <h1 class="display-2 primary--text">Register</h1>
      <p class="caption primary--text mt-2">
        to connect with people and join classes
      </p>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        class="textField"
        label="Email"
      ></v-text-field>
      <v-text-field
        class="textField"
        label="First name"
        v-model="firstName"
        :error-messages="firstNameErrors"
      ></v-text-field>
      <v-text-field
        class="textField"
        label="Last name"
        v-model="lastName"
        :error-messages="lastNameErrors"
      ></v-text-field>
      <v-select
        label="Role"
        class="textField"
        :items="roles"
        item-text="name"
        item-value="id"
        v-model="role_id"
        :error-messages="roleErrors"
      ></v-select>
      <v-text-field
        class="textField"
        label="Password"
        type="password"
        :error-messages="passwordErrors"
        v-model="password"
      ></v-text-field>
      <v-text-field
        class="textField"
        label="Confirm Password"
        type="password"
        :error-messages="confirmPasswordErrors"
        v-model="confirmPassword"
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
        Already have an account? Click
        <a class="text-decoration-underline" @click="$router.push('/login')"
          >here</a
        >
        to login.
      </p>
    </v-form>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import axios from "axios";

const registerFail = function () {
  return !this.registerFailed;
};

export default {
  created() {
    axios
      .get(`${process.env.VUE_APP_BASE_URL}/api/roles`)
      .then((res) => {
        this.roles = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      confirmPassword: null,
      role_id: null,

      loading: false,

      registerFailed: false,

      roles: [],
    };
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        const credentials = {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          role_id: this.role_id,
        };
        this.$store
          .dispatch("register", credentials)
          .then((res) => {
            this.loading = false;
            this.$router.push("/login");
            this.$store.dispatch("showSnack", {
              text: "Successfull register",
              color: "primary",
              value: true,
            });
          })
          .catch((err) => {
            this.registerFailed = true;
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
      if (!this.$v.email.registerFail) errors.push("Email already in use");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push("Required field");
      if (!this.$v.password.minLength)
        errors.push("Must be at least 6 characters long");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      if (!this.$v.confirmPassword.required) errors.push("Required field");
      if (!this.$v.confirmPassword.minLength)
        errors.push("Must be at least 6 characters long");
      if (!this.$v.confirmPassword.sameAs)
        errors.push("Must be same as password");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      if (!this.$v.firstName.required) errors.push("Required field");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      if (!this.$v.lastName.required) errors.push("Required field");
      return errors;
    },
    roleErrors() {
      const errors = [];
      if (!this.$v.role_id.$dirty) return errors;
      if (!this.$v.role_id.required) errors.push("Required field");
      return errors;
    },
  },

  validations: {
    email: { required, email, registerFail },
    password: { required, minLength: minLength(6) },
    confirmPassword: {
      required,
      sameAs: sameAs("password"),
      minLength: minLength(6),
    },
    firstName: { required },
    lastName: { required },
    role_id: { required },
  },

  watch: {
    email(val) {
      this.registerFailed = false;
    },
    password(val) {
      this.registerFailed = false;
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