<template>
  <div class="container">
    <div class="title">
      <div>
        <div class="item">
          <i class="icon-mes-211dingdan-shi"></i>
          <span class="font">不良录入</span>
        </div>
      </div>
      <div class="back" @click="back">
        <i class="icon-mes-fanhui"></i>
        <span class="font">返回</span>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <div class="header">
          <el-button
            size="small"
            icon="el-icon-plus"
            type="primary"
            @click="badRecordDialogVisible = true"
          >
            新增
          </el-button>
        </div>
        <el-table
          @selection-change="handleSelectionChange"
          :data="badRecordTableData"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="num" label="不良数量"> </el-table-column>
          <el-table-column prop="traitName" label="不合格特征"> </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
          ></el-table-column>
          <el-table-column prop="createUsername" label="录入人员">
          </el-table-column>
          <el-table-column prop="createTime" label="录入时间">
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
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
        </div>
      </div>
    </div>
    <el-dialog
      class="search-dialog"
      :visible.sync="badRecordDialogVisible"
      :before-close="handleClose"
      title="新增不良"
      append-to-body
      width="40%"
    >
      <el-form ref="searchForm" label-width="100px" class="form-footer">
        <el-form-item required label="不良数量">
          <el-input
            class="iptAuto"
            v-model="badRecordDialogVisibleForm.num"
            v-int
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item required label="不合格特征">
          <el-input
            class="iptAuto"
            v-model="badRecordDialogVisibleForm.traitName"
            suffix-icon="el-icon-search"
            placeholder="请选择"
            @focus="selectAddDialogVisible = true"
          ></el-input>
        </el-form-item>
        <el-form-item required label="描述">
          <el-input
            class="iptAuto"
            v-model="badRecordDialogVisibleForm.description"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            class="iptAuto"
            v-model="badRecordDialogVisibleForm.remark"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>

        <el-form-item class="search-footer">
          <el-button @click="badRecordDialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="confimBadRecordDialogVisible"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- <el-dialog
      title="新增不良"
      :visible.sync="badRecordDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form 
        ref="badRecordDialogVisibleForm" 
        :model="badRecordDialogVisibleForm"
        label-width="80px"
      >
        <el-form-item label="不良数量:" prop="num">
          <el-input size="small" v-model="badRecordDialogVisibleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="不良类型:" prop=:>
          <el-select v-model="badRecordDialogVisibleForm.typeId" size="small" @change="handleTypeChange">
            <el-option
              v-for="item in badRecordTypeOptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey">
            </el-option>
            <div :slot="badRecordTypeOptions.length > 0 ? null : 'empty'">
              <div :class="[badRecordTypeOptions.length > 0? 'selectAdd':'noDataSelectAdd']" @click="selectAddDialogVisible = true">
                <i class="el-icon-plus"></i>
                新增不良类型
              </div>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input size="small" v-model="badRecordDialogVisibleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="confimBadRecordDialogVisible">保存</el-button>
      </div>
    </el-dialog> -->
    <!-- 新增不良类型 -->
    <!-- <select-add 
      label="不良类型"
      code="bad_record_type"
      :selectAddDialogVisible="selectAddDialogVisible" 
      @transmitSelectAdd="transmitSelectAdd">
    </select-add> -->
    <!-- 新增不良代码 -->
    <offgradeDialog
      title="不合格特征"
      :checkVisible.sync="selectAddDialogVisible"
      @on-selected="transmitSelectAdd"
    />
  </div>
</template>

<script>
import { addBadRecord, badRecordPage } from "@/api/productionExecution/index";
import paginationMixin from "@/mixins/pagination";
// import selectAdd from "@/components/select-add/index";
import offgradeDialog from "@/components/select-add/offgradeDialog";
import { getDictionary } from "@/api/system/dictbiz";
export default {
  mixins: [paginationMixin],
  components: {
    // selectAdd,
    offgradeDialog,
  },
  data() {
    return {
      badRecordDialogVisibleForm: {
        description:''
      },
      badRecordTableData: [],
      badRecordTypeOptions: [],
      badRecordDialogVisible: false,
      selectAddDialogVisible: false,
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    // 获取列表
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      let res = await badRecordPage(params);
      this.badRecordTableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    async transmitSelectAdd(value) {
      console.log(value);
      this.badRecordDialogVisibleForm.traitName = value.traitName;
      this.badRecordDialogVisibleForm.description = value.description;
        this.badRecordDialogVisibleForm.traitId=value.id
      // if (value === "addSuccess") {
      //   let res = await getDictionary({ code: "bad_record_type" });
      //   if (res.data.success) {
      //     this.badRecordTypeOptions = res.data.data;
      //   }
      // } else {
      //   this.selectAddDialogVisible = value;
      // }
    },
    // 新增保存
    async confimBadRecordDialogVisible() {
      if (
        !this.badRecordDialogVisibleForm.traitName ||
        !this.badRecordDialogVisibleForm.num ||
        !this.badRecordDialogVisibleForm.description
      ) {
        return this.$message.error("必填数据不能为空");
      }
      this.badRecordDialogVisibleForm.orderSn=this.$route.query.data.orderSn
      this.badRecordDialogVisibleForm.planSn=this.$route.query.data.planSn
      let res = await addBadRecord(this.badRecordDialogVisibleForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.closeInitDialog();
        this.handleList();
      } else {
        this.$message.success("操作失败");
      }
    },
    // 选择类型
    handleTypeChange(value) {
      let item = this.badRecordTypeOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.badRecordDialogVisibleForm.type = item[0].dictValue;
    },
    // 返回
    back() {
      this.$router.back();
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
      // this.$refs.badRecordDialogVisibleForm.resetFields()
      this.badRecordDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common.scss";

.container {
  min-height: 100%;
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  .content-wrapper {
    padding: 20px;
    background: #f7f8fa;
    .content {
      padding: 30px;
      background-color: #fff;
      .header {
        margin-bottom: 30px;
      }
    }
  }
}
.el-input,
.el-select {
  width: 240px;
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
