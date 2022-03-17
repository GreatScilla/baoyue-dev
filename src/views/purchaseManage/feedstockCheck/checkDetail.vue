<template>
  <div>
    <edit-check :type="type" :data="data"></edit-check >
  </div>
</template>

<script>
import editCheck from './check'
export default {
  name: 'checkDetail',
  components: {
    editCheck
  },
  data () {
    return {
      type: 'detail',
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>