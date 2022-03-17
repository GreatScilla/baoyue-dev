<template>
  <div>
    <add-factory-model :type="type" :data="data"></add-factory-model>
  </div>
</template>

<script>
import addFactoryModel from './add'
export default {
  name: 'factoryModelDetail',
  components: {
    addFactoryModel
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