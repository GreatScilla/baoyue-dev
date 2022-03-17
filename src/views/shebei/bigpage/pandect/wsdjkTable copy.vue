<template>
  <div>
    <el-table
      ref="reader-table"
      :data="tableData"
      style="width: 100%"
      height="210"
      :row-class-name="tableRowClassName"
      :header-cell-style="tableHeaderColor"
      :header-row-class-name="headerClass"
    >
      <el-table-column label="传感器状态" align="center" width="90">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status == 0"
            size="mini"
            effect="dark"
            type="success"
            >正常</el-tag
          >
          <el-tag
            v-if="scope.row.status == 1"
            size="mini"
            effect="dark"
            type="danger"
            >故障</el-tag
          >
          <el-tag
            v-if="scope.row.status == 2"
            size="mini"
            effect="dark"
            type="warning"
            >异常</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所在位置"
        prop="position"
        width="100"
      >
      </el-table-column>
      <el-table-column align="center" width="80" label="温度℃">
        <template slot-scope="scope">
          <span
           :style ="scope.row.temperature < scope.row.temperatureLow? 'color: #417505': scope.row.temperature > scope.row.temperatureTop? 'color: #d0021b;': 'color: #fff;'"
          >
            {{ scope.row.temperature }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80" label="湿度%" prop="humidity">
        <template slot-scope="scope">
          <span
            :style="
              scope.row.humidity < scope.row.humidityLow
                ? 'color: #67c23a'
                : scope.row.humidity > scope.row.humidityTop
                ? 'color: #d0021b;'
                : 'color: #fff;'
            "
          >
            {{ scope.row.humidity }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" prop="queryDate">
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
// import { echartsdata } from "@/api/shebei/commit";
export default {
  data() {
    return {
      tableData: [{
        status:0,
        humidity:133333333
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:12
      },{
        status:0,
        humidity:1111
      },],
    };
  },
  created() {
    this.getdata();
  },

  mounted() {
    // const table = this.$refs["reader-table"];
    // const divData = table.bodyWrapper;
    // setInterval(() => {
    //   divData.scrollTop += 1;
    //   if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
    //     divData.scrollTop = 0;
    //   }
    // }, 50);
    // setInterval(() => {
    //   this.getdata();
    // }, 60000);
  },
  methods: {
    //获取表格数据
    async getdata() {
      // let res = await echartsdata();
      // if (res.data.success) {
      //   this.tableData = res.data.data;
      // }
      // console.log(res);
    },

    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    headerClass({ rowIndex }) {
      if (rowIndex === 0) {
        return "header-row";
      }
    },
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "height:20px;font-size:24px; background-image: linear-gradient(#216da5,#1792be);,rgba(23,122,220,1));color: #fff;font-weight: 500;";
      }
    },
  },
};
</script>
<style>
/* .el-table--scrollable-y .el-table__body-wrapper {
  overflow: hidden !important;
} */
</style>
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
/deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 2px !important;
  height: 50px !important;
  // background: #eee;
}
/deep/.el-table__body-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.4);
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.el-table {
  /deep/th {
    padding: 0 !important;
  }
  /deep/tr {
    background-color: rgba(9, 173, 245, 0.5);
  }
  /deep/.cell {
    font-size: 14px;
    height: 23px;
    line-height: 23px;
    margin: 5px 0;
    background-color: #0077ff66;
  }
  background-color: transparent !important;
  /deep/.el-table__expand-icon {
    color: #fff;
    height: 23px !important;
  }
  /deep/ thead {
    color: black;
    font-weight: 500;
    border: 0;
    /deep/.cell {
      font-size: 16px;
      height: 20px;
      line-height: 20px;
      margin: 5px 0;
      background-color: #0077ff66;
    }
  }
  /deep/ .el-table__expanded-cell {
    background-color: transparent !important;
    color: white;
  }
  /deep/ th,
  tr,
  td {
    border: 0;
    background-color: transparent !important;
    border-bottom: none !important;
  }
  /deep/ .success-row {
    background: rgba(0, 0, 0, 0.01) !important;
    color: white;
    height: 20px;
    font-size: 16px;
    .cell {
      /deep/ .el-input__inner {
        height: 73px !important;
        width: 105px;
        background: rgba(0, 0, 0, 0.01) !important;
        border: 1px solid rgba(9, 112, 184, 1);
        box-shadow: 0 0 10px rgba(9, 112, 184, 1);
      }
    }
  }
  /deep/ .warning-row {
    background: rgba(0, 0, 0, 0.01) !important;
    color: white;
    height: 20px;
    font-size: 16px;
    .cell {
      /deep/ .el-input__inner {
        height: 73px !important;
        width: 105px;
        background: rgba(0, 0, 0, 0.01) !important;
        border: 1px solid rgba(9, 112, 184, 1);
        box-shadow: 0 0 10px rgba(9, 112, 184, 1);
      }
    }
  }
  /deep/ .el-table__body tr:hover > td {
    background-color: transparent;
  }
  /deep/ .el-button {
    background: #52c4e4;
    color: white;
    border: 0;
    font-size: 22px;
  }
  /deep/ .video-button {
    background: transparent;
    border: 0;
  }
  /deep/ .el-table__row > td {
    border-bottom: none;
  }
  /deep/ .sgzyfxdjRed {
    color: #c00;
  }
  /deep/ .sgzyfxdjYellow {
    color: #ff0;
  }
  /deep/ .sgzyfxdjGreen {
    color: #09b818;
  }
}
</style>