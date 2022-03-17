<template>
  <div class="pandect">
    <div class="pandect-left">
      <div class="pandect-left-top">
        <div class="sbzt-title">GPS</div>
        <div class="sbzt-cont">
          <div class="sbzt-state">
            <span @click="goGPS1">GPS1</span>
          </div>
          <div class="sbzt-state">
            <span @click="goGPS2">GPS2</span>
          </div>
        </div>
      </div>
      <div class="pandect-left-cont">
        <div class="sbsssj-title" @click="zyfDialogVisible = true">
          蒸压釜实时数据
        </div>
        <div class="sbsssj-cont">
          <sbsssjTable />
        </div>
      </div>
      <div class="pandect-left-bottom">
        <div class="bjkcyj-title" @click="dialogVisible = true">温湿度监控</div>
        <!-- <div class="bjkcyj-title">
          <span @click="waterMeterDialogShow('3')">气表记录</span>
          <span
            >工况用气量:{{
              waterMeterParentData.workingConditionCumulativeFlowAll
            }}立方
          </span>
        </div> -->
        <div class="bjkcyj-cont">
          <wsdjkTable />
          <!-- <bjkcyjTable @childData="getValue($event)" /> -->
        </div>
      </div>
    </div>
    <div class="pandect-cont">
      <div class="pandect-cont-top">
        <div class="videoBox">
          <video
            id="playVideos"
            muted
            autoplay
            controls
            width="100%"
            height="100%"
          >
            <source id="playVideosss" :src="videoSrc" type="video/ogg" />
          </video>
          <!-- <iframe
            style="width: 100%; height: 99%"
            ref="bigVideo"
            :src="videoSrc"
            class="videobig"
          ></iframe> -->
        </div>
        <div class="videoMenuBox">
          <div
            class="videomenu"
            @click="changeOne(item)"
            v-for="(item, index) in arr"
            :key="index"
            ref="dis"
          >
            {{ item.position }}
          </div>
        </div>
      </div>
      <div class="pandect-cont-cent">
        <div class="djjk">电机监控</div>
        <div>
          <jdjkTable />
        </div>
      </div>
    </div>
    <div class="pandect-right">
      <div class="pandect-right-top">
        <div class="bjkcyj-title">
          <span @click="waterMeterDialogShow('3')">气表记录</span>
          <span
            >用气量:{{
              waterMeterParentData.workingConditionCumulativeFlowAll
            }}立方
          </span>
        </div>
        <!-- <div class="wsdjk-title" @click="dialogVisible = true">温湿度监控</div> -->
        <!-- <div class="wsdjk-title" @click="dialogVisible = true">温湿度监控</div> -->
        <div class="wsdjk-cont">
          <!-- <wsdjkTable /> -->
          <bjkcyjTable @childData="getValue($event)" />
        </div>
      </div>
      <div class="pandect-right-cont">
        <div class="dbsq-title">
          <span @click="waterMeterDialogShow('1')">水表记录</span
          ><span>用水量:{{ cumulativeFlowAll }}吨</span>
        </div>
        <div class="dbsq-cont">
          <dbsqTable @childData="getValue1($event)" />
        </div>
      </div>
      <div class="pandect-right-bottom">
        <div class="bxsq-title">
          <span @click="waterMeterDialogShow('2')">电表记录</span
          ><span>用电量:{{ electricityConsumptionAll | keepTwoNum  }}度</span>
        </div>
        <div class="bxsq-cont">
          <bxsqTable @childData="getValue2($event)" />
        </div>
      </div>
    </div>
    <el-dialog
      :modal="false"
      v-if="dialogVisible"
      class="detail-dialog"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      append-to-body
      width="100%"
    >
      <zyf1 @closeDialog="closeDialog"></zyf1>
    </el-dialog>
    <el-dialog
      :modal="false"
      v-if="zyfDialogVisible"
      class="detail-dialog"
      :visible.sync="zyfDialogVisible"
      :before-close="handleClose"
      append-to-body
      width="100%"
    >
      <autoclavedKettleEcharts
        @closeDialog="closeDialog"
      ></autoclavedKettleEcharts>
    </el-dialog>
    <!-- 水表 -->
    <el-dialog
      :modal="false"
      v-if="waterMeterDialogVisible"
      class="detail-dialog"
      :visible.sync="waterMeterDialogVisible"
      :before-close="handleClose"
      append-to-body
      width="100%"
    >
      <waterMeter :type="type" @closeDialog="closeDialog"></waterMeter>
    </el-dialog>
    <div v-show="showBack" class="comeBack" @click="comeBack">
      <span class="el-icon-caret-right returnIcon"></span>
      <span class="returnText">返<br />回</span>
    </div>
  </div>
</template>

