<template>
  <div>
    <detail-AssessmentIndicators type="edit" :data="data"></detail-AssessmentIndicators>
  </div>
</template>

<script>
import  detailAssessmentIndicators from './add'
export default {
  name: 'assessmentIndicatorsEdit',
  components: {
    detailAssessmentIndicators
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