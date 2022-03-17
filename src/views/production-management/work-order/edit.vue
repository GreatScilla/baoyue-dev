<template>
  <div>
    <add-work-order :type="type" :data="data"></add-work-order>
  </div>
</template>

<script>
import addWorkOrder from './add'
export default {
  name: 'editWorkOrder',
  components: {
    addWorkOrder
  },
  data () {
    return {
      data: {},
      type: 'edit'
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>