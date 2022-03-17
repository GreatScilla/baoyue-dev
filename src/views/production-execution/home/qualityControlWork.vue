<template>
  <div>
    <pouring-work workType="qualityControlWork"></pouring-work>
  </div>
</template>

<script>
import pouringWork from "./index";
export default {
  name: "qualityControlWork",//质检报工
  components: {
    pouringWork,
  },
  data() {
    return {};
  },
  created() {},
};
</script>