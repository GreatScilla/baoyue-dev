<template>
  <div>
    <basic-container>
      <sbIndex></sbIndex>
    </basic-container>
  </div>
</template>
<script>
import sbIndex from "./sbindex";
export default {
  name: "",
  components: { sbIndex },
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
  methods: {},
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss"></style>
