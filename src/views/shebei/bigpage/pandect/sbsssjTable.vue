<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="322"
    :header-cell-style="tableHeaderColor"
  >
    <el-table-column label="设备状态" prop="">
      <template slot-scope="scope">
        <el-tag
          size="mini"
          effect="dark"
          :type="scope.row.pressureStatus == 0 ? 'success' : 'warning'"
          >{{ scope.row.pressureStatus == 0 ? "正常" : "异常" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="设备名称" prop="position"> </el-table-column>
    <el-table-column label="压力" prop="pressure"> </el-table-column>
    <el-table-column label="温度" prop="tem"> </el-table-column>
    <el-table-column label="釜门状态" prop="switchStatus">
      <template slot-scope="scope">
        <span>{{ scope.row.switchStatus | switchStatusName }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getAutoclaveBITwo } from "@/api/equipmentMaterialAl/waterMeter";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getAutoclaveBITwo();
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
  filters: {
    switchStatusName(val) {
      if (val == "0") {
        return (val = "开");
      } else if (val == "1") {
        return (val = "关");
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
    height: 19px;
    line-height: 19px;
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