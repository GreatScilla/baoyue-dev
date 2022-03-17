<template>
  <div>
    <cutMend-plan-order :type="type" :data="data"></cutMend-plan-order>
  </div>
</template>

<script>
import cutMendPlanOrder from "./add";
export default {
  name: "detailCutMendPlanOrder",
  components: {
    cutMendPlanOrder,
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