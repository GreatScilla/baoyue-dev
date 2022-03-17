<template>
  <div>
    <add-producePlan :type="type" :data="data"></add-producePlan>
  </div>
</template>

<script>
import addProducePlan from "./add";
export default {
  name: "detailProducePlan",
  components: {
    addProducePlan,
  },
  data() {
    return {
      data: {},
      type: "detail",
    };
  },
  created() {
    this.data = this.$route.query.data;
  },
};
</script>