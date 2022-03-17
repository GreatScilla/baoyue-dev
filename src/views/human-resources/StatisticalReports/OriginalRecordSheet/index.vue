<template>
  <div class="OriginalRecordSheetBox">
    <div class="menuBox">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item class="clonedateBox" label="日期">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="kaoqinTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人员编号">
          <el-input v-model="tableDataPer"></el-input>
        </el-form-item>
        <!-- <el-form-item label="姓名">
          <el-input v-model="tableDataName"></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="bmmc"></el-input>
        </el-form-item>
        <el-form-item label="考勤区域">
          <el-input v-model="kqqy"></el-input>
        </el-form-item>
        <el-form-item label="序列号">
          <el-input v-model="xlh"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="doFilter" icon="el-icon-search"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="reset" icon="el-icon-circle-close"
            >重置</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel" icon="el-icon-download"
            >导出</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="contBox">
      <div class="contContBox">
        <el-table
          id="exportTable"
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          border
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @row-click="clickData"
          style="width: 100%"
        >
          <el-table-column prop="pin" label="人员编号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="deptName" label="部门名称"> </el-table-column>
          <el-table-column prop="areaName" label="考勤区域"> </el-table-column>
          <el-table-column prop="devSn" label="序列号"> </el-table-column>
          <el-table-column prop="eventTime" label="考勤日期时间">
          </el-table-column>
          <!-- <el-table-column prop="pi1n" label="数据来源"> </el-table-column> -->
        </el-table>
        <el-col>
          <el-row class="float-left margin-top-20">
            <el-pagination
              align="center"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 5, 10, 20,this.total]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-row>
        </el-col>
      </div>
      <div class="contRightBox">
        <div class="attendanceTitleBox">考勤照片</div>
        <div class="attendancePhotoBox">
          <img src="../../../../../src/assets/initPhoto.jpg" alt="" />
        </div>
        <div class="attendanceDetailsBox">
          <el-form
            ref="form"
            :label-position="labelPosition"
            :model="form1"
            label-width="110px"
          >
            <el-form-item label="人员编号:">
              <span>{{ form1.pin }}</span>
            </el-form-item>
            <el-form-item label="姓名:">
              <span>{{ form1.name }}</span>
            </el-form-item>
            <el-form-item label="部门名称:">
              <span>{{ form1.deptName }}</span>
            </el-form-item>
            <el-form-item label="考勤日期时间:">
              <span>{{ form1.eventTime }}</span>
            </el-form-item>
            <el-form-item label="序列号:">
              <span>{{ form1.devSn }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <meta name="referrer" content="never" />
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import {
  StatisticalReportsList,
  exportKaoList,
} from "@/api/humanResources/StatisticalReports.js";
export default {
  data() {
    return {
      kaoqinTime: [],
      labelPosition: "right",
      formLabelAlign: {
        personPin: "",
        name: "",
      },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 20, // 每页的数据条数
      form1: {},
      pageshow: true,
      tableDataBegin: [],
      tableDataName: "",
      tableDataPer: "",
      bmmc: "",
      kqqy: "",
      xlh: "",
      tableData: [],
      currentPage: 1,
      //pageSize: 10,
      pageSize1: 999,
      //totalItems: 0,
      filtertableData: [],
      flag: false,
      getexportExcelParams: {},
    };
  },
  // mounted() {
  //   this.pageList();
  // },
  created() {
    this.pageList();
  },
  methods: {
  // async  exportExcel() {   
  //     let res1=   await StatisticalReportsList(this.getexportExcelParams);
  //     var params = JSON.parse(JSON.stringify(res1.data.data));

  //     exportKaoList(params).then((res) => {
  //       console.log(res);
  //     });
  //   },

    //导出excel
    // async exportExcel() {
    //   let res1 = await StatisticalReportsList(this.getexportExcelParams);
    //   var string1 = JSON.parse(JSON.stringify(res1.data.data[0]));
    //   console.log(string1);
    //   console.log(typeof string1);
    //   axios({
    //     url: "/api/blade-base/egaData/exportKao",
    //     method: "get",
    //     responseType: "blob",
    //     params: string1,
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       // const link = document.createElement("a");
    //       // let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
    //       // link.style.display = "none";
    //       // //设置连接
    //       // link.href = URL.createObjectURL(blob);
    //       // console.log(link.href);
    //       // link.download = "设备文件";
    //       // document.body.appendChild(link);
    //       // link.click();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },


    //导出
    exportExcel() {
      this.$confirm("是否导出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleSizeChange(this.total);
          setTimeout(() => {
            var wb = XLSX.utils.table_to_book(
              document.querySelector(".el-table")
            );
            /* get binary string as output */
            var wbout = XLSX.write(wb, {
              bookType: "xlsx",
              bookSST: true,
              type: "array",
            });
            try {
              FileSaver.saveAs(
                new Blob([wbout], { type: "application/octet-stream" }),
                "汇总统计.xlsx"
              );
            } catch (e) {
              if (typeof console !== "undefined") console.log(e, wbout);
            }
            //在此处更改回来
            this.handleSizeChange(10);
            return wbout;
          }, 10);

          this.$message({
            type: "success",
            message: "导出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
        });
      //this.reset()
    },



    doFilter() {
      //let param = JSON.parse(JSON.stringify(this.sizeForm));
      let tableDataPer = this.tableDataPer;
      let startDate = this.kaoqinTime[0];
      let endDate = this.kaoqinTime[1];
      //let likeName = this.tableDataName;
      this.pageList(tableDataPer, startDate, endDate);
    },
    pageList(tableDataPer, startDate, endDate) {
      var params = {
        personPin: tableDataPer,
        startDate: startDate,
        endDate: endDate,
        //likeName: likeName,
        pageNo: this.currentPage,
        pageSize: this.pageSize1,
        access_token:
          "D4AE01092497E626822468BD45B34755ED409DE67B353903BC29BF0A42B132DE",
      };
      this.getexportExcelParams = params;
      StatisticalReportsList(params).then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.data.length
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    reset() {
      this.tableDataName = "";
      this.tableDataPer = "";
      this.bmmc = "";
      this.kaoqinTime = "";
      this.xlh = "";
      this.doFilter();
    },

    //点击table事件
    clickData(row, event, column) {
      console.log(row, event, column);
      this.form1 = row;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-button {
  padding: 8px 20px;
}
/deep/.el-table .cell {
  cursor: pointer;
}
.clonedateBox {
  /deep/.el-form-item__content {
    margin-top: 5px !important;
  }
}
.OriginalRecordSheetBox {
  width: 99%;
  height: 100%;
  background-color: #ecf0f1;
  margin: 0 0rem 0 0.5rem;
  .menuBox {
    width: 100%;
    height: 6%;
    padding-top: 15px;
    background-color: #fff;

    .el-form {
      display: flex;
      place-content: center flex-start;
      flex-flow: row wrap;
      align-items: flex-start;
      /deep/.el-form-item__label {
        color: #000;
      }
    }
  }
  .contBox {
    margin-top: 0.4rem;
    width: 100%;
    height: 89%;
    display: flex;
    place-content: stretch center;
    flex-flow: row nowrap;
    align-items: center;
    .contLeftBox {
      flex: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
      .OpenBox {
        height: 5%;
        width: 100%;
        display: flex;
        padding: 10px 0 10px 10px;
      }
    }
    .contContBox {
      flex: 5;
      width: 100%;
      height: 100%;
      background-color: #fff;
      margin: 0 0.5rem 0 0;
    }
    .contRightBox {
      flex: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
      .attendanceTitleBox {
        width: 100%;
        height: 5%;
        line-height: 40px;
        text-align: center;
      }
      .attendancePhotoBox {
        width: 100%;
        height: 20%;
        text-align: center;
        img {
          width: 130px;
          height: 160px;
          border-radius: 5px;
        }
      }
      .attendanceDetailsBox {
        width: 100%;
        height: auto;
        text-align: center;
        /deep/.el-form-item__label {
          color: #000;
        }
        /deep/ .el-form-item__label {
          line-height: 20px;
        }
        /deep/.el-form-item__content {
          line-height: 20px;
          text-align: left;
        }
      }
    }
  }
}
</style>