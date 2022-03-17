<template>
  <div>
    <add-purchase-return :type="type" :data="data"></add-purchase-return>
  </div>
</template>

<script>
import addPurchaseReturn from './add'
export default {
  name: 'editPurchaseReturn',
  components: {
    addPurchaseReturn
  },
  data () {
    return {
      data: {},
      type: 'edit'
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>