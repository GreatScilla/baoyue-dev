<template>
  <div>
    <add-pulping-post :type="type" :data="data"></add-pulping-post>
  </div>
</template>

<script>
import addPulpingPost from './add'
export default {
  name: 'pulpingPostDetail',
  components: {
    addPulpingPost
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