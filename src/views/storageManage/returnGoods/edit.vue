<template>
  <div>
    <add-return-goods :type="type" :data="data"></add-return-goods>
  </div>
</template>

<script>
import addReturnGoods from './add'
export default {
  name: 'editReturnGoods',
  components: {
    addReturnGoods
  },
  data () {
    return {
      type: 'edit',
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.row
  }
}
</script>