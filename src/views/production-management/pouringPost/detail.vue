<template>
  <div>
    <add-pouring-post :type="type" :data="data"></add-pouring-post >
  </div>
</template>

<script>
import addPouringPost from './add'
export default {
  name: 'pouringPostDetail',
  components: {
    addPouringPost
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