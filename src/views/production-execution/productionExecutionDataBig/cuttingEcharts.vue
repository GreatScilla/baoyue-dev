<!--  -->
<template>
  <div class="">
    <div id="chart" style="height: 90%; width: 98%"></div>
  </div>
</template>

<script>
import { getMeshWorkOrderByPage } from "@/api/manufacture/meshWorkOrder.js"; //网片库存
export default {
  components: {},
  data() {
    return {
      timer: null,
    };
  },
  created() {},
  destroyed() {
    clearInterval(this.timer);
  },
  mounted() {
    this.handleList();
    this.timer = setInterval(() => {
      setTimeout(() => {
        this.handleList();
      }, 0);
    }, 30000);
    // this.getEcharts();
  },
  methods: {
    // 查询角色
    async handleList() {
      var names = []; //类别数组(实际用来盛放X轴坐标值)
      var series = [];
      let params = { current: 1, size: 99999, artisanStatus: 1 };
      const res = await getMeshWorkOrderByPage(params);
      const list = res.data.data.records;
      //这个5可以顺便调整是用来判断当前视图要显示几个
      Object.keys(list).forEach((key) => {
        let item = {
          name: list[key].materialName,
          model: list[key].model,
          value: list[key].qualifiedSum,
        };
        names.push(list[key].materialName);
        series.push(item);
      });
      var namenum = Math.floor(100 / (series.length / 10));
      var showEchart = false;
      if (series.length > 10) {
        showEchart = true;
      }
      this.getEcharts(names, series, showEchart, namenum);
    },
    getEcharts(names, series, showEchart, namenum) {
      this.$nextTick(() => {
        let myChart = this.echarts.init(document.getElementById("chart"));
        let option = {
          tooltip: {
            trigger: "axis",
            borderColor: "#112b6b", //设置边框颜色
            borderRadius: 10,
            padding: 0,
            formatter(params) {
              let html = "";
              params.forEach((v) => {
                html += `<div style="color:#d4d8e0;font-size: 14px;
                line-height: 24px;border:1px solid #112b6b;background:#112b6b;
                padding:10px; border-radius: 10px;">
                <div>
                  <span style="font-size: 14px;margin-left:5px">名称:&nbsp;&nbsp;${v.name}</span>
                  <br/>
                  <span style="font-size: 14px;margin-left:5px">规格:&nbsp;&nbsp;${v.data.model}</span>
                  <br/>
                  <span style="font-size: 14px;margin-left:5px">合格数:&nbsp;&nbsp;${v.value}</span>
                </div>
                </div>`;
              });
              return html;
            },
            //extraCssText:额外附加到浮层的 css 样式。
            extraCssText: "background: #182235; border-radius: 5;color: #fff;",
            //axisPointer:坐标轴指示器配置项。分为:'line' 直线指示器,'shadow' 阴影指示器,'none' 无指示器,'cross' 十字准星指示器。
            axisPointer: {
              type: "none",
              lineStyle: {
                type: "solid",
                width: 1,
                color: "#057bc5",
              },
            },
          },
          grid: {
            top: "5%",
            left: "2%",
            right: "1%",
            bottom: "20%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: names,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#063374",
                  width: 1,
                  type: "solid",
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
                textStyle: {
                  color: "#00c7ff",
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              //   axisLabel: {
              //     formatter: "{value} %",
              //   },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#424c7b",
                  width: 1,
                  type: "solid",
                },
              },
              axisTick: {
                show: false,
              },
              //设置网格线颜色
              splitLine: {
                lineStyle: {
                  color: "#031962",
                },
              },
            },
          ],
          dataZoom: [
            {
              show: showEchart, // 是否展示
              xAxisIndex: [0], // 控制第一个x轴
              height: 30,
              left: 100,
              right: 100,
              bottom: 25,
              start: 0, // 数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
              end: namenum, // 数据窗口范围的结束百分比。范围是：0 ~ 100。
              handleSize: "110%",
              zoomLock: true, //是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true
            },
          ],
          series: [
            {
              type: "bar",
              data: series,
              barWidth: 30, //柱子宽度
              // barGap: 1, //柱子之间间距
              itemStyle: {
                normal: {
                  color: this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#00fcae",
                    },
                    {
                      offset: 0.5,
                      color: "#0c978e",
                    },
                    {
                      offset: 1,
                      color: "#070a4c",
                    },
                  ]),
                  opacity: 1,
                },
              },
            },
          ],
        };
        option && myChart.setOption(option);
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>