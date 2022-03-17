<template>
  <div>
    <pouring-work workType="outKettleWork"></pouring-work>
  </div>
</template>

<script>
import pouringWork from "./index";
export default {
  name: "outKettleWork",//出釜报工
  components: {
    pouringWork,
  },
  data() {
    return {};
  },
  created() {},
};
</script>