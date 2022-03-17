<template>
  <div>
    <add-purchase-inbound :type="type" :data="data"></add-purchase-inbound>
  </div>
</template>

<script>
import  addPurchaseInbound from './add'
export default {
  name: 'purchaseInboundEdit',
  components: {
    addPurchaseInbound
  },
  data () {
    return {
      type: 'edit',
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>