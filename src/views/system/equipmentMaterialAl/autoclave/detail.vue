<template>
  <div>
    <add-sale-order :type="edit" :data="data"></add-sale-order>
  </div>
</template>

<script>
import addSaleOrder from './add'
export default {
  name: 'editSaleOrder',
  components: {
    addSaleOrder
  },
  data () {
    return {
      data: {},
      edit: 'detail'
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>