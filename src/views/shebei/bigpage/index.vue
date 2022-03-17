<template>
  <div class="wrap">
    <div class="wrapTop">
      <div class="wrapTop-left">
        <div
          class="tab"
          :class="{ active: currentTab === 'pandect' }"
          @click="toggleTab('pandect')"
        >
          总览
        </div>
        <div
          class="tab"
          :class="{ active: currentTab === 'videoSurveillance' }"
          @click="toggleTab('videoSurveillance')"
        >
          浇注
        </div>
      </div>
      <div class="wrapTop-cont">
        <img src="./img/top-title.png" alt="" />
      </div>
      <div class="wrapTop-right">
        <div class="timebox">
          <span>{{ riqi }} &nbsp; &nbsp;{{ days }} &nbsp; {{ shijian }}</span>
        </div>
      </div>
    </div>
    <div class="wrapCont">
      <keep-alive>
        <component :is="currentTab"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { cameraList } from "@/api/shebei/iInternetOfthings";
import pandect from "./pandect/index";
import videoSurveillance from "./videoSurveillance/index";
export default {
  components: {
    videoSurveillance,
    pandect,
  },
  data() {
    return {
      currentTab: "pandect",
      info: {
        show: false,
      },
      timer: "dsqTimer",
      arr: [],
      tableData: [],
      riqi: "",
      days: "",
      shijian: "",
    };
  },
  created() {
    this.getdata();
    this.getpage();
    this.gettime();
    this.mewtime();
  },
  methods: {
    toggleTab(tab) {
      this.currentTab = tab;
    },
    mewtime() {
      setInterval(() => {
        this.gettime();
      }, 1000);
    },
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
    showClick() {
      this.info.show = true;
      this.$children.getdata();
    },

    changeOne(item) {
      this.$refs.bigVideo.src = item.url;
    },
    async getpage(para) {
      let res = await cameraList(para);
      res.data.data.records.forEach((item) => {
        if (item.isOpened == 0) {
          this.arr.push(item);
        }
      });
    },
    async getdata() {
      // let res = await echartsdata();
      // this.laoArr = res.data.data;
      // console.log(this.laoArr);
      setInterval(() => {
        var date = new Date();
        let year = date.getFullYear();
        let mou = date.getMonth() + 1;
        let day = date.getDate();
        let hou = date.getHours(); //获取当前小时数(0-23)
        let min = date.getMinutes(); //获取当前分钟数(0-59)
        let sec = date.getSeconds(); //获取当前秒数(0-59)
        if (sec < 10) {
          sec = "0" + sec;
        }

        if (min < 10) {
          min = "0" + min;
        }
        this.laoArr.forEach((element) => {
          element.date = year + "/" + mou + "/" + day;
          element.time = hou + ":" + min + ":" + sec;
        });
      }, 1000);
      function slice(arr, length) {
        let index = 0;
        let newArr = [];
        while (index < arr.length) {
          newArr.push(arr.slice(index, (index += length)));
        }
        return newArr;
      }
      this.tableData = slice(this.laoArr, 5)[0];
      // this.tableData=JSON.parse(JSON.stringify(res.data.data))
      function slice(arr, length) {
        let index = 0;
        let newArr = [];
        while (index < arr.length) {
          newArr.push(arr.slice(index, (index += length)));
        }
        return newArr;
      }
      this.tableData = slice(this.laoArr, 5)[0];
      var n = 0;
      this.dsqTimer = setInterval(() => {
        let s = slice(this.laoArr, 5);
        n++;
        if (n >= 6) {
          n = 0;
        }
        this.tableData = s[n];
      }, 5000);
    },
  },
  beforeDestroy() {
    clearInterval(this.dsqTimer);
    this.dsqTimer = null;
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.menu1 {
  height: 1300px;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 20px;
}
.leftVideo {
  width: 960px;
  width: 480px;
  display: flex;
  flex-wrap: wrap;
  //background-color: #1e9fff;
  background-color: rgb(34, 70, 122);
  //transform: scale(0.33);
}
.rightVideo {
  width: 170px;
  height: 500px;
  background-color: #49578e;
  margin-top: -500px;
  margin-left: 660px;
}
.videobox {
  width: 840px;
  height: 500px;
  background-color: #293450;
  margin-top: 92px;
  margin-left: 535px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.el-table__header-wrapper {
  background-color: #dd6161 !important;
}
.el-table thead th {
  background-color: rgb(34, 70, 122) !important;
}
.el-table tr {
  background-color: rgb(34, 70, 122) !important;
  color: white !important;

  background-image: linear-gradient(to left, #377cf5, #1183d3);
  border-bottom: 4px #0080ff !important;

  border: 2px !important;
}

.test {
  width: 520px;
  height: 240px;
  //background-color: #dd6161;
  display: flex;
  flex-wrap: wrap;
  background-image: linear-gradient(
    to left,
    rgba(55, 124, 245, 1),
    rgba(55, 124, 245, 1)
  );
  position: absolute;
  margin-top: 120px;
  right: 8px;
  //opacity:0.1;
  ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(70, 130, 180, 0.2);
    color: #fff;
  }
}
.test ::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.test ::v-deep .el-table tr {
  background-color: transparent !important;
  height: 40px !important;
}
.test ::v-deep .el-table th {
  background-color: transparent !important;
  //border-bottom: 1px solid transparent;
  height: 30px !important;
  color: #fff;
}
.test ::v-deep .el-table td,
.el-table th.is-leaf {
  border-bottom: 3px solid #0359ac;
  //height: 30px !important;
  background-color: rgba(30, 144, 255, 0.2);
  color: #fff;
}
.test ::v-deep .el-table::before {
  height: 0px;
}
.test ::v-deep el-table-column {
  height: 40px;
}
.wrap {
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-image: url("./img/WechatIMG24.png");
  background-color: #08122c;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .wrapTop {
    height: 8%;
    width: 100%;
    background-image: url("./img/wrapTop.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    .wrapTop-left {
      flex: 2;
      display: flex;
      padding-left: 148px;
      .tab {
        font-size: 20px;
        font-weight: 500;
        line-height: 65px;
        color: #fff;
        cursor: pointer;
        margin-right: 30px;
      }
      .active {
        color: rgba(7, 175, 241, 0.904);
        // border-bottom: 2px solid rgba(7, 175, 241, 0.904);
        font-size: 20px;
        font-weight: bold;
      }
    }
    .wrapTop-cont {
      flex: 1;
      display: flex;
      align-items: center;
      img {
      }
    }
    .wrapTop-right {
      flex: 2;
      .timebox {
        position: fixed;
        width: 400px;
        right: 8px;
        height: 40px;
        margin-top: 10px;
        color: #58f3f6;
        font-size: 24px;
        line-height: 40px;
      }
    }
  }
  .wrapCont {
    height: 92%;
    width: 100%;
    // margin: 20px 8px;
  }
}
/deep/.el-icon-close {
  color: #fff;
  cursor: pointer;
  font-size: 24px;
}
</style>
