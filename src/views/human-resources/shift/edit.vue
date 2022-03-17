<template>
  <div>
    <add-shift :type="type" :data="data"></add-shift>
  </div>
</template>

<script>
import addShift from './add'
export default {
  name: 'editShift',
  components: {
    addShift
  },
  data () {
    return {
      data: {},
      type: 'edit'
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>