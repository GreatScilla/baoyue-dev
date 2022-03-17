<template>
  <div>
    <add-sale-outbound :type="type" :data="data"></add-sale-outbound>
  </div>
</template>

<script>
import addSaleOutbound from './add'
export default {
  name: 'editSaleOutbound',
  components: {
    addSaleOutbound
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