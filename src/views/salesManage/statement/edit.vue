<template>
  <div>
    <add-statement type="edit"  :data="data"></add-statement>
  </div>
</template>

<script>
import addStatement from './add'
export default {
  name: 'editSaleStatement',
  components: {
    addStatement
  },
  data () {
    return {
      data: [],
      form: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>