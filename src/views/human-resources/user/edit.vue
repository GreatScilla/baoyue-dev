<template>
  <div>
    <add-user :type="type" :data="data"></add-user>
  </div>
</template>

<script>
import addUser from './add'
export default {
  name: 'editUser',
  components: {
    addUser
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