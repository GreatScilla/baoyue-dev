<template>
  <add-sale-order :type="type" :data="data"></add-sale-order>
</template>

<script>
import addSaleOrder from './add'
export default {
  name: 'detail',
   components: {
    addSaleOrder
  },
  data () {
    return {
      type: 'detail',
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>