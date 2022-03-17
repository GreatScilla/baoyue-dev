<template>
  <div>
    <cutMend-plan-order :type="type" :data="data"></cutMend-plan-order>
  </div>
</template>

<script>
import cutMendPlanOrder from "./add";
export default {
  name: "editCutMendPlanOrder",
  components: {
    cutMendPlanOrder,
  },
  data() {
    return {
      data: {},
      type: "edit",
    };
  },
  created() {
    this.data = this.$route.query.data;
  },
};
</script>