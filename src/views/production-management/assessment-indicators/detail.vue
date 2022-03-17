<template>
  <div>
    <add-AssessmentIndicators type="detail" :data="data"></add-AssessmentIndicators>
  </div>
</template>

<script>
import  addAssessmentIndicators from './add'
export default {
  name: 'assessmentIndicatorsDetail',
  components: {
    addAssessmentIndicators
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.data = this.$route.query.data
  }
}
</script>