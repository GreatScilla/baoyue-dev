// 消息预警修改、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="form"
      class="detail-form"
      ref="form"
      :show-message="false"
    >
      <el-row>
        <el-row style="margin-left: -35px">
          <div class="title">消息预警配置</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item required label="预警类型:" prop="warnTypeId">
              <span v-if="type === 'detail'">{{ form.warnTypeValue }}</span>
              <el-select
                v-else
                v-model="form.warnTypeId"
                @change="searchChange"
              >
                <el-option
                  v-for="item of warningList"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                  @click.native="form.warnTypeValue = item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type !== 'add'">
            <el-form-item label="配置日期:">
              <span v-if="type === 'detail'">{{ form.createTime }}</span>
              <el-date-picker
                v-else
                v-model="form.createTime"
                type="datetime"
                placeholder="请选择"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                disabled
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type !== 'add'">
            <el-form-item label="配置人:">
              <span v-if="type === 'detail'">{{ form.createUserName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.createUserName"
                placeholder="请输入"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用:">
              <el-switch
                v-model="form.isEnable"
                :active-value="0"
                :inactive-value="1"
                :disabled="type == 'detail'"
                active-color="#319b36"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col style="margin: 20px 0">
            <el-table :data="tableData" border class="detail-table">
              <el-table-column type="index" align="center" width="130">
                <template slot="header">
                  <el-button
                    type="text"
                    icon="el-icon-plus"
                    circle
                    @click="handleAdd"
                    :disabled="type === 'detail'"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" width="80">
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
              <el-table-column prop="account" label="账号"></el-table-column>
              <el-table-column label="用户名称" prop="name" width="160px">
                <template slot="header">
                  <span style="color: #f56c6c">*</span>用户名称
                </template>
                <template slot-scope="{ row }">
                  <span v-if="type === 'detail'">{{ row.name }}</span>
                  <el-input
                    v-else
                    v-model="row.name"
                    @focus="showProduct($index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="deptName" label="所属部门">
              </el-table-column>
              <el-table-column prop="realName" label="人员姓名">
              </el-table-column>
              <el-table-column prop="phone" label="电话">
                <template slot-scope="scope">
                  {{ scope.row.phone }}
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  {{ scope.row.status | statusName }}
                </template></el-table-column
              >
            </el-table>
          </el-col>
          <el-col>
            <el-form-item required label="预警内容:" prop="warnContent">
              <span v-if="type === 'detail'">{{ form.warnContent }}</span>
              <el-input
                v-else
                type="textarea"
                :rows="2"
                style="width: 600px"
                size="small"
                v-model="form.warnContent"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="saveProducePlan"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="操作员"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    >
    </dialog-select-personnel>
    <!-- 选择执行人弹窗 -->
    <leadingCadres
      title="用户"
      :checkUserVisible.sync="checkUserVisible"
      @on-selected="addUser"
      :checkData="tableData"
      @on-submit="addProductList"
    />
  </basic-container>
</template>
<script>
import { getDictionary } from "@/api/system/dictbiz";
import leadingCadres from "@/components/quality/leadingCadress";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import { getUser } from "@/api/base-data/user";
import {
  infoWarnSave,
  infoWarnUpdate,
  infoWarnDetails,
} from "@/api/manufacture/newsWarning";
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
    model: {
      type: String,
      default: "",
    },
  },
  components: { dialogSelectPersonnel, leadingCadres },
  data() {
    return {
      warningList: [],
      checkUserVisible: false,
      currentIndex: "",
      show: false,
      tableData: [
        {
          id: "",
          account: "",
          userName: "",
          name: "",
          deptName: "",
          realName: "",
          phone: "",
          status: "",
        },
      ],
      employeeDialogVisible: false,
      dictValue: "",
      form: {
        warnContent: "",
      },
    };
  },
  async created() {
    const res = await getDictionary({ code: "warn_type" }); //预警类型
    this.warningList = res.data.data;
  },
  mounted() {
    if (this.type != "add") {
      this.getDetailInfo();
    }
  },
  computed: {
    ids() {
      let ids = [];
      this.tableData.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    searchChange(value) {
      this.warningList.forEach((item) => {
        if (item.dictKey == value) {
          item.dictValue == "库存"
            ? (this.form.warnContent = "[物料名称][库存数量][库存下限]")
            : (this.form.warnContent = "[客户名称][项目名称]");
          // }else{
          //    this.form.warnContent = '';
          // }
        }
      });
    },
    handleAdd() {
      this.tableData.push({});
    },
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
    showProduct(index) {
      // 展示选择
      this.checkUserVisible = true;
      this.currentIndex = index;
    },
    //选择执行人
    addProductList(list) {
      this.checkUserVisible = false;
      if (list.length === 0 && this.tableData.length === 1) {
        return;
      }
      list.forEach((item) => {
        const obj = {
          account: item.account,
          userName: item.userName,
          name: item.name,
          id: item.id,
          deptName: item.deptName,
          realName: item.realName,
          phone: item.phone,
          status: item.status,
        };
        this.tableData.push(obj);
      });
      this.tableData = this.tableData.filter((ele) => {
        if (!ele.account) {
          return false;
        } else {
          return true;
        }
      });
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.form.userName = value.name;
        this.form.userId = value.id;
      }
      this.employeeDialogVisible = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await infoWarnDetails({
        id: id,
      });
      this.form = res.data.data;
      const noticeUserIds = res.data.data.noticeUserIds.split(",");
      const res1 = await getUser({ current: 1, size: 1000 });
      let newArr = [];
      for (let i = 0; i < noticeUserIds.length; i++) {
        for (let j = 0; j < res1.data.data.records.length; j++) {
          if (res1.data.data.records[j].id === noticeUserIds[i]) {
            newArr.push(res1.data.data.records[j]);
          }
        }
      }
      this.tableData = newArr;
    },
    //保存
    async saveProducePlan() {
      // console.log(this.tableData[0].name);
      if (!this.tableData[0].name) {
        return this.$message.error({
          message: "请选择用户",
        });
      }
      this.form.noticeUserIds = this.ids;
      let saveApi = "";
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      if (this.type == "add") {
        saveApi = infoWarnSave;
      } else {
        saveApi = infoWarnUpdate;
      }
      saveApi(this.form)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("操作成功");
            this.$router.back();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
  filters: {
    statusName(value) {
      if (value == 0) {
        value = "启用";
      } else if (value == 1) {
        value = "停用";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 0px;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.detail-form {
  padding: 30px 35px;
}
.el-input,
.el-select {
  width: 240px;
}
.el-table {
  /deep/th {
    padding: 0 !important;
  }
  .el-input,
  .el-select {
    width: 100%;
    /deep/.el-input__inner {
      text-align: center;
    }
  }
}
</style>
