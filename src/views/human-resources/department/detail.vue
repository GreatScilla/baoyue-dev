<template>
  <div>
    <add-department :type="type" :data="data"></add-department>
  </div>
</template>

<script>
import addDepartment from './add'
export default {
  name: 'departmentDetail',
  components: {
    addDepartment
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