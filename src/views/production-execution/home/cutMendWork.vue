<template>
  <div>
    <pouring-work workType="cutMendWork"></pouring-work>
  </div>
</template>

<script>
import pouringWork from "./index";
export default {
  name: "cutMendWork",//切补报工
  components: {
    pouringWork,
  },
  data() {
    return {};
  },
  created() {},
};
</script>