<template>
  <div>
    <!-- <avue-echart-bar
      ref="echart"
      :theme="themeR"
      :option="configR"
      :data="dataR"
      :width="width"
    ></avue-echart-bar> -->
    <div :id="id" style="width: 800px; height: 500px"></div>
  </div>
</template>

<script>
export default {
  props: {
    theme: { type: Object, default: {} },
    option: { type: Object, default: {} },
    data: { type: Object, default: {} },
    width: { default: 900 },
    height: { default: 300 },
    title: { default: "" },
  },
  data() {
    return {
      id:'board'+Math.random(),
    };
  },
  created() {
    setTimeout(() => {
      var myChart = echarts.init(document.getElementById(this.id));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: this.title,
        },
        tooltip: {},
        legend: {
          show: false,
        },
        xAxis: {
          data: ["1栋", "2栋", "3栋", "4栋", "5栋", "6栋"],
        },
        yAxis: {
          axisLabel: {
            formatter: "{value}楼",
          },
        },
        series: [
          {
            name: "楼",
            type: "bar",
            data: [3, 8, 1, 2, 6, 2],
          },
        ],
        barWidth: 40,
        color: ["#157A2C"],
        ...this.option
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }, 0);
  },
  watch: {
    theme() {
      this.themeR = {
        ...this.themeR,
        ...this.theme,
      };
    },
    config() {
      this.configR = {
        ...this.configR,
        ...this.theme,
      };
    },
    data() {
      this.dataR = {
        ...this.dataR,
        ...this.data,
      };
    },
    height() {
      this.themeR = {
        ...this.themeR,
        height: this.height,
      };
    },
  },
};
</script>