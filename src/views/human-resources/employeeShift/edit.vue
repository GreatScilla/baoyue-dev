<template>
  <div>
    <add-employee-shift :type="type" :data="data"></add-employee-shift>
  </div>
</template>

<script>
import addEmployeeShift from './add'
export default {
  name: 'editEmployeeShift',
  components: {
    addEmployeeShift
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