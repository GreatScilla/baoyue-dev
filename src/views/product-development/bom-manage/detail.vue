<template>
  <div>
    <add-boom-manage type="detail" :data="data"></add-boom-manage>
  </div>
</template>

<script>
import  addBoomManage from './add'
export default {
  name: 'boomManageDetail',
  components: {
    addBoomManage
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