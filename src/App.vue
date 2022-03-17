<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getAccessRecords } from "@/api/common";
export default {
  name: "app",
  data() {
    return {
      routerList: [],
      routerList1: [],
    };
  },
  watch: {},
  created() {
    this.$router.beforeEach((to, from, next) => {
      var str = to.path;
      var reg = RegExp(/add/);
      var reg1 = RegExp(/detail/);
      var reg2 = RegExp(/edit/);
      var reg3 = RegExp(/orderChange/);
      if (
        str.match(reg) ||
        str.match(reg1) ||
        str.match(reg2) ||
        str.match(reg3)
      ) {
        next();
        return;
      } else {
        this.getTo(to);
        next();
      }
    });
  },
  methods: {
    getTo(to) {
      var params = {
        menu: to.name,
        menuUrl: to.path,
      };
      getAccessRecords(params);
    },
  },
  computed: {},
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
