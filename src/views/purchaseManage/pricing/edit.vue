<template>
  <div>
    <add-pricing type="edit" :data="data"></add-pricing>
  </div>
</template>

<script>
import  addPricing from './add'
export default {
  name: 'editPricing',
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