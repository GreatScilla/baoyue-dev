<template>
  <div>
    <edit-schedule :type="type" :data="data"></edit-schedule>
  </div>
</template>

<script>
import editSchedule from './edit'
export default {
  name: 'scheduleDetail',
  components: {
    editSchedule
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