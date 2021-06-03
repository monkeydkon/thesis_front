<template>
  <div class="d-flex justify-center">
    <v-progress-circular
      indeterminate
      v-if="searching"
      color="primary darken-2"
    ></v-progress-circular>

    <div v-else class="d-flex flex-column mr-auto">
      <h1 class="display-1 primary--text">Search results</h1>
      <p class="mb-1 mt-5 primary--text">Posts</p>
      <v-divider></v-divider>
      <div v-if="results.posts.length > 0">
        <div v-for="post in results.posts" :key="post.id" class="mt-5">
          <Post v-bind:post="post" />
        </div>
      </div>
      <p v-else class="secondary--text body-2">No posts found...</p>

      <p class="mb-1 mt-10 primary--text">Student posts</p>
      <v-divider></v-divider>
      <div v-if="results.studentPosts.length > 0">
        <div v-for="post in results.studentPosts" :key="post.id" class="mt-5">
          <Post v-bind:post="post" v-bind:student="true" />
        </div>
      </div>
      <p v-else class="secondary--text body-2">No posts found...</p>

      <p class="mb-1 mt-10 primary--text">Members</p>
      <v-divider></v-divider>
      <div v-if="results.members.length > 0" class="">
        <Member
          class="mt-1"
          v-bind:student="member"
          v-for="member in results.members"
          :key="member.id"
        />
      </div>
      <p v-else class="secondary--text body-2">No members found..</p>

      <p class="mb-1 mt-10 primary--text">Material</p>
      <v-divider></v-divider>
      <v-card
        v-if="results.files.length > 0"
        class="mt-10"
        width="600"
        outlined
        elevation="3"
      >
        <v-data-table :headers="fileHeaders" :items="results.files">
          <template v-slot:[`item.download`]="{ item }">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  @click="download(item, 'file')"
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </template>
              <span>Download</span>
            </v-tooltip>

            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="$store.getters.role.name == 'teacher'"
                  v-bind="attrs"
                  v-on="on"
                  icon
                  @click="deleteFile(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
      <p v-else class="secondary--text body-2">No material found..</p>

      <p class="mb-1 mt-10 primary--text">Assignments</p>
      <v-divider></v-divider>

      <v-card
        v-if="results.assignments.length > 0"
        class="mt-10"
        width="600"
        outlined
        elevation="3"
      >
        <v-data-table :headers="assignmentHeaders" :items="results.assignments">
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex align-center">
              <v-tooltip right v-if="!!item.path">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    @click="download(item, 'assignment')"
                  >
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </template>
                <span>Download file</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-card>

      <p v-else class="secondary--text body-2">No assignments found..</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "@/components/Post";
import Member from "@/components/Member";
export default {
  components: { Post, Member },
  created() {
    this.search();
  },

  data() {
    return {
      searching: false,
      results: [],
      fileHeaders: [
        {
          value: "name",
          text: "File",
        },
        {
          text: "",
          value: "download",
        },
      ],

      assignmentHeaders: [
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
    };
  },

  methods: {
    download(item, type) {
      console.log(item);
      let url;
      if (type == "file") {
        url = `/api/courses/files/${item.id}`;
      } else if (type == "assignment") {
        url = `/api/courses/assignments/${item.id}/file`;
      }
      axios
        .get(`${process.env.VUE_APP_BASE_URL}${url}`, {
          responseType: "blob",
        })
        .then((res) => {
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            type == "file" ? item.name : item.title
          );
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      this.searching = true;
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/api/courses/${this.$route.params.id}/search/${this.$route.params.query}`
        )
        .then((res) => {
          this.searching = false;
          this.results = res.data;
          console.log(res);
        })
        .catch((err) => {
          this.searching = false;
          console.log(err);
        });
    },
  },
};
</script>