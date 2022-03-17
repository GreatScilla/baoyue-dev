<template>
  <div class="statedialog">
      <div>
        <i class="el-icon-close" @click="updateNotification"></i>
        <i class="el-icon-success"></i><span class="success">成功</span>
        <p class="ok-success">删除成功</p>
      </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  activated() {},
  watch: {
    // 方法一 : name function () {}
    // 方法二 : name { 1. handler () {} 此方法可加 2. immediate = true 该回调开始立刻调用 方法一没有}
  },
  created() {},
  mounted() {},
  methods: {
    updateNotification () {
      this.$emit('updateNotification', false) 
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style  lang="scss" scoped>
.statedialog{
  width: 320px;
  height: 80px;
  padding-left: 20px;
  line-height: 95px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 320px;
  transform: translate(-50%,-50%);

.success {
  position: absolute;
  margin-left: 8px;
  margin-top: -20px; 
}
.ok-success {
  position: absolute;
  margin-left: 38px;
  margin-top: -90px;
}
  .el-icon-success {
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: #13CE66;
  }
  .el-icon-close {
    position: absolute;
    cursor:pointer;
    right: 10px;
    top: 10px;
    font-size: 18px;
  }
}
</style>
