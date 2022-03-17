 <template>
  <div>
    <div class="wrap">
      <div class="con">
        <div class="con-left">
          <div class="fqjyyTitleBox">釜前静养窑</div>
          <div class="fqjyyCont">
            <div
              class="fu1"
              v-for="(item, index) in thermometerSelectBIOneResp"
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
                        >{{ item.leftTem }}℃</span
                      >
                    </div>
                    <div class="Fubox FuBoxLeft">
                      <img src="./img/shidu.png" alt="" />
                      <span
                        :style="
                          item.leftHumStatus == 0 ? 'color: #fff' : 'color: red'
                        "
                        class="fuNum"
                        >{{ item.leftHum }}%</span
                      >
                    </div>
                  </div>
                  <div
                    class="fu-con-left-bottom"
                    :style="
                      item.leftName.split('').length > 3 ? 'font-size:18px' : ''
                    "
                    @click="leftLineShow(item)"
                  >
                    {{ item.leftName }}
                  </div>
                </div>
                <div class="fu-con-con">{{ item.position }}</div>
                <div class="fu-con-right">
                  <div
                    class="fu-con-left-bottom"
                    :style="
                      item.leftName.split('').length > 3 ? 'font-size:18px' : ''
                    "
                    @click="rightLineShow(item)"
                  >
                    {{ item.rightName }}
                  </div>
                  <div class="fu-con-left-top">
                    <div class="Fubox">
                      <img src="./img/wendu.png" alt="" />
                      <span
                        :style="
                          item.rightTemStatus == 0
                            ? 'color: #fff'
                            : 'color: red'
                        "
                        class="fuNum"
                        >{{ item.rightTem }}℃</span
                      >
                    </div>
                    <div class="Fubox">
                      <img src="./img/shidu.png" alt="" />
                      <span
                        :style="
                          item.rightHumStatus == 0
                            ? 'color: #fff'
                            : 'color: red'
                        "
                        class="fuNum"
                        >{{ item.rightHum }}%</span
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
            <div class="jtcjTitle">静停车间</div>
            <div class="el-icon-close" @click="btnclick"></div>
          </div>
          <div class="jtcjCont">
            <div
              class="rightF"
              style="margin-right: 20px"
              v-for="(item, index) in thermometerSelectBITwoResp"
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
                  <span><img src="./img/wendu.png" alt="" /></span
                  ><span
                    :style="item.temStatus == 0 ? 'color: #fff' : 'color: red'"
                    class="fuNum1"
                    >{{ item.tem }}℃</span
                  >
                </div>
                <div class="endTwo">
                  <span><img src="./img/shidu.png" alt="" /></span
                  ><span
                    :style="item.humStatus == 0 ? 'color: #fff' : 'color: red'"
                    class="fuNum1"
                    >{{ item.hum }}%</span
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
// import { echartsdata } from "@/api/shebei/commit";
import { getBI } from "@/api/equipmentMaterialAl/thermometer";
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
      thermometerSelectBIOneResp: [],
      thermometerSelectBITwoResp: [],
      warnBG: "./img/warnBG.png",
      NowarnBG: "./img/NowarnBG.png",
      greenBG: "./img/greenBg.png",
      tes: {
        lineid: "",
        title: "",
        type: "0",
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
      this.tes.title = "静停车间-" + e.position + "(近24小时温湿度变化曲线)";
      this.tes.showtwo = true;
    },
    opop() {
      // console.log(this.thermometerSelectBIOneResp);
    },
    async getdata() {
      let res = await getBI();
      this.thermometerSelectBIOneResp =
        res.data.data.thermometerSelectBIOneResp.reverse();
      this.thermometerSelectBITwoResp =
        res.data.data.thermometerSelectBITwoResp;
    },
    leftLineShow(e) {
      this.tes.lineid = e.leftId;
      this.tes.title =
        e.position + "-" + e.leftName + "(近24小时温湿度变化曲线)";
      this.tes.showtwo = true;
    },
    rightLineShow(e) {
      console.log(e);
      this.tes.lineid = e.rightId;
      this.tes.title =
        e.position + "-" + e.rightName + "(近24小时温湿度变化曲线)";
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
  background-image: url("./img/jycjbg.png");
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
        // display: -webkit-box;
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
              width: 50%;
              height: 100%;
              .FuBoxLeft {
                padding-left: 15px;
              }
              .Fubox {
                height: 50%;
                // line-height: 40px;
                text-align: left;
              }
              .fuNum {
                margin-left: 20px;
                font-size: 18px;
                color: #fff;
              }
            }
            .fu-con-left-bottom {
              width: 50%;
              font-size: 40px;
              color: #fff;
              font-weight: 500;
              cursor: pointer;
              font-family: Source Han Sans CN;
            }
          }
          .fu-con-con {
            flex: 3;
            height: 100%;
            // line-height: 60px;
            font-size: 20px;
            color: #fff;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 10px;
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
        // flex-flow: row wrap;
        flex-flow: column-reverse wrap;
        align-items: center;
        .marginRight {
          margin-right: 30px;
        }
        .rightF {
          display: flex;
          width: 210px;
          height: 139px;
          margin-bottom: 100px;
          background-image: url("./img/jycjbg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          justify-content: space-around;
          align-items: center;
          .endOne {
            width: 60px;
            height: 60px;
            // line-height: 60px;
            padding-left: 15px;
            cursor: pointer;
            font-size: 38px;
            color: #74c0fc;
          }
          .endbox {
            padding-right: 10px;
            width: 100px;
            height: 80px;
            display: flex;
            place-content: space-around space-between;
            flex-flow: column nowrap;
            .endTwo {
              height: 30px;
              color: white;
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
