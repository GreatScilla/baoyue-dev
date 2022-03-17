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
  name: "editPipePosition",
  components: {
    addPipePosition,
  },
  data() {
    return {
      data: {},
      type: "edit",
    };
  },
  created() {
    this.data = this.$route.query.data;
  },
};
</script>