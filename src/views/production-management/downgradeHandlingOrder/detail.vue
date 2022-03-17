<template>
  <downgrade-handling-order
    :type="type"
    :data="data"
  ></downgrade-handling-order>
</template>

<script>
import downgradeHandlingOrder from "./edit";
export default {
  name: "detail",
  components: {
    downgradeHandlingOrder,
  },
  data() {
    return {
      type: "detail",
      data: {},
    };
  },
  created() {
    this.data = this.$route.query.data;
  },
};
</script>