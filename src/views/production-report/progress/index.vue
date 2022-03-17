// 实时进度
<template>
  <basic-container>
    <el-row>
      <el-form
        label-width="100px"
        :inline="true"
        :model="departmentForm"
        class="detail-form"
      >
        <el-row style="margin-left: -60px">
          <el-col :span="10">
            <el-form-item label="时间">
              <el-date-picker
                v-model="value1"
                size="small"
                type="date"
                style="width: 180px; margin-right: 10px"
                placeholder="开始日期"
              >
              </el-date-picker>
              至
              <el-date-picker
                v-model="value1"
                type="date"
                size="small"
                style="width: 180px; margin-left: 10px"
                placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button size="small" type="primary">搜索</el-button>
            <el-button size="small">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row style="display: flex">
      <div class="makeList">
        <div class="makeListTitle">工单排序列表</div>
        <div class="makeSearch">
          <el-input placeholder="请输入工单号" size="small"></el-input>
          <el-button size="small" type="primary">搜索</el-button>
        </div>
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="detailedProgress">
        <el-row
          style="
            height: 34px;
            text-align: center;
            line-height: 34px;
            border-bottom: 1px solid #dedede;
            background: #f7f8fa;
          "
          >2020-11-17</el-row
        >
        <el-row>
          <el-col
            :span="6"
            class="col"
            v-for="item in elRowTable"
            :key="item.id"
            ref="rowCol"
          >
            <el-row>{{ item.value }}</el-row>
          </el-col>
          <div class="speedProgress">
            <div v-for="item in dataTable" :key="item.time">
              <el-popover
                placement="bottom"
                width="200"
                trigger="click"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
              >
                <el-row>计划数量: 1000PCS</el-row>
                <el-row>已完成数: 700PCS</el-row>
                <el-row>未完成数: 3000PCS</el-row>
                <el-progress
                  :text-inside="true"
                  :stroke-width="20"
                  :percentage="70"
                  class="progress"
                  slot="reference"
                  :style="{ 'margin-left': item.left + 'px' }"
                ></el-progress>
              </el-popover>
            </div>
          </div>
        </el-row>
      </div>
    </el-row>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      elRowTable: [
        {
          id: 1,
          value: "8 : 00",
        },
        {
          id: 1,
          value: "11 : 00",
        },
        {
          id: 1,
          value: "15 : 00",
        },
        {
          id: 1,
          value: "17 : 00",
        },
      ],
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      width: null,
      left: null,
      s: null,
      dataTable: [
        { time: "9:45:30" },
        { time: "12:00:00" },
        { time: "15:50:26" },
      ],
    };
  },
  created() {},
  mounted() {
    this.width = this.$refs.rowCol[0].$el.offsetWidth;

    this.init();
  },
  methods: {
    init() {
      this.dataTable.forEach((item) => {
        this.s = null;
        var hour = item.time.split(":")[0];
        var min = item.time.split(":")[1];
        var sec = item.time.split(":")[2];
        this.s = Number(hour * 3600) + Number(min * 60) + Number(sec);
        if (28800 <= this.s < 39600) {
          let jiange = (39600 - 28800) / this.width; //1px 45秒
          item.left = (this.s - 28800) / jiange;
        } else if (39600 <= this.s < 54000) {
          let jiange = (54000 - 39600) / this.width; //1px 45秒
          item.left = (this.s - 39600) / jiange;
        } else if (54000 <= this.s < 61200) {
          let jiange = (61200 - 54000) / this.width; //1px 45秒
          item.left = (this.s - 54000) / jiange;
        }
      });
      console.log(this.dataTable);
    },
    // 假设9:45:30
    // 8:00 是28800 秒 11:00 = 39600 15:00=54000 17:00 = 61200
  },
};
</script>

<style lang="scss">
.makeList {
  border: 1px solid #dedede;
  width: 265px;
  height: 871px;
  margin-right: 16px;
  .makeListTitle {
    height: 53px;
    line-height: 53px;
    margin-left: 20px;
    background: #f7f8fa;
    font-weight: bold;
  }
  .makeSearch {
    .el-input {
      width: 160px;
      margin-left: 15px;
      margin-top: 15px;
    }
  }
  .el-tree {
    margin-left: 6px;
    margin-top: 15px;
  }
}
.detailedProgress {
  border: 1px solid #dedede;
  width: 78%;
  height: 871px;
  .col {
    height: 837px;
    border-right: 1px solid #dedede;
  }
  & > .el-row {
    height: 34px;
    text-align: center;
    line-height: 34px;
    background: #f7f8fa;
    border-bottom: 1px solid #dedede;
  }
}
.speedProgress {
  position: absolute;
  top: 10%;
  .progress {
    margin-top: 50px;
    width: 575px;
  }
}

// .popover{
//   width:162px!important;
//   height:113px;
//   box-sizing:border-box;
//   .el-row{
//     margin-bottom:5px;
//   }
// }
</style>
