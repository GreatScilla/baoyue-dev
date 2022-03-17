<template>
  <div>
    <add-otherPayable type="detail" :data="data"></add-otherPayable>
  </div>
</template>

<script>
import addOtherPayable from './add'
export default {
  name: 'otherPayableDetail',
  components: {
    addOtherPayable
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