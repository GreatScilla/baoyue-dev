<template>
  <div>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, jumper"
      :total="total"
      @size-change="handlePageSize"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {
    total: {
      type: [String, Object, Number]
    }
  },
  data() {
    return {
      newtotal: null,
      pageList: { pageNum: 1, pageSize: 10 }
    };
  },
  activated() {},
  watch: {
    total: {
      handler: function(val) {
        this.newtotal = val;
      }
      // 该回调将会在侦听开始之后被立即调用
      // immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 第几页
    handleCurrentChange(val) {
      this.pageList.pageNum = val;
      this.$emit('updatepageNum', this.pageList)
    },

    // 几条
    handlePageSize(val) {
      this.pageList.pageSize = val;
      this.$emit('updatepageSize', this.pageList)
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss"></style>
