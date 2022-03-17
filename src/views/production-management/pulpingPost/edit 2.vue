<template>
  <div>
    <add-pulping-post :type="type" :data="data"></add-pulping-post>
  </div>
</template>

<script>
import addPulpingPost from './add'
export default {
  name: 'editPulpingPost',
  components: {
    addPulpingPost
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