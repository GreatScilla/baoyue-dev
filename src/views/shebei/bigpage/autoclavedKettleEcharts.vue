 <template>
  <div>
    <div class="wrap">
      <div class="con">
        <div class="con-left">
          <div class="fqjyyTitleBox">蒸压釜</div>
          <div class="fqjyyCont">
            <div
              class="fu1"
              v-for="(item, index) in autoclaveSelectBIOneResp"
              :key="index"
            >
              <div class="fu-con">
                <div class="fu-con-left">
                  <div class="fu-con-left-top">
                    <div class="Fubox FuBoxLeft">
                      <img src="./img/wendu.png" alt="" />
                      <span
                        :style="
                          item.leftTemStatus == 0 ? 'color: #fff' : 'color: red'
                        "
                        class="fuNum"
                        @click="leftLineShow(item)"
                        >{{ item.leftTem }}℃</span
                      >
                    </div>
                  </div>
                  <!-- <div
                    class="fu-con-left-bottom"
                    @click="leftLineShow(item)"
                  >
                   温度 
                  </div> -->
                </div>
                <div class="fu-con-con">{{ item.position }}</div>
                <div class="fu-con-right">
                  <!-- <div
                    class="fu-con-left-bottom"
                    @click="rightLineShow(item)"
                  >
                   压力
                  </div> -->
                  <div class="fu-con-left-top">
                    <div class="Fubox">
                      <img src="./img/yaLiBiao.png" alt="" />
                      <span
                        :style="
                          item.rightPressureStatus == 0
                            ? 'color: #fff'
                            : 'color: red'
                        "
                        class="fuNum"
                        @click="rightLineShow(item)"
                        >{{ item.rightPressure | keepTwoNum }}Mpa</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="con-right">
          <div class="jtcjTitleBox">
            <div class="jtcjTitle">蒸汽流量</div>
            <div class="el-icon-close" @click="btnclick"></div>
          </div>
          <div class="jtcjCont">
            <div
              class="rightF"
              style="margin-right: 20px"
              v-for="(item, index) in autoclaveSelectBITwoResp"
              :key="index"
            >
              <div
                @click="goEcharts(item)"
                :style="
                  item.position.split('').length > 3 ? 'font-size:18px' : ''
                "
                class="endOne"
              >
                {{ item.position }}
              </div>
              <div class="endbox">
                <div class="endTwo">
                  <span>瞬时流量</span
                  ><span
                    :style="
                      item.instantaneousFlowStatus == 0
                        ? 'color: #fff'
                        : 'color: red'
                    "
                    class="fuNum1"
                    >{{ item.instantaneousFlow | keepTwoNum }}</span
                  >
                </div>
                <div class="endTwo">
                  <span>累计流量</span
                  ><span
                    :style="
                      item.cumulativeFlowStatus == 0
                        ? 'color: #fff'
                        : 'color: red'
                    "
                    class="fuNum1"
                    >{{ item.cumulativeFlow }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <brokenline v-if="tes" :tes="tes"></brokenline>
  </div>
</template>

<script>
import { getBI } from "@/api/equipmentMaterialAl/autoclave";
import brokenline from "./brokenline";

export default {
  components: {
    brokenline,
  },
  props: [""],
  name: "zyf",
  data() {
    return {
      timer: null, //定时器名称
      autoclaveSelectBIOneResp: [],
      autoclaveSelectBITwoResp: [
        {
          cumulativeFlow: "12",
          cumulativeFlowStatus: "0",
          id: "1",
          instantaneousFlow: "34",
          instantaneousFlowStatus: "1",
          position: "A1-5",
        },
      ],
      warnBG: "./img/warnBG.png",
      NowarnBG: "./img/NowarnBG.png",
      greenBG: "./img/greenBg.png",
      tes: {
        lineid: "",
        title: "",
        type: "",
        showtwo: false,
      },
    };
  },
  created() {},
  mounted() {
    this.getdata();
    this.timer = setInterval(() => {
      setTimeout(this.getdata(), 0);
    }, 1000 * 60);
  },
  methods: {
    goEcharts(e) {
      this.tes.lineid = e.id;
      this.tes.type = "2";
      this.tes.title = "蒸汽流量-" + e.position + "(近24小时流量变化曲线)";
      this.tes.showtwo = true;
    },
    opop() {
      // console.log(this.autoclaveSelectBIOneResp);
    },
    async getdata() {
      let res = await getBI();
      this.autoclaveSelectBIOneResp = res.data.data.autoclaveSelectBIOneResp;
      this.autoclaveSelectBITwoResp = res.data.data.autoclaveSelectBITwoResp;
    },
    leftLineShow(e) {
      this.tes.lineid = e.leftId;
      this.tes.type = "1";
      this.tes.title = e.position + "(近24小时温压变化曲线)";
      this.tes.showtwo = true;
    },
    rightLineShow(e) {
      this.tes.lineid = e.rightId;
      this.tes.type = "1";
      this.tes.title =
        e.position + "-" + e.rightName + "(近24小时温压变化曲线)";
      this.tes.showtwo = true;
    },
    btnclick() {
      this.$emit("closeDialog");
      this.$parent.showBack = true;
    },
    closeBtn() {
      this.tes.showtwo = false;
    },
  },
  filters: {
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style scoped lang='scss'>
/deep/.el-icon-close {
  z-index: 3;
  padding-right: 10px;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}
.rightTop {
  position: absolute;
  color: white;
  right: 430px;
  top: 10px;
  font-size: 22px;
}
.endTwo {
  height: 30px;
  color: white;
  .fuNum1 {
    // margin-left: 20px;
    font-size: 18px;
    color: #fff;
  }
}
.endOne {
  width: 60px;
  height: 60px;
  // line-height: 60px;
  padding-left: 15px;
  cursor: pointer;
  font-size: 38px;
  color: #1e77d2;
}
.rightF {
  display: flex;
  width: 210px;
  height: 139px;
  /* background-color: rgba(33,68,120,1); */
  background-image: url("./img/zqllBg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  justify-content: space-around;
  align-items: center;
}
.endbox {
  padding-right: 10px;
  width: 90px;
  height: 60px;
}
.right p {
  width: 500px;
  height: 75px;
  /*background-color: #dd6161;*/
  /*opacity: 0.2;*/
}
.button {
  margin: 0;
  padding: 0;
  font-size: 25px;
  color: white;
  /*border: 1px solid transparent;  */
  outline: none;
}
.leftbage span {
  cursor: pointer;
}
.leftbage {
  width: 873px;
  height: 93px;
  transform: scale(0.8);
  background-image: url("./img/brage.png");
  background-size: cover;
  display: flex;
  justify-content: space-between;
  font-size: 38px;
  color: #1e77d2;
  line-height: 93px;
  /*background-color: #dd6161;*/
}
.leftmini span {
  /*background-color: #04d9b2;*/
}
.leftmini {
  width: 101px;
  height: 80px;
  text-align: center;
  font-size: 16px;
  color: white;
}
.leftp {
  margin-top: -5px;
  width: 1200px;
  height: 70px;
  font-size: 22px;
  color: white;
  padding-left: 35px;
  line-height: 60px;
  position: absolute;

  /*background-color: #04d9b2;*/
}
/*.leftmini p{*/
/*  height: 75px;*/
/*}*/
.leftInner {
  /*transform: scale(0.4);*/
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*flex-wrap: wrap;*/
  margin-top: -6px;
  width: 1150px;
  height: 90px;
  /*background-color: #04d9b2;*/
  /* background-color: rgb(31,120,211); */
  border-radius: 6px;
  background-image: url("./img/leftinner.png");
  background-size: 100% 100%;
  position: relative;
}
.zyfCode {
  color: #fff;
  position: absolute;
  font-size: 18px;
  left: 45%;
  top: 20%;
  padding-bottom: 10px;
}
.top {
  width: 1920px;
  height: 20px;
}
.right {
  background-image: url("./img/right.png");
  background-size: 100% 100%;
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  /*background-color: #04d9b2;*/
}
.left {
  overflow: hidden;
  background-image: url("./img/back.png");
  background-size: 100% 100%;
  width: 68%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /*background-color: #dd6161;*/
}
.wrap {
  padding: 0 10px 20px 10px;
  position: fixed;
  top: 60px;
  left: 0px;
  width: 99%;
  height: 99%;
  background-color: #01131f;
  /* display: flex; */
  /* justify-content: space-around; */
  /*flex-wrap: wrap;*/
  .con {
    width: 100%;
    height: 94%;
    // background-color: #fff;
    display: flex;
    .con-left {
      flex: 5;
      //   text-align: center;
      margin-right: 20px;
      background-image: url("./img/back.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .fqjyyTitleBox {
        height: 5%;
        line-height: 50px;
        padding-left: 30px;
        width: 100%;
        opacity: 1;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        cursor: pointer;
      }
      .fqjyyCont {
        height: 94%;
        width: 100%;
        overflow: scroll;
        padding-top: 10px;
        display: flex;
        display: -webkit-box;
        place-content: stretch center;
        flex-flow: column nowrap;
        align-items: center;
        text-align: center;
      }
      .fu1 {
        width: 95%;
        height: 65px;
        background-image: url("./img/NowarnBG.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 20px;
        display: flex;
        place-content: stretch center;
        flex-flow: column nowrap;
        align-items: center;
        .fu-con {
          width: 90%;
          height: 90%;
          background-image: url("./img/fubg.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          display: flex;
          place-content: stretch center;
          flex-flow: row nowrap;
          align-items: center;
          .fu-con-left,
          .fu-con-right {
            flex: 1.2;
            height: 100%;
            display: flex;
            place-content: stretch center;
            flex-flow: row nowrap;
            align-items: center;
            img {
              vertical-align: middle;
              width: 25px;
              height: 25px;
            }
            .fu-con-left-top {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              .FuBoxLeft {
                padding-left: 15px;
                img {
                  vertical-align: middle;
                }
              }
              .Fubox {
                // height: 50%;
                // line-height: 40px;
                // text-align: left;
                img {
                  // vertical-align: middle;
                }
              }
              .fuNum {
                margin-left: 20px;
                font-size: 24px;
                color: #fff;
                cursor: pointer;
              }
            }
            .fu-con-left-bottom {
              width: 50%;
              font-size: 30px;
              color: #fff;
              font-weight: 500;
              cursor: pointer;
              font-family: Source Han Sans CN;
            }
          }
          .fu-con-con {
            flex: 3;
            height: 100%;
            line-height: 50px;
            font-size: 20px;
            color: #fff;
            font-weight: 500;
          }
        }
      }
    }
    .con-right {
      flex: 2;
      background-image: url("./img/right.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .jtcjTitleBox {
        height: 5%;
        width: 100%;
        display: flex;
        place-content: space-around space-between;
        flex-flow: row nowrap;
        align-items: center;
        .jtcjTitle {
          padding-left: 25px;
          opacity: 1;
          font-size: 22px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: left;
          color: #ffffff;
          letter-spacing: 2px;
          text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
          cursor: pointer;
        }
      }
      .jtcjCont {
        height: 95%;
        width: 100%;
        display: flex;
        padding-left: 10px;
        place-content: center center;
        flex-flow: row wrap;
        align-items: center;
        .marginRight {
          margin-right: 30px;
        }
        .rightF {
          display: flex;
          width: 80%;
          height: 127px;
          margin-bottom: 100px;
          background-image: url("./img/jycjbg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          justify-content: space-around;
          align-items: center;
          .endOne {
            flex: 1;
            height: 60px;
            // line-height: 60px;
            text-align: center;
            // padding-left: 15px;
            cursor: pointer;
            font-size: 38px;
            font-weight: 700;
            color: #74c0fc;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .endbox {
            // padding-right: 10px;
            flex: 1;
            height: 80px;
            display: flex;
            place-content: space-around space-between;
            flex-flow: column nowrap;
            .endTwo {
              height: 30px;
              color: white;
              span:nth-child(1) {
                font-size: 16px;
                padding-right: 10px;
              }
              img {
                vertical-align: middle;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
.el-dialog__body {
  background-color: #030e34;
}
</style>
