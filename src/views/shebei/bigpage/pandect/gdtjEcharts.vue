<template>
  <div class="projectearlier">
    <div id="myChart" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // left: "right", //位置
          //icon: "horizontal", //形状  类型包括 circle,rect,line，roundRect，triangle，diamond，pin，arrow，none
           itemWidth: 30, // 设置宽度
           itemHeight:10, // 设置高度
          itemGap: 20, // 设置间距
          top: "3%",
          right: "4%",
          data: ["维修", "保养", "点检"],
          textStyle: {
            //文字样式
            color: "#FFF",
            fontSize: "18",
          },
        },

        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          top: "20%",
          containLabel: true,
        },

        xAxis: {
          axisLine: {
            lineStyle: {
              color: "#243050",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          //轴线上的字
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "14",
            },
          },
          data: [
            "08:10",
            "08:20",
            "08:30",
            "08:40",
            "08:50",
            "09:00",
            "09:10",
            "09:20",
          ],
        },
        yAxis: [
          {
            type: "value",
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            //轴线上的字
            axisLabel: {
              textStyle: {
                fontSize: "12",
                color: "#cecece",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#397cbc",
              },
            },
            //网格线
            splitLine: {
              lineStyle: {
                color: "#11366e",
              },
            },
          },
        ],
        series: [
          {
            name: "维修",
            type: "line",
            smooth: true, //是否平滑曲线显示
            showSymbol: false,
            itemStyle: {
              color: "#0488ff",
              borderColor: "#f1f1f1",
              borderWidth: 1,
            },
            lineStyle: {
              normal: {
                width: 3,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#0488ff", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#0488ff", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                shadowColor: "rgba(4,136,255, 0.5)",
                shadowBlur: 30,
                shadowOffsetY: 5,
              },
            },
            areaStyle: {
              //区域填充样式
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(4,136,255, 0.6)",
                    },
                    {
                      offset: 0.6,
                      color: "rgba(4,136,255, 0.2)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(4,136,255, 0.01)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(4,136,255, 0.1)",
                shadowBlur: 6,
              },
            },
            data: [211, 35, 65, 788, 89, 76, 68, 89],
          },
          {
            name: "保养",
            type: "line",
            smooth: true, //是否平滑曲线显示
            showSymbol: false,
            itemStyle: {
              color: "#00e5ff",
              borderColor: "#f1f1f1",
              borderWidth: 1,
            },

            lineStyle: {
              normal: {
                width: 3,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#00e5ff", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#00e5ff", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                shadowColor: "rgba(0,229,255, 0.5)",
                shadowBlur: 12,
                shadowOffsetY: 5,
              },
            },
            areaStyle: {
              //区域填充样式
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,229,255, 0.6)",
                    },
                    {
                      offset: 0.6,
                      color: "rgba(0,229,255, 0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,229,255, 0.01)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,229,255, 0.4)",
                shadowBlur: 6,
              },
            },
            data: [23, 454, 75, 75, 345, 656, 343,222],
          },
          {
            name: "点检",
            type: "line",
            smooth: true, //是否平滑曲线显示
            showSymbol: false,
            itemStyle: {
              color: "#ffbb00",
              borderColor: "#f1f1f1",
              borderWidth: 1,
            },

            lineStyle: {
              normal: {
                width: 3,
                color: {
                  type: "linear",

                  colorStops: [
                    {
                      offset: 0,
                      color: "#ffbb00", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#ffbb00", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                shadowColor: "rgba(255,187,0, 0.5)",
                shadowBlur: 12,
                shadowOffsetY: 5,
              },
            },
            areaStyle: {
              //区域填充样式
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(255,187,0, 0.6)",
                    },
                    {
                      offset: 0.6,
                      color: "rgba(255,187,0, 0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(255,187,0, 0.01)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255,187,0, 0.4)",
                shadowBlur: 6,
              },
            },
            data: [233, 44, 175, 35, 245, 456, 543,123],
          },
        ],
      };
      // 绘制图表
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.projectearlier {
  width: 100%;
  height: 100%;
}
</style>
