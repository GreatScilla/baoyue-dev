<template>
  <div>
    <add-department :type="type" :data="data"></add-department>
  </div>
</template>

<script>
import addDepartment from './add'
export default {
  name: 'editDepartment',
  components: {
    addDepartment
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