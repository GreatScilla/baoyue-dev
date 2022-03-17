// 关联组件新增
<template>
  <basic-container>
    <el-row>
      <div class="title">关联组件新增</div>
      <el-divider></el-divider>
    </el-row>
    <el-row>
      <el-form label-width="100px" :model="selectProcess" class="detail-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工序编码：">
              <el-input
                size="small"
                v-model="selectProcess.processCode"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工序名称：">
              <el-input
                disabled
                size="small"
                v-model="selectProcess.processName"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        >新增</el-button
      >
    </el-row>
    <el-row>
      <el-table :data="productTable" style="width: 100%">
        <el-table-column prop="productType" label="组件类型">
          <template slot-scope="scope">
            <el-select
              size="small"
              v-model="scope.row.compType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in compType"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="组件名称"> </el-table-column>
        <el-table-column prop="productSn" label="组件编码"> </el-table-column>
        <el-table-column label="是否开工校验">
          <template slot-scope="scope">
            <el-select
              size="small"
              v-model="scope.row.isCheck"
              placeholder="请选择"
            >
              <el-option
                v-for="item in isCheck"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="savePerson"
        :loading="requesting"
        >保存</el-button
      >
    </el-row>

    <el-dialog
      title="产品编码"
      :visible.sync="dialogVisible"
      width="723px"
      append-to-body
      :before-close="handleClose"
    >
      <product-select @on-submit="selectProduct"></product-select>
    </el-dialog>
  </basic-container>
</template>

<script>
import { saveProcessComponents } from "@/api/product/craft-bom.js";
import { getDictionary } from "@/api/system/dictbiz.js";
import productSelect from "@/components/productSelect";
export default {
  components: {
    productSelect,
  },
  data() {
    return {
      requesting: false,
      dialogVisible: false,
      productTable: [],
      processProduct: {},
      selectProcess: {},
      selectCraftLine: {},
      compType: [],
      isCheck: [
        //  是否开工校验
        {
          value: 0,
          label: "否",
        },
        {
          value: 1,
          label: "是",
        },
      ],
    };
  },
  async mounted() {
    const res = await getDictionary({ code: "comp_type" });
    this.compType = res.data.data;
    this.selectCraftLine = this.$route.query.selectCraftLine;
    this.selectProcess = this.$route.query.selectProcess;
    if (this.$route.query.operationState) {
      console.log(this.$route.query);
      this.operationState = this.$route.query.operationState;
      this.productTable = this.$route.query.row;
    }
  },
  methods: {
    selectProduct(value) {
      if (value.length > 0) {
        console.log(value);
        this.productTable.push(...value);
      }
      this.dialogVisible = false;
    },

    handleDelete(row) {
      this.$confirm("确定要删除该计划排程吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.productTable = this.productTable.filter(
            (ele) => row.id != ele.id
          );
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 取消
    cancel() {
      this.$router.back();
    },
    // 保存
    async savePerson() {
      this.productTable.forEach((ele) => {
        ele.lineId = this.selectCraftLine.id;
        ele.processId = this.selectProcess.id;
        ele.productName = ele.name;
        ele.productId = ele.id;
        delete ele.id;
        if (ele.isCheck === undefined) {
          this.$message.error("请选择是否开工校验");
          return;
        }
      });
      this.requesting = true;
      try {
        const res = await saveProcessComponents(this.productTable);
        this.requesting = false;
        if (res.data.success) {
          this.$message.success("修改成功");
          this.$router.back();
        }
      } catch {
        this.requesting = false;
      }
    },
  },
  filters: {
    productType(value) {
      if (value === 1) {
        return "自制件";
      } else if (value === 2) {
        return "委外件";
      } else if (value === 3) {
        return "外购件";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-form {
  padding: 30px 35px;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
</style>
