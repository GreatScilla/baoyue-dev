<template>
  <div class="content-Box">
    <div class="content-head">
      <nowTimes />
    </div>
    <div class="content-center">
      <div class="content-left">
        <div class="content-left-top">
          <div class="content-left-top-item1">
            <div class="content-left-top-item1-top">
              <div class="content-left-top-item1-top-left">
                <div>
                  <span class="iconfont icon-mes-shengchangzhouqi"></span>
                </div>
                <div>
                  <div>浇注总数</div>
                  <div>
                    <animate-number
                      from="0"
                      :to="pouringNum"
                      :key="pouringNum"
                    ></animate-number>
                  </div>
                </div>
              </div>

              <div>
                <el-button
                  class="yesterdayButtton"
                  size="mini"
                  :class="0 == quaflat ? 'changeBgCol' : ''"
                  @click="getlisttable(0)"
                  >昨天</el-button
                >
                <el-button
                  class="todayButton"
                  size="mini"
                  :class="1 == quaflat ? 'changeBgCol' : ''"
                  @click="getlisttable(1)"
                  >今天</el-button
                >
              </div>
            </div>
            <tables
              ref="mychild"
              :nowTime="nowTime"
              @childData="getValue($event)"
            />
            <div class="moreButton">
              <el-tooltip content="更多" placement="top">
                <span
                  @click="
                    dialogVisible = true;
                    showSearch = true;
                  "
                  >>>></span
                >
              </el-tooltip>

              <!-- <el-button
                size="small"
                @click="
                  dialogVisible = true;
                  showSearch = true;
                "
                >更多</el-button
              > -->
            </div>
          </div>
          <div class="content-left-top-item2">
            <div class="content-left-top-item1-top">
              <div class="content-left-top-item1-top-left">
                <div>
                  <span class="iconfont icon-mes-xinyongzhibiaoguanli"></span>
                </div>
                <div>
                  <div>切割总数</div>
                  <div>
                    <animate-number
                      from="0"
                      :to="cuttingNum"
                      :key="cuttingNum"
                    ></animate-number>
                  </div>
                </div>
              </div>

              <div>
                <el-button
                  class="yesterdayButtton"
                  size="mini"
                  :class="0 == quaflat1 ? 'changeBgCol' : ''"
                  @click="getlisttable1(0)"
                  >昨天</el-button
                >
                <el-button
                  class="todayButton"
                  size="mini"
                  :class="1 == quaflat1 ? 'changeBgCol' : ''"
                  @click="getlisttable1(1)"
                  >今天</el-button
                >
              </div>
            </div>
            <cuttingTables
              ref="mychild1"
              :nowTime="nowTime"
              @childData="getValue1($event)"
            />
            <div
              class="moreButton"
              @click="
                dialogVisible1 = true;
                showSearch1 = true;
              "
            >
              <el-tooltip content="更多" placement="top">
                <span
                  @click="
                    dialogVisible1 = true;
                    showSearch1 = true;
                  "
                  >>>></span
                >
              </el-tooltip>
              <!-- <el-button
                size="small"
                @click="
                  dialogVisible1 = true;
                  showSearch1 = true;
                "
                >更多</el-button
              > -->
            </div>
          </div>
          <div class="content-left-top-item3">
            <div class="content-left-top-item3-title">
              <div>当前切割规格</div>
              <div
                @click="
                  dialogVisible2 = true;
                  showPage = true;
                  showTableColumn = 8;
                  showSearch2 = 8;
                "
              >
                更多
              </div>
            </div>
            <rightTables :type="8" />
          </div>
        </div>
        <div class="content-left-center">
          <div class="content-left-center-item1">
            <div class="content-left-center-item1-title">
              <div>网片库存</div>
              <div
                @click="
                  dialogVisible2 = true;
                  showPage = true;
                  showTableColumn = 7;
                  showSearch2 = 7;
                "
              >
                更多
              </div>
            </div>
            <cuttingEcharts style="height: 100%; width: 100%"></cuttingEcharts>
          </div>
          <div class="content-left-center-item2">
            <div class="content-left-center-item2-title">
              <div>质检合格率</div>
              <div>
                <el-button
                  class="yesterdayButtton"
                  size="mini"
                  :class="0 == quaflat2 ? 'changeBgCol' : ''"
                  @click="getlisttable2(0)"
                  >昨天</el-button
                >
                <el-button
                  class="todayButton"
                  size="mini"
                  :class="1 == quaflat2 ? 'changeBgCol' : ''"
                  @click="getlisttable2(1)"
                  >今天</el-button
                >
              </div>
            </div>
            <div class="content-left-center-item2-content">
              <div>
                <qualityInspectionEcharts
                  style="height: 100%; width: 100%"
                ></qualityInspectionEcharts>
                <el-button
                  size="small"
                  @click="
                    dialogVisible3 = true;
                    showSearch3 = true;
                  "
                  >更多</el-button
                >
              </div>
              <qualityTestingTables
                ref="mychild2"
                :nowTime="nowTime"
                @childData="getValue2($event)"
              />
            </div>
          </div>
        </div>
        <div class="content-left-bottom">
          <div class="content-left-bottom-item1">
            <div class="content-left-bottom-item1-title">
              <div>
                出釜待检状态
                <animate-number
                  from="0"
                  :to="outKettleNum"
                  :key="outKettleNum"
                ></animate-number
                >模
              </div>
              <div
                @click="
                  dialogVisible2 = true;
                  showPage = true;
                  showTableColumn = 5;
                  showSearch2 = 5;
                "
              >
                更多
              </div>
            </div>
            <rightTables @childData="getValue5($event)" :type="5" />
          </div>
          <div class="content-left-bottom-item2">
            <div class="content-left-bottom-item2-title">
              <div>
                蒸养釜内状态
                <animate-number
                  from="0"
                  :to="intoKettleNum"
                  :key="intoKettleNum"
                ></animate-number
                >模
              </div>
              <div
                @click="
                  dialogVisible2 = true;
                  showPage = true;
                  showTableColumn = 4;
                  showSearch2 = 4;
                "
              >
                更多
              </div>
            </div>
            <rightTables @childData="getValue4($event)" :type="4" />
          </div>
          <div class="content-left-bottom-item3">
            <div class="content-left-bottom-item3-title">
              <div>
                切割进窑未入釜状态
                <animate-number
                  from="0"
                  :to="cuttingintoKettleNum"
                  :key="cuttingintoKettleNum"
                ></animate-number
                >模
              </div>
              <div
                @click="
                  dialogVisible2 = true;
                  showPage = true;
                  showTableColumn = 6;
                  showSearch2 = 6;
                "
              >
                更多
              </div>
            </div>
            <rightTables @childData="getValue6($event)" :type="6" />
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="content-right-item1">
          <div class="content-right-item1-title">
            <div>生产计划</div>
            <div
              @click="
                dialogVisible2 = true;
                showPage = true;
                showTableColumn = 1;
                showSearch2 = 1;
              "
            >
              更多
            </div>
          </div>
          <rightTables :type="1" />
        </div>
        <div class="content-right-item2">
          <div class="content-right-item2-title">
            <div>生产排程</div>
            <div
              @click="
                dialogVisible2 = true;
                showPage = true;
                showTableColumn = 2;
                showSearch2 = 2;
              "
            >
              更多
            </div>
          </div>
          <rightTables :type="2" />
        </div>
        <div class="content-right-item3">
          <div class="content-right-item3-title">
            <div>
              浇注未切割数据
              <animate-number
                from="0"
                :to="noCuttingNum"
                :key="noCuttingNum"
              ></animate-number
              >模
            </div>
            <div
              @click="
                dialogVisible2 = true;
                showPage = true;
                showTableColumn = 3;
                showSearch2 = 3;
              "
            >
              更多
            </div>
          </div>
          <rightTables @childData="getValue3($event)" :type="3" />
        </div>
      </div>
    </div>
    <el-dialog
      class="qualityControlDialog"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :before-close="handleClose"
      :show-close="false"
      append-to-body
      width="50%"
    >
      <span slot="title" class="titleBox">
        <div>
          <span class="el-icon-document"></span>
          <span>详情列表</span>
        </div>
        <div class="back" @click="dialogVisible = false">
          <span class="font">X</span>
        </div>
      </span>
      <tables :showSearch="showSearch" :nowTime="nowTime" />
    </el-dialog>
    <el-dialog
      class="qualityControlDialog"
      :visible.sync="dialogVisible1"
      v-if="dialogVisible1"
      :before-close="handleClose"
      :show-close="false"
      append-to-body
      width="50%"
    >
      <span slot="title" class="titleBox">
        <div>
          <span class="el-icon-document"></span>
          <span>详情列表</span>
        </div>
        <div class="back" @click="dialogVisible1 = false">
          <span class="font">X</span>
        </div>
      </span>
      <cuttingTables :showSearch="showSearch1" :nowTime="nowTime" />
    </el-dialog>
    <el-dialog
      class="qualityControlDialog"
      :visible.sync="dialogVisible3"
      v-if="dialogVisible3"
      :before-close="handleClose"
      :show-close="false"
      append-to-body
      width="50%"
    >
      <span slot="title" class="titleBox">
        <div>
          <span class="el-icon-document"></span>
          <span>详情列表</span>
        </div>
        <div class="back" @click="dialogVisible3 = false">
          <span class="font">X</span>
        </div>
      </span>
      <qualityTestingTables :showSearch="showSearch3" :nowTime="nowTime" />
    </el-dialog>
    <el-dialog
      class="qualityControlDialog"
      :visible.sync="dialogVisible2"
      v-if="dialogVisible2"
      :before-close="handleClose"
      :show-close="false"
      append-to-body
      width="50%"
    >
      <span slot="title" class="titleBox">
        <div>
          <span class="el-icon-document"></span>
          <span>详情列表</span>
        </div>
        <div class="back" @click="dialogVisible2 = false">
          <span class="font">X</span>
        </div>
      </span>
      <rightTables
        :type="showSearch2"
        :showPage="showPage"
        :showTableColumn="showTableColumn"
      />
    </el-dialog>
  </div>
