<template>
  <div>
    <add-incomeStatement type="detail" :data="data"></add-incomeStatement>
  </div>
</template>

<script>
import addIncomeStatement from './add'
export default {
  name: 'incomeStatementDetail',
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