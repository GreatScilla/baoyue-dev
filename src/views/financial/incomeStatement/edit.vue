<template>
  <div>
    <add-incomeStatement type="edit" :data="data"></add-incomeStatement>
  </div>
</template>

<script>
import addIncomeStatement from './add'
export default {
  name: 'editIncomeStatement',
  components: {
    addIncomeStatement
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