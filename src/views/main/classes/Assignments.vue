<template>
  <div>
    <v-btn
      class="align-self-start"
      outlined
      color="primary"
      @click="newAssignmentDialog = true"
      v-if="$store.getters.role.name == 'teacher'"
      >New assignment</v-btn
    >
    <v-card class="mt-10" width="600" outlined elevation="3">
      <v-data-table :headers="headers" :items="selectedClass.assignments">
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex align-center">
            <v-tooltip right v-if="!!item.path">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon @click="download(item)">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </template>
              <span>Download file</span>
            </v-tooltip>

              <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="$store.getters.role.name == 'teacher'"
                v-bind="attrs"
                v-on="on"
                icon
                @click="deleteAssignment(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="newAssignmentDialog" width="400">
      <v-card class="py-10">
        <v-card-text>
          <v-form
            @submit.prevent="submit"
            class="d-flex flex-column align-center"
          >
            <h2 class="title primary--text">New Assignment</h2>

            <v-text-field
              label="Title"
              class="staticWidth"
              v-model="newAssignment.title"
              :error-messages="titleErrors"
            ></v-text-field>
            <v-text-field
              label="Description"
              class="staticWidth"
              v-model="newAssignment.description"
            ></v-text-field>
            <v-file-input
              label="File"
              chips
              :error-messages="fileErrors"
              class="staticWidth"
              v-model="newAssignment.file"
            ></v-file-input>
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Submit Date"
                  class="staticWidth"
                  v-model="endDateFormat"
                  :readonly="true"
                  :error-messages="endDateErrors"
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="newAssignment.end_date"></v-date-picker>
            </v-menu>
            <v-btn
              color="primary"
              class="mt-5"
              width="200"
              :loading="newAssignmentLoading"
              type="submit"
              >Add</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { required } from "vuelidate/lib/validators";

const file_size_validation = (value, vm) =>  {
  if (!value) {
    return true;
  }
  let file = value;
  return (file.size < 2097152);
};

export default {
  data() {
    return {
      headers: [
        {
          value: "title",
          text: "Title",
        },
        {
          value: "description",
          text: "Description",
        },
        {
          value: "end_date",
          text: "Due date",
        },
        {
          value: "actions",
        },
      ],
      newAssignmentDialog: false,
      newAssignmentLoading: false,
      newAssignment: {
        title: null,
        description: null,
        end_date: null,
        file: null,
      },
    };
  },

  methods: {
    download(item) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/api/courses/assignments/${item.id}/file`,
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          console.log(res);
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", item.title);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
     deleteAssignment(item) {
      console.log(item);
      this.$store.dispatch("deleteAssignment", item.id);
    },
    submit() {
      this.$v.newAssignment.$touch();
      if (!this.$v.newAssignment.$invalid) {
        this.newAssignmentLoading = true;
        // const credentials = {
        //   title: this.newAssignment.title,
        //   description: this.newAssignment.description,
        //   end_date: this.newAssignment.end_date,
        //   course_id: this.$route.params.id,
        // };

        let formData = new FormData();
        formData.append("title", this.newAssignment.title);
        if (!!this.newAssignment.description) {
          formData.append("description", this.newAssignment.description);
        }

        formData.append("end_date", this.newAssignment.end_date);
        if (!!this.newAssignment.file) {
          formData.append(
            "file",
            this.newAssignment.file,
            this.newAssignment.file.name
          );
        }

        formData.append("course_id", this.$route.params.id);
        this.$store
          .dispatch("newAssignment", formData)
          .then(() => {
            this.newAssignmentLoading = false;
            this.newAssignmentDialog = false;
          })
          .catch((err) => {
            this.newAssignmentLoading = false;
            this.newAssignmentDialog = false;
          });
      }
    },
  },

  validations: {
    newAssignment: {
      title: { required },
      end_date: { required },
      file: { required ,file_size_validation},
    },
  },

  computed: {
    endDateFormat() {
      if (!this.newAssignment.end_date) return "";
      return moment(this.newAssignment.end_date).format("DD/MM/YYYY");
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.newAssignment.title.$dirty) return errors;
      if (!this.$v.newAssignment.title.required) errors.push("Required field");
      return errors;
    },
    endDateErrors() {
      const errors = [];
      if (!this.$v.newAssignment.end_date.$dirty) return errors;
      if (!this.$v.newAssignment.end_date.required)
        errors.push("Required field");
      return errors;
    },
    fileErrors() {
      const errors = [];
      if (!this.$v.newAssignment.file.$dirty) return errors;
      if (!this.$v.newAssignment.file.required) errors.push("Required field");
       if (!this.$v.newAssignment.file.file_size_validation) errors.push("2MB maximum file size");
      return errors;
    },
    selectedClass() {
      return this.$store.state.course.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },
  },

  watch: {
    newAssignmentDialog(v) {
      if (!v) {
        this.newAssignment = {
          title: null,
          description: null,
          end_date: null,
        };
        this.$v.newAssignment.$reset();
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
