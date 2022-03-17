<template>
  <div>
    <add-pouring-post :type="type" :data="data"></add-pouring-post >
  </div>
</template>

<script>
import addPouringPost from './add'
export default {
  name: 'editPouringPost',
  components: {
    addPouringPost
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