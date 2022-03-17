<template>
  <div>
    <add-pricing type="detail" :data="data"></add-pricing>
  </div>
</template>

<script>
import  addPricing from './add'
export default {
  name: 'pricingDetail',
  components: {
    addPricing
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>