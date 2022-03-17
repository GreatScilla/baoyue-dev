// 库存盘点新增、编辑、详情
<template>
  <basic-container>
    <el-row>
      <el-form label-width="100px" :model="formInline">
        <el-row>
          <el-col :span="12">
            <el-form-item required label="单据日期">
              <span v-if="type === 'detail'">{{ formInline.createTime }}</span>
              <el-date-picker
                v-else
                v-model="formInline.createTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
                class="ipt"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务部门">
              <span v-if="type === 'detail'">{{ formInline.deptName }}</span>
              <el-input
                class="ipt"
                @click.native="deptDialogVisible = true"
                suffix-icon="el-icon-search"
                v-else
                v-model="formInline.deptName"
              ></el-input>
            </el-form-item>
            <el-form-item label="单据编号" v-if="type === 'detail'">
              <span>{{ formInline.number }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="盘点仓库">
              <span v-if="type === 'detail'">{{ formInline.depotName }}</span>
              <el-select
                class="ipt"
                v-else
                @change="changeDepot"
                v-model="formInline.depotId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in depotList"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经手人">
              <span v-if="type === 'detail'">{{
                formInline.handsPersonName
              }}</span>
              <el-input
                class="ipt"
                @click.native="userDialogVisible = true"
                suffix-icon="el-icon-search"
                v-else
                v-model="formInline.handsPersonName"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-table border :data="tableData" show-summary style="width: 100%">
        <el-table-column type="index" width="50">
          <template slot="header">
            <div
              v-if="type !== 'detail'"
              @click="addProduct"
              style="justify-content: center; align-items: center"
            >
              <i
                style="color: #409eff; font-size: 24px"
                class="el-icon-circle-plus-outline"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div @click="deleteProduct(scope.row)">
              <i class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.pic"
              :fit="fit"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column
          prop="productNumber"
          show-overflow-tooltip
          label="*产品编码"
        ></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column
          prop="productSpecificationName"
          label="规格型号"
        ></el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="产品分类"
        ></el-table-column>
        <el-table-column
          prop="stockUnitName"
          label="计量单位"
        ></el-table-column>
        <el-table-column prop="stock" label="*库存"></el-table-column>
        <el-table-column label="*盘点数量">
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.takingQuantity }}</span>
            <el-input v-else v-model="scope.row.takingQuantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="盈亏数量">
          <template slot-scope="scope">
            <span v-if="scope.row.takingQuantity">{{
              scope.row.takingQuantity - scope.row.stock
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="*单价">
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.price }}</span>
            <el-input v-else v-model="scope.row.price"   ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="盈亏总金额">
          <template slot-scope="scope">
            <span v-if="scope.row.takingQuantity">{{
              getFloat(
                (scope.row.takingQuantity - scope.row.stock) * scope.row.price,
                4
              )
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-row>
        <div class="title">更多信息</div>
        <el-divider></el-divider>
      </el-row>
      <el-form label-width="100px" :model="formInline" class="form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="制单人">
              <span v-if="type === 'detail'">{{
                formInline.createUserName
              }}</span>
              <el-input
                class="ipt"
                disabled
                v-else
                v-model="formInline.createUserName"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="type === 'detail'" label="审核日期">
              <span>{{ formInline.makingPeople }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="type === 'detail'" label="审核人">
              <span>{{ formInline.reviewerName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="footer">
      <el-button
        v-if="!examine"
        size="small"
        @click="$router.push('/storageManage/inventoryCheck')"
        >取消</el-button
      >
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="handleSave"
        :loading="requesting"
        >保存
      </el-button>
    </el-row>

    <!-- 选择产品 -->
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      title="选择商品"
      width="60%"
    >
      <product-select
        @on-cancel="visible = false"
        :dept-id="formInline.depotId"
        @on-submit="selectProduct"
        :checkData="tableData"
      ></product-select>
    </el-dialog>

    <!-- 选择部门 -->
    <el-dialog
      :visible.sync="deptDialogVisible"
      :modal-append-to-body="false"
      title="选择部门"
    >
      <dept @on-submit="selectDept"></dept>
    </el-dialog>

    <!-- 选择经手人 -->
    <el-dialog
      :visible.sync="userDialogVisible"
      :modal-append-to-body="false"
      title="选择经手人"
    >
      <user @on-submit="selectUser"></user>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  detailBean,
  submit,
  findProductByDepot,
} from "@/api/storageManage/inventoryCheck";
import productSelect from "./components/productSelect";
import { getDepot } from "@/api/common";
import { mapGetters } from "vuex";
import dept from "@/components/dept";
import user from "@/components/user";

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
    examine: {
      type: String,
      default: "",
    },
  },
  components: {
    productSelect,
    dept,
    user,
  },
  data() {
    return {
      requesting: false,
      visible: false,
      deptDialogVisible: false,
      userDialogVisible: false,
      depotList: [],
      tableData: [],
      formInline: {
        receiptsTypeId: 1,
        receiptsTypeName: "盘盈亏",
      },
    };
  },
  async mounted() {
    await this._init();

    if (this.type !== "add") {
      const detailRes = await detailBean({ id: this.data.id });
      if (detailRes.data.code === 200) {
        this.formInline = detailRes.data.data.stockTaking;
        this.tableData = detailRes.data.data.stockTakingItems;
        this.tableData.forEach((ele) => {
          ele.productNumber = ele.productSn;
          ele.productCategoryName = ele.productCateName;
          ele.stock = ele.paperQuantity;
          ele.price = ele.unitPrice;
          ele.stockUnitName = ele.unit;
          ele.productSpecificationName = ele.model;
        });
      }
    } else {
      this.$set(this.formInline, "createUserName", this.userInfo.user_name);
    }
  },

  methods: {
    //保留四位小数
    getFloat(number, n) {
      n = n ? parseInt(n) : 0;
      if (n <= 0) {
        return Math.round(number);
      }
      number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
      number = Number(number).toFixed(n); //补足位数
      return number;
    },
    async deleteProduct(row) {
      try {
        await this.$confirm("确定删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const index = this.tableData.findIndex((ele) => row.id === ele.id);
        this.tableData.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },
    async changeDepot() {
      if (this.tableData.length > 0) {
        try {
          await this.$confirm("切换仓库将清空已选商品", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
          this.tableData = [];
        } catch (error) {
          return;
        }
      }
      const res = await findProductByDepot({
        depotId: this.formInline.depotId,
      });
      this.tableData = res.data.data;
      this.depotList.forEach((ele) => {
        if (ele.id === this.formInline.depotId) {
          this.formInline.depotName = ele.depotName;
        }
      });
    },
    async addProduct() {
      if (!this.formInline["depotId"]) {
        this.$message.warning("请先选择仓库");
        return;
      }
      this.visible = true;
    },
    selectProduct(value) {
      console.log(value);
      value.forEach((ele) => {
        ele.productId = ele.id;
        ele.productNumber = ele.productSn;
        ele.productName = ele.name;
        ele.price = ele.purPriceSuggest;
        ele.stockUnitName = ele.unitName;
        ele.stock = 0;
        ele.productSpecificationName = ele.model;
      });
      this.tableData.push(...value);
      this.visible = false;
      // list.forEach((item, index) => {
      //   const obj = {
      //     productId: item.id,
      //     productNumber: item.productSn,
      //     productName: item.name,
      //     price: item.purPriceSuggest,
      //     stockUnitName: item.unitName,
      //     stock: 0,
      //     productSpecificationName: item.model,
      //   };
      //   this.tableData.push(obj);
      // });
    },
    selectUser(value) {
      this.formInline.handsPersonId = value.id;
      this.formInline.handsPersonName = value.name;
      this.userDialogVisible = false;
    },
    selectDept(value) {
      this.formInline.deptId = value.id;
      this.formInline.deptName = value.deptName;
      this.deptDialogVisible = false;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    },
    async handleSave() {
      if (!this.formInline.createTime) {
        this.$message.error("请填写单据日期");
        return;
      }
      this.tableData = this.tableData.map((ele) => {
        return {
          productId: ele.productId,
          takingQuantity: ele.takingQuantity,
          paperQuantity: ele.stock,
          unitPrice: ele.price,
        };
      });
      this.requesting = true;
      try {
        const saveRes = await submit({
          stockTaking: this.formInline,
          stockTakingItems: this.tableData,
        });
        this.requesting = false;
        if (saveRes.data.code === 200) {
          this.$message.success("操作成功");
          this.$router.back();
        }
      } catch {
        this.requesting = false;
      }
    },
    async _init() {
      // 盘点仓库
      const getDepotRes = await getDepot();
      if (getDepotRes.data.code === 200) {
        this.depotList = getDepotRes.data.data;
      }
    },
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-select,
.el-date-editor {
  width: 100%;
}
.ipt {
  width: 360px;
}

.footer {
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.04);
}

.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
</style>
