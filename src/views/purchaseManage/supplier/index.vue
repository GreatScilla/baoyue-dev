// 供应商管理
<template>
  <div>
    <customer-manage :category="1"></customer-manage>
  </div>
</template>

<script>
import customerManage from '@/views/salesManage/customer'
export default {
  name: 'supplierManage',
  data () {
    return {

    }
  },
  components: {
    customerManage
  }
}
</script>