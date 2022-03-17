<template>
  <div>
    <add-otherReceivables type="detail" :data="data"></add-otherReceivables>
  </div>
</template>

<script>
import addOtherReceivables from './add'
export default {
  name: 'otherReceivableDetail',
  components: {
    addOtherReceivables
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