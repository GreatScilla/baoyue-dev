<template>
  <div>
    <add-report :type="type" :data="data"></add-report>
  </div>
</template>

<script>
import addReport from './edit'
export default {
  name: 'reportDetail',
  components: {
    addReport
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