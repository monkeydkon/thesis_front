<template>
  <div>
    <v-menu
      v-model="menu"
      bottom
      right
      transition="scale-transition"
      origin="top left"
    >
      <template v-slot:activator="{ on }">
        <v-chip pill v-on="on" style="width: 200px">
          <v-avatar left>
            <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
            <v-icon>mdi-account</v-icon>
          </v-avatar>
          {{ student.name }}
        </v-chip>
      </template>
      <v-card width="350">
        <v-list color="primary">
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="white--text">
                {{ student.name }}</v-list-item-title
              >
              <v-list-item-subtitle class="white--text">{{
                student.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="menu = false">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-action>
              <v-icon>mdi-briefcase</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle>john@gmail.com</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>


<script>
export default {
  props: ["student"],
  data(){
      return{
          menu:false
      }
  }
};
</script>