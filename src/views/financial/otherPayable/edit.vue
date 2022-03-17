<template>
  <div>
    <add-otherPayable type="edit" :data="data"></add-otherPayable>
  </div>
</template>

<script>
import addOtherPayable from './add'
export default {
  name: 'editOtherPayable',
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