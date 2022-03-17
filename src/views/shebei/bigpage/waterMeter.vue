 <template>
  <div>
    <div class="wrap">
      <div class="con">
        <div class="con-left">
          <div>
            <div class="fqjyyTitleBox">
              {{ title }} <span @click="exportList">导出</span>
            </div>
            <div class="el-icon-close" @click="btnclick"></div>
          </div>
          <div class="fqjyyCont">
            <el-table
              v-loading="loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              ref="exportTableRef1"
              :header-cell-style="tableHeaderColor"
              :data="tableData"
              height="820"
              style="width: 98%"
            >
              <el-table-column
                v-if="type == '1'"
                prop="position"
                label="所在位置"
              ></el-table-column>
              <el-table-column v-if="type == '1'" prop="date" label="日期">
              </el-table-column>
              <el-table-column v-if="type == '1'" prop="time" label="时间">
              </el-table-column>
              <el-table-column
                v-if="type == '1'"
                prop="cumulativeFlow"
                label="累计流量"
              ></el-table-column>
              <el-table-column
                v-if="type == '1'"
                prop="waterConsumption"
                label="用水量"
              ></el-table-column>
              <el-table-column
                v-if="type == '2'"
                prop="position"
                label="所在位置"
              ></el-table-column>
              <el-table-column v-if="type == '2'" prop="" label="日期">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime.substring(0, 10) }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="type == '2'" prop="" label="时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime.substring(10, 19) }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="type == '2'" prop="" label="尖,峰,平,谷">
                <template slot-scope="scope">
                  <span
                    >尖{{ scope.row.sharpValue }},峰{{
                      scope.row.peakValue
                    }},平{{ scope.row.flatValue }},谷{{
                      scope.row.valleyValue
                    }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                v-if="type == '2'"
                prop=""
                :formatter="addNum"
                label="有功读数"
              ></el-table-column>
              <el-table-column
                v-if="type == '2'"
                prop=""
                :formatter="electricityConsumption"
                label="用电量"
              ></el-table-column>
              <el-table-column
                v-if="type == '3'"
                prop="date"
                label="日期"
              ></el-table-column>
              <el-table-column
                v-if="type == '3'"
                prop="time"
                label="时间"
              ></el-table-column>
              <el-table-column
                v-if="type == '3'"
                label="燃气1工况累计"
                prop="cumulativeFlowUnderWorkingConditions1"
                :formatter="rounding"
              />

              <el-table-column
                v-if="type == '3'"
                label="燃气2工况累计"
                prop="cumulativeFlowUnderWorkingConditions2"
                :formatter="rounding"
              />

              <el-table-column
                v-if="type == '3'"
                label="燃气1用气量"
                prop="gasConsumption1"
                :formatter="rounding"
              />

              <el-table-column
                v-if="type == '3'"
                label="燃气2用气量"
                prop="gasConsumption2"
                :formatter="rounding"
              />

              <el-table-column
                v-if="type == '3'"
                label="用气量"
                prop="gasConsumptionSum"
                :formatter="rounding"
              />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import FileSaver from "file-saver";
import {
  getBI,
  getBITwo,
  getGasBI,
} from "@/api/equipmentMaterialAl/waterMeter";
export default {
  props: ["type"],
  data() {
    return {
      title: "",
      tableData: [],
      loading: true,
    };
  },
  created() {
    if (this.type == "1") {
      this.title = "水表记录(近7天)";
    } else if (this.type == "2") {
      this.title = "电表记录(近7天)";
    } else if (this.type == "3") {
      this.title = "燃气表记录(近7天)";
    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    rounding(row, column) {
      return parseFloat(row[column.property]).toFixed(2);
    },
    addNum(row) {
      return (
        (row.sharpValue + row.peakValue + row.flatValue + row.valleyValue) *
        40 *
        100
      ).toFixed(2);
    },
    electricityConsumption(row) {
      let total = 0;
      let total1 = 0;
      let total2 = 0;
      total1 =
        (row.sharpValue + row.peakValue + row.flatValue + row.valleyValue) *
        40 *
        100;
      total2 =
        (row.lastJian + row.lastFeng + row.lastPing + row.lastGu) * 40 * 100;

      total = total1 - total2;
      return total.toFixed(2);
    },
    async getdata() {
      let api = "";
      if (this.type == "1") {
        api = getBI;
      } else if (this.type == "2") {
        api = getBITwo;
      } else if (this.type == "3") {
        api = getGasBI;
      }
      let res = await api();
      if (res) {
        this.loading = false;
        this.tableData = res.data.data;
        this.tableData.map((el) => {
          if (this.type == "2") {
            el.position = "宝悦工厂车间1大门处";
          }
        });
      }
    },
    exportList() {
      const el = this.$refs.exportTableRef1.$el;
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
    btnclick() {
      this.$emit("closeDialog");
    },
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return "height:20px;font-size:16px; background-image: linear-gradient(#2b303e,#2b303e);,rgba(43,48,62,1));color: #fff;font-weight: 500; text-align: center;";
      }
    },
  },
};
</script>

<style scoped lang='scss'>
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}
/*最外层透明*/
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
}
// /* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  border: 0;
  background-color: transparent !important;
  color: #ffffff;
}
/deep/.el-table::before {
  height: 0;
}
/deep/.el-table {
  .el-table__body {
    .cell {
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      margin: 5px 0;
      text-align: center;
      background-color: #0077ff66;
    }
  }
}

/deep/.el-icon-close {
  z-index: 3;
  padding-right: 10px;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}
.wrap {
  padding: 0 10px 20px 10px;
  position: fixed;
  top: 60px;
  left: 0px;
  width: 99%;
  height: 99%;
  background-color: #01131f;
  .con {
    width: 100%;
    height: 94%;
    display: flex;
    .con-left {
      flex: 5;
      background-image: url("./img/back.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      > div {
        display: flex;
        align-items: center;
      }
      .fqjyyTitleBox {
        height: 5%;
        line-height: 50px;
        padding-left: 30px;
        width: 100%;
        opacity: 1;
        font-size: 22px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        letter-spacing: 2px;
        text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        cursor: pointer;
        span {
          font-size: 14px;
          padding: 4px 20px;
          margin-left: 20px;
          border: 1px solid #fff;
        }
      }
      .fqjyyCont {
        height: 94%;
        width: 100%;
        overflow: scroll;
        padding-top: 10px;
        display: flex;
        display: -webkit-box;
        place-content: stretch center;
        flex-flow: column nowrap;
        align-items: center;
        text-align: center;
      }
    }
  }
}
.el-dialog__body {
  background-color: #030e34;
}
</style>
