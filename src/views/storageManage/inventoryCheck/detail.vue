<template>
  <div>
    <add-inventory-check type="detail" :data="data"></add-inventory-check>
  </div>
</template>

<script>
import addInventoryCheck from './add'
export default {
  name: 'inventoryCheckDetail',
  components: {
    addInventoryCheck
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