<template>
  <div>
    <add-statement type="edit" :data="data"></add-statement>
  </div>
</template>

<script>
import  addStatement from './add'
export default {
  name: 'editStatement',
  components: {
    addStatement
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>