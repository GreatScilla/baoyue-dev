<template>
  <div>
    <add-employee-file :type="type" :data="data"></add-employee-file>
  </div>
</template>

<script>
import addEmployeeFile from './add'
export default {
  name: 'employeeFileDetail',
  components: {
    addEmployeeFile
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