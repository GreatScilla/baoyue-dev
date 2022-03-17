// 客户管理
<template>
  <basic-container>
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleCancel"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <el-form ref="searchForm" :model="searchForm" label-width="90px" class="form-footer">
        <el-row>
          <el-form-item :label="`${name}名称:`">
            <el-input
              :placeholder="`请输入${name}名称`"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="授权额度:">
            <div class="allNum">
              <el-select
                size="small"
                v-model="searchForm.authorizationLimitType"
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
                v-model="searchForm.authorizationLimit"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="联系人:">
            <el-input
              placeholder="请输入联系人"
              v-model="searchForm.linkName"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input
              placeholder="请输入联系电话"
              v-model="searchForm.mobilePhone"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系地址:">
            <el-input
              placeholder="请输入联系地址"
              v-model="searchForm.address"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select size="small" v-model="searchForm.status" placeholder="请选择">
              <el-option
                v-for="item in statusTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登记日期:">
            <el-date-picker
              @change="changeTime"
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="search-footer">
            <el-button @click="reset('form')" size="small">重置</el-button>
            <el-button type="primary" size="small" @click="searchRole"
              >查询</el-button
            >
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        v-if="
          category === 1
            ? permission.supplier_expore
            : permission.customer_expore
        "
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="
          category === 1 ? permission.supplier_add : permission.customer_add
        "
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleOpenDialog('add')"
        >新增</el-button
      >
      <el-button
        v-if="
          category === 1
            ? permission.supplier_delete
            : permission.customer_delete
        "
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-check"
        plain
        @click="handleDelete()"
        >启用</el-button
      >-->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="状态" prop="statusName" width="160px">
          <template slot-scope="{ row }">
            <span>{{ row.status | customerStatus }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="附件" prop="accessory"> </el-table-column> -->
        <el-table-column
          prop="code"
          :label="`${name}编号`"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="name"
          :label="name"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="businessScope"
          v-if="category === 1"
          label="经营范围"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="authorizationLimit"
          :label="authorizationLimit"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="单位电话"
          width="120px"
        ></el-table-column>
        <el-table-column prop="linkName" label="联系人"></el-table-column>
        <el-table-column
          prop="mobilePhone"
          label="联系人电话"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="linkAddress"
          label="单位地址"
          width="160px"
        ></el-table-column>
        <!-- <el-table-column prop="priceLevelName" label="价格级别">
        </el-table-column>-->
        <el-table-column
          prop="settlementContactUnitName"
          label="结算方式"
        ></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="discount" label="折扣率"></el-table-column>
        <el-table-column
          prop="registerDate"
          label="登记日期"
          width="120px"
        ></el-table-column>
        <el-table-column width="150" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="
                category === 1
                  ? permission.supplier_edit
                  : permission.customer_edit
              "
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
              ></el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="
                category === 1
                  ? permission.supplier_detail
                  : permission.customer_detail
              "
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
              ></el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="
                category === 1
                  ? permission.supplier_delete
                  : permission.customer_delete
              "
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
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
      ></el-pagination>
    </el-row>
    <!-- 往来单位新增 -->
    <el-dialog
      :title="elDialogTitle"
      width="80%"
      append-to-body
      :visible.sync="contactNnitDialogVisible"
      :before-close="handleClose"
    >
      <el-form
        :model="contactNnitForm"
        label-position="right"
        label-width="125px"
        :rules="rules"
        ref="contactNnitForm"
        :inline-message="true"
      >
        <el-tabs type="border-card" v-model="activeTabs">
          <el-tab-pane label="基本信息" name="基本信息">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  required
                  :label="`${name}:`"
                  prop="contactUnitBase.name"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBase.name
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBase.name"
                    :placeholder="`请输入${name}名称`"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="营业执照:"
                  prop="contactUnitBase.businessLicense"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBase.businessLicense
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBase.businessLicense"
                    placeholder="请输入营业执照"
                  ></el-input>
                </el-form-item>
                <el-form-item label="单位地址:" prop="contactUnitBase.address">
                  <el-row v-if="operationState === 'details'">
                    <span
                      >{{ contactNnitForm.contactUnitBase.addressName }}
                      {{ contactNnitForm.contactUnitBase.address }}</span
                    >
                  </el-row>
                  <el-row v-else>
                    <el-cascader
                      style="width: 160px; margin-right: 10px"
                      size="small"
                      :options="addressOptions"
                      v-model="companyAddress"
                      @change="handleChangeCompanyAddress"
                      ref="companyAddress"
                      placeholder="请选择地址"
                    ></el-cascader>
                    <el-input
                      style="width: 240px"
                      size="small"
                      v-model="contactNnitForm.contactUnitBase.address"
                      placeholder="详细地址"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <!-- <el-form-item  label="价格级别:" prop="contactUnitBase.priceLevelId">
                  <span v-if="operationState === 'details'">{{contactNnitForm.contactUnitBase.priceLevelName}}</span>
                  <el-select v-model="contactNnitForm.contactUnitBase.priceLevelId" size="small" @change="changePrice" v-else>
                    <el-option
                      v-for="item in priceLevelOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item
                  label="授权额度:"
                  prop="contactUnitBase.authorizationLimit"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBase.authorizationLimit
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBase.authorizationLimit"
                    placeholder="请输入授权额度"
                  ></el-input>
                </el-form-item>
                <el-form-item v-if="category === 1" label="供应商经营范围">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBase.businessScope
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBase.businessScope"
                    placeholder="请输入供应商经营范围"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  required
                  label="单位分类:"
                  prop="contactUnitBase.category"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBase.category | category
                  }}</span>
                  <el-select
                    v-model="contactNnitForm.contactUnitBase.category"
                    size="small"
                    v-else
                    disabled
                  >
                    <el-option
                      v-for="item in companyOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="单位电话:" prop="contactUnitBase.phone">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBase.phone
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBase.phone"
                    placeholder="请选择单位电话"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="登记日期:"
                  prop="contactUnitBase.registerDate"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBase.registerDate
                  }}</span>
                  <el-date-picker
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBase.registerDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择登记日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注:" prop="contactUnitBase.remark">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBase.remark
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBase.remark"
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label="联系人信息"
            name="联系人信息"
            class="contact_pane"
          >
            <el-form-item class="form-item-table" prop="contactUnitLinks">
              <el-table :data="contactNnitForm.contactUnitLinks">
                <el-table-column label="联系人" align="center">
                  <template slot="header" slot-scope="scope">
                    <span style="color: #f56c6c">*</span>联系人
                  </template>
                  <template slot-scope="scope">
                    <span v-if="operationState === 'details'">{{
                      scope.row.linkName
                    }}</span>
                    <el-input
                      v-else
                      class="table-input"
                      size="small"
                      v-model="scope.row.linkName"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="workshopName"
                  label="职务"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if="operationState === 'details'">{{
                      scope.row.postName
                    }}</span>
                    <el-input
                      v-else
                      class="table-input"
                      size="small"
                      :disabled="operationState === 'details' ? true : false"
                      v-model="scope.row.postName"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="materileCode"
                  label="电话"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if="operationState === 'details'">{{
                      scope.row.phone
                    }}</span>
                    <el-input
                      v-else
                      class="table-input"
                      size="small"
                      :disabled="operationState === 'details' ? true : false"
                      v-model="scope.row.phone"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="materileName"
                  label="手机"
                  align="center"
                >
                  <template slot="header" slot-scope="scope">
                    <span style="color: #f56c6c">*</span>手机
                  </template>
                  <template slot-scope="scope">
                    <span v-if="operationState === 'details'">{{
                      scope.row.mobilePhone
                    }}</span>
                    <el-input
                      v-else
                      class="table-input"
                      size="small"
                      :disabled="operationState === 'details' ? true : false"
                      v-model="scope.row.mobilePhone"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="typeName" label="email" align="center">
                  <template slot-scope="scope">
                    <span v-if="operationState === 'details'">{{
                      scope.row.email
                    }}</span>
                    <el-input
                      v-else
                      class="table-input"
                      size="small"
                      :disabled="operationState === 'details' ? true : false"
                      v-model="scope.row.email"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="typeName" label="地址" align="center">
                  <template slot="header" slot-scope="scope">
                    <span style="color: #f56c6c">*</span>地址
                  </template>
                  <template slot-scope="scope">
                    <span v-if="operationState === 'details'">{{
                      scope.row.address
                    }}</span>
                    <el-input
                      v-else
                      class="table-input"
                      size="small"
                      :disabled="operationState === 'details' ? true : false"
                      v-model="scope.row.address"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="typeName" label="备注" align="center">
                  <template slot-scope="scope">
                    <span v-if="operationState === 'details'">{{
                      scope.row.remark
                    }}</span>
                    <el-input
                      v-else
                      class="table-input"
                      size="small"
                      :disabled="operationState === 'details' ? true : false"
                      v-model="scope.row.remark"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="typeName"
                  label="是否首要"
                  align="center"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model="scope.row.isChiefly1"
                      @change="cutIsChiefly(scope.row, scope.$index)"
                      :disabled="operationState === 'details' ? true : false"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  width="130"
                  label="操作"
                  fixed="right"
                  align="center"
                  v-if="operationState !== 'details'"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      icon="el-icon-plus"
                      circle
                      @click="addContacts"
                    ></el-button>
                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      circle
                      @click="delContacts(scope.$index)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="银行信息" name="银行信息">
            <el-row>
              <el-col :span="operationState === 'details' ? 7 : 12">
                <el-form-item label="银行名称:" prop="contactUnitBank.name1">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.name1
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.name1"
                    placeholder="请输入银行名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="银行账号:" prop="contactUnitBank.account1">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.account1
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.account1"
                    placeholder="请输入银行账号"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="银行户名2:"
                  prop="contactUnitBank.familyName2"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.familyName2
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.familyName2"
                    placeholder="请输入银行户名2"
                  ></el-input>
                </el-form-item>
                <el-form-item label="开户行3:" prop="contactUnitBank.name3">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.name3
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.name3"
                    placeholder="请输入开户行3"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="银行账号3:"
                  prop="contactUnitBank.account3"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.account3
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.account3"
                    placeholder="请输入银行账号3"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="银行户名1:"
                  prop="contactUnitBank.familyName1"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.familyName1
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.familyName1"
                    placeholder="请输入银行户名1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="开户行2:" prop="contactUnitBank.name2">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.name2
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.name2"
                    placeholder="请输入开户行2"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="银行账号2:"
                  prop="contactUnitBank.account2"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.account2
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.account2"
                    placeholder="请输入银行账号2"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="银行户名3:"
                  prop="contactUnitBank.familyName3"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitBank.familyName3
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitBank.familyName3"
                    placeholder="请输入银行户名3"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="其他信息" name="其他信息">
            <el-row>
              <el-col :span="12">
                <el-form-item label="分管部门:" prop="contactUnitOther.deptId">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.deptName
                  }}</span>
                  <el-select
                    size="small"
                    v-model="contactNnitForm.contactUnitOther.deptId"
                    placeholder="请选择分管部门"
                    @change="changeDept"
                    v-else
                  >
                    <el-option
                      v-for="item in deptOptions"
                      :key="item.id"
                      :label="item.deptName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  required
                  label="结算方式:"
                  prop="contactUnitOther.settlementContactUnitId"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.settlementContactUnitName
                  }}</span>
                  <el-select
                    size="small"
                    v-model="
                      contactNnitForm.contactUnitOther.settlementContactUnitId
                    "
                    placeholder="请选择结算方式"
                    @change="changePaymentType"
                    v-else
                  >
                    <el-option
                      v-for="item in paymentOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="折扣率(%):"
                  prop="contactUnitOther.discount"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.discount
                  }}</span>
                  <el-input
                    v-else
                    v-floatTwoDecimal
                    size="small"
                    v-model="contactNnitForm.contactUnitOther.discount"
                    placeholder="请输入折扣率"
                  ></el-input>
                </el-form-item>
                <el-form-item label="寄件人:" prop="contactUnitOther.sender">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.sender
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitOther.sender"
                    placeholder="请输入寄件人"
                  ></el-input>
                </el-form-item>
                <el-form-item label="寄件地址:" prop="contactUnitOther.address">
                  <el-row v-if="operationState === 'details'">
                    <span style="margin-right: 10px">{{
                      contactNnitForm.contactUnitOther.addressName
                    }}</span>
                    <span>{{ contactNnitForm.contactUnitOther.address }}</span>
                  </el-row>
                  <el-row v-else>
                    <el-cascader
                      style="width: 160px; margin-right: 10px"
                      size="small"
                      :options="addressOptions"
                      v-model="mailAddress"
                      @change="handleChangeMailAddress"
                      ref="mailAddress"
                      placeholder="请选择地址"
                    ></el-cascader>
                    <el-input
                      style="width: 240px"
                      size="small"
                      v-model="contactNnitForm.contactUnitOther.address"
                      placeholder="详细地址"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="创建人:">
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.createUserName
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    :disabled="true"
                    v-model="contactNnitForm.contactUnitOther.createUserName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="业务员:"
                  prop="contactUnitOther.salesmanName"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.salesmanName
                  }}</span>
                  <el-input
                    v-else
                    @click.native="employeeDialogVisible = true"
                    size="small"
                    suffix-icon="el-icon-search"
                    v-model="contactNnitForm.contactUnitOther.salesmanName"
                    placeholder="请选择业务员"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  required
                  label="税率(%):"
                  prop="contactUnitOther.taxRate"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.taxRate
                  }}</span>
                  <el-input
                    v-else
                    v-floatTwoDecimal
                    size="small"
                    v-model="contactNnitForm.contactUnitOther.taxRate"
                    placeholder="请输入税率"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item  label="信用额度:" prop="contactUnitOther.lineCredit">
                  <span v-if="operationState === 'details'">{{contactNnitForm.contactUnitOther.lineCredit}}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitOther.lineCredit"
                    placeholder="请输入信用额度">
                  </el-input>
                </el-form-item>-->
                <el-form-item
                  label="寄件人电话:"
                  prop="contactUnitOther.senderPhone"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.senderPhone
                  }}</span>
                  <el-input
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitOther.senderPhone"
                    placeholder="请输入寄件人电话"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="创建日期:"
                  v-if="contactNnitForm.contactUnitOther.createTime"
                >
                  <span v-if="operationState === 'details'">{{
                    contactNnitForm.contactUnitOther.createTime
                  }}</span>
                  <el-date-picker
                    v-else
                    size="small"
                    v-model="contactNnitForm.contactUnitOther.createTime"
                    type="datetime"
                    :disabled="true"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="operationState !== 'details'"
      >
        <el-button @click="cancel" size="small">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="confimContactNnitDialogVisible()"
          :loading="requesting"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 选择业务员 -->
    <el-dialog
      title="选择业务员"
      width="60%"
      append-to-body
      :visible.sync="employeeDialogVisible"
    >
      <el-table
        highlight-current-row
        :data="employeeTableData"
        @row-click="clickRowEmployee"
      >
        <el-table-column prop="jobNumber" label="工号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="deptName" label="部门"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="employeeDialogVisible = false"
          >取 消</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="confimEmployeeDialogVisible"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { contactUnitBase, deleteApi } from "@/api/salesManage/customer";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import {
  getContactUnitPage,
  addEditContactUnit,
  detailsContactUnit,
  delContactUnit,
  enableContactUnit,
  priceLevel,
} from "@/api/base-data/contactUnit";
import { getEmployeeList } from "@/api/humanResources/employeeFile";
import { getDepartmentList } from "@/api/humanResources/department";
import { getUserInfo } from "@/api/system/user.js";
import { getPaymentTypeList } from "@/api/common.js";
import { regionData } from "element-china-area-data";
import { isMobile } from "@/util/validate";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, deleteOrAudit],
  props: {
    category: {
      // 1：供应商 2：客户
      type: Number,
      default: 2,
    },
  },
  name: "cunstomerManage",
  data() {
    return {
      date: [],
      statusTypeList: [
        { code: 1, name: "正常" },
        { code: 2, name: "停用" },
      ],
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      requesting: false,
      searchForm: {
        name: "",
      },
      tableData: [],
      multipleSelection: [],
      deleteApi: deleteApi,
      name: "客户",
      authorizationLimit: "客户授权额度",
      addressOptions: regionData,
      contactNnitSearchForm: {},
      contactNnitForm: {
        contactUnitBase: {
          category: 1,
        },
        contactUnitLinks: [
          {
            isChiefly1: false,
          },
        ],
        contactUnitBank: {},
        contactUnitOther: {
          createTime: "",
        },
      },
      companyTableData: [],
      companyOptions: [
        { value: 1, label: "供应商" },
        { value: 2, label: "客户" },
      ],
      priceLevelOptions: [],
      deptOptions: [],
      employeeTableData: [],
      companyAddress: [],
      departmentTreeData: [],
      mailAddress: [],
      rowEmployee: {},
      contactNnitDialogVisible: false,
      employeeDialogVisible: false,
      operationState: "",
      ids: [],
      paymentOptions: [],
      defaultProps: {
        label: "title",
      },
      activeTabs: "基本信息",
      rules: {
        "contactUnitBase.name": [
          {
            required: true,
            message: "请输入往来单位名称",
            trigger: ["blur", "change"],
          },
        ],
        "contactUnitOther.settlementContactUnitId": [
          {
            required: true,
            message: "请选择结算方式",
            trigger: ["blur", "change"],
          },
        ],
        "contactUnitOther.taxRate": [
          {
            required: true,
            message: "请输入税率",
            trigger: ["blur", "change"],
          },
        ],
        "contactUnitBase.authorizationLimit": [
          { required: true, message: "请输入授权额度", trigger: "blur" },
        ],
      },
      searchDialogVisible: false,
      column: [
        {
          label: "单位名称",
          prop: "name",
        },
        {
          label: "单位分类",
          type: "select",
          prop: "category",
          dicData: [],
        },
      ],
    };
  },
  created() {
    if (this.category === 1) {
      this.name = "供应商";
      this.authorizationLimit = "授权额度";
    } else {
      this.name = "客户";
      this.authorizationLimit = "客户授权额度";
    }
    this.initDeptEmployee();
    this.initSearchCondition();
  },
  async mounted() {
    this.handleList();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
    elDialogTitle: function () {
      switch (this.operationState) {
        case "add":
          return `${this.name}-新增`;
          break;
        case "edit":
          return `${this.name}-编辑`;
          break;
        case "details":
          return `${this.name}-详情`;
          break;
      }
    },
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
      this.dateValue = [];
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    changeTime(value) {
      if (value !== null) {
        this.searchForm.startDay = value[0];
        this.searchForm.endDay = value[1];
      } else {
        this.searchForm.startDay = this.searchForm.endDay = "";
      }
    },
    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      const res = await contactUnitBase(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    // async handleList() {
    //   if (this.form.authorizationLimitType && !this.form.authorizationLimit) {
    //     return this.$message.warning("请输入授权额度");
    //   }
    //   const params = {
    //     current: this.currentPage,
    //     size: this.pageSize,
    //     category: this.category,
    //     ...this.form,
    //   };
    //   const res = await contactUnitBase(params);
    //   this.tableData = res.data.data.records;
    //   this.total = res.data.data.total;
    //   this.searchDialogVisible = false;
    // },
    handleReset(formName) {
      // 重置
      this.searchForm = {};
      this.$refs[formName].resetFields();
      this.date = this.expectReceiveDate = [];
      // this.handleList();
    },
    //获取部门/职务/上级/结算方式
    async initDeptEmployee() {
      let res = await Promise.all([
        getDepartmentList(),
        getEmployeeList(),
        getUserInfo(),
        priceLevel(),
        getPaymentTypeList(),
      ]);
      this.deptOptions = res[0].data.data;
      this.employeeTableData = res[1].data.data;
      this.contactNnitForm.contactUnitOther.createUserName =
        res[2].data.data.realName;
      this.priceLevelOptions = res[3].data.data;
      this.paymentOptions = res[4].data.data;
    },
    // 初始查询条件
    async initSearchCondition() {
      // 单位分类
      let companyOptions = this.findObject(this.column, "category");
      companyOptions.dicData = this.companyOptions;
    },
    // 选择单位地址
    handleChangeCompanyAddress(value) {
      this.contactNnitForm.contactUnitBase.addressId = value.toString();
      this.contactNnitForm.contactUnitBase.addressName = this.$refs[
        "companyAddress"
      ]
        .getCheckedNodes()[0]
        .pathLabels.toString();
    },
    // 社保寄件地址
    handleChangeMailAddress(value) {
      this.contactNnitForm.contactUnitOther.addressId = value.toString();
      this.contactNnitForm.contactUnitOther.addressName = this.$refs[
        "mailAddress"
      ]
        .getCheckedNodes()[0]
        .pathLabels.toString();
    },
    // 选择部门
    changeDept(value) {
      let item = this.deptOptions.filter((item) => {
        return item.id === value;
      });
      this.contactNnitForm.contactUnitOther.deptName = item[0].deptName;
    },
    //选择价格级别
    changePrice(value) {
      let item = this.priceLevelOptions.filter((item) => {
        return item.value === value;
      });
      this.contactNnitForm.contactUnitBase.priceLevelName = item[0].label;
    },
    // 选择业务员
    clickRowEmployee(value) {
      this.rowEmployee = value;
    },
    // 选择结算方式
    changePaymentType(value) {
      let item = this.paymentOptions.filter((item) => {
        return item.id === value;
      });
      this.contactNnitForm.contactUnitOther.settlementContactUnitName =
        item[0].name;
    },
    // 确定选择
    confimEmployeeDialogVisible() {
      if (!this.rowEmployee) {
        this.$message.info("请选择人员");
        return;
      }
      console.log(this.rowEmployee);
      this.contactNnitForm.contactUnitOther.salesmanId = this.rowEmployee.id;
      this.contactNnitForm.contactUnitOther.salesmanName =
        this.rowEmployee.name;
      this.employeeDialogVisible = false;
    },
    //是否首要状态变更
    cutIsChiefly(item, index) {
      for (let i = 0; i < this.contactNnitForm.contactUnitLinks.length; i++) {
        if (index !== i) {
          this.contactNnitForm.contactUnitLinks[i].isChiefly1 = false;
        }
      }
    },
    // 添加联系人
    addContacts() {
      this.contactNnitForm.contactUnitLinks.push({ isChiefly1: false });
    },
    // 删除联系人
    delContacts(index) {
      this.contactNnitForm.contactUnitLinks.splice(index, 1);
    },
    // 查询往来单位
    searchCompany() {
      this.handleList(this.contactNnitSearchForm);
    },
    // 新增编辑
    async handleOpenDialog(operationState, row) {
      this.contactNnitDialogVisible = true;
      this.operationState = operationState;
      if (this.operationState !== "add") {
        let res = await detailsContactUnit({ id: row.id });
        this.$nextTick(() => {
          this.contactNnitForm = res.data.data;
          this.companyAddress =
            this.contactNnitForm.contactUnitBase.addressId.split(",");
          this.mailAddress =
            this.contactNnitForm.contactUnitOther.addressId.split(",");
        });
      } else {
        this.contactNnitForm = {
          contactUnitBase: {
            category: this.category,
          },
          contactUnitLinks: [
            {
              isChiefly1: true,
            },
          ],
          contactUnitBank: {},
          contactUnitOther: {
            createUserName: "",
            createTime: "",
          },
        };
        let res = await getUserInfo();
        this.contactNnitForm.contactUnitOther.createUserName =
          res.data.data.realName;
      }
    },
    // 确定新增编辑
    async confimContactNnitDialogVisible() {
      try {
        await this.$refs.contactNnitForm.validate();
        this.contactNnitForm.contactUnitLinks.forEach((item) => {
          if (!item.linkName) {
            throw "请输入联系人";
          } else if (!item.mobilePhone) {
            throw "请输入手机号";
          } else if (!isMobile(item.mobilePhone)) {
            throw "手机号格式错误";
          } else if (!item.address) {
            throw "请输入地址";
          }
        });
      } catch (error) {
        // debugger
        console.log(error);
        this.$message.error({
          message: error || "请完善必填信息",
        });
        return;
      }
      this.requesting = true;
      try {
        let res = await addEditContactUnit(this.contactNnitForm);
        if (res.data.success) {
          this.$message.success("操作成功");
          this.closeInitDialog();
          this.handleList();
        } else {
          this.$message.success("操作失败");
        }
        this.requesting = false;
      } catch {
        this.requesting = false;
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
    // 关闭弹框
    closeInitDialog() {
      this.$refs.contactNnitForm.resetFields();
      this.contactNnitForm.contactUnitBase.addressId = null;
      this.contactNnitForm.contactUnitBase.addressName = null;
      this.contactNnitForm.contactUnitOther.addressId = null;
      this.contactNnitForm.contactUnitOther.addressName = null;
      this.companyAddress = [];
      this.mailAddress = [];
      this.activeTabs = "基本信息";
      this.contactNnitDialogVisible = false;
    },
    handleCancel() {
      this.searchDialogVisible = false;
    },
  },
  // }
};
</script>

<style lang="scss" scoped>
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
