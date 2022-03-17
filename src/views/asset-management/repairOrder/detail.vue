<template>
  <div>
    <add-contract :type="type" :data="data"></add-contract>
  </div>
</template>

<script>
import  addContract from './add'
export default {
  name: 'contractEdit',
  components: {
    addContract
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