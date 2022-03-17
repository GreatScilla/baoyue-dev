<template>
  <div>
    <el-card class="overview">
      <div class="overview_title">
        <span>实时概况</span>
        <span class="time"> 更新时间：{{ nowTime }} </span>
      </div>
      <div class="overview_content">
        <div class="content_left">
          <div class="info_box">
            <div class="info_div">
              <p class="p_color">销售量</p>
              <p class="p_size">{{ form.productQuantitySum || 0 }}</p>
              <p class="p_color">
                昨天：{{ form.yesterdayProductQuantitySum || 0 }}
              </p>
            </div>
            <div class="info_div">
              <p class="p_color">销售总额（元）</p>
              <p class="p_size">{{ form.salePriceSum || 0 }}</p>
              <p class="p_color">昨天：{{ form.yesterdaySalePriceSum || 0 }}</p>
            </div>
          </div>
          <div class="info_box margin_bot">
            <div class="info_div">
              <p class="p_color">出库数量</p>
              <p class="p_size">{{ form.operNumberSum || 0 }}</p>
              <p class="p_color">
                昨天：{{ form.yesterdayOperNumberSum || 0 }}
              </p>
            </div>
            <div class="info_div">
              <p class="p_color">出库金额（元）</p>
              <p class="p_size">{{ form.unitTotalPriceSum || 0 }}</p>
              <p class="p_color">
                昨天：{{ form.yesterdayUnitTotalPriceSum || 0 }}
              </p>
            </div>
          </div>
        </div>
        <div class="content_right">
          <div class="info_box">
            <div class="info_div">
              <p class="p_color">总产量</p>
              <p class="p_size">{{ form.today.sum }}</p>
              <p class="p_color">
                昨天：{{ form.yesterday.productionPlanSum }}
              </p>
            </div>
            <div class="info_div">
              <p class="p_color">生产订单数</p>
              <p class="p_size">{{ form.today.productionPlanSum }}</p>
              <p class="p_color">
                昨天：{{ form.yesterday.productionPlanSum }}
              </p>
            </div>
          </div>
          <div class="info_box margin_bot">
            <div class="info_div">
              <p class="p_color">合格数</p>
              <p class="p_size">{{ form.today.qualifiedSum }}</p>
              <p class="p_color">
                昨天：{{ form.yesterday.productionPlanSum }}
              </p>
            </div>
            <div class="info_div">
              <p class="p_color">不良数</p>
              <p class="p_size">{{ form.today.badCodeSum }}</p>
              <p class="p_color">
                昨天：{{ form.yesterday.productionPlanSum }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-row class="data">
        <el-col :span="16" class="data_left">
          <div class="data_title">销售订单情况</div>
          <div id="chart" style="height: 300px; width: 95%"></div>
        </el-col>
        <el-col :span="8" class="data_right">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane
              v-for="(item, index) in tabTitleList"
              :key="index"
              :label="item"
              :name="index"
            >
              <div v-if="index === 0" class="tab_top">
                <span>
                  待发货订单：<i class="tab_num">{{ form.agentOrders }}</i>
                </span>
                <span style="float: right">
                  待审核调拨单：<i class="tab_num">{{
                    form.allocationsToBeAudited
                  }}</i>
                </span>
              </div>
              <div class="tab_list">
                <el-container style="height: 200px">
                  <el-main>
                    <p v-for="(el, index) in tabList" :key="index">
                      <img src="./images/remind.png" alt="" />
                      <span class="remind">{{ el }}</span>
                      <span
                        class="doItNow"
                        @click="$router.push('/flow2/todoList')"
                        >立即处理</span
                      >
                    </p>
                  </el-main>
                </el-container>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="采购" name="1">采购</el-tab-pane>
            <el-tab-pane label="销售" name="2">销售</el-tab-pane>
            <el-tab-pane label="仓库" name="3">仓库</el-tab-pane>
            <el-tab-pane label="财务" name="4">财务</el-tab-pane> -->
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 10px; padding-bottom: 40px">
      <div class="jump_title">常用功能</div>
      <el-row class="jump_list" style="padding: 20px 0 20px 100px">
        <el-col :span="6" v-for="item in routerList" :key="item.id">
          <div class="jump_item" @click="jump(item.menuUrl)">
            <img src="./images/Group 7.png" alt="" />
            <span class="jump_info">{{ item.menu }}</span>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="jump_item" @click="jump('/salesManage/saleOrder')">
            <img src="./images/Group 7.png" alt="" />
            <span class="jump_info">销售订单</span>
          </div>
        </el-col> -->
        <!-- <el-col :span="6">
          <div
            class="jump_item"
            @click="jump('/purchaseManage/purchaseInbound')"
          >
            <img src="./images/Group 8.png" alt="" />
            <span class="jump_info">采购进货</span>
          </div>
        </el-col> -->
        <!-- <el-col :span="6">
          <div class="jump_item" @click="jump('/storageManage/inboundManage')">
            <img src="./images/Group 9.png" alt="" />
            <span class="jump_info">入库管理</span>
          </div>
        </el-col> -->
      </el-row>
      <!-- <el-row class="jump_list">
        <el-col :span="6">
          <div class="jump_item" @click="jump('/purchaseManage/purchaseOrder')">
            <img src="./images/Group 10.png" alt="" />
            <span class="jump_info">采购订单</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="jump_item" @click="jump('/human-resources/employeeFile')">
            <img src="./images/Group 11.png" alt="" />
            <span class="jump_info">人员管理</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div
            class="jump_item"
            @click="jump('/production-management/schedule')"
          >
            <img src="./images/Group 12.png" alt="" />
            <span class="jump_info">排程管理</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="jump_item" @click="jump('/financial/incomeStatement')">
            <img src="./images/Group 13.png" alt="" />
            <span class="jump_info">收入管理</span>
          </div>
        </el-col>
      </el-row> -->
    </el-card>
    <!-- <el-image
      class="image"
      :src="img"
      fit="contain"></el-image> -->
  </div>
</template>

<script>
import img from "./images/bg.jpg";
import { getCommonlyUsedFunctions } from "@/api/common";
import {
  getHomePageShopOrder,
  getHomePageSelectResp,
  getProductionPlanHomePage,
  indexList,
  queryHomeBill,
} from "@/api/wel/index.js";

export default {
  data() {
    return {
      routerList: [],
      img,
      nowTime: "", //当前时间
      activeName: 0,
      form: {
        today:{},
        yesterday:{}

      },
      tabTitleList: ["全部", "采购", "销售", "仓库", "财务", "生产"],
      tabList: [],
      orderList: [], //订单数
      returnList: [], //退货数
      month: [],
    };
  },
  async created() {
    const res = await getCommonlyUsedFunctions();
    // res.data.records.map((el) => {
    //   let newStr = el.menuUrl.replace(/\//g, "-");
    //   let result = newStr.replace(/-/, "/");
    //   el.icon = result;
    // });
    this.routerList = res.data.records;
    // console.log(this.routerList);
    this.getInit();
  },
  mounted() {
    this.getTodoList(this.activeName);
  },
  methods: {
    // bindIcon(icon) {
    //   return("../../../public/images" + icon + ".png");
    // },

    //获取首页初始数据
    async getInit() {
      let res = await Promise.all([
        getHomePageShopOrder(),
        getProductionPlanHomePage(),
      ]);
      this.form = { ...res[0].data.data, ...res[1].data.data };
      // this.form = { ...res[0].data.data };
      // console.log(this.form);
      var date = new Date();
      this.nowTime = date
        .toLocaleDateString()
        .replace(new RegExp("/", "g"), "-");
      //处理echars数据
      this.month = this.form.shopOrderInfoRespList.map((el) => el.date);
      this.orderList = this.form.shopOrderInfoRespList.map(
        (el) => el.shopOrderSum
      );
      this.returnList = this.form.shopReturnInfoRespList.map(
        (el) => el.shopReturnSum
      );
      this.getChart();
    },
    //待办数据
    async getTodoList(status) {
      let info = await indexList({ flag: status });
      this.tabList = info.data.data;
    },
    //获取echars图表
    getChart() {
      const _this = this;
      var chartLine = echarts.init(document.getElementById("chart"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },
        legend: {
          //设置区分（哪条线属于什么）
          data: ["订单数", "退货数"],
          right: 80,
        },
        color: ["#1890ff", "#3ad8aa"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: true, //坐标轴两边不留白
          data: _this.month,
          name: "", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#FA6F53",
            fontSize: 16,
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#e8e8e8e",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          // name: "单位：千",
          nameTextStyle: {
            color: "#aaaaaa",
            fontSize: 12,
            padding: [0, 0, 20, 0],
          },
          axisLine: {
            lineStyle: {
              color: "#e8e8e8e",
            },
          },
          type: "value",
          axisTick: {
            show: false,
          },
          boundaryGap: false,
        },
        series: [
          {
            name: "订单数",
            data: _this.orderList,
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#1890ff",
              },
            },
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(24,144,255,0.39)",
                  },
                  {
                    offset: 0.34,
                    color: "rgba(24,144,255,0.25)",
                  },
                  {
                    offset: 1,
                    color: "rgba(24,144,255,0.00)",
                  },
                ]),
              },
            },
          },
          {
            name: "退货数",
            data: _this.returnList,
            type: "line",
            lineStyle: {
              normal: {
                color: "#3ad8aa",
              },
            },
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(28,216,710,0.39)",
                  },
                  {
                    offset: 0.34,
                    color: "rgba(28,216,710,0.25)",
                  },
                  {
                    offset: 1,
                    color: "rgba(28,216,710,0.00)",
                  },
                ]),
              },
            },
          },
        ],
      };
      chartLine.setOption(option);
    },
    handleClick() {
      this.getTodoList(this.activeName);
    },
    //跳转
    jump(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" scoped>
// /deep/ .el-image__inner {
//   height: calc(100vh - 100px)
// }
//
/deep/ .el-card__body {
  padding: 5px 15px 15px 15px !important;
}
.overview_title {
  // font-size: 18px;
  font-weight: 600;
  padding: 10px 0 8px 10px;
  .time {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 400;
    color: #9e9e9e;
  }
}
.overview_content {
  display: flex;
  justify-content: space-between;
  .content_left {
    flex: 1;
    border-right: 1px solid #f5f5f5;
    .margin_bot {
      margin-top: 12px;
    }
  }
  // 公共
  .info_box {
    display: flex;
    justify-content: space-between;
    .info_div {
      // margin-left: 60px;
      text-align: center;
      padding-right: 60px;
      box-sizing: border-box;
      flex: 1;
      .p_color {
        color: #9e9e9e;
        font-size: 14px;
      }
      .p_size {
        font-size: 24px;
        font-weight: 600;
      }
      p {
        margin: 10px 0;
      }
    }
  }
  .content_right {
    flex: 1;
    .info_div {
      // margin-left: 140px;
    }
    .margin_bot {
      margin-top: 43px;
    }
  }
}
// 数据
.data {
  margin-top: 10px;

  .data_left {
    padding-left: 10px;
    border-right: 1px solid #f5f5f5;
    .data_title {
      font-weight: 600;
      padding: 10px 0 8px;
    }
  }
  .data_right {
    padding-left: 20px;
    .tab_top {
      padding: 18px 25px 16px 14px;
      background: rgba(21, 122, 44, 0.1);
      .tab_num {
        color: #e42925;
        font-style: normal;
        font-weight: 600;
      }
    }
    .tab_list {
      .remind {
        display: inline-block;
        margin-left: 10px;
        vertical-align: top;
      }
      .doItNow {
        padding-right: 10px;
        cursor: pointer;
        font-size: 14px;
        float: right;
        color: #157a2c;
      }
    }
  }
}
//
.jump_title {
  font-weight: 600;
  padding: 10px 0 8px 10px;
}
.jump_list {
  .el-col {
    display: flex;
    justify-content: left;
    .jump_item {
      cursor: pointer;
      .jump_info {
        color: #7b7b7b;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
      }
    }
  }
}
</style>
