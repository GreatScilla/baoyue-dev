<template>
  <div>
    <change-Wire-form :type="type" :data="data"></change-Wire-form>
  </div>
</template>

<script>
import changeWireForm from "./add";
export default {
  name: "detailChangeWireForm",
  components: {
    changeWireForm,
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