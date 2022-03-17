
<template>
  <basic-container>
    <el-form
      :model="adjustmentForm"
      ref="adjustmentForm"
      :rules="rules"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-radio-group
              :disabled="type === 'detail'"
              v-model="adjustmentForm.depotHead.allotType"
              @change.native="
                changeAllotType(adjustmentForm.depotHead.allotType)
              "
            >
              <el-radio :label="1">库内调拨</el-radio>
              <el-radio :label="2">库外调拨</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="单据日期:" >
            <span v-if="type === 'details'">{{adjustmentForm.depotHead.number}}</span>
            <el-input
              v-else
              size="small"
              v-model="adjustmentForm.depotHead.number"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="经手人:">
            <span v-if="type === 'details'">{{adjustmentForm.depotHead.handsPersonName}}</span>
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              size="small"
              suffix-icon="el-icon-search"
              v-model="adjustmentForm.depotHead.handsPersonName"
              placeholder="请选择经手人">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="单据编码:" prop="depotHead.typeClassId">
            <span v-if="type === 'details'">{{adjustmentForm.depotHead.number}}</span>
            <el-input
              v-else
              size="small"
              v-model="adjustmentForm.depotHead.number"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="经手部门:">
            <span v-if="type === 'details'">{{adjustmentForm.depotHead.handsDepot}}</span>
            <el-select size="small" v-model="adjustmentForm.depotHead.handsDepotId"  placeholder="请选择经手部门" v-else @change="changeDept">
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.deptName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扫码:">
            <span v-if="type === 'details'">{{adjustmentForm.depotHead.handsPersonName}}</span>
            <el-input
              v-else
              size="small"
              v-model="adjustmentForm.depotHead.handsPersonName"
              :disabled="true">
            </el-input>
          </el-form-item>-->
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="adjustmentForm.depotItems"
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
          <el-table-column label="图片" align="center" width="110">
            <template slot-scope="scope">
              <el-image
                v-if="scope.row.pic"
                style="width: 100px; height: 100px; padding-top: 5px"
                :src="scope.row.pic"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="产品编号" align="center" width="150">
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
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称"
            align="center"
            prop="productName"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="规格型号"
            align="center"
            prop="productCate"
          ></el-table-column>
          <el-table-column
            label="产品分类"
            align="center"
            prop="productCate"
          ></el-table-column>
          <el-table-column
            label="单位"
            align="center"
            prop="unit"
          ></el-table-column>
          <el-table-column label="调出仓库" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>
              {{
                adjustmentForm.depotHead.allotType === 1 ? "仓库" : "调出仓库"
              }}
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.depotName }}</span>
              <el-select
                size="small"
                v-model="scope.row.depotId"
                placeholder="请选择仓库"
                @change="changeDepot(scope.row.depotId, scope.$index)"
                v-else
              >
                <el-option
                  v-for="item in scope.row.depotProductStockList"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            v-if="adjustmentForm.depotHead.allotType === 2"
            label="调入仓库"
            align="center"
            key="anotherDepotName"
            width="150"
          >
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>
              调入仓库
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{
                scope.row.anotherDepotName
              }}</span>
              <el-select
                size="small"
                v-model="scope.row.anotherDepotId"
                placeholder="请选择仓库"
                v-else
              >
                <el-option
                  v-for="item in enterWarehouseOptions"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            key="anotherStorageCode"
            v-if="adjustmentForm.depotHead.allotType === 1"
            label="调入储位"
            align="center"
            width="135"
          >
            <template slot-scope="scope">
              <el-select
                size="small"
                v-model="scope.row.anotherStorageId"
                :disabled="type === 'detail'"
                placeholder="请选择储位"
              >
                <el-option
                  v-for="item in scope.row.storageList"
                  :key="item.id"
                  :label="item.code"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            key="storageCode"
            v-if="adjustmentForm.depotHead.allotType === 1"
            label="调出储位"
            align="center"
            width="135"
          >
            <template slot-scope="scope">
              <el-select
                size="small"
                :disabled="type === 'detail'"
                v-model="scope.row.storageId"
                placeholder="请选择储位"
              >
                <el-option
                  v-for="item in scope.row.storageList"
                  :key="item.id"
                  :label="item.code"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="现存量" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.stock }}</template>
          </el-table-column>
          <el-table-column
            label="数量"
            prop="operNumber"
            align="center"
            width="120"
          >
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>数量
            </template>
            <template min-width="100" slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.operNumber }}</span>
              <el-input-number
                v-else
                style="width:130px"
                controls-position="right"
                 @change="
                  (value, index, number) =>
                    changUnitPrice(
                      scope.row.operNumber,
                      scope.$index,
                      scope.row.unitPrice
                    )
                "
                size="small"
                v-model="scope.row.operNumber"
                placeholder="请输入"
                :min="0"
              ></el-input-number>
              <!-- <el-input
                @change="
                  (value, index, number) =>
                    changUnitPrice(
                      scope.row.operNumber,
                      scope.$index,
                      scope.row.unitPrice
                    )
                "
                size="small"
                v-model="scope.row.operNumber"
                placeholder="请输入"
              ></el-input> -->
            </template>
          </el-table-column>
          <!-- <el-table-column label="出库成本单价" align="center" width="120" prop="unitPrice">
            <template slot-scope="scope">
              <span v-if="type === 'details'">{{scope.row.unitPrice}}</span>
              <el-input
                v-else
                  
                size="small"
                v-model="scope.row.unitPrice"
                @change="(value,index,number) => changUnitPrice(value,scope.$index,scope.row.operNumber)"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="出库成本" align="center" prop="unitTotalPrice"></el-table-column>-->
        </el-table>
      </el-row>
      <el-row>
        <el-row>
          <div class="title">更多信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="100px" label="备注:" prop>
            <span v-if="type === 'detail'">{{
              adjustmentForm.depotHead.remark
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="adjustmentForm.depotHead.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label-width="100px"
        label="附件信息:"
        style="margin-bottom: 6px"
      >
        <upload-file
          :status="type"
          message
          :imageList="fileList"
          @on-success="onSuccess"
          @on-remove="onRemove"
        ></upload-file>
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer">
      <el-button  v-if="!examine" size="small" @click="$router.push('/storageManage/allocation')">取消</el-button>
      <el-button
       v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveInboundManage"
        :loading="requesting"
        >保存</el-button
      >
    </el-row>
    <select-add
      label="单据类型"
      code="in_type_class"
      :selectAddDialogVisible="selectAddDialogVisible"
      @transmitSelectAdd="transmitSelectAdd"
    ></select-add>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="经手人"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    ></dialog-select-personnel>
    <!-- 选择产品编号 -->
    <el-dialog append-to-body :visible.sync="productDialogVisible" width="80%">
      <product-select
        :checkData="adjustmentForm.depotItems"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  addEditInAndOutBoundPage,
  getProductList,
  detailsInAndOutBoundPage,
} from "@/api/storageManage/inAndOutBound";
import { findDepotByProductId, findDepotAndStorageById } from "@/api/common";
import { getUserInfo } from "@/api/system/user.js";
import { getWarehouseList } from "@/api/base-data/warehouseSetup";
import { getDictionary } from "@/api/system/dictbiz";
import selectAdd from "@/components/select-add/index";
import uploadFile from "@/components/uploadFile";
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
    uploadFile,
    productSelect,
    dialogSelectPersonnel,
  },
  data() {
    return {
      requesting: false,
      adjustmentForm: {
        depotHead: {
          allotType: 2, //调拨类型(1: 库内调拨 2：库外调拨)
          type: "调拨",
          typeClass: "库存调拨",
          files: [],
        },
        depotItems: [{}],
      },
      fileList: [],
      inAndOutBoundCategoryOptions: [],
      enterWarehouseOptions: [],
      selectAddDialogVisible: false,
      defaultProps: {
        label: "cateName",
        children: "productCateList",
      },
      rules: {
        "depotHead.outJoinTime": [
          {
            required: true,
            message: "请选择入库日期",
            trigger: ["blur", "change"],
          },
        ],
        "depotHead.typeClassId": [
          {
            required: true,
            message: "请选择入库类别",
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
    if (this.type !== "add") {
      this.adjustmentForm.depotHead = JSON.parse(JSON.stringify(this.data));
      console.log(this.data.depotItemList);
      this.data.depotItemList.forEach((res) => {
        res.depotProductStockList.forEach((info) => {
          info.id = info.depotId;
        });
      });
      this.adjustmentForm.depotItems = this.data.depotItemList;
      delete this.adjustmentForm.depotHead.depotItemList;
      this.fileList = this.data.files;
    }
    this.handleResources();
  },
  methods: {
    // 获取详情
    // async handleDetails() {
    //   let res = await detailsInAndOutBoundPage({
    //     id: this.$route.query.row.id
    //   });
    //   this.adjustmentForm = res.data.data;
    //   console.log(this.adjustmentForm);
    //   this.adjustmentForm.depotHead.files.forEach(item => {
    //     this.fileList.push({ url: item });
    //   });
    // },
    // 获取出入库类别
    async handleResources() {
      let res = await Promise.all([
        getDictionary({ code: "in_type_class" }),
        getUserInfo(),
        getWarehouseList(),
        // getDepartmentList()
      ]);
      this.inAndOutBoundCategoryOptions = res[0].data.data;
      this.adjustmentForm.depotHead.createUser = res[1].data.data.realName;
      this.enterWarehouseOptions = res[2].data.data;
      //   this.deptOptions = res[3].data.data;
    },
    // 新增入库类别传递
    async transmitSelectAdd(value) {
      if (value === "addSuccess") {
        let res = await getDictionary({ code: "in_type_class" });
        if (res.data.success) {
          this.inAndOutBoundCategoryOptions = res.data.data;
        }
      } else {
        this.selectAddDialogVisible = value;
      }
    },
    // 取消选择产品
    handleCancel() {
      this.productDialogVisible = false;
    },
    // 选择产品
    addProductList(list) {
      list.forEach((item, index) => {
        this.initWarehouse(item);
      });
      this.productDialogVisible = false;
    },
    async initWarehouse(item) {
      let res = await findDepotByProductId(item.id);
      if (res.data.success) {
        if (res.data.data.length === 0) {
          this.$message.warning(
            "此产品" + item.name + "无盘点仓库，请重新选择"
          );
        } else {
          const obj = {
            pic: item.pic,
            productId: item.id,
            productName: item.name,
            productSn: item.productSn,
            productCate: item.productCategoryName,
            productType: item.model,
            unit: item.unitName,
            depotProductStockList: res.data.data,
            storageList: [],
            stock: item.stock,
          };
          this.adjustmentForm.depotItems.push(obj);
          this.adjustmentForm.depotItems =
            this.adjustmentForm.depotItems.filter((ele) => {
              if (!ele.productSn) {
                return false;
              } else {
                return true;
              }
            });
          this.adjustmentForm.depotItems.push({});
          this.adjustmentForm.depotItems.pop();
        }
      }
    },
    // 选择出入库类别
    changeTypeClass(value) {
      let item = this.inAndOutBoundCategoryOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.adjustmentForm.depotHead.typeClass = item[0].dictValue;
    },
    // 入库成本单价
    // changUnitPrice(value, index, number) {
    //   if (value && number) {
    //     this.$set(
    //       this.adjustmentForm.depotItems[index],
    //       "unitTotalPrice",
    //       (Number(value) * Number(number)).toFixed(2)
    //     );
    //   }
    // },
    // 选择部门
    changeDept(value) {
      let item = this.deptOptions.filter((item) => {
        return item.id === value;
      });
      this.adjustmentForm.depotHead.handsDepot = item[0].deptName;
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.adjustmentForm.depotHead.handsPersonName = value.name;
        this.adjustmentForm.depotHead.handsPersonId = value.id;
      }
      this.employeeDialogVisible = false;
    },
    //选择仓库
    changeDepot(id, index) {
      findDepotAndStorageById({ id: id }).then((res) => {
        this.adjustmentForm.depotItems[index].storageList = res.data.data;
      });
    },
    // // 上传附件
    // async uploadAttachment(e) {
    //   let res = await client.put(e.file.name, e.file)
    //   if (res.res && res.res.status == 200) {
    //     this.adjustmentForm.depotHead.files.push(res.url)
    //   }
    // },
    // // 删除附件
    // handleRemove(file,fileList){
    //   console.log(file)
    //   this.adjustmentForm.depotHead.files.forEach((item,index) => {
    //     if(file.url === item){
    //       return this.adjustmentForm.depotHead.files.splice(index,1)
    //     }
    //   })
    // },
    // 附件上传
    onSuccess(value) {
      if (value) {
        this.adjustmentForm.depotHead.files.push(value);
      }
    },
    // 附件删除
    onRemove(file) {
      this.adjustmentForm.depotHead.files.forEach((item, index) => {
        if (file.url === item) {
          return this.adjustmentForm.depotHead.files.splice(index, 1);
        }
      });
    },
    // 保存
    async saveInboundManage() {
      try {
        await this.$refs.adjustmentForm.validate();
        this.adjustmentForm.depotItems.forEach((item) => {
          if (!item.productSn) {
            throw "请选择产品编号";
          } else if (!item.depotId) {
            throw "请选择入库仓库";
          } else if (!item.operNumber) {
            throw "请输入数量";
          }
        });
      } catch (error) {
        this.$message.error(error);
        return;
      }
      delete this.adjustmentForm.depotHead.file;
      console.log(this.adjustmentForm);
      this.requesting = true;
      let res = await addEditInAndOutBoundPage(this.adjustmentForm);
      this.requesting = false;
      if (res.data.success) {
        this.$message.success("操作成功");
        this.$router.push("/storageManage/allocation");
      }
    },
    // 添加一行
    addRow() {
      this.adjustmentForm.depotItems.push({});
    },
    // 删除一行
    delRow(index) {
      this.adjustmentForm.depotItems.splice(index, 1);
    },
    // 取消
    cancel() {
      this.$router.back();
    },
    changeAllotType(status) {
      if (this.type === "edit") {
        this.$confirm("此操作将清除产品信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.adjustmentForm.depotItems = [{}];
          })
          .catch(() => {
            if (status === 1) {
              this.adjustmentForm.depotHead.allotType = 2;
            } else {
              this.adjustmentForm.depotHead.allotType = 1;
            }
          });
      }
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
