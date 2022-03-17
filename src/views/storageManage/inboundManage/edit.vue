<template>
  <div>
    <add-inbound-manage type="edit" :data="data"></add-inbound-manage>
  </div>
</template>

<script>
import addInboundManage from './add'
export default {
  name: 'editInboundManage',
  components: {
    addInboundManage
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