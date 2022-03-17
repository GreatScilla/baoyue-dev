
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
      label-width="150px"
      class="detail-form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            prop="name"
            required
            :label="pallet !== 'pallet' ? '产品名称：' : '托盘名称：'"
          >
            <span v-if="operationState === 'details'"> {{ form.name }}</span>
            <el-input
              class="iptWidth"
              disabled
              v-else
              size="small"
              v-model="form.name"
              placeholder="请输入产品名称"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="规格型号：">
            <span v-if="operationState === 'details'"> {{ form.model }}</span>
            <el-input
              class="iptWidth"
              disabled
              v-else
              size="small"
              v-model="form.model"
              placeholder="请输入产品型号"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="长：">
            <span v-if="operationState === 'details'"> {{ form.length }}</span>
            <el-input
            disabled
              class="iptWidth"
              size="small"
                
              v-model="form.length"
              placeholder="请输入"
              @input="changeInput($event)"
              v-else
            >
              <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="高：">
            <span v-if="operationState === 'details'"> {{ form.high }}</span>
            <el-input
            disabled
              class="iptWidth"
              size="small"
                
              v-model="form.high"
              placeholder="请输入"
              @input="changeInput($event)"
              v-else
            >
              <template slot="append">cm</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            v-if="operationState === 'details'"
            required
            label="产品编码："
          >
            <span> {{ form.productSn }}</span>
          </el-form-item>
          <el-form-item
            prop="productList"
            required
            :label="pallet !== 'pallet' ? '产品分类：' : '托盘分类：'"
          >
            <span v-if="operationState === 'details'">
              {{ form.productCategoryName }}</span
            >
            <el-cascader
            disabled
              class="iptWidth"
              v-else
              v-model="form.productList"
              :options="productCateList"
              :props="cateProp"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="单重：">
            <span v-if="operationState === 'details'"> {{ form.weight }}</span>
            <el-input
            disabled
              class="iptWidth"
              size="small"
                
              v-model="form.weight"
              placeholder="请输入单重"
              v-else
            >
              <template slot="append">KG</template>
            </el-input>
          </el-form-item>
          <el-form-item label="宽：">
            <span v-if="operationState === 'details'"> {{ form.width }}</span>
            <el-input
            disabled
              class="iptWidth"
              size="small"
                
              v-model="form.width"
              placeholder="请输入"
              @input="changeInput($event)"
              v-else
            >
              <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="是否启用：">
            <span v-if="operationState === 'details'">
              {{ form.statusName }}</span
            >
            <el-select
            disabled
              class="iptWidth"
              v-else
              size="small"
              v-model="form.status"
            >
              <el-option label="启用" :value="0"></el-option>
              <el-option label="禁用" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0">
        <div class="title">关联检验项目</div>
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
          <el-table-column type="index" width="100">
            <template slot="header">
              <span v-if="type !== 'detail'" @click="handleAdd">
                <i class="el-icon-plus"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="检验项目" prop="inspectionName">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">{{ row.inspectionName }}</span>
              <el-input
                v-else
                v-model="row.inspectionName"
                placeholder="检验项目"
                @focus="checkProject($index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="检验标准" prop="inspectionStandard">
          </el-table-column>
          <el-table-column width="100" label="操作">
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
        </el-table>
      </el-row>
      <el-row class="footer-box margin_30">
        <div v-if="type !== 'detail'">
          <el-button @click="handleBack" size="small">取消</el-button>
          <el-button type="primary" @click="submit" size="small"
            >保存</el-button
          >
        </div>
        <el-button v-else type="primary" size="small" @click="handleBack"
          >返回</el-button
        >
      </el-row>
    </el-form>
    <!-- 选择弹窗 -->
    <checkProjectDialog
      title="检验项目"
      :checkData="tableData"
      :checkProjectVisible.sync="checkProjectVisible"
      @on-selected="addCheckProject"
    />
  </div>
</template>

<script>
import {
  saveOrUpdateAssayCategory,
  queryItemByCategoryId,
} from "@/api/quality/index";
import { listProductByCate } from "@/api/base-data/product-data.js";
import checkProjectDialog from "@/components/quality/checkProjectDialog";
export default {
  components: { checkProjectDialog },
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
  data() {
    return {
      form: {
        productList:[]
      },
      tableData: [],
      checkProjectVisible: false,
      productCateList: [], // 产品分类列表
      pallet: null, //新增托盘
      cateProp: {
        label: "cateName",
        value: "id",
        // checkStrictly: true,
        children: "productCateList",
      },
      rules: {
        labId: [{ required: true, message: "请选择", trigger: "change" }],
        categoryName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  computed: {},
  async created() {
    if (this.type !== "add") {
      const productCateListRes = await listProductByCate();
      this.productCateList = productCateListRes.data.data;
       this.getTreeData(this.productCateList, "productCateList");
      this.form = this.data;
       let info = await queryItemByCategoryId({ productNo: this.data.productSn});
      this.tableData = info.data.data;
      if (this.form.productCateIds) {
        this.form.productList = this.form.productCateIds.split(",");
      }
      if (this.form.specificationName) {
        this.form.specificationName = this.form.specificationName.split(",");
        this.form.length = this.form.specificationName[0];
        this.form.width = this.form.specificationName[1];
        this.form.high = this.form.specificationName[2];
      }
    }
  },
  mounted() {},
  methods: {
    // 剔除空级联 productCateList
    getTreeData(data, childrenName) {
      for (var i = 0; i < data.length; i++) {
        if (data[i][childrenName].length < 1) {
          // children若为空数组，则将children设为undefined
          data[i][childrenName] = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i][childrenName], childrenName);
        }
      }
      return data;
    },
    handleAdd() {
      this.tableData.push({});
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    checkProject() {
      this.checkProjectVisible = true;
    },
    addCheckProject(list) {
      if (list.length === 0 && this.tableData.length === 1) {
        return;
      }
      list.forEach((item, index) => {
        const obj = {
          id: item.id,
          inspectionName: item.inspectionName,
          inspectionStandard: item.inspectionStandard,
        };
        this.tableData.push(obj);
      });
      this.tableData = this.tableData.filter((ele) => {
        if (!ele.id) {
          return false;
        } else {
          return true;
        }
        this.tableData.push({});
        this.tableData.pop();
      });
    },
    //提交
    async submit() {
      try {
        await this.$refs.ruleForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      if (this.tableData.length === 0) {
        return this.$message.error("请关联检验项目");
      }
      let arr = [];
      this.tableData.forEach((res) => {
        arr.push(res.id);
      });
      this.form.itemIds = arr;
      let tag = "";
        tag = 1;
        let form={
          itemIds:this.form.itemIds,
          productNo:this.form.productSn
        }
        saveOrUpdateAssayCategory(tag,form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success({
              message: "操作成功",
            });
            this.$router.push("/quality/test-category");
          }
        });
      
    },
    handleBack() {
      this.$router.push("/quality/test-category");
    },
  },
};
</script>
<style src="../common.css"  scoped>
</style>
