<template>
  <div>
    <pouring-work workType="irigamaWork"></pouring-work>
  </div>
</template>

<script>
import pouringWork from "./index";
export default {
  name: "irigamaWork",//入釜报工
  components: {
    pouringWork,
  },
  data() {
    return {};
  },
  created() {},
};
</script>