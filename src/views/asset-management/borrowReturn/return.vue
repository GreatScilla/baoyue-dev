<template>
  <div>
    <add-contract :type="type" :data="data"></add-contract>
  </div>
</template>

<script>
import addContract from "./add";
export default {
  name: "contractReturn",
  components: {
    addContract,
  },
  data() {
    return {
      type: "return",
      data: {},
    };
  },
  created() {
    this.data = this.$route.query.data;
  },
};
</script>