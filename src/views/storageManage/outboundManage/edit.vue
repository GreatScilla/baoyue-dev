<template>
  <div>
    <add-outbound-manage type="edit" :data="data"></add-outbound-manage>
  </div>
</template>

<script>
import addOutboundManage from './add'
export default {
  name: 'editOutboundManage',
  components: {
    addOutboundManage
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