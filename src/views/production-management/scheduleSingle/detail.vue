<template>
  <div>
    <edit-product :type="type" :data="data"></edit-product>
  </div>
</template>

<script>
import editProduct from './edit'
export default {
  name: 'ProductDetail',
  components: {
    editProduct
  },
  data () {
    return {
      data: {},
      type: 'detail'
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>