<!--  -->
<template>
  <div class="">
    <div id="chart1" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script>
import bus from "@/mixins/eventBus";
export default {
  components: {},
  data() {
    return {
      num: 0,
    };
  },
  created() {},
  mounted() {
    this.getEcharts(0, 100);
    bus.$on("sendBybus", (data) => {
      // if (data) {
      //   this.num = data;
      // } else {
      //   this.num = 0;
      // }
      if (data == "NaN") {
        this.num = 0;
      } else {
        this.num = data;
      }
      this.getEcharts(this.num, 100);
    });
  },
  methods: {
    getEcharts(val1, val2) {
      this.$nextTick(() => {
        let myChart = this.echarts.getInstanceByDom(
          document.getElementById("chart1")
        );
        if (myChart == null) {
          myChart = this.echarts.init(document.getElementById("chart1"));
        }
        let option = {
          title: [
            {
              text: "{val|" + this.num + "%" + "}",
              top: "30%",
              left: "center",
              textStyle: {
                rich: {
                  val: {
                    fontSize: 48,
                    fontWeight: "700",
                    color: "#ffffff",
                  },
                },
              },
            },
          ],
          series: [
            {
              name: "circle",
              type: "pie",
              clockWise: true,
              radius: ["75%", "90%"],
              center: ["50%", "40%"],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
              hoverAnimation: false,
              data: [
                {
                  name: "合格数",
                  value: val1,
                  itemStyle: {
                    normal: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#00e0c9", // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#06ee85", // 100% 处的颜色
                          },
                        ],
                        globalCoord: false, // 缺省为 false
                      },
                    },
                  },
                },
                {
                  value: val2 - val1,
                  name: "未完成",
                  itemStyle: {
                    normal: {
                      color: "#133781",
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                  },
                },
              ],
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