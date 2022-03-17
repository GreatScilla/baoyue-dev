<template>
  <div>
    <add-expenseList type="detail" :data="data"></add-expenseList>
  </div>
</template>

<script>
import addExpenseList from './add'
export default {
  name: 'expenseListDetail',
  components: {
    addExpenseList
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