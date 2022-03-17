<template>
  <div class="pages">
    <el-form
      :model="form"
      :rules="rules"
      :show-message="false"
      ref="ruleForm"
      label-width="150px"
      class="detail-form"
    >
      <!-- <el-row class="title">
      <div >检验信息</div>
      <el-divider></el-divider>
    </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="检验项目:">
            <span>{{ form.workOrderNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="不合格特征:">
            <span>{{ form.workOrderNo }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="不良原因:">
            <span>{{ form.workOrderNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检验人:">
            <span>{{ form.workOrderNo }}</span>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row class="title">
        <div>附件信息</div>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <el-form-item label="附件信息">
          <upload-file
            @on-success="handleSuccess"
            @on-remove="handleRemove"
            :imageList="file"
            :status="type"
          ></upload-file>
        </el-form-item>
      </el-row>
      <el-row class="title">
        <div>订单明细</div>
        <el-divider></el-divider>
      </el-row>
      <el-table :data="tableData" border class="margin-bottom-20">
        <el-table-column label="产品编号" prop="productSn"></el-table-column>
        <el-table-column label="产品名称" prop="productName">
          <!-- <template slot-scope="scope">
            <el-link
              @click="getWorker(scope.row, scope.$index)"
              type="primary"
              >{{ scope.row.productName }}</el-link
            >
          </template> -->
        </el-table-column>
        <el-table-column
          label="规格"
          prop="specificationName"
        ></el-table-column>
        <el-table-column label="计量单位" prop="sp1"></el-table-column>
        <el-table-column label="仓库" prop="depotName"></el-table-column>
        <el-table-column label="数量" prop="num"></el-table-column>
        <el-table-column label="验退数量" prop="refundNum">
          <template slot-scope="{ row, $index }">
            <span v-if="type === 'detail'">{{ row.refundNum }}</span>
            <el-input
              v-else
                
              v-model="row.refundNum"
              @change="(val) => changeRefundNum(val, $index)"
              :disabled="row.isExemption === 1"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="合格数量" prop="checkNum">
          <template slot-scope="{ row, $index }">
            <span v-if="type === 'detail'">{{ row.checkNum }}</span>
            <el-input
              v-else
                
              v-model="row.checkNum"
              @change="(val) => changeCheckNum(val, $index)"
              :disabled="row.isExemption === 1"
            ></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column label="源订单号" prop="purchaseStockItemId"></el-table-column> -->
      </el-table>
      <el-row class="title">
        <div>质检进度</div>
        <el-divider></el-divider>
      </el-row>
      <el-table :data="workTable" border class="margin-bottom-20">
        <el-table-column
          prop="workOrderNo"
          width="140"
          label="单据编号"
        ></el-table-column>
        <el-table-column
          prop="taskNo"
          width="130"
          label="所属任务"
        ></el-table-column>
        <el-table-column width="130" prop="productSn" label="产品编号">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="model" label="规格型号"> </el-table-column>
        <el-table-column prop="labName" label="执行单位"></el-table-column>
        <el-table-column
          prop="executeUserName"
          label="执行人"
        ></el-table-column>
        <el-table-column prop="hour" label="工时"></el-table-column>
        <el-table-column
          width="120"
          prop="batchNo"
          label="批次批号"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="workOrderBeginTime"
          label="工单开始日期"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="workOrderEndTime"
          label="工单结束日期"
        ></el-table-column>
        <el-table-column width="60" label="操作" fixed="right">
          <template slot-scope="scop">
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
                @click="openCheckDia(scop.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-row class="footer-box margin-bottom-20">
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="submit"
          >保存</el-button
        >
        <el-button v-if="!examine" size="small" @click="handleBack"
          >返回</el-button
        >
      </el-row>
    </el-form>
    <el-dialog
      class="search-dialog"
      append-to-body
      :visible.sync="checkVisible"
      title="检验内容"
    >
      <el-form>
        <el-col :span="12">
          <el-form-item label="状态:">
            <span>{{ diaForm.status | statusName }}</span>
          </el-form-item>
        </el-col>
        <el-table
          :data="checkTable"
          border
          :cell-style="{ 'text-align': 'center' }"
          :header-cell-style="{ 'text-align': 'center' }"
          style="width: 90%; margin: 10px auto"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="props.row.courses"
                border
                :cell-style="{ 'text-align': 'center' }"
                :header-cell-style="{ 'text-align': 'center' }"
                style="width: 90%; margin: 10px auto"
              >
                <el-table-column type="index" width="80"> </el-table-column>
                <el-table-column label="过程" prop="courseTime">
                </el-table-column>
                <el-table-column label="结果" prop="result"> </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="检验项目" prop="inspectionName">
          </el-table-column>
          <el-table-column label="检验标准" prop="inspectionStandard">
          </el-table-column>
          <el-table-column label="检验结果" prop="result"> </el-table-column>
        </el-table>

        <el-form-item class="search-footer">
          <el-button @click="checkVisible = false" size="small">取消</el-button>
          <!-- <el-button
            v-if="form.status !== 1"
            type="primary"
            size="small"
            @click="lssue"
            >报工</el-button
          > -->
        </el-form-item>
      </el-form>

      <!-- <user
        :deptId="deptId"
        @on-cancel="closeUser"
        @on-submit="submitUser"
      ></user> -->
    </el-dialog>
  </div>
</template>

<script>
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import { getId } from "@/api/common";
import { getUserList } from "@/api/common";
import { addOrUpdatePurchaseCheckOrder } from "@/api/purchase/purchaseInbound";
import { workOrderPage, workReportDetails } from "@/api/quality/process";
export default {
  name: "check",
  props: {
    type: {
      type: String,
      default: "edit",
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
  data() {
    return {
      module: "校验",
      tableData: [],
      workTable: [],
      checkTable: [],
      checkVisible: false,
      form: {
        // purchaseStockId: "",
        // purchaseStockNum: "", // 采购进货编号
        // purchaseCheckTime: "", // 采购时间
        // purchaseOrderSn: "",
        // checkPersonId: "", //检验人id
        // checkPerson: "", //检验人
      },
      userOption: [], // 检验人数据
      rules: {
        checkPersonId: [
          { required: true, message: "请选择检验人", trigger: "change" },
        ],
      },
      // key: null,
      diaForm: {},
    };
  },
  mixins: [upload, common],
  created() {
    console.log(this.$route.query.data);
    this.getWorker();
    if (this.type === "detail") {
      this.form = this.data;
    } else {
      this.form = this.$route.query.data;
      this.form.num = this.$route.query.data.number
    }
    this.tableData = this.form.purchaseCheckItemList;
    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].isExemption === 1) {
        this.$message.info("不能修改的产品为免检产品");
        break;
      }
    }
    if (this.form.file.length > 0) {
      this.file = this.form.file.split(",");
    }
  },
  mounted() {
    this.getUserOption();
  },
  filters: {
    statusName(val) {
      if (val === 0) {
        return (val = "待审核");
      }
      if (val === 1) {
        return (val = "合格");
      }
      if (val === 2) {
        return (val = "不合格");
      }
    },
  },
  methods: {
    async getWorker() {
      // this.key = num;
      let params = { pageNum: 1, pageSize: 10 };
      let form = {
        batchNo: "",
      };
      if (this.type === "detail") {
        form.batchNo = this.data.number;
      } else {
        form.batchNo = this.$route.query.data.number;
      }
      workOrderPage(params, form).then((res) => {
        this.workTable = res.data.data.records;
      });
    },
    async openCheckDia(info) {
      let res = await workReportDetails({
        workOrderNo: info.workOrderNo,
      });
      this.diaForm = res.data.data;
      this.checkTable = res.data.data.resultList;
      this.checkVisible = true;
    },
    // lssue() {
    //   //弹窗报工
    //   console.log(this.checkTable);
    //   this.checkTable.forEach((el) => {
    //     if (el.inspectionName === "不良数") {
    //       this.tableData[this.key].refundNum = Number(el.result);
    //     } else if (el.inspectionName === "良品数") {
    //       this.tableData[this.key].checkNum = Number(el.result);
    //     }
    //   });
    //   this.checkVisible = false;
    // },
    async getUserOption() {
      // 获取检验人option
      const data = await getUserList();
      this.userOption = data.data.data.records;
    },
    selectCheckPerson(val) {
      this.userOption.forEach((item) => {
        if (item.id === val) {
          this.form.checkPerson = item.name;
        }
      });
    },
    async beforeAvatarUpload(file) {
      let OSS = require("ali-oss");
      let client = new OSS({
        region: "oss-cn-shenzhen",
        bucket: "bipinyun",
        accessKeyId: "LTAI4FyoJErCzmbxR1549QqR",
        accessKeySecret: "CE5T59WAbnM8xD2D3teGpWf94cYXNZ",
      });
      let result = await client.put(file.name, file);
      this.form.file.push(result.url);
      this.fileList.push({ name: result.name, url: file.url });
      return false;
    },
    async getOrderSn() {
      // 获取单据编号
      const res = await getId({ codeName: "进料检验" });
      this.form.num = res.data.data;
    },
    async submit() {
      // try {
      //   await this.$refs.form.validate();
      // } catch (error) {
      //   this.$message.error({
      //     message: "请完善必填信息",
      //   });
      //   return;
      // }
      const params = {
        data: {
          ...this.form,
          purchaseCheckItemList: this.tableData,
          file: this.file.join(","),
        },
        codeName: "进料检验",
      };
      const res = await addOrUpdatePurchaseCheckOrder(params);
      this.$message.success({
        message: "操作成功！",
      });
      this.$router.push({
        path: "/purchaseManage/feedstockCheck",
      });
    },
    handleBack() {
      this.$router.push({
        path: "/purchaseManage/feedstockCheck",
      });
    },
    changeRefundNum(val, index) {
      // 改变验退数量
      this.tableData[index].checkNum =
        this.tableData[index].num - this.tableData[index].refundNum;
    },
    changeCheckNum(val, index) {
      this.tableData[index].refundNum =
        this.tableData[index].num - this.tableData[index].checkNum;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 20px 0 10px;
}
.title-bar {
  font-size: 20px;
  // height: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid#cac7c7;
  p {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