</template>
<script>
import tables from "./tables";
import cuttingTables from "./cuttingTables";
import rightTables from "./rightTables";
import qualityTestingTables from "./qualityTestingTables";
import cuttingModelTables from "./cuttingModelTables";
import cuttingEcharts from "./cuttingEcharts";
import qualityInspectionEcharts from "./qualityInspectionEcharts";
import nowTimes from "@/components/nowTimes";
export default {
  components: {
    tables,
    cuttingTables,
    rightTables,
    cuttingModelTables,
    qualityTestingTables,
    cuttingEcharts,
    qualityInspectionEcharts,
    nowTimes,
  },
  data() {
    return {
      yesterday: null,
      today: null,
      pouringNum: 0, //浇注总数
      nowTime: null,
      cuttingNum: 0, //切割总数
      outKettleNum: 0, //出釜待检状态
      intoKettleNum: 0, //入釜待检状态
      cuttingintoKettleNum: 0, //切割进窑未入釜状态
      noCuttingNum: 0, //浇注未切割数据
      cuttNum: 0, //
      quaflat: "1",
      quaflat1: "1",
      quaflat2: "1",
      showSearch: false,
      showSearch1: false,
      showSearch2: null,
      showSearch3: null,
      showTableColumn: null,
      showPage: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // const timer = setInterval(() => {
    //   this.cuttingNum++;
    // }, 3000);
    // this.$once("hook:beforeDestroy", () => {
    //   clearInterval(timer);
    // });
    //昨天的时间
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    let mou1 = day1.getMonth() + 1;
    if (mou1 < 10) mou1 = "0" + mou1;
    let Day = day1.getDate();
    if (Day < 10) Day = "0" + Day;
    this.yesterday = day1.getFullYear() + "-" + mou1 + "-" + Day;
    //今天的时间
    var day2 = new Date();
    day2.setTime(day2.getTime());
    let mou2 = day2.getMonth() + 1;
    if (mou2 < 10) mou2 = "0" + mou2;
    let Days = day2.getDate();
    if (Days < 10) Days = "0" + Days;
    this.today = day2.getFullYear() + "-" + mou2 + "-" + Days;
  },
  methods: {
    getValue(data) {
      this.pouringNum = data;
    },
    getValue1(data) {
      this.cuttingNum = data;
    },
    getValue2(data) {
      this.cuttNum = data;
    },
    getValue3(data) {
      this.noCuttingNum = data;
    },
    getValue4(data) {
      this.intoKettleNum = data;
    },
    getValue5(data) {
      this.outKettleNum = data;
    },
    getValue6(data) {
      this.cuttingintoKettleNum = data;
    },
    getlisttable(flat) {
      this.quaflat = flat;
      if (flat == 0) {
        this.nowTime = this.yesterday;
      } else if (flat == 1) {
        this.nowTime = this.today;
      }
      this.$refs.mychild.changeDay(this.nowTime);
    },
    getlisttable1(flat) {
      this.quaflat1 = flat;
      if (flat == 0) {
        this.nowTime = this.yesterday;
      } else if (flat == 1) {
        this.nowTime = this.today;
      }
      this.$refs.mychild1.changeDay1(this.nowTime);
    },
    getlisttable2(flat) {
      this.quaflat2 = flat;
      if (flat == 0) {
        this.nowTime = this.yesterday;
      } else if (flat == 1) {
        this.nowTime = this.today;
      }
      this.$refs.mychild2.changeDay2(this.nowTime);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog {
  padding-bottom: 0;
}
.qualityControlDialog {
  /deep/.el-dialog__header {
    background-color: #031251;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 12px;
  }
  /deep/.el-dialog__body {
    background-color: #031251 !important;
    // padding: 12px;
  }
  .titleBox {
    display: flex;
    justify-content: space-between;
    .back {
      cursor: pointer;
    }
  }
  .half-title {
    padding: 10px 0;
    color: #000;
    font-weight: 500;
  }
}
/deep/.changeBgCol {
  background: #1f4283 !important;
}
/deep/.el-button {
  margin: 0 !important;
  border-radius: 0;
  background: #080848;
  color: #fff;
  border-color: #077ead;
}
.yesterdayButtton {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.todayButton {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.content-Box {
  width: 100%;
  height: 100%;
  background-color: #070848;
  .content-head {
    height: 10%;
    width: 100%;
    background-image: url("../../../assets/images/WechatIMG191.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: oldlace;
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .content-center {
    height: 86.5%;
    background-color: #080848;
    display: flex;
    padding: 1%;
    .content-left {
      width: 80%;
      height: 100%;
      display: flex;
      flex-flow: column;
      .content-left-top {
        height: 29%;
        width: 100%;
        margin-bottom: 0.5%;
        display: flex;
        .content-left-top-item1,
        .content-left-top-item2 {
          position: relative;
          overflow: hidden;
          width: 32%;
          margin-right: 0.5%;
          border: 1px solid #077ead;
          border-radius: 3px;
          padding: 0 0.5% 0.2% 0.5%;
          .content-left-top-item1-top {
            display: flex;
            height: 35%;
            padding: 0 5%;
            align-items: center;
            justify-content: space-between;
            .content-left-top-item1-top-left {
              display: flex;
              align-items: center;
              > div:nth-child(1) {
                text-align: center;
                width: 50px;
                height: 50px;
                line-height: 50px;
                color: #00e1a3;
                border-radius: 100%;
                border: 2px solid #00e1a3;
                span {
                  font-size: 28px;
                }
              }
              > div:nth-child(2) {
                padding-left: 10px;
                color: #fff;
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-between;
                align-items: left;
                div:nth-child(1) {
                  font-size: 14px;
                }
                div:nth-child(2) {
                  font-size: 36px;
                }
              }
            }
          }
          .moreButton {
            text-align: right;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 0 1%;

            span {
              padding-right: 3%;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
            }
            .el-button {
              width: 98%;
              border-radius: 5px;
              background: #1d3f80;
              font-size: 14px;
              border: 0;
            }
          }
        }
        .content-left-top-item2 {
          width: 32%;
          margin-right: 0.5%;
          border: 1px solid #077ead;
          border-radius: 3px;
        }
        .content-left-top-item3 {
          width: 32%;
          padding: 0 0.5% 0 0.5%;
          margin-right: 0.5%;
          border: 1px solid #077ead;
          border-radius: 3px;
          overflow: hidden;
          .content-left-top-item3-title {
            display: flex;
            justify-content: space-between;
            padding: 2% 3% 2% 2%;
            div:nth-child(1) {
              color: #fff;
              font-size: 14px;
            }
            div:nth-child(2) {
              color: #1a7cdb;
              font-size: 14px;
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
      .content-left-center {
        height: 39%;
        margin-bottom: 0.5%;
        width: 100%;
        display: flex;
        .content-left-center-item1 {
          width: 48%;
          padding: 0 0.5% 0 0.5%;
          margin-right: 0.5%;
          border: 1px solid #077ead;
          border-radius: 3px;
          .content-left-center-item1-title {
            display: flex;
            justify-content: space-between;
            padding: 2% 3% 2% 2%;
            div:nth-child(1) {
              color: #fff;
              font-size: 14px;
            }
            div:nth-child(2) {
              color: #1a7cdb;
              font-size: 14px;
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
        .content-left-center-item2 {
          width: 48.7%;
          height: 99.2%;
          padding: 0 0.5% 0 0.5%;
          margin-right: 0%;
          border: 1px solid #077ead;
          border-radius: 3px;
          overflow: hidden;
          .content-left-center-item2-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2% 3% 2% 2%;
            div:nth-child(1) {
              color: #fff;
              font-size: 14px;
            }
            div:nth-child(2) {
              color: #1a7cdb;
              font-size: 14px;
            }
          }
          .content-left-center-item2-content {
            height: 78%;
            width: 100%;
            display: flex;
            overflow: hidden;
            div:nth-child(1) {
              position: relative;
              width: 30%;
              margin: 0 1.5% 0 0.5%;
              background: linear-gradient(to bottom, #112f88 0%, #070848 90%);
              .el-button {
                border-radius: 4px;
                background-color: #0d2363;
                padding: 5% 15%;
                font-size: 14px;
                position: absolute;
                left: 50%;
                right: 50%;
                color: #d4d8e0;
                transform: translate(-50%, -50%);
                bottom: 0%;
              }
            }
            div:nth-child(2) {
              width: 70%;
            }
          }
        }
      }
      .content-left-bottom {
        height: 30.2%;
        width: 100%;
        display: flex;
        .content-left-bottom-item1 {
          width: 32%;
          padding: 0 0.5% 0 0.5%;
          margin-right: 0.5%;
          border: 1px solid #077ead;
          border-radius: 3px;
          overflow: hidden;
          .content-left-bottom-item1-title {
            display: flex;
            justify-content: space-between;
            padding: 2% 3% 2% 2%;
            div:nth-child(1) {
              color: #fff;
              font-size: 14px;
            }
            div:nth-child(2) {
              color: #1a7cdb;
              font-size: 14px;
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
        .content-left-bottom-item2 {
          width: 32%;
          padding: 0 0.5% 0 0.5%;
          margin-right: 0.5%;
          border: 1px solid #077ead;
          border-radius: 3px;
          overflow: hidden;
          .content-left-bottom-item2-title {
            display: flex;
            justify-content: space-between;
            padding: 2% 3% 2% 2%;
            div:nth-child(1) {
              color: #fff;
              font-size: 14px;
            }
            div:nth-child(2) {
              color: #1a7cdb;
              font-size: 14px;
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
        .content-left-bottom-item3 {
          width: 32%;
          padding: 0 0.5% 0 0.5%;
          margin-right: 0.5%;
          border: 1px solid #077ead;
          border-radius: 3px;
          overflow: hidden;
          .content-left-bottom-item3-title {
            display: flex;
            justify-content: space-between;
            padding: 2% 3% 2% 2%;
            div:nth-child(1) {
              color: #fff;
              font-size: 14px;
            }
            div:nth-child(2) {
              color: #1a7cdb;
              font-size: 14px;
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
    .content-right {
      width: 20%;
      height: 100%;
      .content-right-item1 {
        height: 28.8%;
        padding: 0 2% 0 2%;
        margin-bottom: 2%;
        border: 1px solid #077ead;
        border-radius: 3px;
        overflow: hidden;
        .content-right-item1-title {
          display: flex;
          justify-content: space-between;
          padding: 3% 3% 3% 2%;
          div:nth-child(1) {
            color: #fff;
            font-size: 14px;
          }
          div:nth-child(2) {
            color: #1a7cdb;
            font-size: 14px;
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
      .content-right-item2 {
        height: 38.7%;
        padding: 0 2% 0 2%;
        margin-bottom: 2%;
        border: 1px solid #077ead;
        border-radius: 3px;
        overflow: hidden;
        .content-right-item2-title {
          display: flex;
          justify-content: space-between;
          padding: 3% 3% 3% 2%;
          div:nth-child(1) {
            color: #fff;
            font-size: 14px;
          }
          div:nth-child(2) {
            color: #1a7cdb;
            font-size: 14px;
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
      .content-right-item3 {
        height: 30%;
        padding: 0 2% 0 2%;
        // margin-bottom: 1%;
        border: 1px solid #077ead;
        border-radius: 3px;
        overflow: hidden;
        .content-right-item3-title {
          display: flex;
          justify-content: space-between;
          padding: 3% 3% 3% 2%;
          div:nth-child(1) {
            color: #fff;
            font-size: 14px;
          }
          div:nth-child(2) {
            color: #1a7cdb;
            font-size: 14px;
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>