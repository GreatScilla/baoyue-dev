<template>
  <basic-container>
    <div>
      <el-select v-model="project1">
        <el-option
          v-for="(item, i) in projects"
          :key="item.name"
          :label="item.name"
          :value="i"
        ></el-option>
      </el-select>
      <chart title="板材安装进度" />
      <chart title="板材使用进度" :option="option2" />
    </div>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import chart from "@/components/defaultChart.vue";
export default {
  components: {
    chart,
  },
  data() {
    return {
      project1: 0,
      project2: 0,
      projects: [
        {
          name: "碧桂园项目",
        },
      ],
      option2: {
        xAxis: {
          type: "value",
          label: "个",
        },
        yAxis: [
          {
            type: "category",
            data: ["计划用量", "剩余用量", "已使用量"],
            inverse: true,
          },
          {
            type: "category",
            axisTick: { show: false }, //不显示刻度线
            inverse: true,
          },
        ],
        series: [
          {
            type: "bar",
            data: [750, 750, 750],
            itemStyle: {
              opacity: 0.2,
            },
            tooltip:{
              show:false
            }
          },
          {
            yAxisIndex: 1,
            name: "个",
            type: "bar",
            data: [750, 100, 650],
						itemStyle: {
							normal: {
								label: {
									show: true,  //开启显示
									position: 'top',  //在上方显示
									textStyle: {  //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						},
          },
        ],
      },
      height: 500,
    };
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
  },
  computed: {
    ...mapGetters(["permission", "userInfo"]),
  },
  methods: {},
};
</script>