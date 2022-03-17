<template>
  <div>
    <add-pipePosition
      :type="type"
      :data="data"
    ></add-pipePosition>
  </div>
</template>

<script>
import addPipePosition from "./add";
export default {
  name: "pipePositionDetail",
  components: {
    addPipePosition,
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