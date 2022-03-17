<template>
  <div>
    <add-shift :type="type" :data="data"></add-shift>
  </div>
</template>

<script>
import addShift from './add'
export default {
  name: 'shiftDetail',
  components: {
    addShift
  },
  data () {
    return {
      data: {},
      type: 'detail'
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>