// 采购类型配置
<template>
  <div>
    <sale-type :types="1"></sale-type>
  </div>
</template>

<script>
import saleType from '../../salesManage/saleType'
export default {
  name: 'purchanse',
  components: {
    saleType
  },
  data () {
    return {
    }
  }
}
</script>