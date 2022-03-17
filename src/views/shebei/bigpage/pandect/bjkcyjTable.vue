<template>
  <el-table
    ref="reader-table"
    :data="tableData"
    style="width: 100%"
    max-height="215"
    :header-cell-style="tableHeaderColor"
  >
    <el-table-column label="燃气表" prop="position"> </el-table-column>
    <el-table-column label="日期" prop="date"> </el-table-column>
    <el-table-column label="时间" prop="time"> </el-table-column>
    <el-table-column
      label="工况累计流量"
      prop="cumulativeFlowUnderWorkingConditions"
    >
    </el-table-column>
    <!-- <el-table-column
      label="标况累计流量"
      prop="standardConditionCumulativeFlow"
    >
    </el-table-column> -->
  </el-table>
</template>
<script>
import { getGasBITwo } from "@/api/equipmentMaterialAl/waterMeter";
export default {
  data() {
    return {
      waterMeterChildData: {
        workingConditionCumulativeFlowAll: "",
        standardConditionCumulativeFlowAll: "",
      },
      tableData: [],
    };
  },
  computed: {
    cumulativeFlowUnderWorkingConditions() {
      let total = 0;
      total =
        Number(
          this.tableData[0].cumulativeFlowUnderWorkingConditions -
            this.tableData[2].cumulativeFlowUnderWorkingConditions
        ) +
        Number(
          this.tableData[1].cumulativeFlowUnderWorkingConditions -
            this.tableData[3].cumulativeFlowUnderWorkingConditions
        );
      // let total = 0;
      // this.tableData.forEach((item) => {
      //   if (item.cumulativeFlowUnderWorkingConditions) {
      //     total = (+total + +item.cumulativeFlowUnderWorkingConditions).toFixed(
      //       2
      //     );
      //   }
      // });
      console.log(total);
      return total.toFixed(2);
    },
    standardConditionCumulativeFlow() {
      let total = 0;
      this.tableData.forEach((item) => {
        if (item.standardConditionCumulativeFlow) {
          total = (+total + +item.standardConditionCumulativeFlow).toFixed(2);
        }
      });
      return total;
    },
  },
  mounted() {
    this.getData();
    // const table = this.$refs["reader-table"];
    // const divData = table.bodyWrapper;
    // setInterval(() => {
    //   divData.scrollTop += 1;
    //   if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
    //     divData.scrollTop = 0;
    //   }
    // }, 50);
  },
  methods: {
    async getData() {
      const res = await getGasBITwo();
      if (res) {
        this.tableData = res.data.data;
        this.waterMeterChildData.workingConditionCumulativeFlowAll =
          this.cumulativeFlowUnderWorkingConditions;
        this.waterMeterChildData.standardConditionCumulativeFlowAll =
          this.standardConditionCumulativeFlow;
        this.$emit("childData", this.waterMeterChildData);
      }
    },
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "height:23px;font-size:14px; background-image: linear-gradient(#2b303e,#2b303e);,rgba(43,48,62,1));color: #fff;font-weight: 500; text-align: center;";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// /deep/.el-table--scrollable-y {
//   overflow-y: hidden !important;
// }
// /deep/ .el-table__body-wrapper {
//   overflow-y: hidden !important;
// }
/deep/.el-table__body-wrapper::-webkit-scrollbar {
  /*width: 0;宽度为0隐藏*/
  width: 0px !important;
}
.el-table::before {
  height: 0px;
}
.el-table {
  /deep/th {
    padding: 0 !important;
  }
  /deep/tr {
    background-color: transparent !important;
    color: #fff;
  }
  /deep/.cell {
    font-size: 14px;
    height: 23px;
    line-height: 23px;
    margin: 5px 0;
    text-align: center;
  }
  background-color: transparent !important;

  /deep/ th,
  tr,
  td {
    border: 0;
    background-color: transparent !important;
    border-bottom: none !important;
  }
  /deep/ .el-table__body tr:hover > td {
    background-color: transparent;
  }
}
/deep/.el-table__body {
  .cell {
    background-color: #0077ff66 !important;
  }
}
/deep/ .el-table__row > td {
  border-bottom: none;
}
</style>