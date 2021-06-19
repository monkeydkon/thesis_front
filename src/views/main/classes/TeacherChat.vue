<template>
  <!-- <div class="chat d-flex mt-n5 ml-n12">
    <div class="users">
        <div class="user" v-for="user in users" :key="user.id">
           <p> {{user.firstName + ' ' +user.lastName}}</p>
        </div>
    </div>
    <div class="messages d-flex flex-column">lola</div>
  </div> -->

  <div class="chat d-flex flex-column">
    <div class="users d-flex">
      <v-autocomplete
        label="Student"
        class="mr-auto flex-grow-0"
        :items="users"
        item-text="lastName"
        item-value="id"
        v-model="user_id"
      ></v-autocomplete>
    </div>
    <div class="messages d-flex flex-column">
      <v-btn
        class="align-self-center mb-10"
        color="gray"
        rounded
        v-show="load"
        @click="loadOder()"
        >Load older...</v-btn
      >
      <div
        class="d-flex flex-column"
        v-for="message in chat.messages.slice().reverse()"
        :key="message.id"
      >
        <div
          :class="
            message.user_id == $store.state.auth.profile.id
              ? 'user-message'
              : 'teacher-message'
          "
          class="d-flex flex-column"
        >
          <span>{{ message.message }}</span>
          <span class="ml-auto mt-2 caption">{{
            dateFormat(message.created_at)
          }}</span>
        </div>
      </div>

      <v-divider class="my-5"></v-divider>

      <v-form class="d-flex flex-column mb-10" @submit.prevent="sendMessage">
        <v-text-field outlined label="message" v-model="message"></v-text-field>
        <v-btn
          :disabled="!message"
          rounded
          width="200"
          class="ml-auto"
          color="primary"
          type="submit"
          >send</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  created() {
    // if (!!this.$route.params.user_id) {
    //   this.user_id = this.$route.params.user_id;
    //   console.log(this.$route.params.user_id);
    // } else {
      this.getUsers();
 //  }
    this.interval = setInterval(() => {
        if(!!this.user_id){
            this.getChat(this.user_id)
        }
    }, 5000)
  },

  data() {
    return {
      page: 1,
      users: [],
      user_id: null,
      chat: { messages: [], messages_count: 0 },
      message: null,
    };
  },

  methods: {
    dateFormat(date) {
      return moment(date).local().format("DD/MM/YY HH:mm");
    },
    getUsers() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/api/courses/${this.$route.params.id}/users`
        )
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getChat(val) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/api/courses/${this.$route.params.id}/chat/user/${val}`,
          {
            params: {
              page: this.page,
            },
          }
        )
        .then((res) => {
          this.chat = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    sendMessage() {
      axios
        .post(
          `${process.env.VUE_APP_BASE_URL}/api/courses/${this.$route.params.id}/chats/${this.chat.id}/message`,
          {
            message: this.message,
          }
        )
        .then((res) => {
          this.getChat(this.user_id);
          this.message = null;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      //  console.log(this.chat)
    },
    loadOder() {
      //   $router.replace({
      //     name: "teacher-chat",
      //     params: {
      //       page: parseInt($route.params.page) + 1,
      //       user_id: $route.params.user_id,
      //     },
      //   });
      this.page++;
      this.getChat(this.user_id)
    },
  },

  watch: {
    user_id(val) {
      this.page = 1;
      this.getChat(val);
      //   this.$router.replace({
      //         name: 'teacher-chat',
      //         params: {
      //           page: parseInt(this.$route.params.page) + 1,
      //           user_id: this.$route.params.user_id,
      //         },
      //       })
    },
  },

  computed: {
    load() {
      if (!this.chat) return false;
      return this.chat?.messages_count > this.chat?.messages?.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  height: 100%;
}

.user-message {
  background-color: var(--v-primary-base);
  color: white;
  margin-left: auto;
  padding: 20px;
  margin-top: 5px;
  border-radius: 15px;
  max-width: 600px;
}

.teacher-message {
  background-color: var(--v-secondary-base);
  color: white;
  margin-right: auto;
  padding: 20px;
  margin-top: 5px;
  border-radius: 15px;
  max-width: 600px;
}

.user {
  background-color: rgb(110, 110, 110);
  padding: 20px 40px;
  border-bottom: 1px solid black;
  &:hover {
    background-color: var(--v-primary-base);
  }
}
</style>