<template>
  <div>
    <add-costItems type="detail" :data="data"></add-costItems>
  </div>
</template>

<script>
import addCostItems from './add'
export default {
  name: 'costItemsDetail',
  components: {
    addCostItems
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