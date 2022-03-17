<template>
  <div>
    <pouring-work workType="cuttingWork"></pouring-work>
  </div>
</template>

<script>
import pouringWork from "./index";
export default {
  name: "cuttingWork",//切割报工
  components: {
    pouringWork,
  },
  data() {
    return {};
  },
  created() {},
};
</script>