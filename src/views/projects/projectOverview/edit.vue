<template>
  <div>
    <add-project-overview :type="edit" :data="data"></add-project-overview>
  </div>
</template>

<script>
import addProjectOverview from './add'
export default {
  name: 'editProjectOverview',
  components: {
    addProjectOverview
  },
  data () {
    return {
      data: {},
      edit: 'edit'
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>