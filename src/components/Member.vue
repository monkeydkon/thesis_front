<template>
  <div>
    <v-menu
      v-model="menu"
      bottom
      right
      :close-on-content-click="false"
      transition="scale-transition"
      origin="top left"
    >
      <template v-slot:activator="{ on }">
        <v-chip pill v-on="on" style="min-width: 200px">
          <v-avatar left>
            <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
            <v-icon>mdi-account</v-icon>
          </v-avatar>
          {{ student.user.firstName + ' ' + student.user.lastName }}
        </v-chip>
      </template>
      <v-card width="350">
        <v-list color="primary" >
          <v-list-item>
            <v-list-item-avatar>
              <v-icon color="secondary">mdi-account</v-icon>
              <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
            </v-list-item-avatar>
            <v-list-item-content class="member" @click="$router.push(`/people/${student.user.id}`)">
              <v-list-item-title class="white--text">
                {{ student.user.firstName }}</v-list-item-title
              >
              <v-list-item-subtitle class="white--text">
               {{student.user.lastName}}
              </v-list-item-subtitle>
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
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle>{{student.user.email}}</v-list-item-subtitle>
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

<style lang="scss" scoped>
.member:hover{
  cursor: pointer;
}
</style>