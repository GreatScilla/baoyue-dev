<template>
  <div>
    <add-allocation :type="type" :data="data"></add-allocation>
  </div>
</template>

<script>
import addAllocation from './add'
export default {
  name: 'editAllocation',
  components: {
    addAllocation
  },
  data () {
    return {
      type: 'detail',
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.row
  }
}
</script>