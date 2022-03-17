<template>
  <div>
    <add-expenseList type="edit" :data="data"></add-expenseList>
  </div>
</template>

<script>
import addExpenseList from './add'
export default {
  name: 'editExpenseList',
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