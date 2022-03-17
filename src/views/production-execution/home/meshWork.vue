<template>
  <div>
    <pouring-work workType="meshWork"></pouring-work>
  </div>
</template>

<script>
import pouringWork from "./index";
export default {
  name: "meshWork",//网片报工
  components: {
    pouringWork,
  },
  data() {
    return {};
  },
  created() {},
};
</script>