<template>
  <div>
    <add-sale-return type="edit" :data="data"></add-sale-return>
  </div>
</template>

<script>
import addSaleReturn from './add'
export default {
  name: 'editSaleReturn',
  components: {
    addSaleReturn
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