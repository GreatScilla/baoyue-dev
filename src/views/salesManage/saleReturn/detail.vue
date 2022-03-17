<template>
  <div>
    <add-sale-return type="detail" :data="data"></add-sale-return>
  </div>
</template>

<script>
import addSaleReturn from './add'
export default {
  name: 'saleReturnDetail',
  components: {
    addSaleReturn
  },
  data () {
    return {}
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>