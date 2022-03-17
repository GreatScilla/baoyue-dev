<template>
  <div class="kdBox">
    <div class="titleBox">
      浇注实时概况 <span @click="exportList">导出</span>
    </div>
    <div class="textBox">
      <div>
        <!-- <span>总模数</span><span>{{ totalModulusAll }}</span> -->
        <span>总模数</span><animate-number from="0" :to="totalModulusAll" :key="totalModulusAll"></animate-number>
      </div>
      <div>
        <!-- <span>A班浇注模数</span><span>{{ pouringModulusOfShiftA }}</span> -->
        <span>A班浇注模数</span><animate-number from="0" :to="pouringModulusOfShiftA" :key="pouringModulusOfShiftA"></animate-number>
      </div>
      <div>
        <!-- <span>B班浇注模数</span><span>{{ pouringModulusOfShiftB }}</span> -->
        <span>B班浇注模数</span><animate-number from="0" :to="pouringModulusOfShiftB" :key="pouringModulusOfShiftB"></animate-number>
      </div>
    </div>
    <div class="TableBox">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="700"
        ref="exportTableRef"
        :header-cell-style="tableHeaderColor"
      >
        <el-table-column label="模号" prop="id"> </el-table-column>
        <el-table-column label="日期" prop="date1"> </el-table-column>
        <el-table-column label="时间" prop="time1"> </el-table-column>
        <el-table-column label="班组" prop="team"> </el-table-column>
        <el-table-column label="石灰" prop="lime"> </el-table-column>
        <el-table-column label="水泥" prop="cement"> </el-table-column>
        <el-table-column label="料浆" prop="slurry"> </el-table-column>
        <el-table-column label="废浆" prop="wastePulp"> </el-table-column>
        <el-table-column label="石膏浆" prop="gypsumSlurry"> </el-table-column>
        <el-table-column label="浇注1温度" prop="pouringTemOne">
        </el-table-column>
        <el-table-column label="浇注2温度" prop="pouringTemTwo">
        </el-table-column>
        <el-table-column label="料浆补水" prop="slurryMakeUp">
        </el-table-column>
        <el-table-column label="废浆补水" prop="wasteSlurryMakeUp">
        </el-table-column>
        <el-table-column
          label="石膏浆补水"
          prop="gypsumSlurryWaterReplenishment"
        >
        </el-table-column>
        <el-table-column label="铅粉1设定值" prop="aluminumPowderSetPointOne">
        </el-table-column>
        <el-table-column label="铅粉2设定值" prop="aluminumPowderSetPointTwo">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import FileSaver from "file-saver";
import { getPlSelectBIResp } from "@/api/equipmentMaterialAl/waterMeter";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    totalModulusAll() {
      return this.tableData.length;
    },
    pouringModulusOfShiftA() {
      if (this.tableData[0]) {
        return this.tableData[0].pouringModulusOfShiftA;
      } else {
        return 0;
      }
    },
    pouringModulusOfShiftB() {
      if (this.tableData[0]) {
        return this.tableData[0].pouringModulusOfShiftB;
      } else {
        return 0;
      }
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    // formatter(val){
    //   return val.toFixed(2)
    // },
    async getData() {
      const res = await getPlSelectBIResp();
      this.tableData = res.data.data;
    },
    //导出
    exportList() {
      const el = this.$refs.exportTableRef.$el;
      const filename = this.title + ".xlsx";
      const wb = XLSX.utils.table_to_book(el);
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          filename
        );
      } catch (e) {
        console.log(e);
      }
      return wbout;
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
.kdBox {
  height: 100%;
  background-image: url("../img/kdBg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .titleBox {
    height: 5%;
    display: flex;
    align-items: center;
    color: #fff;
    padding-left: 28px;
    opacity: 1;
    font-size: 22px;
    font-weight: 700;
    text-align: left;
    letter-spacing: 2px;
    span {
      cursor: pointer;
      margin-left: 20px;
      border: 1px solid #fff;
      padding: 3px 25px;
      font-size: 14px;
    }
  }
  .textBox {
    height: 12%;
    display: flex;
    align-items: center;
    padding: 10px;
    div {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin-right: 10px;
      background-image: url("../img/kdMin.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      span:nth-child(1) {
        opacity: 1;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
      }
      span:nth-child(2) {
        opacity: 1;
        font-size: 32px;
        font-weight: 600;
        text-align: left;
        padding-left: 10px;
      }
    }
    div:nth-child(3) {
      margin-right: 0;
    }
  }
  .TableBox {
    height: 80%;
    padding: 0 10px;
  }
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