<template>
  <div>
    <encode-detail :type="type"></encode-detail>
  </div>
</template>

<script>
import encodeDetail from './encodeDetail'
export default {
  name: 'encodeAdd',
  components: {
    encodeDetail
  },
  data () {
    return {
      type: 'add'
    }
  }
}
</script>