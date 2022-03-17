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
            v-model="formLabelAlign.times"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人员编号">
          <el-input v-model="tableDataPer"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
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
        </el-form-item>
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
      </el-form>
    </div>
    <div class="contBox">
      <div class="contContBox">
        <el-table
          :data="tableDataEnd"
          border
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @row-click="clickData"
          style="width: 100%"
        >
          <el-table-column prop="logId" label="记录编号">
          </el-table-column>
          <el-table-column prop="eventTime" label="时间" width="165"> </el-table-column>
          <el-table-column prop="areaName" label="区域名称"> </el-table-column>
          <el-table-column prop="devName" label="设备名称"> </el-table-column>
          <el-table-column prop="eventPointName" label="事件点">
          </el-table-column>
          <el-table-column prop="eventName" label="事件描述"> </el-table-column>
          <el-table-column prop="pin" label="人员编号">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="deptName" label="部门名称"> </el-table-column>
          <el-table-column prop="readerName" label="读头名称">
          </el-table-column>
          <el-table-column prop="verifyModeName" label="验证方式">
          </el-table-column>
        </el-table>
        <el-col>
          <el-row class="float-left margin-top-20">
            <el-pagination
              v-if="pageshow"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalItems"
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
            <el-form-item label="时间:">
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
import { AccessControlRecordSheetList } from "@/api/humanResources/StatisticalReports.js";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        personPin: "",
        name: "",
      },
      form1: {},
      pageshow: true,
      tableDataBegin: [],
      tableDataName: "",
      tableDataPer: "",
      bmmc: "",
      kqqy: "",
      xlh: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize:10,
      pageSize1: 999,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
    };
  },
  // mounted() {
  //   this.pageList();
  // },
  created() {
    this.pageList();
  },
  methods: {
    pageList() {
      var params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize1,
        access_token:
          "D4AE01092497E626822468BD45B34755ED409DE67B353903BC29BF0A42B132DE",
      };
      AccessControlRecordSheetList(params).then((res) => {
        console.log(res);
        this.tableDataBegin = res.data.data;
        this.totalItems = this.tableDataBegin.length;
        if (this.totalItems > this.pageSize) {
          for (let index = 0; index < this.pageSize; index++) {
            this.tableDataEnd.push(this.tableDataBegin[index]);
          }
        } else {
          this.tableDataEnd = this.tableDataBegin;
        }
      });
    },

    reset() {
      this.tableDataName = "";
      this.tableDataPer = "";
      this.doFilter();
    },
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      this.tableDataEnd = [];
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = [];
      let name = this.tableDataName,
        pin = this.tableDataPer;
      //deptName = this.bmmc,
      //areaName = this.kqqy,
      //devSn = xlh
      if (!name && !pin) {
        //两种都不存在
        this.filterTableDataEnd = this.tableDataBegin;
      } else {
        this.tableDataBegin.forEach((value, index) => {
          if (name) {
            if (value.name.indexOf(name) >= 0) {
              if (pin) {
                if (value.pin.indexOf(role_key) >= 0) {
                  this.filterTableDataEnd.push(value);
                }
              } else {
                this.filterTableDataEnd.push(value);
              }
            }
          } else {
            if (value.pin.indexOf(pin) >= 0) {
              this.filterTableDataEnd.push(value);
            }
          }
        });
      }
      //页面数据改变重新统计数据数量和当前页
      this.currentPage = 1;
      this.totalItems = this.filterTableDataEnd.length;
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd);
      //页面初始化数据需要判断是否检索过
      this.flag = true;
      this.pageshow = false;
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      //需要判断是否检索
      if (!this.flag) {
        //tableDataBegin不能写成tableDataEnd，不然在没有进行搜索功能的时候，不能进行分页操作，数据丢失
        this.currentChangePage(this.tableDataBegin);
      } else {
        this.currentChangePage(this.filterTableDataEnd);
      }
    }, //组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
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
    height: 10%;
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