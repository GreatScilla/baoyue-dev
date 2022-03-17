// 仓库设置
<template>
  <basic-container>
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose1"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <el-form
        ref="searchForm"
        :model="searchForm"
        :label-position="labelPosition"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="仓库名称:">
          <el-input
            placeholder="请输入仓库名称"
            v-model="searchForm.depotName"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="预警类型:">
          <el-select v-model="searchForm.warnTypeId">
            <el-option
              v-for="item of warningList"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
              @click.native="searchForm.warnTypeValue = item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="是否启用:">
          <el-select v-model="searchForm.status">
            <el-option
              v-for="item of dicData2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库编码:">
          <el-input
            placeholder="请输入仓库编码"
            v-model="searchForm.code"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库类型:">
          <el-select v-model="searchForm.depotType">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存为负:">
          <el-select v-model="searchForm.isMinus">
            <el-option
              v-for="item of dicData1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
                <el-form-item label="仓库地址:">
          <el-input
            placeholder="请输入仓库地址"
            v-model="searchForm.addressName"
          ></el-input>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset('form')" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.warehouseSetup_search"
      >
        查 询
      </el-button>
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleOpenDialog('add')"
        v-if="permission.warehouseSetup_add"
      >
        新 增
      </el-button>
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleWarehouse"
        v-if="permission.warehouseSetup_delete"
      >
        批量删除
      </el-button>
      <!-- <el-button size="small" icon="el-icon-check" type="success" plain @click="enable" v-if="permission.warehouseSetup_enable">
        启用/停用
      </el-button> -->
    </el-row>
    <el-divider></el-divider>
    <!-- 搜索表单 -->
    <!-- <el-form
      :inline="true"
    >
      <el-form-item  label="仓库名称:">
        <el-input
          size="small"
          v-model="searchParams"
          placeholder="请输入仓库名称">
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:20px;margin-top:-1px">
        <el-button size="small" type="primary" @click="searchWarehouse">查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="handleOpenDialog('add')">新增</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleWarehouse">删除</el-button>
      <el-button size="small" type="success" plain @click="enable">启用/停用</el-button>
    </el-row> -->
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="warehouseTableData"
      border
    >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            class="switch"
            v-model="scope.row.status"
            inactive-color="#FF4949"
            :active-value="1"
            :inactive-value="2"
            @change="
              (value) => {
                handleSwitchChangeStatus(value, scope.row);
              }
            "
          >
          </el-switch>
          <!-- <span :class="[scope.row.status === 1 ? 'enableColor' : 'outColor']">
            {{scope.row.status | status}}
          </span> -->
        </template>
      </el-table-column>
      <el-table-column prop="depotName" label="仓库名称"> </el-table-column>
      <el-table-column prop="code" label="仓库编号"> </el-table-column>
      <el-table-column prop="depotType" label="仓库类型"></el-table-column>
      <!-- <el-table-column label="库存允许为负">
        <template slot-scope="scope">
          <el-switch
            class="switch"
            v-model="scope.row.isMinus"
            inactive-color="#FF4949"
            :active-value="1"
            :inactive-value="2"
            @change="((value)=>{handleSwitchChange(value,scope.row)})">
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column label="仓库地址" width="300">
        <template slot-scope="scope">
          {{ scope.row.addressName + scope.row.address }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="是否默认">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.isDefault | isDefault }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column width="150" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-edit-outline"
              @click="handleOpenDialog('edit', scope.row)"
              v-if="permission.warehouseSetup_edit"
            >
            </el-button>
          </el-tooltip>
          <!-- <el-divider direction="vertical"></el-divider>
          <el-tooltip class="item" effect="dark" content="详情" placement="bottom">
            <el-button type="text" size="small" icon="el-icon-tickets" @click="handleOpenDialog('details', scope.row)" ></el-button>
          </el-tooltip> -->
          <el-divider
            direction="vertical"
            v-if="
              permission.warehouseSetup_edit && permission.warehouseSetup_delete
            "
          ></el-divider>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-delete"
              @click="handleWarehouse(scope.row)"
              v-if="permission.warehouseSetup_delete"
            >
            </el-button>
          </el-tooltip>
          <!-- <el-button type="text" size="small" @click="setAsDefault(scope.row)" v-if="scope.row.isDefault === 2" >
            设为默认
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-row>
    <!-- 查询 -->
    <!-- <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    >
    </search> -->
    <!-- 仓库设置新增/编辑 -->
    <el-dialog
      :title="operationState === 'edit' ? '仓库设置-编辑' : '仓库设置-新增'"
      append-to-body
      width="80%"
      :visible.sync="warehouseDialogVisible"
      :before-close="handleClose"
    >
      <el-form
        :model="warehouseForm"
        label-position="right"
        label-width="100px"
        :rules="rules"
        :inline-message="true"
        ref="warehouseForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              required
              label="仓库编号:"
              prop="code"
              v-if="warehouseForm.code"
            >
              <el-input
                size="small"
                :disabled="true"
                v-model="warehouseForm.code"
              >
              </el-input>
            </el-form-item>
            <el-form-item required label="仓库名称:" prop="depotName">
              <el-input
                size="small"
                v-model="warehouseForm.depotName"
                placeholder="请输入仓库名称"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="仓库类型:" prop="depotTypeId">
              <el-select
                v-model="warehouseForm.depotTypeId"
                size="small"
                @change="handleDepotTypeChange"
                placeholder="请选择仓库类型"
              >
                <el-option
                  v-for="item in warehouseOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
                <div :slot="warehouseOptions.length > 0 ? null : 'empty'">
                  <div
                    :class="[
                      warehouseOptions.length > 0
                        ? 'selectAdd'
                        : 'noDataSelectAdd',
                    ]"
                    @click="selectAddDialogVisible = true"
                  >
                    <i class="el-icon-plus"></i>
                    新增仓库类型
                  </div>
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:" prop="phone">
              <el-input
                size="small"
                v-model="warehouseForm.phone"
                placeholder="请输入联系电话"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="负责人:" prop="principalName">
              <el-input
                size="small"
                v-model="warehouseForm.principalName"
                placeholder="请输入负责人"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="warehouseForm.depotTypeId == '2'">
          <el-col :span="12">
            <el-form-item label="回炉体积:" prop="returnVolume">
              <el-input
                size="small"
                v-model="warehouseForm.returnVolume"
                placeholder="请输入回炉体积"
              >
              </el-input>
              方
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回炉时间:" prop="returnDate">
              <el-input
                size="small"
                v-model="warehouseForm.returnDate"
                placeholder="请输入回炉时间"
              >
              </el-input>
              天
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-form-item label="仓库地址:" prop="addressId">
            <el-cascader
              size="small"
              :options="options_"
              v-model="warehouseForm.addressId"
              @change="handleChange"
              clearable
              ref="address"
              placeholder="请选择仓库地址"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item prop="address" class="address-item">
            <el-input
              style="width: 380px; margin-left: 10px"
              size="small"
              v-model="warehouseForm.address"
              placeholder="详细地址"
            >
            </el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="备注" prop="remark" style="margin-top: 4px">
          <el-input
            type="textarea"
            size="small"
            v-model="warehouseForm.remark"
            placeholder="请输入备注"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()" size="small"> 取 消 </el-button>
        <el-button
          type="primary"
          size="small"
          @click="confimWarehouseDialogVisible"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 新增仓库类型 -->
    <select-add
      label="仓库类型"
      code="depot_type"
      :selectAddDialogVisible="selectAddDialogVisible"
      @transmitSelectAdd="transmitSelectAdd"
    >
    </select-add>
  </basic-container>
