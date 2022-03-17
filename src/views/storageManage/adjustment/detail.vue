<template>
  <div>
    <add-adjustment type="detail" :data="data"></add-adjustment>
  </div>
</template>

<script>
import addAdjustment from './add'
export default {
  name: 'addAdjustmentDetail',
  components: {
    addAdjustment
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