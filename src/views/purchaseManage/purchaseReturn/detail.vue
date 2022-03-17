<template>
  <div>
    <add-purchase-return :type="type" :data="data"></add-purchase-return>
  </div>
</template>

<script>
import addPurchaseReturn from './add'
export default {
  name: 'purchaseReturnDetail',
  components: {
    addPurchaseReturn
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