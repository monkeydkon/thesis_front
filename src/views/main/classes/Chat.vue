<template>
  <div class="chat">
    <div class="messages d-flex flex-column">
      <v-btn
        class="align-self-center mb-10"
        color="gray"
        rounded
        v-show="load"
        @click="
          $router.replace({
            name: 'chat',
            params: { page: parseInt($route.params.page) + 1 },
          })
        "
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
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  created() {
    this.getChat();

    this.interval = setInterval(() => {
      this.getChat();
    }, 5000);
  },

  destroyed() {
    clearInterval(this.interval);
  },

  data() {
    return {
      interval: null,
      chat: { messages: [], messages_count: 0 },
      message: null,
    };
  },

  methods: {
    dateFormat(date) {
      return moment(date).local().format("DD/MM/YY HH:mm");
    },
    getChat() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/api/courses/${this.$route.params.id}/chats`,
          {
            params: {
              page: this.$route.params.page,
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
          this.getChat();
          this.message = null;
        })
        .catch((err) => {
          console.log(err);
        });
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
</style>