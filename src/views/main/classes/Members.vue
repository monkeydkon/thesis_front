<template>
  <div class="d-flex flex-column">
    <v-btn
      width="200"
      outlined
      color="primary"
      class="mb-10"
      rounded
      v-if="$store.getters.role.name == 'teacher'"
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
  </div>
</template>

<script>
import Member from "@/components/Member";
export default {
  components: {
    Member,
  },
  computed: {
    selectedClass() {
      return this.$store.state.course.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },
  },
};
</script>