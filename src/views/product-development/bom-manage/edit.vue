<template>
  <div>
    <add-boom-manage type="edit" :data="data"></add-boom-manage>
  </div>
</template>

<script>
import  addBoomManage from './add'
export default {
  name: 'boomManageEdit',
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