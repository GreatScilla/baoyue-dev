
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :model="adjustmentForm"
      ref="adjustmentForm"
      :rules="rules"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            required
            label="单据日期:"
            v-if="adjustmentForm.stockTaking.createTime"
          >
            <span v-if="type === 'detail'">{{
              adjustmentForm.stockTaking.createTime
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="adjustmentForm.stockTaking.createTime"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="业务部门:">
            <span v-if="type === 'detail'">{{
              adjustmentForm.stockTaking.deptName
            }}</span>
            <el-select
              size="small"
              v-model="adjustmentForm.stockTaking.deptId"
              placeholder="请选择部门"
              v-else
              @change="changeDept"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.deptName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            required
            label="单据类型:"
            prop="stockTaking.receiptsTypeId"
          >
            <span v-if="type === 'detail'">{{
              adjustmentForm.stockTaking.receiptsTypeName
            }}</span>
            <el-select
              size="small"
              v-model="adjustmentForm.stockTaking.receiptsTypeName"
              placeholder="请选择单据类型"
             
              disabled
              v-else
            >
              <el-option
                v-for="item in documentType"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictValue"
                @click.native="
                  adjustmentForm.stockTaking.receiptsTypeId = item.dictKey
                "
              >
              </el-option>
              <div :slot="documentType.length > 0 ? null : 'empty'">
                <div
                  :class="[
                    documentType.length > 0 ? 'selectAdd' : 'noDataSelectAdd',
                  ]"
                  @click="selectAddDialogVisible = true"
                >
                  <i class="el-icon-plus"></i>
                  新增单据类型
                </div>
              </div>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            required
            label="单据编码:"
            v-if="adjustmentForm.stockTaking.number"
          >
            <span v-if="type === 'detail'">{{
              adjustmentForm.stockTaking.number
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="adjustmentForm.stockTaking.number"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="经手人:">
            <span v-if="type === 'detail'">{{
              adjustmentForm.stockTaking.handsPersonName
            }}</span>
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              size="small"
              suffix-icon="el-icon-search"
              v-model="adjustmentForm.stockTaking.handsPersonName"
              placeholder="请选择经手人"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="adjustmentForm.stockTakingItems"
          style="margin-bottom: 20px"
          show-summary
        >
          <el-table-column
            type="index"
            width="100"
            align="center"
            v-if="type !== 'detail'"
          >
            <template slot="header">
              <el-button
                type="text"
                icon="el-icon-plus"
                circle
                @click="addRow"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column width="80" align="center" v-if="type !== 'detail'">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-delete"
                circle
                @click="delRow(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="图片" prop="pic" align="center" width="110">
            <template slot-scope="scope">
              <el-image
                v-if="scope.row.pic"
                style="width: 100px; height: 100px; padding-top: 5px"
                :src="scope.row.pic"
                fit="cover"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="产品编号"
            align="center"
            prop="productSn"
            width="150"
          >
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>产品编号
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.productSn }}</span>
              <el-input
                v-else
                :disabled="scope.row.productSn"
                style="width: 120px"
                size="small"
                v-model="scope.row.productSn"
                @focus="productDialogVisible = true"
                placeholder="请选择产品"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称"
            align="center"
            prop="productName"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="规格型号" align="center" prop="model">
          </el-table-column>
          <el-table-column
            label="产品分类"
            align="center"
            prop="productCateName"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="计量单位" align="center" prop="unit">
          </el-table-column>
          <el-table-column label="仓库" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>仓库
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.depotName }}</span>
              <el-select
                size="small"
                v-model="scope.row.depotId"
                placeholder="请选择仓库"
                v-else
                @change="
                  (value, row, index) =>
                    changeWarehouse(value, scope.row, scope.$index)
                "
              >
                <el-option
                  v-for="item in scope.row.warehouseOptions"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="库存" align="center" width="120">
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>库存
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{
                scope.row.paperQuantity
              }}</span>
              <el-input
                v-else
                v-int
                @blur="
                  (value, index, number) =>
                    changeNumber(
                      scope.row.paperQuantity,
                      scope.$index,
                      scope.row.takingQuantity
                    )
                "
                size="small"
                v-model="scope.row.paperQuantity"
                :disabled="type !== 'add'"
                placeholder="请输入"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="调整后数量" align="center" width="120">
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>调整后数量
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{
                scope.row.takingQuantity
              }}</span>
              <el-input
                v-else
                @blur="
                  (value, index, number) =>
                    changeNumber(
                      scope.row.paperQuantity,
                      scope.$index,
                      scope.row.takingQuantity
                    )
                "
                size="small"
                v-model="scope.row.takingQuantity"
                placeholder="请输入"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="盈亏数量"
            align="center"
            width="120"
            prop="profitLossQuantity"
          >
          </el-table-column>
          <el-table-column
            label="单价"
            align="center"
            width="120"
            prop="unitPrice"
          >
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>单价
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.unitPrice }}</span>
              <el-input
                v-else
                size="small"
                v-model="scope.row.unitPrice"
                @change="
                  (value, index, number) =>
                    changeUnitPrice(
                      scope.row.profitLossQuantity,
                      scope.$index,
                      scope.row.unitPrice
                    )
                "
                placeholder="请输入"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="盈亏总金额"
            align="center"
            prop="unitTotalPrice"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.unitPrice">
                {{
                  (scope.row.unitTotalPrice =
                    scope.row.unitPrice * scope.row.profitLossQuantity)
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="120px" align="center">
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.remark }}</span>
              <el-input
                v-else
                size="small"
                v-model="scope.row.remark"
                placeholder="请输入备注"
              >
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-form-item label="备注:" prop="">
        <span v-if="type === 'detail'">{{
          adjustmentForm.stockTaking.remark
        }}</span>
        <el-input
          v-else
          size="small"
          v-model="adjustmentForm.stockTaking.remark"
          placeholder="请输入备注"
        >
        </el-input>
      </el-form-item>
      <el-row>
        <el-row>
          <div class="title">更多信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="制单人:">
            <span v-if="type === 'detail'">{{
              adjustmentForm.stockTaking.createUserName
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="adjustmentForm.stockTaking.createUserName"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="审核日期:" v-if="type === 'detail'">
            <span v-if="type === 'detail'">{{
              adjustmentForm.stockTaking.checkTime
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="adjustmentForm.stockTaking.checkTime"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核人:" v-if="type === 'detail'">
            <span v-if="type === 'detail'">{{
              adjustmentForm.stockTaking.checkPerson
            }}</span>
            <el-input
              v-else
              size="small"
              :disabled="true"
              v-model="adjustmentForm.stockTaking.checkPerson"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer">
      <el-button v-if="!examine" size="small" @click="cancel">取消</el-button>
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveAdjustment"
        :loading="requesting"
        >保存</el-button
      >
    </el-row>
    <select-add
      label="单据类型"
      code="receipts_type_name"
      :selectAddDialogVisible="selectAddDialogVisible"
      @transmitSelectAdd="transmitSelectAdd"
    >
    </select-add>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="经手人"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
    <!-- 选择产品编号 -->
    <el-dialog append-to-body :visible.sync="productDialogVisible" width="80%">
      <product-select
        :checkData="adjustmentForm.stockTakingItems"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      >
      </product-select>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  addEditAdjustment,
  detailsAdjustment,
} from "@/api/storageManage/adjustment";
import { getUserInfo } from "@/api/system/user.js";
import { getWarehouseList } from "@/api/base-data/warehouseSetup";
import { findDepotByProductId, getStock } from "@/api/common";
import { getDictionary } from "@/api/system/dictbiz";
import selectAdd from "@/components/select-add/index";
import { getDepartmentList } from "@/api/humanResources/department";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import productSelect from "@/components/productSelect";
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
    selectAdd,
    productSelect,
    dialogSelectPersonnel,
  },
  data() {
    return {
      requesting: false,
      adjustmentForm: {
        stockTaking: {
          receiptsTypeId: "1",
          receiptsTypeName: "库存调整",
        },
        stockTakingItems: [{}],
      },
      documentType: [],
      warehouseOptions: [],
      selectAddDialogVisible: false,
      rules: {
        "stockTaking.receiptsTypeId": [
          {
            required: true,
            message: "请选择单据类型",
            trigger: ["blur", "change"],
          },
        ],
      },
      productDialogVisible: false,
      deptOptions: [],
      employeeDialogVisible: false,
    };
  },
  created() {
    this.handleResources();
    if (this.type !== "add") {
      this.handleDetails();
    }
  },
  methods: {
    // 获取详情
    async handleDetails() {
      let infoId = this.data.id;
      if (this.examine) {
        infoId = this.data.stockTaking.id;
      }
      let res = await detailsAdjustment({ id: infoId });
      this.adjustmentForm = res.data.data;
      for (let item of this.adjustmentForm.stockTakingItems) {
        let res = await findDepotByProductId(item.productId);
        if (res.data.success) {
          item.warehouseOptions = res.data.data;
        }
      }
      this.$set(
        this.adjustmentForm.stockTakingItems,
        this.adjustmentForm.stockTakingItems
      );
    },
    // 获取资源
    async handleResources() {
      let res = await Promise.all([
        getDictionary({ code: "receipts_type_name" }),
        getUserInfo(),
        getDepartmentList(),
      ]);
      this.documentType = res[0].data.data;
      this.adjustmentForm.stockTaking.createUserName =
        res[1].data.data.realName;

      this.deptOptions = res[2].data.data;
    },
    //  根据产品id获取仓库
    async initWarehouse(item) {
      console.log(item);
      let res = await findDepotByProductId(item.id);
      if (res.data.success) {
        if (res.data.data.length === 0) {
          this.$message.warning(
            "此产品" + item.name + "无盘点仓库，请重新选择"
          );
        } else {
          const obj = {
            pic: item.pic,
            productCategoryId: item.productCateId,
            productId: item.id,
            productName: item.name,
            productSn: item.productSn,
            productCateName: item.productCategoryName,
            unitPrice: item.purPriceSuggest,
            model: item.model,
            unit: item.unitName,
            paperQuantity: item.stock,
            warehouseOptions: res.data.data,
          };
          this.adjustmentForm.stockTakingItems.push(obj);
          this.adjustmentForm.stockTakingItems =
            this.adjustmentForm.stockTakingItems.filter((ele) => {
              if (!ele.productSn) {
                return false;
              } else {
                return true;
              }
            });
          this.adjustmentForm.stockTakingItems.push({});
          this.adjustmentForm.stockTakingItems.pop();
        }
      }
    },
    // 新增单据类型
    async transmitSelectAdd(value) {
      if (value === "addSuccess") {
        let res = await getDictionary({ code: "receipts_type_name" });
        if (res.data.success) {
          this.documentType = res.data.data;
        }
      } else {
        this.selectAddDialogVisible = value;
      }
    },
    // 选择仓库
    changeWarehouse(value, row, index) {
      let item = row.warehouseOptions.filter((item) => {
        return item.id === value;
      });
      let a = this.adjustmentForm.stockTakingItems[index];
      a.depotName = item[0].depotName;
      console.log("1", this.adjustmentForm.stockTakingItems[index]);
      console.log("2", row);
      getStock({
        productNumber: a.productSn,
        depotId: a.depotId,
        productName: a.productName,
        productCategoryId: a.productCategoryId,
      }).then((res) => {
        this.adjustmentForm.stockTakingItems[index].paperQuantity =
          res.data.data.records[0].stock;
      });
    },
    // 取消选择产品
    handleCancel() {
      this.productDialogVisible = false;
    },
    // 选择产品
    async addProductList(list) {
      console.log(list);
      list.forEach((item, index) => {
        this.initWarehouse(item);
      });
      this.productDialogVisible = false;
    },
    // 选择单据类型
    // changeTypeClass(value) {
    //   let item = this.documentType.filter((item) => {
    //     return item.dictKey === value;
    //   });
    //   this.adjustmentForm.stockTaking.receiptsTypeName = item[0].dictValue;
    // },
    // 盈亏数量
    changeNumber(paperQuantity, index, takingQuantity) {
      if (paperQuantity && takingQuantity) {
        this.$set(
          this.adjustmentForm.stockTakingItems[index],
          "profitLossQuantity",
          Number(takingQuantity) - Number(paperQuantity)
        );
      }
    },
    // 盈亏单价
    changeUnitPrice(value, index, number) {
      if (value && number) {
        this.$set(
          this.adjustmentForm.stockTakingItems[index],
          "unitTotalPrice",
          (Number(value) * Number(number)).toFixed(2)
        );
      }
    },
    // 选择部门
    changeDept(value) {
      let item = this.deptOptions.filter((item) => {
        return item.id === value;
      });
      this.adjustmentForm.stockTaking.deptName = item[0].deptName;
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.adjustmentForm.stockTaking.handsPersonName = value.name;
        this.adjustmentForm.stockTaking.handsPersonId = value.id;
      }
      this.employeeDialogVisible = false;
    },
    // 保存
    async saveAdjustment() {
      try {
        await this.$refs.adjustmentForm.validate();
        this.adjustmentForm.stockTakingItems.forEach((item) => {
          if (!item.productSn) {
            throw "请选择产品编号";
          } else if (!item.depotId) {
            throw "请选择盘点仓库";
          } else if (!item.paperQuantity) {
            throw "请输入库存";
          } else if (!item.takingQuantity) {
            throw "请输入调整后数量";
          } else if (!item.unitPrice) {
            throw "请输入单价";
          }
        });
      } catch (error) {
        this.$message.error(error);
        return;
      }
      this.requesting = true;
      try {
        let res = await addEditAdjustment(this.adjustmentForm);
        this.requesting = false;
        if (res.data.success) {
          this.$message.success("操作成功");
          this.$router.push("/storageManage/adjustment");
        }
      } catch {
        this.requesting = false;
      }
    },
    // 添加一行
    addRow() {
      this.adjustmentForm.stockTakingItems.push({});
    },
    // 删除一行
    delRow(index) {
      this.adjustmentForm.stockTakingItems.splice(index, 1);
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-input,
.el-select {
  width: 360px;
}
.el-table {
  .el-select {
    width: 120px;
  }
  .el-input {
    width: 90px;
  }
}
.selectAdd,
.noDataSelectAdd {
  margin: 5px 0 0 20px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}
.noDataSelectAdd {
  margin: 10px 0 10px 20px;
}
</style>
