<template>
  <div>
    <el-dialog
      @opened="openall"
      :title="tes.title"
      :visible.sync="tes.showtwo"
      width="80%"
      :modal="false"
      style="margin-top: 3.3%"
      :before-close="handleClose"
    >
      <div id="about" style="width: 1350px; height: 350px" ref="about"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getBIDetail } from "@/api/equipmentMaterialAl/thermometer";
import {
  getBIDetailOne,
  getBIDetailTwo,
} from "@/api/equipmentMaterialAl/autoclave";
export default {
  props: ["tes"],
  data() {
    return {
      timedata: [],
      temperaturedata: [],
      humiditydata: [],
      yAxisName: "",
      yAxisName1: "",
      yAxisAxisLabelColor: "",
      yAxisAxisLabelColor1: "",
      seriesMarkPointName: "",
      seriesMarkPointName1: "", //#fe9300
      seriesAreaStyleOffsetColor: "",
    };
  },

  methods: {
    async openall() {
      console.log(this.tes.type);
      let BIDetail = "";
      if (this.tes.type == "0") {
        this.yAxisName = "温度°C";
        this.yAxisName1 = "湿度%";
        this.yAxisAxisLabelColor = "#f9b802";
        this.yAxisAxisLabelColor1 = "#05d3ed";
        this.seriesAreaStyleOffsetColor = "243,180,0,";
        this.seriesMarkPointName = "温度";
        this.seriesMarkPointName1 = "湿度";
        BIDetail = getBIDetail;
      } else if (this.tes.type == "1") {
        BIDetail = getBIDetailTwo;
        this.yAxisName = "温度°C";
        this.yAxisName1 = "压力Pa";
        this.yAxisAxisLabelColor = "#fa0000";
        this.seriesAreaStyleOffsetColor = "250,0,0,";
        this.seriesMarkPointName = "温度";
        this.seriesMarkPointName1 = "压力";
      } else {
        BIDetail = getBIDetailOne;
        this.yAxisName = "瞬时流量";
        this.yAxisName1 = "累计流量";
        this.yAxisAxisLabelColor = "#fe9300";
        this.seriesAreaStyleOffsetColor = "254,147,0,";
        this.seriesMarkPointName = "瞬时流量";
        this.seriesMarkPointName1 = "累计流量";
      }
      let res = await BIDetail(this.tes.lineid);
      console.log(res.data.data, "数据");
      let createTimeList = [];
      let humList = [];
      let temList = [];
      if (this.tes.type == "0") {
        res.data.data.map((el) => {
          createTimeList.push(el.createTime);
          humList.push(el.hum);
          temList.push(el.tem);
        });
      } else if (this.tes.type == "1") {
        res.data.data.map((el) => {
          createTimeList.push(el.createTime);
          humList.push(el.pressure);
          temList.push(el.tem);
        });
      } else {
        res.data.data.map((el) => {
          createTimeList.push(el.createTime);
          humList.push(el.cumulativeFlow);
          temList.push(el.instantaneousFlow);
        });
      }
      console.log(createTimeList, humList, temList);
      this.echrtsOne(
        createTimeList,
        humList,
        temList,
        this.yAxisAxisLabelColor
      );
    },
    echrtsOne(createTimeList, humList, temList, yAxisAxisLabelColor) {
      var chartDom = document.getElementById("about");
      let myChart = this.echarts.init(chartDom);
      let option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(10,30,52,0.5)", //设置背景图片 rgba格式
          color: "black",
          borderWidth: "1", //边框宽度设置1
          borderColor: "gray", //设置边框颜色
          textStyle: {
            color: "white", //设置文字颜色
          },
          formatter: function (params) {
            var showHtm = "";
            for (var i = 0; i < params.length; i++) {
              showHtm =
                "时间:" +
                params[i].name +
                "<br>" +
                "<span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:" +
                yAxisAxisLabelColor +
                ";'></span>" +
                params[0].seriesName +
                ":" +
                params[0].value +
                "<br>" +
                '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#05d3ed;"></span>' +
                params[1].seriesName +
                ":" +
                params[1].value;
            }
            return showHtm;
          },
        },
        grid: {
          left: "4%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },

        toolbox: {
          show: true,
          feature: {
            dataView: {},
            // dataZoom: {},
            magicType: { type: ["line", "bar"] },
            // restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: createTimeList,
          // data: [
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          //   "2021-10-10 14:15",
          // ],
          axisLabel: {
            rotate: 30,
            interval: 3,
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            // name: "温度°C",
            name: this.yAxisName,
            min: 0,
            // max: 250,
            interval: 50,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                // color: "#f9b802", //y轴刻度文字颜色
                color: this.yAxisAxisLabelColor, //y轴刻度文字颜色
              },
            },
          },
          {
            type: "value",
            // name: "湿度%",
            name: this.yAxisName1,
            min: 0,
            // max: 100,
            interval: 50,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#05d3ed",
                // color: this.yAxisAxisLabelColor1,
              },
            },
          },
        ],

        series: [
          {
            // name: "温度°C",
            name: this.yAxisName,
            type: "line",
            smooth: true,
            symbol: "none",
            yAxisIndex: 0, //对应左侧Y轴
            data: temList,
            // data: [
            //   124, 283, 22, 121, 20, 139, 18, 217, 16, 115, 14, 163, 127, 11,
            //   110, 89, 8, 117, 16, 123, 41, 83, 20, 91,
            // ],
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(" + this.seriesAreaStyleOffsetColor + "0.9)",
                  },
                  {
                    offset: 1,
                    color: "rgba(" + this.seriesAreaStyleOffsetColor + "0)",
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            itemStyle: {
              normal: {
                // color: "#275F82", //改变折线点的颜色
                lineStyle: {
                  color: this.yAxisAxisLabelColor, //改变折线颜色
                },
              },
            },
            markPoint: {
              label: {
                show: true,
                position: "top",
                distance: 20,
                offset: [1, 1],
                formatter: "{b}: {c} ℃",
                textStyle: { color: this.yAxisAxisLabelColor },
              },
              symbol: "circle",
              symbolSize: 0,
              symbolOffset: [0, 0],
              data: [
                {
                  type: "max",
                  // name: "温度",
                  name: this.seriesMarkPointName,
                },
              ],
            },
          },
          {
            // name: "湿度%",
            name: this.yAxisName1,
            type: "line",
            smooth: true,
            symbol: "none",
            yAxisIndex: 1, //对应左侧Y轴
            data: humList,
            // data: [
            //   13, 24, 3, 45, 5, 6, 77, 8, 98, 10, 181, 128, 143, 214, 15, 156,
            //   17, 188, 129, 250, 211, 122, 23, 224,
            // ],
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,223,249, 0.9)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,223,249, 0)",
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            itemStyle: {
              normal: {
                // color: "#275F82", //改变折线点的颜色
                lineStyle: {
                  color: "#00dff9", //改变折线颜色
                },
              },
            },
            markPoint: {
              label: {
                show: true,
                position: "top",
                distance: 20,
                offset: [1, 1],
                formatter: "{b}: {c} %",
                textStyle: { color: "#05d3ed" },
              },
              symbol: "circle",
              symbolSize: 0,
              symbolOffset: [0, 0],
              data: [
                {
                  type: "max",
                  // name: "湿度",
                  name: this.seriesMarkPointName1,
                },
              ],
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog {
  background: #0a1e34;
  .el-dialog__header {
    background: linear-gradient(to right, #2d9ee0, #2f80ed, #091e3a);
  }
  .el-dialog__title {
    opacity: 1;
    font-size: 22px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #ffffff;
    letter-spacing: 2px;
    text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  }
}
</style>
