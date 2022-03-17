<template>
  <div>
    <add-factory-model :type="type" :data="data"></add-factory-model>
  </div>
</template>

<script>
import addFactoryModel from './add'
export default {
  name: 'editFactoryModel',
  components: {
    addFactoryModel
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