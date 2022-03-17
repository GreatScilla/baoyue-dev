<template>
  <div>
    <edit-purchase :type="type" :data="data"></edit-purchase>
  </div>
</template>

<script>
import editPurchase from './edit'
export default {
  name: 'PurchaseDetail',
  components: {
    editPurchase
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