<script>
import sbsssjTable from "./sbsssjTable";
import bjkcyjTable from "./bjkcyjTable";
import wsdjkTable from "./wsdjkTable";
import dbsqTable from "./dbsqTable";
import bxsqTable from "./bxsqTable";
import jdjkTable from "./jdjkTable";
import gdtjEcharts from "./gdtjEcharts";
import zyf1 from "../zyf1";
import autoclavedKettleEcharts from "../autoclavedKettleEcharts";
import waterMeter from "../waterMeter";
import { cameraList } from "@/api/shebei/iInternetOfthings";
import { getList } from "@/api/equipmentMaterialAl/gps";
import { getCameraList, deleteList } from "@/api/equipmentMaterialAl/camera";
export default {
  components: {
    sbsssjTable,
    bjkcyjTable,
    wsdjkTable,
    dbsqTable,
    bxsqTable,
    jdjkTable,
    gdtjEcharts,
    zyf1,
    autoclavedKettleEcharts,
    waterMeter,
  },
  data() {
    return {
      cumulativeFlowAll: "",
      electricityConsumptionAll: "",
      waterMeterParentData: {},
      type: "",
      arr: [],
      gpsList: [],
      showBack: true,
      videoSrc: "",
      show: false,
      zyfDialogVisible: false,
      dialogVisible: false,
      waterMeterDialogVisible: false,
      loading: true,
    };
  },
  async created() {
    const params = {
      pageNum: 1,
      pageSize: 1000,
      url: "",
    };
    const res = await getList(params);
    this.gpsList = res.data.data.records;
    this.getpage(params);
  },
  mounted() {},
  methods: {
    stateChange() {
      this.loading = false;
    },
    getValue(data) {
      this.waterMeterParentData = data;
    },
    getValue1(data) {
      this.cumulativeFlowAll = data;
    },
    getValue2(data) {
      this.electricityConsumptionAll = data;
    },
    waterMeterDialogShow(code) {
      this.type = code;
      this.waterMeterDialogVisible = true;
    },
    goGPS1() {
      window.open(this.gpsList[0].url);
    },
    goGPS2() {
      window.open(this.gpsList[1].url);
    },
    //返回
    comeBack() {
      this.$router.push({ path: "/wel/index" });
    },
    //温湿度监控弹出框
    // WSDJKdialog() {
    //   this.dialogVisible = true;
    //   // this.show = true;
    //   // this.showBack = false;
    // },
    closeDialog() {
      this.dialogVisible = false;
      this.zyfDialogVisible = false;
      this.waterMeterDialogVisible = false;
    },
    changeOne(item) {
      this.playVideo(item.url);
    },
    playVideo(url) {
      let vdo = document.getElementById("playVideos");
      vdo.src = url;
      vdo.play();
    },
    async getpage(para) {
      let res = await getCameraList(para);
      // this.playVideo(res.data.data.records[0].url);
      res.data.data.records.forEach((item) => {
        if (item.isOpened == 0) {
          this.arr.push(item);
        }
      });
      this.playVideo(this.arr[0].url);
    },
  },
  filters: {
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.detail-dialog {
  height: 800px;
}
.comeBack:hover {
  border-right: 40px solid rgb(10, 163, 235);
  transition-duration: 1s;
}
.comeBack:hover .returnIcon {
  transition-duration: 1s;
  transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
}
.comeBack {
  position: fixed;
  cursor: pointer;
  right: 0;
  top: 5.5%;
  color: #fff;
  // border-bottom: 100px solid red;
  border-bottom: 15px solid transparent;
  // border-left: 50px solid red;
  border-right: 10px solid rgb(10, 163, 235);
  border-top: 15px solid transparent;
  height: 40px;
  transition: all 1s linear;
  .returnIcon {
    position: absolute;
    right: -25px;
    top: 20%;
    font-size: 30px;
    transition: all 1s linear;
  }
  .returnText {
    position: absolute;
    right: -35px;
  }
}
p {
  margin: 0;
}
.bygdNum {
  color: #00e5ff !important;
}
.djgdNum {
  color: #ffbb00 !important;
}
.pandect {
  width: 100%;
  height: 100%;
  display: flex;
  .pandect-left {
    flex: 1.2;
    .pandect-left-top {
      height: 17%;
      background-image: url("../img/pandect-left-top.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .sbzt-title {
        height: 30%;
        width: 49px;
        line-height: 45px;
        padding-left: 28px;
        opacity: 1;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      }
      .sbzt-cont {
        padding: 15px;
        display: flex;
        align-items: center;
        .sbzt-state:nth-child(1) {
          margin-right: 20px;
        }
        .sbzt-state {
          flex: 1;
          text-align: center;
          padding: 20px;
          cursor: pointer;
          opacity: 1;
          width: 64px;
          background: linear-gradient(
            319deg,
            #1183d3,
            rgba(66, 122, 255, 0.5) 100%
          );
          span {
            opacity: 1;
            font-size: 28px;
            font-family: PingFang HK, PingFang HK-Semibold;
            font-weight: 600;
            text-align: left;
            color: #ffffff;
          }
        }
      }
    }
    .pandect-left-cont {
      height: 42%;
      overflow: hidden;
      background-image: url("../img/pandect-left-cont.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 12px;
      .sbsssj-title {
        height: 12%;
        width: 40%;
        cursor: pointer;
        line-height: 45px;
        padding-left: 28px;
        opacity: 1;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      }
      .sbsssj-cont {
        height: 88%;
        // width: 460px;
        padding: 10px;
      }
    }
    .pandect-left-bottom {
      height: 39%;
      overflow: hidden;
      background-image: url("../img/pandect-left-cont.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 14px;
      .bjkcyj-title {
        cursor: pointer;
        span:nth-child(1) {
          cursor: pointer;
        }
        span:nth-child(2) {
          padding-left: 5%;
          letter-spacing: 1px;
          font-size: 14px;
          font-weight: 700;
        }
        height: 12%;
        line-height: 45px;
        padding-left: 28px;
        display: flex;
        justify-content: space-between;
        padding-right: 30px;
        opacity: 1;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        //cursor: pointer;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      }
      .bjkcyj-cont {
        height: 88%;
        // width: 460px;
        padding: 10px;
      }
    }
  }
  .pandect-cont {
    flex: 2;
    padding: 0 13px;
    .pandect-cont-top {
      height: 40%;
      padding: 19px 0 0 0;
      display: flex;
      .videoBox {
        flex: 3;
        padding-bottom: 50px;
      }
      .videoMenuBox {
        flex: 1;
        height: 88%;
        overflow-y: scroll;
      }
      .videomenu {
        cursor: pointer;
        margin-left: 15px;
        display: flex;
        flex-wrap: wrap;
        background-image: linear-gradient(
          to bottom,
          rgba(55, 124, 245, 0.2) 0%,
          rgba(18, 130, 211, 1) 98%
        );
        width: 160px;
        height: 35px;
        color: white;
        font-size: 20px;
        border-radius: 1px;
        text-align: center;
        margin-bottom: 15px;
        border: none;
        //background-color: transparent;
        outline: none;
        flex-direction: column;
        justify-content: center;
      }
      //   background-color: #fff;
    }
    .pandect-cont-cent {
      height: 68%;
      width: 100%;
      background-image: url("../img/jdjkBg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .djjk {
        height: 12%;
        line-height: 65px;
        padding-left: 28px;
        cursor: pointer;
        opacity: 1;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      }
      div:nth-child(2) {
        height: 88%;
        // width: 770px;
        padding: 10px;
        padding-top: 0;
      }
    }
  }
  .pandect-right {
    flex: 1.2;
    .pandect-right-top {
      height: 29%;
      width: 100%;
      overflow: hidden;
      background-image: url("../img/pandect-right-top.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .bjkcyj-title {
        span:nth-child(1) {
          cursor: pointer;
        }
        span:nth-child(2) {
          padding-left: 5%;
          letter-spacing: 1px;
          font-size: 14px;
          font-weight: 700;
        }
        height: 16%;
        // width: 30%;
        cursor: pointer;
        line-height: 40px;
        padding-left: 28px;
        opacity: 1;
        display: flex;
        justify-content: space-between;
        padding-right: 30px;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      }
      // .wsdjk-title {
      //   height: 16%;
      //   width: 30%;
      //   cursor: pointer;
      //   line-height: 40px;
      //   padding-left: 28px;
      //   opacity: 1;
      //   font-size: 22px;
      //   font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      //   font-weight: 700;
      //   text-align: left;
      //   color: #ffffff;
      //   letter-spacing: 2px;
      //   text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      // }
      .wsdjk-cont {
        height: 84%;
        // width: 460px;
        padding: 10px;
        // background-color: #fff;
      }
    }
    .pandect-right-cont {
      height: 32%;
      overflow: hidden;
      background-image: url("../img/pandect-left-cont.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 11px;

      .dbsq-title {
        span:nth-child(1) {
          cursor: pointer;
        }
        span:nth-child(2) {
          letter-spacing: 1px;
          font-size: 14px;
          font-weight: 700;
        }
        height: 16%;
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        padding: 0 28px;
        opacity: 1;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        // background-color: #fff;
      }
      .dbsq-cont {
        height: 84%;
        // width: 460px;
        padding: 10px;
        padding-top: 0;
        overflow: hidden;
      }
    }
    .pandect-right-bottom {
      height: 37%;
      overflow: hidden;
      background-image: url("../img/pandect-left-cont.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 12px;
      .bxsq-title {
        span:nth-child(1) {
          cursor: pointer;
        }
        span:nth-child(2) {
          letter-spacing: 1px;
          font-size: 14px;
          font-weight: 700;
        }
        height: 16%;
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        padding: 0 28px;
        opacity: 1;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      }
      .bxsq-cont {
        height: 84%;
        // width: 460px;
        padding: 10px;
        padding-top: 0;
      }
    }
  }
}
</style>