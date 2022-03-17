
<template>
  <div class="timeBox">
    <div>{{ riqi }}</div>
    <div>{{ days }}</div>
    <div>{{ shijian }}</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      riqi: "",
      days: "",
      shijian: "",
    };
  },

  methods: {
    gettime() {
      var date = new Date();
      let year = date.getFullYear();
      let mou = date.getMonth() + 1;
      let day = date.getDate();
      let days = date.getDay();
      switch (days) {
        case 1:
          days = "星期一";
          break;
        case 2:
          days = "星期二";
          break;
        case 3:
          days = "星期三";
          break;
        case 4:
          days = "星期四";
          break;
        case 5:
          days = "星期五";
          break;
        case 6:
          days = "星期六";
          break;
        case 0:
          days = "星期日";
          break;
      }
      let hou = date.getHours(); //获取当前小时数(0-23)
      let min = date.getMinutes(); //获取当前分钟数(0-59)
      let sec = date.getSeconds(); //获取当前秒数(0-59)
      if (mou < 10) mou = "0" + mou;
      if (day < 10) day = "0" + day;
      if (hou < 10) hou = "0" + hou;
      if (min < 10) min = "0" + min;
      if (sec < 10) sec = "0" + sec;
      this.riqi = year + "-" + mou + "-" + day;
      this.days = days;
      this.shijian = hou + ":" + min + ":" + sec;
    },
  },

  created() {},

  mounted() {
    setInterval(() => {
      this.gettime();
    }, 1000);
  },
};
</script>
<style lang='scss' scoped>
.timeBox {
  width: 100%;
  padding-left: 80%;
  display: flex;
  align-items: center;
  div:nth-child(1) {
    text-align: right;
    flex: 2;
  }
  div:nth-child(2) {
    flex: 1;
    text-align: center;
  }
  div:nth-child(3) {
    flex: 1;
    text-align: left;
  }
}
</style>