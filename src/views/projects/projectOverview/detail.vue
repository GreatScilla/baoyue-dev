<template>
  <div>
    <add-project-overview :type="type" :data="data"></add-project-overview>
  </div>
</template>

<script>
import addProjectOverview from './add'
export default {
  name: 'projectOverviewDetail',
  components: {
    addProjectOverview
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