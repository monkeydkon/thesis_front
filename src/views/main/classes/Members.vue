<template>
  <div class="d-flex flex-column">
    <div v-if="selectedClass.students.length > 0">
      <Member
        class="mt-1"
        v-bind:student="member"
        v-for="member in selectedClass.students"
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
      return this.$store.state.classes.find(
        (c) => c.id == this.$route.params.id
      );
    },
  },
};
</script>