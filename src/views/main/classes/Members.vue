<template>
  <div class="d-flex flex-column">
    <v-btn
      width="200"
      outlined
      color="primary"
      class="mb-10"
      rounded
      v-if="$store.getters.role.name == 'teacher'"
      @click="newMemberDialog = true"
      >Add a new member..</v-btn
    >
    <div v-if="selectedClass.members.length > 0" class="">
      <div
        v-for="member in selectedClass.members"
        :key="member.id"
        class="d-flex align-center"
      >
        <v-btn
          icon
          @click="removeMember(member.user.id)"
          v-if="$store.getters.role.name == 'teacher'"
        >
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
        <Member class="mt-1" v-bind:student="member" />
      </div>
    </div>
    <p v-else>There are no members yet..</p>

    <v-dialog v-model="newMemberDialog" width="500">
      <v-card class="py-10">
        <v-card-text>
          <v-form
            @submit.prevent="addMember"
            class="d-flex flex-column align-center"
          >
            <h2 class="title primary--text text-center mb-10">
              Add a new student to your class
            </h2>
            <v-autocomplete
              label="Email"
              clearable
              :search-input.sync="email"
              v-model="selectedUser"
              :items="users"
              item-text="email"
              return-object
            ></v-autocomplete>

            <v-btn
              :loading="addingUser"
              color="primary"
              class="mt-10"
              :disabled="!selectedUser"
              type="submit"
              >Add user to class</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Member from "@/components/Member";
import axios from "axios";
export default {
  components: {
    Member,
  },

  data() {
    return {
      newMemberDialog: false,
      email: null,
      selectedUser: null,
      users: [],
      addingUser: false,
    };
  },

  methods: {
    addMember() {
      // axios
      //   .post(
      //     `${process.env.VUE_APP_BASE_URL}/api/courses/${this.$route.params.id}/addUser`,
      //     {
      //       user_id: this.selectedUser.id,
      //     }
      //   )
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.$store
        .dispatch("addMemberToClass", {
          course_id: this.$route.params.id,
          user_id: this.selectedUser.id,
        })
        .then(() => {
          this.newMemberDialog = false;
          this.selectedUser = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    removeMember(id) {
      this.$store.dispatch("removeMemberFromClass", {
        course_id: this.$route.params.id,
        user_id: id,
      });
    },
  },

  computed: {
    selectedClass() {
      return this.$store.state.course.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },
  },

  watch: {
    email(v) {
      if (!!v) {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/api/user/email`, {
            params: {
              email: v,
            },
          })
          .then((res) => {
            this.users = res.data.filter((user) => {
              if (
                this.selectedClass.members.find((i) => i.user.id == user.id)
              ) {
                return false;
              }
              return true;
            });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>