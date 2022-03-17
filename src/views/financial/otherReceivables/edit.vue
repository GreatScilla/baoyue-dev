<template>
  <div>
    <add-otherReceivables type="edit" :data="data"></add-otherReceivables>
  </div>
</template>

<script>
import addOtherReceivables from './add'
export default {
  name: 'editOtherReceivables',
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