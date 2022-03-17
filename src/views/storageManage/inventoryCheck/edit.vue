<template>
  <div>
    <add-inventory-check type="edit" :data="data"></add-inventory-check>
  </div>
</template>

<script>
import addInventoryCheck from './add'
export default {
  name: 'editInventoryCheck',
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