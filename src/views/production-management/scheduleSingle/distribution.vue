// 工单分配
<template>
  <basic-container>
    <el-row>
      <el-row>
        <div class="title">基础数据</div>
        <el-divider></el-divider>
      </el-row>
      <el-form
        label-width="120px"
        :inline="true"
        :model="form"
        class="detail-form"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="排程号:">
              <span>{{ form.scheduleSn || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="排程数量:">
              <span>{{ form.sum || "无" }}</span
              >(方)
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模数:">
              <span>{{ form.modulus || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="块数:">
              <span>{{ form.wordCount || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品编码:">
              <span>{{ form.materialSn || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格型号:">
              <span>{{ form.model || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品名称:">
              <span>{{ form.materialName || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目名称:">
              <span>{{ form.projectName || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户名称:">
              <span>{{ form.organName || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="交货日期:">
              <span>{{ form.deliveryDate || "无" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="8">
            <el-form-item required label="排程数量">
              <el-input
                size="small"
                v-model="form.schedulesOrdersEncode"
                placeholder="请输入"
                v-int
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </el-row>
    <el-table
      :data="workshopTableData"
      style="width: 100%"
      row-key="jobId"
      default-expand-all
      @selection-change="handleSelectionChange"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        type="selection"
        width="55"
        :selectable="selectHandle"
      ></el-table-column>
      <el-table-column align="center" prop="job" label="层级名称">
      </el-table-column>
      <el-table-column label="计划开始时间">
        <template slot-scope="scope" v-if="scope.row.jobId">
          <el-date-picker
            v-model="scope.row.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="计划结束时间">
        <template slot-scope="scope" v-if="scope.row.jobId">
          <el-date-picker
            v-model="scope.row.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            size="small"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="模数">
        <template slot-scope="scope" v-if="scope.row.jobId">
          <el-input
            style="width: 130px"
            v-model="scope.row.modulus"
            size="small"
            placeholder="请输入"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            @change="(val) => calSalePrice(val, scope.$index)"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="数量(方)" align="center" prop="sum" width="160">
      </el-table-column>
      <!-- <el-table-column label="数量(方)">
        <template slot-scope="scope" v-if="scope.row.jobId">
          <el-input
            style="width: 160px"
            v-model="scope.row.sum"
            size="small"
            placeholder="请输入"
            @change="(val) => calSalePrice(val, scope.$index)"
          >
          </el-input>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" prop="modulus" width="160" label="模数">
      </el-table-column> -->
      <el-table-column align="center" prop="wordCount" width="160" label="块数">
      </el-table-column>
    </el-table>
    <el-row>
      <el-col class="allBox">
        总计:{{ party }}方/{{ die }}模/{{ block }}块</el-col
      >
    </el-row>
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="saveWorkOrderDistribution"
        >保存</el-button
      >
    </el-row>
  </basic-container>
</template>

<script>
import { getShiftList } from "@/api/humanResources/shift";
import { listProductData } from "@/api/base-data/product-data.js";
import { toSchedule } from "@/api/manufacture/scheduleSingle";
export default {
  data() {
    return {
      form: {},
      volume: "", //单位体积
      singleModeVolume: "", //单模体积
      workshopTableData: [{ job: "", children: [] }],
      multipleSelection: [],
    };
  },
  computed: {
    party() {
      var sum = 0;
      this.multipleSelection.forEach((ele) => {
        sum += Number(ele.sum);
      });
      return sum;
    },
    die() {
      var sum = 0;
      this.multipleSelection.forEach((ele) => {
        sum += Number(ele.modulus);
      });
      return sum;
    },
    block() {
      var sum = 0;
      this.multipleSelection.forEach((ele) => {
        sum += Number(ele.wordCount);
      });
      return sum;
    },
  },
  async created() {
    await this.initStationOrderAllocation();
    await this.initWorkshopLine();
  },
  methods: {
    calSalePrice(val, index) {
      this.workshopTableData[0].children[index - 1].sum = Math.ceil(
        Number(val) * this.singleModeVolume
      );

console.log(this.singleModeVolume,this.volume);
      this.workshopTableData[0].children[index - 1].wordCount = Math.ceil(
       ( Number(val * 1000000)*Number(this.singleModeVolume) )/ this.volume
      );
    },

    
    //模数*单模体积*10000000/单位体积=块数 


    // calSalePrice(val, index) {
    //   this.workshopTableData[0].children[index - 1].modulus = Math.ceil(
    //     Number(val) / this.singleModeVolume
    //   );
    //   this.workshopTableData[0].children[index - 1].wordCount = Math.ceil(
    //     Number(val * 1000000) / this.volume
    //   );
    // },
    selectHandle(row, index) {
      return !(index === 0);
    },
    // 工单详情
    async initStationOrderAllocation() {
      this.form = this.$route.query.row;
      this.form.productionOrdersId = this.form.id;
    },
    // 车间产线
    async initWorkshopLine() {
      const res = await listProductData({ productSn: this.form.materialSn });
      this.singleModeVolume = res.data.data.records[0].singleModeVolume;
      this.volume = res.data.data.records[0].volume;
      console.log("体积", this.singleModeVolume, this.volume);
      this.workshopTableData[0].job = this.form.productionLine;
      const res1 = await getShiftList({ current: 0, size: 10000, name: "" });
      res1.data.data.records.forEach((item) => {
        const obj = {
          job: item.className,
          jobId: item.id,
          startTime: "",
          endTime: "",
          sum: "",
          modulus: "",
          wordCount: "",
        };
        this.workshopTableData[0].children.push(obj);
      });
      console.log(this.workshopTableData);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存
    saveWorkOrderDistribution() {
      console.log(this.multipleSelection);
      try {
        if (this.multipleSelection.length === 0) {
          throw "请选择表格内信息";
        }
      } catch (err) {
        this.$message.info(err);
        return;
      }
      var strarr = [];
      for (let i in this.multipleSelection) {
        strarr.push(this.multipleSelection[i]["modulus"]);
      }
      var modulus = eval(strarr.join("+"));
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (
          !this.multipleSelection[i].startTime ||
          !this.multipleSelection[i].endTime
        ) {
          return this.$message.info("表格内数据不能为空");
        } else if (!this.multipleSelection[i].modulus) {
          return this.$message.info("表格内数据不能为空");
        } else if (modulus > this.form.modulus) {
          return this.$message.info("输入模数不能大于总模数");
        } else if (modulus < this.form.modulus) {
          return this.$message.info("未分配完总模数");
        }
      }
      toSchedule({
        id: this.form.id,
        jobWorkOrderReqs: this.multipleSelection,
      })
        .then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.msg);
            this.$router.back();
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // this.multipleSelection.forEach((ele) => {
      //   // sum += Number(ele.sum);
      //   // console.log("0", sum);
      //   if (!ele.endTime) {
      //     return this.$message.info("表格内数据不能为空");
      //   } else if (!ele.startTime) {
      //     return this.$message.info("表格内数据不能为空");
      //   } else if (!ele.sum) {
      //     return this.$message.info("表格内数据不能为空");
      //   } else if (sum > this.form.sum) {
      //     console.log("数量不能大于总排程数量", sum);
      //     return this.$message.info("数量不能大于总排程数量");
      //   } else if (sum < this.form.sum) {
      //     console.log("未分配完排程数量", sum);
      //     return this.$message.info("未分配完排程数量");
      //   }
      //   // if (sum === this.form.sum) {
      //   //   // console.log("ok", sum);
      //   //   // this.$message.info("ok");
      //   //   toSchedule({
      //   //     id: this.form.id,
      //   //     jobWorkOrderReqs: this.multipleSelection,
      //   //   })
      //   //     .then((res) => {
      //   //       if (res.data.success) {
      //   //         this.$message.success(res.data.msg);
      //   //         this.$router.back();
      //   //       }
      //   //     })
      //   //     .catch((error) => {
      //   //       console.error(error);
      //   //     });
      //   // }
      // });
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.allBox {
  text-align: right;
  margin-top: 10px;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.el-input,
.el-select {
  width: 240px;
}
</style>
