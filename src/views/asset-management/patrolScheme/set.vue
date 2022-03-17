<template>
  <div>
    <add-contract :type="type"></add-contract>
  </div>
</template>

<script>
import addContract from "../checkingPlan/set.vue";
export default {
  name: "patrolSchemeSet",
  components: {
    addContract,
  },
  data() {
    return {
      type: "patrolSchemeSet",
      data: {},
    };
  },
  created() {},
};
</script>