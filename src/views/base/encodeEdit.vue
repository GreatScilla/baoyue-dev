<template>
  <div>
    <encode-detail :type="type" :codeId="id"></encode-detail>
  </div>
</template>

<script>
import encodeDetail from './encodeDetail'
export default {
  name: 'encodeEdit',
  components: {
    encodeDetail
  },
  data () {
    return {
      id: '',
      type: 'edit'
    }
  },
  created () {
    this.id = this.$route.query.id
  }
}
</script>