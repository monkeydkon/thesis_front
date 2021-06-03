<template>
  <v-hover v-slot="{ hover }" open-delay="20">
    <v-card
      outlined
      :elevation="hover ? 2 : 5"
      width="500"
      class="d-flex flex-column"
    >
      <v-card-text>
        <div class="d-flex flex-column">
          <p class="primary--text font-weight-bold mb-0 name" @click="$router.push(`/people/${user.id}`)">
             {{user.firstName + ' ' + user.lastName}}
          </p>

          <p class="caption">{{user.email}}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
    props: ["user"],
}
</script>

<style lang="scss" scoped>
.name:hover {
  cursor: pointer;
}
</style>