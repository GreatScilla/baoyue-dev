<template>
  <el-table
    ref="reader-table"
    :data="tableData"
    style="width: 100%"
    height="300"
    :header-cell-style="tableHeaderColor"
  >
    <el-table-column label="传感器状态" prop="temStatus" width="100">
      <template slot-scope="scope">
        <el-tag
          v-if="scope.row.temStatus == 0"
          size="mini"
          effect="dark"
          type="success"
          >正常</el-tag
        >
        <el-tag
          v-if="scope.row.temStatus == 2"
          size="mini"
          effect="dark"
          type="danger"
          >故障</el-tag
        >
        <el-tag
          v-if="scope.row.temStatus == 1"
          size="mini"
          effect="dark"
          type="warning"
          >异常</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="所在位置" prop="position"> </el-table-column>
    <el-table-column label="温度/湿度">
      <template slot-scope="scope">
        <span>{{ scope.row.tem }}/{{ scope.row.hum }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column label="湿度" prop="hum"> </el-table-column> -->
    <el-table-column label="日期" prop="date">
      <template slot-scope="scope">
        <span>{{ scope.row.date.substring(5, 10) }} {{ scope.row.time }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column label="时间" prop="time"> </el-table-column> -->
  </el-table>
</template>
<script>
import { getThermometerBITwo } from "@/api/equipmentMaterialAl/waterMeter";
export default {
  data() {
    return {
      tableData: [],
    };
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
    }, 100);
  },
  methods: {
    async getData() {
      const res = await getThermometerBITwo();
      if (res) {
        this.tableData = res.data.data;
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