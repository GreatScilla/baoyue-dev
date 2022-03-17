<template>
  <div>
    <add-purchase :type="type" :data="data"></add-purchase>
  </div>
</template>

<script>
import  addPurchase from './add'
export default {
  name: 'purchanseOrderEdit',
  components: {
    addPurchase
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