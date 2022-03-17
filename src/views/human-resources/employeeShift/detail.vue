<template>
  <div>
    <add-employee-shift :type="type" :data="data"></add-employee-shift>
  </div>
</template>

<script>
import addEmployeeShift from './add'
export default {
  name: 'employeeShiftDetail',
  components: {
    addEmployeeShift
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