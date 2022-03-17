// 采购计划新增、编辑、详情
<template>
  <basic-container>
    <el-form
      :inline="true"
      label-width="120px"
      :model="formInline"
      class="form-inline"
      :rules="rules"
      ref="formInline"
      :show-message="false"
    >
      <el-row>
        <el-row>
          <div class="title">基本信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item label="采购部门">
              <span v-if="type === 'detail'">{{
                formInline.purchasingDepartment
              }}</span>
              <el-input
                v-else
                @click.native="deptDialogVisible = true"
                v-model="formInline.purchasingDepartment"
              ></el-input>
            </el-form-item>

            <el-form-item prop="dateOrder" label="到货日期">
              <span v-if="type === 'detail'">{{ formInline.dateOrder }}</span>
              <el-date-picker
                v-else
                v-model="formInline.dateOrder"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预生产计划编号">
                <span v-if="type === 'detail'">{{ formInline.sourceNo }}</span>
              <el-input
                v-else
                disabled
                style="width:350px"
                v-model="formInline.sourceNo"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item label="采购员">
              <span v-if="type === 'detail'">{{ formInline.buyerName }}</span>
              <el-input
                v-else
                :disabled="!formInline.purchasingDepartment"
                v-model="formInline.buyerName"
                @focus="selectUser"
              ></el-input>
            </el-form-item>
            <el-form-item label="销售订单编号">
            
              <span v-if="type === 'detail'">{{ formInline.sourceName }}</span>
              <el-input disabled v-else v-model="formInline.sourceName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-table
          :data="formInline.procurementPlanSubList"
          style="width: 100%; margin: 20px 0"
        >
          <!-- <el-table-column type="index" width="50">
          <template slot="header">
            <div
              v-if="type !== 2"
              @click="addProduct"
              style="justify-content: center; align-items: center"
            >
              <i
                style="color: #409eff; font-size: 24px"
                class="el-icon-circle-plus-outline"
              ></i>
            </div>
          </template>
        </el-table-column> -->
          <!-- <el-table-column prop="name" label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.pic"
              :fit="fit"
            ></el-image>
          </template>
        </el-table-column> -->
          <el-table-column prop="productSn" label="产品编码"></el-table-column>
          <el-table-column prop="name" label="产品名称"></el-table-column>
          <el-table-column
            prop="productCategoryName"
            label="产品分类"
          ></el-table-column>
          <el-table-column prop="model" label="规格型号"></el-table-column>
          <el-table-column prop="unitName" label="单位"></el-table-column>
          <el-table-column label="">
            <template slot="header">
              <span style="color: #f56c6c">*</span>采购数量
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.number }}</span>
              <el-form-item
                v-else
                label-width="0px"
                :prop="'procurementPlanSubList.' + scope.$index + '.number'"
                :rules="rules.number"
              >
                <el-input v-model="scope.row.number"   ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="type === 'detail'" style="margin-top: 20px">
        <el-row>
          <div class="title">更多信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-form label-width="100px" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="8">
              <el-form-item label="制单人">
                <span v-if="type === 'detail'">{{
                  formInline.makingPeople
                }}</span>
                <el-input
                  disabled
                  v-else
                  v-model="formInline.makingPeople"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核人">
                <span v-if="type === 'detail'">{{
                  formInline.reviewerName
                }}</span>
                <el-input v-else v-model="formInline.reviewerName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row class="footer">
        <el-button v-if="!examine" size="small" @click="cancel">取消</el-button>
        <el-button
          v-if="type === 'edit'"
          size="small"
          type="primary"
          @click="handleSave"
          >保存
        </el-button>
      </el-row>
    </el-form>

    <!-- 选择采购员 -->
    <el-dialog append-to-body :visible.sync="showUser" title="选择人员">
      <user
        :deptId="deptId"
        @on-cancel="closeUser"
        @on-submit="submitUser"
      ></user>
    </el-dialog>

    <!-- 选择部门 -->
    <el-dialog
      :visible.sync="deptDialogVisible"
      :modal-append-to-body="false"
      title="选择部门"
    >
      <dept @on-submit="selectDept"></dept>
    </el-dialog>
  </basic-container>
</template>

<script>
import productSelect from "@/components/productSelect";
import dept from "@/components/dept";
import {
  save,
  update,
  procurementplanDetail,
} from "@/api/manufacture/purchase-plan";
import { getCode } from "@/api/common";
import { mapGetters } from "vuex";
import common from "@/mixins/common";

export default {
  props: {
    type: {
      type: String,
      default: "edit",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    examine: {
      type: String,
      default: "",
    },
  },
  components: {
    productSelect,
    dept,
  },
  mixins: [common],
  async mounted() {
    let detailRes = "";
    if (this.type === "detail") {
      detailRes = await procurementplanDetail({
        procurementPlanId: this.data.id,
      });
    } else {
      detailRes = await procurementplanDetail({
        procurementPlanId: this.$route.query.data.id,
      });
    }

    if (detailRes.data.code === 200) {
      this.formInline = detailRes.data.data;
    }
  },
  data() {
    return {
      visible: false,
      deptDialogVisible: false,
      tableData: [],
      model: "采购计划",
      formInline: {
        user: "",
        region: "",
        time: "",
        purchasingDepartment: "",
        procurementPlanSubList: [],
      },
      rules: {
        dateOrder: [{ required: true, message: "请选择", trigger: "change" }],
        number: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addProduct() {
      this.visible = true;
    },
    selectProduct(value) {
      this.tableData = value;
      this.visible = false;
    },
    selectDept(value) {
      this.formInline.purchasingDepartment = value.deptName;
      this.formInline.purchasingNo = value.id;
      this.deptDialogVisible = false;
    },
    onSubmit() {
      console.log("submit!");
    },
    async handleSave() {
      try {
        await this.$refs.formInline.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      let saveRes;
      saveRes = await update(this.formInline);
      if (saveRes.data.code === 200) {
        this.$message.success("修改成功");
        this.$router.push("/production-management/purchase-plan");
      }
    },
    cancel() {
      this.$router.push("/production-management/purchase-plan");
    },
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.footer {
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.04);
  margin-top: 30px;
}

.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.deatilsColumn {
  display: flex;
  flex-direction: column;
}
</style>
