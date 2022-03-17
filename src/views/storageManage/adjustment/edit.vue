<template>
  <div>
    <add-adjustment type="edit" :data="data"></add-adjustment>
  </div>
</template>

<script>
import addAdjustment from './add'
export default {
  name: 'editAddAdjustment',
  components: {
    addAdjustment
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