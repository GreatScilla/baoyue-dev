
<template>
  <div class="handlePages addPages">
    <el-row>
      <div class="title">基础数据</div>
      <el-divider></el-divider>
    </el-row>
    <el-form
      :model="form"
      :show-message="false"
      :rules="rules"
      ref="ruleForm"
      label-width="180px"
      class="detail-form"
    >
      <el-row v-if="type !== 'add'">
        <el-col :span="12">
          <el-form-item label="单据编号:">
            <span>{{ form.taskNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间:">
            <span>{{ form.createTime }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="labId" label="执行单位:">
            <el-select
              class="iptWidth"
              v-model="form.labId"
              placeholder="请选择"
              :disabled="type === 'detail'"
            >
              <el-option
                v-for="item in labList"
                :key="item.id"
                :label="item.labName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="batchNo" label="批次批号:">
            <span v-if="type === 'detail'">{{ form.batchNo }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="form.batchNo"
              placeholder="请输入批次批号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="productSn" label="产品编号/名称/规格型号:">
            <span v-if="type === 'detail'">{{ products }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="products"
              placeholder="请选择产品编号"
              suffix-icon="el-icon-search"
              @focus="checkProductVisible = true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="hour" label="工时:">
            <span v-if="type === 'detail'">{{ form.hour }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="form.hour"
              placeholder="请输入工时"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="taskBeginTime" label="任务开始日期:">
            <span v-if="type === 'detail'">{{ form.taskBeginTime }}</span>
            <el-date-picker
              v-else
              class="iptWidth"
              v-model="form.taskBeginTime"
              value-format="yyyy-MM-dd 00:00:00"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="taskEndTime" label="任务结束日期:">
            <span v-if="type === 'detail'">{{ form.taskEndTime }}</span>
            <el-date-picker
              v-else
              class="iptWidth"
              v-model="form.taskEndTime"
              value-format="yyyy-MM-dd 23:59:59"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="备注:">
            <span v-if="type === 'detail'">{{ form.remark }}</span>
            <el-input
              v-else
              v-model="form.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-row style="margin: 20px 0 10px">
          <div class="title">质检任务</div>
          <el-divider></el-divider>
        </el-row>
        <el-row class="margin-bottom-20">
          <el-table
            :data="tableData"
            border
            :cell-style="{ 'text-align': 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            style="width: 80%; margin: 0 auto"
          >
            <el-table-column label="检验项目" prop="inspectionName">
            </el-table-column>
            <el-table-column label="检验标准" prop="inspectionStandard">
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row class="footer-box margin_30">
        <div v-if="type !== 'detail'">
          <el-button @click="handleBack" size="small">取消</el-button>
          <el-button
            type="primary"
            :loading="requesting"
            @click="submit"
            size="small"
            >保存</el-button
          >
        </div>
        <el-button v-else type="primary" size="small" @click="handleBack"
          >返回</el-button
        >
      </el-row>
    </el-form>
    <!-- 选择产品 -->
    <el-dialog
      :visible.sync="checkProductVisible"
      top="20px"
      append-to-body
      width="70%"
      title="选择产品"
    >
      <productDia
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></productDia>
    </el-dialog>
  </div>
</template>

<script>
import { saveOrUpdateTask } from "@/api/quality/process";
import { selectLabNameList, queryItemByCategoryId } from "@/api/quality/index";
import productDia from "@/components/quality/productDia";
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
  },
  components: {
    productDia,
  },
  data() {
    return {
      requesting: false,
      form: {},
      checkProductVisible: false,
      planTypeList: [
        {
          value: 1,
          label: "送样检验",
        },
        // {
        //   value: 2,
        //   label: "进料检验",
        // },
        // {
        //   value: 3,
        //   label: "生产入库检验",
        // },
        // {
        //   value: 4,
        //   label: "销退检验",
        // },
      ],
      labList: [], //化验室列表
      tableData: [], //表格列表
      rules: {
        labId: [{ required: true, message: "请选择", trigger: "change" }],
        batchNo: [{ required: true, message: "请输入", trigger: "blur" }],
        taskBeginTime: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        taskEndTime: [{ required: true, message: "请选择", trigger: "change" }],
        hour: [{ required: true, message: "请输入", trigger: "blur" }],
        productSn: [{ required: true, message: "请选择", trigger: "change" }],
      },
      products: "", //数据集合
    };
  },
  computed: {},
  async created() {
    let res = await selectLabNameList({});
    this.labList = res.data.data;
    if (this.type !== "add") {
      this.form = this.data;
      this.products =
        this.form.productSn +
        " " +
        this.form.productName +
        " " +
        this.form.model;
      this.getTabList(this.data.productSn);
    }
  },
  mounted() {},
  methods: {
    addProductList(val) {
      //获取产品
      this.form.productId = val.id; //产品ID
      this.form.productName = val.name; //	产品名称
      this.form.productSn = val.productSn; //产品编号
      this.products = val.name + " " + val.productSn + " " + val.model;
      this.getTabList(val.productSn);
      this.checkProductVisible = false;
    },
    // async getType(id) {
    //   //获取类别
    //   let res = await selectCategoryList({ labId: id });
    //   if (res.data.code === 200) {
    //     this.typeData = res.data.data;
    //     if (this.typeData.length === 0) {
    //       this.form.productId = "";
    //       this.tableData = [];
    //     }
    //   }
    // },
    async getTabList(id) {
      //获取列表
      let info = await queryItemByCategoryId({ productNo: id });
      if (info.data.code === 200) {
        this.tableData = info.data.data;
      }
    },
    async submit() {
      try {
        await this.$refs.ruleForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      let tag = "";
      console.log(this.form);
      if (this.type === "add") {
        tag = 0;
      } else {
        tag = 1;
      }
      this.requesting = true;
      saveOrUpdateTask(tag, this.form).then((res) => {
        if (res.data.code === 200) {
          this.requesting = false;
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push("/quality/task");
        }
      });
    },
    handleBack() {
      this.$router.push("/quality/task");
    },
  },
};
</script>
<style src="../common.css"  scoped>
</style>