</template>

<script>
import {
  getWarehousePage,
  delWarehouse,
  detailsWarehouseList,
  addeditWarehouse,
  onOffWarehouse,
  setDefaultWarehouse,
  setIsMinusWarehouse,
} from "@/api/base-data/warehouseSetup";
import paginationMixin from "@/mixins/pagination";
import { getDictionary } from "@/api/system/dictbiz";
import { regionData } from "element-china-area-data";
import selectAdd from "@/components/select-add/index";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  components: {
    selectAdd,
  },
  data() {
    return {
      searchForm: {},
      dicData2: [
        {
          label: "启用",
          value: 1,
        },
        {
          label: "停用",
          value: 2,
        },
      ],
      dicData1: [
        {
          label: "允许",
          value: 1,
        },
        {
          label: "不允许",
          value: 2,
        },
      ],
      searchParams: "",
      warehouseForm: {
        addressId: ["430000", "430100", "430112"],
        addressName: "湖南省,长沙市,望城区",
      },
      warehouseTableData: [],
      warehouseDialogVisible: false,
      selectAddDialogVisible: false,
      options_: regionData,
      operationState: "",
      ids: [],
      selectAddForm: {},
      warehouseOptions: [],
      rules: {
        depotName: [
          {
            required: true,
            message: "请输入仓库名称",
            trigger: ["blur", "change"],
          },
        ],
      },
      searchDialogVisible: false,
      column: [
        {
          label: "仓库名称",
          prop: "depotName",
        },
        {
          label: "启用状态",
          prop: "status",
          type: "select",
          dicData: [
            {
              label: "启用",
              value: 1,
            },
            {
              label: "停用",
              value: 2,
            },
          ],
        },
        {
          label: "仓库编码",
          prop: "code",
        },
        {
          label: "仓库类型",
          prop: "depotType",
          type: "select",
          dicData: [],
        },
        {
          label: "库存为负",
          prop: "isMinus",
          type: "select",
          dicData: [
            {
              label: "允许",
              value: 1,
            },
            {
              label: "不允许",
              value: 2,
            },
          ],
        },
        {
          label: "仓库地址",
          prop: "addressName",
        },
      ],
    };
  },
  created() {
    console.log(this.column);
    this.handleList();
    this.handleResources();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    // 搜素
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    // 获取列表
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await getWarehousePage(params);
      this.warehouseTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 获取出入库类别
    async handleResources() {
      let res = await Promise.all([getDictionary({ code: "depot_type" })]);
      res[0].data.data.forEach((item) => {
        this.column[3].dicData.push({
          label: item.dictValue,
          value: item.dictValue,
        });
      });
      this.warehouseOptions = res[0].data.data;
    },
    // 子组件传递
    async transmitSelectAdd(value) {
      if (value === "addSuccess") {
        let res = await getDictionary({ code: "depot_type" });
        if (res.data.success) {
          this.warehouseOptions = res.data.data;
        }
      } else {
        this.selectAddDialogVisible = value;
      }
    },
    // 新增编辑
    async handleOpenDialog(operationState, row) {
      this.warehouseDialogVisible = true;
      this.operationState = operationState;
      if (this.operationState !== "add") {
        let res = await detailsWarehouseList({ id: row.id });
        this.$nextTick(() => {
          this.warehouseForm = res.data.data;
          this.warehouseForm.addressId =
            this.warehouseForm.addressId.split(",");
        });
      } else {
        this.warehouseForm = {
          addressId: ["430000", "430100", "430112"],
          addressName: "湖南省,长沙市,望城区",
        };
      }
    },
    // 确认新增编辑
    async confimWarehouseDialogVisible() {
      try {
        await this.$refs.warehouseForm.validate();
      } catch (error) {
        return;
      }
      if (typeof this.warehouseForm.addressId === "object") {
        this.warehouseForm.addressId = this.warehouseForm.addressId.toString();
      }
      let res = await addeditWarehouse(this.warehouseForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.closeInitDialog();
        this.handleList();
      } else {
        this.$message.success("操作失败");
      }
    },
    // 选择地址
    handleChange(value) {
      if (value && value.length > 0) {
        this.warehouseForm.addressId = value.toString();
        this.warehouseForm.addressName = this.$refs["address"]
          .getCheckedNodes()[0]
          .pathLabels.toString();
      } else {
        this.warehouseForm.addressName = "";
      }
    },
    // 选择仓库类型
    handleDepotTypeChange(value) {
      if (this.warehouseForm.depotTypeId !== "2") {
        this.warehouseForm.returnDate = "";
        this.warehouseForm.returnVolume = "";
      }
      let item = this.warehouseOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.warehouseForm.depotType = item[0].dictValue;
    },
    // 选择表格
    handleSelectionChange(value) {
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    // 更改状态
    async handleSwitchChangeStatus(value, row) {
      if (value === 1) {
        row.status = 2;
      } else {
        row.status = 1;
      }
      let res = await onOffWarehouse({ ids: row.id });
      if (res.data.success) {
        this.$message.success("操作成功");
        this.handleList();
      }
    },
    // 设置仓库是否允许为负数
    async handleSwitchChange(value, row) {
      if (value === 1) {
        row.isMinus = 2;
      } else {
        row.isMinus = 1;
      }
      let res = await setIsMinusWarehouse({ id: row.id });
      if (res.data.success) {
        this.$message.success("操作成功");
        this.handleList();
      }
    },
    // 删除仓库
    async handleWarehouse(row) {
      let ids;
      if (row.id) {
        ids = row.id;
      } else {
        if (this.ids.length <= 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        ids = this.ids;
      }
      try {
        await this.$confirm("确定要删除该仓库吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delWarehouse({ ids: ids });
        if (res.data.success) {
          this.handleList();
          this.$message.success("操作成功");
        }
      } catch (error) {
        this.$message.info("已取消删除");
      }
    },
    // 启用
    async enable() {
      if (this.ids.length <= 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      try {
        await this.$confirm("确定要启用/停用该仓库吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await onOffWarehouse({ ids: this.ids });
        if (res.data.success) {
          this.$message.success("操作成功");
          this.handleList();
        }
      } catch (error) {
        console.error(error);
        this.$message.info("已取消");
      }
    },
    // 设置默认仓库
    async setAsDefault(row) {
      let res = await setDefaultWarehouse({ id: row.id });
      if (res.data.success) {
        this.$message.success("操作成功");
        this.handleList();
      }
    },
    // 查询
    onSearch(value) {
      this.searchForm.addressName = value.addressName;
      if (value) {
        this.handleList({
          depotName: value.depotName,
          status: value.status,
          code: value.code,
          depotType: value.depotType,
          isMinus: value.isMinus,
          current: 1,
          addressName: value.addressName,
        });
      }
      this.searchDialogVisible = false;
    },
    // 搜索
    searchWarehouse() {
      if (this.searchParams) {
        this.handleList({ depotName: this.searchParams, current: 1 });
      }
    },
    // 取消
    cancel() {
      this.closeInitDialog();
    },
    // 关闭
    handleClose1() {
      this.searchDialogVisible = false;
    },
    // 关闭
    handleClose() {
      // this.searchDialogVisible = false;
      this.closeInitDialog();
    },
    handleCloseWarehouseType() {
      this.closeInitDialog();
    },
    // 表单初始
    closeInitDialog() {
      this.$refs.warehouseForm.resetFields();
      this.warehouseForm.code = "";
      this.warehouseDialogVisible = false;
    },
  },
  filters: {
    status: function (value) {
      if (value === 1) {
        value = "启用";
      } else if (value === 2) {
        value = "停用";
      }
      return value;
    },
    isDefault: function (value) {
      if (value === 1) {
        value = "是";
      } else if (value === 2) {
        value = "否";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 0;
}
.el-dialog__body {
  .el-input,
  .el-select,
  .el-cascader,
  .el-textarea {
    width: 360px;
  }
}
.enableColor {
  color: #13ce66;
}
.outColor {
  color: #ff4949;
}
/deep/ .address-item {
  .el-form-item__content {
    margin-left: 0 !important;
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