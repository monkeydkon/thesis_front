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
      <Member
        class="mt-1"
        v-bind:student="member"
        v-for="member in selectedClass.members"
        :key="member.id"
      />
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
      console.log("lol");
      axios
        .post(
          `${process.env.VUE_APP_BASE_URL}/api/courses/${this.$route.params.id}/addUser`,
          {
            user_id: this.selectedUser.id,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/api/user/email`, {
          params: {
            email: v,
          },
        })
        .then((res) => {
          this.users = res.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>