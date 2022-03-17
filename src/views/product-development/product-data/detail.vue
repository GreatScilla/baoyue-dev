<template>
  <div>
    <add-product-data :type="type" :data="data"></add-product-data>
  </div>
</template>

<script>
import addProductData from "./add";
export default {
  name: "editProductData",
  components: {
    addProductData,
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