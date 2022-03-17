<template>
  <div>
    <mesh-plan-order :type="type" :data="data"></mesh-plan-order>
  </div>
</template>

<script>
import meshPlanOrder from "./add";
export default {
  name: "detailMeshPlanOrder",
  components: {
    meshPlanOrder,
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