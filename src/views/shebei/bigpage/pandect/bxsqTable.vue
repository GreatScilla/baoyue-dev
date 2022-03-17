//电表记录
<template>
  <el-table
    ref="reader-table"
    :data="tableData"
    style="width: 100%"
    max-height="240"
    :header-cell-style="tableHeaderColor"
  >
    <el-table-column label="所在位置" prop="position"> </el-table-column>
    <el-table-column label="日期">
      <template slot-scope="scope">
        <span>{{ scope.row.createTime.substring(0, 10) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="时间">
      <template slot-scope="scope">
        <span>{{ scope.row.createTime.substring(10, 19) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="尖峰平谷" prop="">
      <template slot-scope="scope">
        <span
          >{{ scope.row.sharpValue }},{{ scope.row.peakValue }},{{
            scope.row.flatValue
          }},{{ scope.row.valleyValue }}</span
        >
      </template>
    </el-table-column>
    <el-table-column label="有功读数" prop="" :formatter="addNum">
    </el-table-column>
  </el-table>
</template>
<script>
import { getAmmeterBITwo } from "@/api/equipmentMaterialAl/waterMeter";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    electricityConsumptionAll() {
      let total = 0;
      let total1 = 0;
      let total2 = 0;
      total1 =
        (this.tableData[0].sharpValue +
          this.tableData[0].peakValue +
          this.tableData[0].flatValue +
          this.tableData[0].valleyValue) *
        40 *
        100;
      total2 =
        (this.tableData[0].lastJian +
          this.tableData[0].lastFeng +
          this.tableData[0].lastPing +
          this.tableData[0].lastGu) *
        40 *
        100;

      total = total1 - total2;
      return total;
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
    addNum(row) {
      return (
        (row.sharpValue + row.peakValue + row.flatValue + row.valleyValue) *
        40 *
        100
      ).toFixed(2);
    },
    async getData() {
      const res = await getAmmeterBITwo();
      if (res) {
        this.tableData = res.data.data;
        this.tableData.map((el) => {
          el.position = "宝悦工厂";
        });
        this.$emit("childData", this.electricityConsumptionAll);
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
    font-size: 12px;
    background-color: #0077ff66 !important;
  }
}
/deep/ .el-table__row > td {
  border-bottom: none;
}
</style>