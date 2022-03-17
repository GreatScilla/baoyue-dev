// 储位定义
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        v-if="permission.storageLocation_search"
      >
        查 询
      </el-button>
      <el-button
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleOpenDialog('add')"
        v-if="permission.storageLocation_add"
      >
        新 增
      </el-button>
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelStorage"
        v-if="permission.storageLocation_delete"
      >
        批量删除
      </el-button>
      <el-button
        size="small"
        icon="el-icon-check"
        type="success"
        plain
        @click="enable"
        v-if="permission.storageLocation_enable"
      >
        启用/停用
      </el-button>
    </el-row>
    <el-divider></el-divider>
    <!-- 搜索表单 -->
    <!-- <el-form
      :inline="true"
      :model="storageLocationSearchForm"
      ref="refWorkOrder"
    >
      <el-form-item label-width="73px" label="仓库名称:">
        <el-select v-model="storageLocationSearchForm.depotId" clearable size="small">
          <el-option
            v-for="item in warehouseOptions"
            :key="item.id"
            :label="item.depotName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="100px" label="库位编码:">
        <el-input
          size="small"
          v-model="storageLocationSearchForm.code"
          placeholder="请输入库位编码">
        </el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="库位名称:">
        <el-input
          size="small"
          v-model="storageLocationSearchForm.barcode"
          placeholder="请输入库位名称">
        </el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="库位类型:">
          <el-select v-model="storageLocationSearchForm.depotType" clearable size="small">
            <el-option
              v-for="item in locationTypeOptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:20px;margin-top:-1px">
          <el-button size="small" type="primary" @click="searchStorageLocation">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-plus" type="primary" @click="handleOpenDialog('add')">新增</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelStorage">删除</el-button>
      <el-button size="small" type="success" plain @click="enable">启用/停用</el-button>
    </el-row> -->
    <!-- 表格table -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="storageLocationTableData"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | status }}
        </template>
      </el-table-column>
      <el-table-column prop="depotName" label="仓库名称"> </el-table-column>
      <el-table-column prop="depotId" label="仓库编码"> </el-table-column>
      <el-table-column prop="barcode" label="库位名称"> </el-table-column>
      <el-table-column prop="depotTypeName" label="库位类型"></el-table-column>
      <el-table-column
        prop="placePropertyName"
        label="库位属性"
      ></el-table-column>
      <el-table-column prop="productPropertyName" label="产品属性">
      </el-table-column>
      <el-table-column prop="onOrder" label="上架次序"> </el-table-column>
      <el-table-column prop="offOrder" label="取货次序"> </el-table-column>
      <el-table-column prop="customer" label="所属客户"> </el-table-column>
      <!-- <el-table-column prop="typeName" label="最大体积"> </el-table-column> -->
      <el-table-column prop="maxWeight" label="最大重量"> </el-table-column>
      <el-table-column prop="maxTray" label="最大托盘"> </el-table-column>
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
              v-if="permission.storageLocation_edit"
            >
            </el-button>
          </el-tooltip>
          <el-divider direction="vertical"></el-divider>
          <el-tooltip
            class="item"
            effect="dark"
            content="详情"
            placement="bottom"
          >
            <el-button
              type="text"
              size="small"
              icon="el-icon-tickets"
              @click="handleOpenDialog('details', scope.row)"
              v-if="permission.storageLocation_details"
            >
            </el-button>
          </el-tooltip>
          <el-divider direction="vertical"></el-divider>
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
              @click="handleDelStorage(scope.row)"
              v-if="permission.storageLocation_delete"
            >
            </el-button>
          </el-tooltip>
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
    <!-- 储位设置新增/编辑 -->
    <el-dialog
      :title="elDialogTitle"
      append-to-body
      width="80%"
      :visible.sync="storageLocationDialogVisible"
      :before-close="handleClose"
    >
      <el-form
        :model="storageLocationForm"
        label-position="right"
        label-width="100px"
        ref="storageLocationForm"
        :inline-message="true"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item required label="仓库:" prop="depotId">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.depotName
              }}</span>
              <el-select
                v-model="storageLocationForm.depotId"
                size="small"
                @change="changeDepot"
                v-else
              >
                <el-option
                  v-for="item in warehouseOptions"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              required
              label="库位编码:"
              prop="code"
              v-if="storageLocationForm.code"
            >
              <span v-if="operationState === 'details'">{{
                storageLocationForm.code
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="storageLocationForm.code"
                placeholder="请输入库位编码"
              >
              </el-input>
            </el-form-item>
            <el-form-item required label="库位类型:" prop="depotType">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.depotTypeName
              }}</span>
              <el-select
                v-model="storageLocationForm.depotType"
                size="small"
                @change="changeDepotType"
                v-else
              >
                <el-option
                  v-for="item in locationTypeOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
                <div :slot="locationTypeOptions.length > 0 ? null : 'empty'">
                  <div
                    :class="[
                      locationTypeOptions.length > 0
                        ? 'selectAdd'
                        : 'noDataSelectAdd',
                    ]"
                    @click="addDepotType"
                  >
                    <i class="el-icon-plus"></i>
                    新增库位类型
                  </div>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="产品分类:">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.productPropertyName
              }}</span>
              <el-select
                v-model="storageLocationForm.productPropertyName"
                placeholder="请选择产品分类"
                size="small"
                v-else
              >
                <el-input
                  v-model="filterProductClassification"
                  placeholder="输入关键词进行过滤"
                  class="el-select-tree-input"
                  size="small"
                ></el-input>
                <el-option class="el-select-tree-option">
                  <el-tree
                    :data="productClassification"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    ref="productClassificationTree"
                  ></el-tree>
                </el-option>
              </el-select>
              <!-- <el-select v-model="value" size="small">
                <el-option
                  v-for="item in productClassification"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item required label="取货次序:" prop="offOrder">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.offOrder
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="storageLocationForm.offOrder"
                placeholder="请输入取货次序"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="最大托盘:">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.maxTray
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="storageLocationForm.maxTray"
                placeholder="请输入最大托盘"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属客户:">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.customer
              }}</span>
              <el-select
                v-model="storageLocationForm.customerId"
                size="small"
                @change="changeCustomer"
                v-else
              >
                <el-option
                  v-for="item in customerOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <!-- <el-input
                size="small"
                suffix-icon="el-icon-search"
                v-model="storageLocationForm.code"
                placeholder="请选择所属客户">
              </el-input> -->
            </el-form-item>
            <el-form-item label="库位名称:">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.barcode
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="storageLocationForm.barcode"
                placeholder="请数输入库位名称"
              >
              </el-input>
            </el-form-item>
            <el-form-item required label="库位属性:" prop="placeProperty">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.placePropertyName
              }}</span>
              <el-select
                v-model="storageLocationForm.placeProperty"
                size="small"
                @change="changePlaceProperty"
                v-else
              >
                <el-option
                  v-for="item in locationPropertiesOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
                <div
                  :slot="locationPropertiesOptions.length > 0 ? null : 'empty'"
                >
                  <div
                    :class="[
                      locationPropertiesOptions.length > 0
                        ? 'selectAdd'
                        : 'noDataSelectAdd',
                    ]"
                    @click="addPlaceProperty"
                  >
                    <i class="el-icon-plus"></i>
                    新增库位属性
                  </div>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item required label="上架次序:" prop="onOrder">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.onOrder
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="storageLocationForm.onOrder"
                placeholder="请输入上架次序"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="最大重量:">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.maxWeight
              }}</span>
              <el-input
                v-else
                  
                size="small"
                v-model="storageLocationForm.maxWeight"
                placeholder="请输入最大重量"
              >
              </el-input>
              KG
            </el-form-item>
            <el-form-item label="备注:">
              <span v-if="operationState === 'details'">{{
                storageLocationForm.remark
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="storageLocationForm.remark"
                placeholder="请输入备注"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="operationState !== 'details'"
      >
        <el-button @click="cancel" size="small"> 取 消 </el-button>
        <el-button
          type="primary"
          size="small"
          @click="confimStorageLocationDialogVisible"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 新增库位类型 -->
    <select-add
      :label="addType === 'place_property' ? '库位属性' : '库位类型'"
      :code="addType === 'place_property' ? 'place_property' : 'location_type'"
      :selectAddDialogVisible="selectAddDialogVisible"
      @transmitSelectAdd="transmitSelectAdd"
    >
    </select-add>
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
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="状态">
          <el-select
            size="small"
            v-model="searchForm.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库名称">
          <el-select
            size="small"
            v-model="searchForm.depotId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in warehouseOptions"
              :key="item.id"
              :label="item.depotName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位编码">
          <el-input
            placeholder="请输入库位编码"
            v-model="searchForm.code"
          ></el-input>
        </el-form-item>
        <el-form-item label="库位类型">
          <el-select
            size="small"
            v-model="searchForm.depotType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in locationTypeOptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位属性">
          <el-select
            size="small"
            v-model="searchForm.placeProperty"
            placeholder="请选择"
          >
            <el-option
              v-for="item in locationPropertiesOptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品分类">
          <el-select
            size="small"
            v-model="searchForm.productPropertyName"
            placeholder="请选择"
          >
            <el-option class="el-select-tree-option">
              <el-tree
                :data="productClassification"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
                ref="productClassificationTree"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属客户">
          <el-input
            placeholder="请输入所属客户"
            v-model="searchForm.customer"
          ></el-input>
        </el-form-item>
        <el-form-item label="最大重量">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.maxWeightType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="searchForm.maxWeight"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="最大托盘">
          <div class="allNum">
            <el-select
              size="small"
              v-model="searchForm.maxTrayType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="searchForm.maxTray"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getStoragePage,
  addEditStorage,
  detailsStorage,
  delStorage,
  enableStorage,
  addLocationTypeAttribute,
} from "@/api/base-data/definitionOfStorageLocation";
import { getWarehouseList } from "@/api/base-data/warehouseSetup";
import { getProductCates } from "@/api/product/pruduct-categroy";
import { getContactUnitList } from "@/api/base-data/contactUnit";
import { getDictionary } from "@/api/system/dictbiz";
import paginationMixin from "@/mixins/pagination";
import selectAdd from "@/components/select-add/index";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin],
  components: {
    selectAdd,
  },
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      statusOptions: [
        { value: 1, label: "启用" },
        { value: 2, label: "停用" },
      ],
      searchForm: {},
      storageLocationSearchForm: {},
      storageLocationForm: {
        productPropertyName: "",
      },
      storageLocationTableData: [],
      warehouseOptions: [],
      customerOptions: [],
      locationTypeOptions: [],
      locationPropertiesOptions: [],
      ids: [],
      operationState: "",
      productClassification: [],
      filterProductClassification: "",
      productCategoryName: "",
      addType: "",
      defaultProps: {
        label: "cateName",
        children: "productCateList",
      },
      storageLocationDialogVisible: false,
      selectAddDialogVisible: false,
      rules: {
        code: [
          {
            required: true,
            message: "请输入库位编码",
            trigger: ["blur", "change"],
          },
        ],
        depotId: [
          {
            required: true,
            message: "请选择仓库",
            trigger: ["blur", "change"],
          },
        ],
        depotType: [
          {
            required: true,
            message: "请选择库位类型",
            trigger: ["blur", "change"],
          },
        ],
        placeProperty: [
          {
            required: true,
            message: "请选择库位属性",
            trigger: ["blur", "change"],
          },
        ],
        onOrder: [
          {
            required: true,
            message: "请输入上架次序",
            trigger: ["blur", "change"],
          },
        ],
        offOrder: [
          {
            required: true,
            message: "请输入取货次序",
            trigger: ["blur", "change"],
          },
        ],
      },
      searchDialogVisible: false,
      column: [
        {
          label: "仓库名称",
          prop: "depotId",
          type: "select",
          dicData: [],
          props: {
            label: "depotName",
            value: "id",
          },
        },
        {
          label: "库位编码",
          prop: "code",
        },
        {
          label: "库位名称",
          prop: "barcode",
        },
        {
          label: "库位类型",
          prop: "depotType",
          type: "select",
          dicData: [],
          props: {
            label: "dictValue",
            value: "dictKey",
          },
        },
        {
          label: "最大重量范围",
          prop: "maxWeightType",
          type: "select",
          dicData: [
            { code: 1, name: "大于" },
            { code: 2, name: "等于" },
            { code: 3, name: "小于" },
            { code: 4, name: "大于等于" },
            { code: 5, name: "小于等于" },
          ],
          props: {
            label: "name",
            value: "code",
          },
        },
        {
          label: "最大重量",
          prop: "maxWeight",
        },
      ],
    };
  },
  created() {
    this.handleList();
    this.initResources();
    this.initLocationTypeAttribute();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    elDialogTitle: function () {
      switch (this.operationState) {
        case "add":
          return "储位定义-新增";
          break;
        case "edit":
          return "储位定义-编辑";
          break;
        case "details":
          return "储位定义-详情";
          break;
      }
    },
  },
  watch: {
    filterProductClassification(val) {
      this.$refs.productClassificationTree.filter(val);
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
  },
  methods: {
    handleClose1(){
      this.searchDialogVisible = false
    },
    // 获取仓库/产品/客户
    async initResources() {
      let res = await Promise.all([
        getWarehouseList(),
        getProductCates(),
        getContactUnitList({ category: 2 }),
      ]);
      this.warehouseOptions = res[0].data.data;

      // 查询仓库名称下拉框
      let options = this.findObject(this.column, "depotId");
      options.dicData = this.warehouseOptions;

      this.productClassification = res[1].data.data;
      this.customerOptions = res[2].data.data;
    },
    // 获取库位类型/库位属性
    async initLocationTypeAttribute() {
      let res = await Promise.all([
        getDictionary({ code: "location_type" }),
        getDictionary({ code: "place_property" }),
      ]);
      this.locationTypeOptions = res[0].data.data;

      // 查询库位类型下拉框
      let options = this.findObject(this.column, "depotType");
      options.dicData = this.locationTypeOptions;

      this.locationPropertiesOptions = res[1].data.data;
    },
    // 子组件传递
    async transmitSelectAdd(value) {
      if (value === "addSuccess") {
        let res = await Promise.all([
          getDictionary({ code: "location_type" }),
          getDictionary({ code: "place_property" }),
        ]);
        this.locationTypeOptions = res[0].data.data;
        this.locationPropertiesOptions = res[1].data.data;
      } else {
        this.selectAddDialogVisible = value;
      }
    },
    // 点击库位属性
    addDepotType() {
      this.addType = "location_type";
      this.selectAddDialogVisible = true;
    },
    // 点击库位属性
    addPlaceProperty() {
      this.addType = "place_property";
      this.selectAddDialogVisible = true;
    },
    // 选择仓库
    changeDepot(value) {
      let item = this.warehouseOptions.filter((item) => {
        return item.id === value;
      });
      this.storageLocationForm.depotName = item[0].depotName;
    },
    // 选择客户
    changeCustomer(value) {
      let item = this.customerOptions.filter((item) => {
        return item.id === value;
      });
      this.storageLocationForm.customer = item[0].name;
    },
    // 选择库位类型
    changeDepotType(value) {
      let item = this.locationTypeOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.storageLocationForm.depotTypeName = item[0].dictValue;
    },
    // 选择库位属性
    changePlaceProperty(value) {
      let item = this.locationPropertiesOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.storageLocationForm.placePropertyName = item[0].dictValue;
    },
    // 选择产品
    handleNodeClick(value) {
      this.searchForm.productPropertyName = value.cateName;
      this.storageLocationForm.productPropertyName = value.cateName;
      this.searchForm.productProperty = value.id;
      this.storageLocationForm.productProperty = value.id;
    },
    // 过滤树状结构
    filterNode(value, data) {
      if (!value) return true;
      return data.cateName.indexOf(value) !== -1;
    },
    // 工单状态
    initWorkOrderState() {
      getWorkOrderState()
        .then((res) => {
          this.workOrder = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 分页查询储位
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await getStoragePage(params);
      this.storageLocationTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // 打开对话框
    async handleOpenDialog(operationState, row) {
      this.storageLocationDialogVisible = true;
      this.operationState = operationState;
      if (this.operationState !== "add") {
        let res = await detailsStorage({ id: row.id });
        this.$nextTick(() => {
          this.storageLocationForm = res.data.data;
        });
      } else {
        this.storageLocationForm = {
          productPropertyName: "",
        };
      }
    },
    // 新增修改
    async confimStorageLocationDialogVisible() {
      try {
        await this.$refs.storageLocationForm.validate();
      } catch (error) {
        return;
      }
      let res = await addEditStorage(this.storageLocationForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.closeInitDialog();
        this.handleList();
      } else {
        this.$message.success("操作失败");
      }
    },
    // 多行删除
    async handleDelStorage(row) {
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
        await this.$confirm("确定要删除该储位吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await delStorage({ ids: ids });
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
        await this.$confirm("确定要启用/停用该库位吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let res = await enableStorage({ ids: this.ids });
        if (res.data.success) {
          this.$message.success("操作成功");
          this.handleList();
        }
      } catch (error) {
        console.error(error);
        this.$message.info("已取消");
      }
    },
    // 取消
    cancel() {
      this.closeInitDialog();
    },
    // 关闭
    handleClose() {
      this.closeInitDialog();
    },
    // 表单初始
    closeInitDialog() {
      this.$refs.storageLocationForm.resetFields();
      this.storageLocationDialogVisible = false;
    },
    // 表格多选
    handleSelectionChange(value) {
      this.ids = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = this.ids.join();
      }
    },
    // 搜索
    searchRole() {
      if (this.searchForm.maxWeightType && !this.searchForm.maxWeight) {
        return this.$message.warning("请输入最大重量");
      }
      if (this.searchForm.maxWeight && !this.searchForm.maxWeightType) {
        return this.$message.warning("请选择最大重量范围");
      }
      if (this.searchForm.maxTrayType && !this.searchForm.maxTray) {
        return this.$message.warning("请输入最大托盘");
      }
      if (this.searchForm.maxTray && !this.searchForm.maxTrayType) {
        return this.$message.warning("请选择最大托盘范围");
      }
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
      // this.searchDialogVisible = false;
    },
    // // 查询
    // onSearch(value) {
    //   // if (value.maxWeightType && !value.maxWeight) {
    //   //   return this.$message.warning("请输入最大重量");
    //   // }
    //   // if (value.maxWeight && !value.maxWeightType) {
    //   //   return this.$message.warning("请选择最大重量范围");
    //   // }
    //   this.handleList(value);
    //   this.searchDialogVisible = false;
    // },
    // 搜索
    searchStorageLocation() {
      this.handleList(this.storageLocationSearchForm);
    },
    // // 重置
    // reset() {
    //   this.storageLocationSearchForm = {};
    //   this.handleList();
    // },
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 360px;
}
.el-dialog__body {
  .el-input,
  .el-select {
    width: 360px;
  }
}
.el-date-editor {
  width: 190px;
}
.el-select-dropdown__item.hover {
  background-color: #fff;
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
.allNum {
  display: flex;
  /deep/.el-input {
    width: 100px !important;
  }
  /deep/.el-select {
    width: 100px !important;
  }
}
</style>