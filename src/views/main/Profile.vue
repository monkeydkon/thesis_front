<template>
  <div class="d-flex flex-column align-center pt-12 pb-12">
    <h1 class="display-2 primary--text">My profile</h1>

    <v-form
      class="d-flex flex-column align-center mt-12"
      @submit.prevent="submit"
    >
      <v-hover v-slot="{ hover }">
        <v-img alt="Profile image" id="image" :src="url">
          <v-expand-transition>
            <div
              v-if="hover"
              class="insideImage d-flex justify-center align-center"
            >
              <!-- <v-btn >
                text
              </v-btn> -->
              <p
                v-if="!changedImage"
                style="z-index: 2"
                class="white--text mb-0"
                @click="$refs.file.click()"
              >
                Change Profile Picture
              </p>
              <v-btn
                v-else
                style="z-index: 21"
                icon
                @click="
                  url = $store.state.auth.profile.img_path;
                  changedImage = false;
                "
              >
                <v-icon color="white">mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-expand-transition></v-img
        >
      </v-hover>

      <!-- <img :src="url" id="image" alt="" /> -->

      <input
        style="display: none"
        id="file"
        type="file"
        ref="file"
        @change="previewImage"
        accept="image/*"
      />

      <!-- <v-btn icon class="align-self-end">
        <v-icon>mdi-image</v-icon>
      </v-btn> -->

      <v-text-field
        label="E-mail"
        class="staticWidth"
        :value="$store.state.auth.profile.email"
        readonly
      ></v-text-field>
      <v-text-field
        label="First name"
        class="staticWidth"
        :value="$store.state.auth.profile.firstName"
        readonly
      ></v-text-field>
      <v-text-field
        label="Last name"
        class="staticWidth"
        :value="$store.state.auth.profile.lastName"
        readonly
      ></v-text-field>
      <v-text-field
        label="LinkedIn"
        class="staticWidth"
        v-model="linkedin"
        :error-messages="linkedinErrors"
      ></v-text-field>
      <v-text-field
        label="Github"
        class="staticWidth"
        v-model="github"
        :error-messages="githubErrors"
      ></v-text-field>
      <v-textarea
        class="staticWidth"
        label="Summary"
        outlined
        v-model="summary"
      ></v-textarea>
      <v-btn
        color="primary"
        class="staticWidth"
        width="200"
        type="submit"
        :loading="loading"
        >Save</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { url } from "vuelidate/lib/validators";
const file_size_validation = (value, vm) =>  {
  if (!value) {
    return true;
  }
  let file = value;
  return (file.size < 2097152);
};
export default {
  created() {
    this.summary = this.$store.state.auth.profile.summary;
    this.linkedin = this.$store.state.auth.profile.linkedin;
    this.github = this.$store.state.auth.profile.github;
    this.url =  `${process.env.VUE_APP_BASE_URL}/api/user/${this.$store.state.auth.profile.id}/image` //this.$store.state.auth.profile.img_path;
  },

  data() {
    return {
      changedImage: false,
      url: null,
      summary: null,
      linkedin: null,
      github: null,
      loading: false,
    };
  },

  methods: {
    previewImage: function (event) {
      // Reference to the DOM input element
      var input = event.target;
      console.log(input.files);
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        if(input.files[0].size >= 2097152){
           this.$store.dispatch("showSnack", {
              text: "Must be maximum 2MB",
              color: "red",
              value: true,
            });
          return
        }
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.url = e.target.result;
          this.changedImage = true;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
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
            console.log("CHAGE", this.changedImage);
            if (this.changedImage) {
              const formData = new FormData();
              const image = document.querySelector("#file");
              formData.append("image", image.files[0]);

              return this.$store.dispatch("updateProfilePicture", formData);
            } else {
              this.loading = false;
            }
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
  height: 300px;
  width: 300px;
  border-radius: 50%;
  border: 4px solid var(--v-primary-base);
}

.insideImage {
  height: 300px;
  width: 300px;
  border-radius: 50%;
  background-color: var(--v-primary-base);
  opacity: 0.4;
}
.staticWidth {
  width: 300px;
}
</style>