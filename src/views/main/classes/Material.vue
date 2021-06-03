<template>
  <div>
    <v-btn
      class="align-self-start"
      outlined
      color="primary"
      @click="newFileDialog = true"
      v-if="$store.getters.role.name == 'teacher'"
      >Upload a new file</v-btn
    >
    <v-card class="mt-10" width="600" outlined elevation="3">
      <v-data-table :headers="headers" :items="selectedClass.files">
        <template v-slot:[`item.download`]="{ item }">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon @click="download(item)">
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </template>
            <span>Download</span>
          </v-tooltip>

          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-if="$store.getters.role.name == 'teacher'" v-bind="attrs" v-on="on" icon @click="deleteFile(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="newFileDialog" width="400">
      <v-card class="py-10">
        <v-card-text>
          <v-form
            @submit.prevent="uploadFile"
            class="d-flex flex-column align-center"
          >
            <h2 class="title primary--text">Upload a new file</h2>
            <v-file-input
              label="File"
              chips
              class="staticWidth"
              v-model="file"
              :error-messages="fileErrors"
            ></v-file-input>
            <v-btn color="primary" class="mt-5" :loading="loading" type="submit"
              >Submit</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  data() {
    return {
      newFileDialog: false,
      loading: false,
      file: null,
      headers: [
        {
          value: "name",
          text: "File",
        },
        {
          text: "",
          value: "download",
        },
      ],
    };
  },
  methods: {
    download(item) {
      //console.log(item);
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/api/courses/files/${item.id}`, { responseType: "blob" })
        .then((res) => {
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", item.name);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteFile(item) {
      console.log(item);
    },

    uploadFile() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;

        let formData = new FormData();
        formData.append("file", this.file, this.file.name);
        formData.append("course_id", this.$route.params.id);

        this.$store
          .dispatch("newFile", formData)
          .then((res) => {
            console.log(res);
            this.newFileDialog = false;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      }
    },
  },
  validations: {
    file: { required },
  },
  computed: {
    fileErrors() {
      const errors = [];
      if (!this.$v.file.$dirty) return errors;
      if (!this.$v.file.required) errors.push("Required");
      return errors;
    },
    selectedClass() {
      return this.$store.state.course.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },
  },

  watch: {
    newFileDialog(v) {
      if (!v) {
        this.file = null;
        this.$v.$reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.staticWidth {
  width: 200px;
}
</style>