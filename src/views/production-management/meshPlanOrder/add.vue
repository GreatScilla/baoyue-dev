// 网片计划单修改、详情
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
          <el-col :span="12" v-if="type != 'add'">
            <el-form-item label="计划单号:">
              <span v-if="type === 'detail'">{{ form.meshPlanSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.meshPlanSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type != 'add'">
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
            <el-form-item required label="班组:" prop="job">
              <span v-if="type === 'detail'">{{ form.job }}</span>
              <el-select
                v-else
                size="small"
                v-model="form.job"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in teamList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.className"
                  @click.native="
                    (form.jobId = item.id), (form.jobSn = item.code)
                  "
                >
                </el-option>
              </el-select>
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
            <el-table-column label="网片编码" prop="materialSn" width="160px">
              <template slot="header">
                <span style="color: #f56c6c">*</span>网片编码
              </template>
              <template slot-scope="{ row }">
                <span v-if="type === 'detail'">{{ row.materialSn }}</span>
                <el-input
                  v-else
                  v-model="row.materialSn"
                  @focus="showProduct($index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="网片名称">
              <template slot-scope="{ row }">
                <sapn v-if="type === 'detail'">{{ row.materialName }}</sapn>
                <el-input disabled v-else v-model="row.materialName"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="规格型号">
              <template slot-scope="{ row }">
                <sapn v-if="type === 'detail'">{{ row.model }}</sapn>
                <el-input disabled v-else v-model="row.model"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="生产数量">
              <template slot-scope="{ row }">
                <sapn v-if="type === 'detail'">{{ row.sum }}</sapn>
                <el-input v-else v-model="row.sum"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单位">
              <template slot-scope="{ row }">
                <sapn v-if="type === 'detail'">{{ row.unit }}</sapn>
                <el-input disabled v-else v-model="row.unit"></el-input>
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
           :loading="buttonLoading"
          @click="saveProducePlan"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="show" width="70%" title="选择产品">
      <product-select
        :checkData="tableData"
        @on-cancel="show = false"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <projectSelect
      title="项目"
      :projectDialogVisible.sync="projectDialogVisible"
      @on-selected-contact="onProjectSelect"
    />
  </basic-container>
</template>
<script>
import projectSelect from "@/components/projectSelect";
import productSelect from "@/components/productSelect";
import { getShiftList } from "@/api/humanResources/shift";
import { getDepot } from "@/api/common";
import {
  meshPlanSave,
  getMeshPlanDetail,
  meshPlanUpdate,
} from "@/api/manufacture/meshPlanOrder";
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
    productSelect,
    projectSelect,
  },
  data() {
    return {
         buttonLoading: false,
      show: false,
      currentIndex: "",
      projectDialogVisible: false,
      depotList: [],
      teamList: [],
      meshPlanProduct: [],
      tableData: [
        {
          location: "",
          locationId: "",
          materialName: "",
          materialSn: "",
          model: "",
          sum: 0,
          unit: "",
        },
      ],
      form: {},
    };
  },
  async created() {
    const res = await Promise.all([
      getShiftList({ current: 0, size: 10000, name: "" }),
      getDepot(), //库位
    ]); //班组
    this.teamList = res[0].data.data.records;
    this.depotList = res[1].data.data;
  },
  mounted() {
    if (this.type != "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    async getDetailInfo() {
      // 获取详情信息
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await getMeshPlanDetail({
        id: id,
      });
      this.form = res.data.data;
      this.tableData = res.data.data.meshPlanProduct;
    },
    showProduct(index) {
      // 展示产品选择
      this.show = true;
      this.currentIndex = index;
    },
    addProductList(list) {
      this.show = false;
      if (list.length === 0 && this.tableData.length === 1) {
        return;
      }
      list.forEach((item) => {
        const obj = {
          productSn: item.productSn,
          materialSn: item.productSn,
          materialName: item.name,
          model: item.model, // 规格型号
          unit: item.unitName,
          location: "",
          locationId: "",
          sum: "",
        };
        this.tableData.push(obj);
      });
      this.tableData = this.tableData.filter((ele) => {
        if (!ele.productSn) {
          return false;
        } else {
          return true;
        }
      });
    },

    //选择项目
    async onProjectSelect(e) {
      this.form.organId = e.customerId;
      this.form.organName = e.customerName;
      this.form.projectName = e.projectName;
      this.form.projectSn = e.projectSn;
    },
    //新增表格
    handleAdd() {
      this.tableData.push({});
    },
    //删除表格
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    //保存
    async saveProducePlan() {
      let saveApi = "";
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      if (this.tableData.some((val) => val.materialSn == null)) {
        return this.$message.error("请完善表格信息!");
      }
      if (this.tableData.some((val) => val.location == null)) {
        return this.$message.error("请完善表格信息!");
      }
      if (
        this.tableData.some(
          (val) => val.sum == null || val.sum.toString() == "" || val.sum == 0
        )
      ) {
        return this.$message.error({
          message: "生产数量应大于0",
        });
      }
     this.buttonLoading = true
      this.form.meshPlanProduct = this.tableData;
      if (this.type == "add") {
        saveApi = meshPlanSave;
      } else {
        saveApi = meshPlanUpdate;
      }
      saveApi(this.form)
        .then((res) => {
          if (res.data.success) {
            this.buttonLoading =false
            this.$message.success("操作成功");
            this.$router.back();
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
