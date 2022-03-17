<template>
  <div>
    <add-purchase :type="type" :data="data"></add-purchase>
  </div>
</template>

<script>
import  addPurchase from './add'
export default {
  name: 'purchanseOrderDetail',
  components: {
    addPurchase
  },
  data () {
    return {
      type: 'detail',
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>