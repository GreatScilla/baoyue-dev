<template>
  <div>
    <add-shuttleBus-position
      :type="type"
      :data="data"
    ></add-shuttleBus-position>
  </div>
</template>

<script>
import addShuttleBusPosition from "./add";
export default {
  name: "editShuttleBusPosition",
  components: {
    addShuttleBusPosition,
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