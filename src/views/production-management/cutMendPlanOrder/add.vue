// 切补计划单修改、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="form"
      class="detail-form"
      ref="form"
      :show-message="false"
    >
      <el-row>
        <el-row style="margin-left: -35px">
          <div class="title">基本信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="切补计划单号:">
              <span v-if="type === 'detail'">{{ form.cutMendSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.cutMendSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单据日期:">
              <span v-if="type === 'detail'">{{ form.createTime }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.createTime"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="预计完成时间:" prop="deliveryDate">
              <span v-if="type === 'detail'">{{ form.deliveryDate }}</span>
              <el-date-picker
                v-else
                v-model="form.deliveryDate"
                type="datetime"
                placeholder="请选择"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="权重等级:" prop="weight">
              <span v-if="type === 'detail'">{{
                form.weight | weightName
              }}</span>
              <el-select v-else v-model="form.weight">
                <el-option
                  v-for="item of weightList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required prop="projectName" label="项目名称:">
              <span v-if="type === 'detail'">{{ form.projectName }}</span>
              <el-input
                v-else
                size="small"
                placeholder="请选择"
                v-model="form.projectName"
                @focus="projectDialogVisible = true"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称:">
              <span v-if="type === 'detail'">{{ form.organName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.organName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="生产班组:" prop="job">
              <span v-if="type === 'detail'">{{ form.job }}</span>
              <el-select
                v-else
                size="small"
                v-model="form.job"
                placeholder="请选择"
              >
                <el-option
                  v-for="item of teamList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.className"
                  @click.native="form.jobId = item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="切补员:">
              <span v-if="type === 'detail'">{{ form.handsPersonName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.handsPersonName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <span v-if="type === 'detail'">{{ form.remark }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.remark"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="margin-bottom-20">
          <el-table
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            :data="tableData"
            :span-method="objectSpanMethod"
            border
          >
            <el-table-column type="index" align="center" width="130">
              <template slot="header">
                <el-button
                  type="text"
                  icon="el-icon-plus"
                  circle
                  @click="handleAdd"
                  :disabled="type === 'detail'"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(scope.$index, tableData)"
                  :disabled="type === 'detail'"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column label="原产品编码" prop="materialSn" width="160px">
            </el-table-column>
            <el-table-column label="原产品名称" prop="materialName">
            </el-table-column>
            <el-table-column label="原规格型号" prop="model"> </el-table-column>
            <el-table-column label="原数量(方)" prop="sum"> </el-table-column>
            <el-table-column label="修正产品编码">
              <template slot="header">
                <span style="color: #f56c6c">*</span>修正产品编码
              </template>
              <template slot-scope="scope">
                <span v-if="type === 'detail'">{{
                  scope.row.materialSnNew
                }}</span>
                <el-input
                  v-else
                  v-model="scope.row.materialSnNew"
                  @focus="reNameShowProduct(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="修正产品名称">
              <template slot-scope="{ row }">
                <sapn v-if="type === 'detail'">{{ row.materialNameNew }}</sapn>
                <el-input
                  disabled
                  v-else
                  v-model="row.materialNameNew"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="修正后规格型号">
              <template slot-scope="{ row }">
                <sapn v-if="type === 'detail'">{{ row.modelNew }}</sapn>
                <el-input disabled v-else v-model="row.modelNew"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="修正数量(方)">
              <template slot-scope="{ row }">
                <sapn v-if="type === 'detail'">{{ row.sumNew }}</sapn>
                <el-input
                  :disabled="!row.materialSnNew"
                  oninput="value=value.replace(/[^0-9.]/g,'')"
                  @keyup.native="handleKeyUp(row.sum, $event)"
                  placeholder="请输入"
                  v-else
                  v-model="row.sumNew"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="预进库位">
              <template slot="header">
                <span style="color: #f56c6c">*</span>预进库位
              </template>
              <template slot-scope="{ row }">
                <span v-if="type === 'detail'">{{ row.location }}</span>
                <el-select
                  size="small"
                  v-model="row.location"
                  placeholder="请选择"
                  v-else
                >
                  <el-option
                    v-for="item of depotList"
                    :key="item.id"
                    :label="item.depotName"
                    :value="item.depotName"
                    @click.native="row.locationId = item.id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-row>
      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="saveProducePlan"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="show" width="70%" title="选择产品">
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="reNameShow"
      width="70%"
      title="选择产品"
    >
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="reNameProductList"
      ></product-select>
    </el-dialog>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="经手人"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
    <projectSelect
      title="项目"
      :projectDialogVisible.sync="projectDialogVisible"
      @on-selected-contact="onProjectSelect"
    />
  </basic-container>
</template>
<script>
import { getShiftList } from "@/api/humanResources/shift";
import { getDepot } from "@/api/common";
import projectSelect from "@/components/projectSelect";
import productSelect from "@/components/productSelect";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import {
  getCutMendPlanByPageDetail,
  cutMendPlanUpdate,
} from "@/api/manufacture/cutMendPlanOrder";
export default {
  props: {
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    model: {
      type: String,
      default: "",
    },
  },
  components: {
    projectSelect,
    productSelect,
    dialogSelectPersonnel,
  },
  data() {
    return {
      employeeDialogVisible: false,
      reNameShow: false,
      show: false,
      currentIndex: 0,
      projectDialogVisible: false,
      weightList: [
        { code: "1", name: "A" },
        { code: "2", name: "B" },
        { code: "3", name: "C" },
      ],
      depotList: [],
      teamList: [],
      tableData: [],
      form: {},
    };
  },
  watch: {
    tableData: {
      handler(n, o) {
        this.getSpanArr(this.tableData);
      },
      immediate: true,
    },
  },
  async created() {
    this.getDetailInfo();
    const res = await Promise.all([
      getShiftList({ current: 0, size: 10000, name: "" }),
      getDepot(), //库位
    ]); //班组
    this.teamList = res[0].data.data.records;
    this.depotList = res[1].data.data;
  },
  computed: {
    totalAmount() {
      let total = 0;
      this.tableData.forEach((item) => {
        if (item.sumNew) {
          total = +total + +item.sumNew;
        }
      });
      return total;
    },
  },
  methods: {
    //合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // columnIndex === xx 找到第xx列，实现合并随机出现的行数
      if (columnIndex === 5) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    // 因为要合并的行数是不固定的，此函数是实现合并随意行数的功能
    getSpanArr(data) {
      console.log("zmmm--", data); //从后台获取的数据
      this.spanArr = [];
      this.pos = 0;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (
            data[i].itemCode === data[i - 1].itemCode ||
            data[i].itemName === data[i - 1].itemName
          ) {
            // 如果itemCode相等就累加，并且push 0
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            // 不相等push 1
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    handleAdd() {
      this.tableData.push({
        materialSn: this.form.materialSn,
        materialName: this.form.materialName,
        model: this.form.model,
        sum: this.form.sum,
        materialSnNew: "",
        materialNameNew: "",
        modelNew: "",
        sumNew: 0,
        location: "",
        locationId: "",
      });
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    handleKeyUp(sum, e) {
      // console.log(sum, e.target.value,this.totalAmount);
      if (this.totalAmount > sum) {
        e.target.value = "";
        return this.$message.error(`输入修正数量之和不能大于原数量${sum}`);
      }
      console.log(this.tableData);
    },
    async getDetailInfo() {
      // 获取详情信息
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await getCutMendPlanByPageDetail({
        id: id,
      });
      console.log(res);
      this.form = res.data.data;
      res.data.data.newProduct.forEach((item) => {
        const obj = {
          materialSn: this.form.materialSn,
          materialName: this.form.materialName,
          model: this.form.model,
          sum: this.form.sum,
          materialSnNew: item.materialSnNew,
          materialNameNew: item.materialNameNew,
          modelNew: item.modelNew,
          sumNew: item.sumNew,
          location: item.location,
          locationId: item.locationId,
        };
        this.tableData.push(obj);
      });
      if (!this.form.handsPersonName) {
        const info = JSON.parse(localStorage.getItem("saber-userInfo"));
        this.form.handsPersonName = info.content["nick_name"];
        this.form.handsPersonId = info.content["user_id"];
      }
    },
    // 展示产品选择
    reNameShowProduct(index) {
      this.reNameShow = true;
      this.currentIndex = index;
    },
    handleCancel() {
      this.show = false;
      this.reNameShow = false;
    },
    reNameProductList(list) {
      this.reNameShow = false;
      this.tableData[this.currentIndex].materialSnNew = list[0].productSn;
      this.tableData[this.currentIndex].modelNew = list[0].model;
      this.tableData[this.currentIndex].materialNameNew = list[0].name;
    },
    //选择项目
    async onProjectSelect(e) {
      this.form.organId = e.customerId;
      this.form.organName = e.customerName;
      this.form.projectName = e.projectName;
      this.form.projectSn = e.projectSn;
    },
    //保存
    async saveProducePlan() {
      // console.log(this.tableData);
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      if (this.tableData.some((val) => val.sumNew == 0)) {
        return this.$message.error("修正数量不能小于等于0!");
      }
      if (!this.tableData[0].materialNameNew) {
        return this.$message.error("请完善表格信息!");
      }
      // if (!this.tableData[0].location) {
      //   return this.$message.error("请完善表格信息!");
      // }
      if (this.tableData.some((val) => !val.location)) {
        return this.$message.error("请完善表格信息!");
      }
      this.form.newProduct = this.tableData;
      cutMendPlanUpdate(this.form)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("保存成功");
            setTimeout(() => {
              this.$router.back();
            }, 500);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
  filters: {
    weightName(value) {
      if (value == 1) {
        value = "A";
      } else if (value == 2) {
        value = "B";
      } else if (value == 3) {
        value = "C";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 0px;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.detail-form {
  padding: 30px 35px;
}
.el-input,
.el-select {
  width: 240px;
}
.el-table {
  /deep/th {
    padding: 0 !important;
  }
  .el-input,
  .el-select {
    width: 100%;
    /deep/.el-input__inner {
      text-align: center;
    }
  }
}
</style>
