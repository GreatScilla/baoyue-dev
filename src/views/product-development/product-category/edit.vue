<template>
  <div>
    <add-product-category :type="type" :data="data"></add-product-category>
  </div>
</template>

<script>
import addProductCategory from "./add";
export default {
  name: "editProductCategory",
  components: {
    addProductCategory,
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