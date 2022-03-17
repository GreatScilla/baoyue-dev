<template>
  <div>
    <add-costItems type="edit" :data="data"></add-costItems>
  </div>
</template>

<script>
import addCostItems from './add'
export default {
  name: 'editCostItems',
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