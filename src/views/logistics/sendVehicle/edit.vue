<template>
  <send-vehicle-add type="edit" :id="id" />
</template>

<script>
import sendVehicleAdd from "./add.vue";
export default {
  components: {
    sendVehicleAdd,
  },
  data() {
    return {
      id: "",
    };
  },
  created() {
    this.id = this.$route.query.row.id;
  },
};
</script>
<style lang="scss" scoped>
</style>