<template>
  <div>
    <edit-todoList :type="type" :data="data"></edit-todoList >
  </div>
</template>

<script>
import editTodoList from './edit'
export default {
  name: 'todoListDetail',
  components: {
    editTodoList
  },
  data () {
    return {
      data: {},
      type: 'detail'
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>