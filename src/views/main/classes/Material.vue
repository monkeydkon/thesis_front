<template>
  <div>
    <v-card width="600" outlined elevation="3">
      <v-data-table :headers="headers" :items="selectedClass.files">
        <template v-slot:[`item.download`]="{ item }">
            <v-btn icon @click="download(item)">
                <v-icon>mdi-download</v-icon>
            </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          value: "name",
          text: "File",
        },
        {
          text: "Download",
          value: "download",
        },
      ],
    };
  },
  methods:{
      download(item){
          console.log(item)
      }
  },
  computed: {
    selectedClass() {
      return this.$store.state.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },
  },
};
</script>