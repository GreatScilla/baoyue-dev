<template>
  <div>
    <add-employee-file :type="type" :data="data"></add-employee-file>
  </div>
</template>

<script>
import addEmployeeFile from './add'
export default {
  name: 'editEmployeeFile',
  components: {
    addEmployeeFile
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