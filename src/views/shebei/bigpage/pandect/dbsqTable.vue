<template>
  <el-table
    ref="reader-table"
    :data="tableData"
    style="width: 100%"
    max-height="240"
    :header-cell-style="tableHeaderColor"
  >
    <el-table-column label="所在位置" prop="position"> </el-table-column>
    <el-table-column label="日期" prop="date"> </el-table-column>
    <el-table-column label="时间" prop="time"> </el-table-column>
    <el-table-column label="累计流量" prop="cumulativeFlow"> </el-table-column>
  </el-table>
</template>
<script>
import { getWaterMeterBITwo } from "@/api/equipmentMaterialAl/waterMeter";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    cumulativeFlowAll() {
      let total = 0;
      total =
        this.tableData[0].cumulativeFlow - this.tableData[1].cumulativeFlow;
      return total.toFixed(2);
    },
  },
  mounted() {
    this.getData();
    const table = this.$refs["reader-table"];
    const divData = table.bodyWrapper;
    setInterval(() => {
      divData.scrollTop += 1;
      if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
        divData.scrollTop = 0;
      }
    }, 50);
  },
  methods: {
    async getData() {
      const res = await getWaterMeterBITwo();
      if (res) {
        this.tableData = res.data.data;
        this.$emit("childData", this.cumulativeFlowAll);
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
/deep/.el-table--scrollable-y {
  overflow-y: hidden !important;
}
/deep/ .el-table__body-wrapper {
  overflow-y: hidden !important;
}
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