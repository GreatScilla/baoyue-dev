<template>
  <div class="handlePages addPages">
    <el-form label-width="180px">
      <el-row>
        <div class="title">审批信息</div>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人:">
            <span>{{ form.userName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型:">
            <span>{{ form.processType }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="info.data">
        <el-col v-for="(item, index) in info.data" :key="index" :span="12">
          <el-form-item v-if="item.title == '产品'" :label="item.title">
            <el-table
              :data="tableData"
              border
              style="width: 100%; margin-bottom: 20px"
            >
              <el-table-column label="图片">
                <template slot-scope="{ row }">
                  <el-image :src="row.pic"></el-image>
                </template>
              </el-table-column>
              <el-table-column
                label="产品编码"
                prop="productSn"
              ></el-table-column>
              <el-table-column
                label="产品"
                prop="productName"
              ></el-table-column>
              <el-table-column label="规格型号" prop="model"></el-table-column>
              <el-table-column label="单位" prop="sp1"></el-table-column>
              <el-table-column
                label="数量"
                prop="productQuantity"
              ></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item
            v-else-if="item.title == '招聘信息'"
            :label="item.title"
          >
            <el-table
              :data="tableData1"
              border
              style="width: 100%; margin-bottom: 20px"
            >
              <el-table-column
                label="到岗日期"
                prop="workTime"
              ></el-table-column>
              <el-table-column label="部门" prop="deptName"></el-table-column>
              <el-table-column
                label="人员数量"
                prop="peopleNumber"
              ></el-table-column>
              <el-table-column label="岗位" prop="jobs"></el-table-column>
              <el-table-column label="招聘人" prop="hiring"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item v-else :label="item.title">
            <span v-if="Array.isArray(item.value)"
              >{{ item.value[0] + " 至 " + item.value[1] }}
            </span>
            <span v-else>{{ item.value }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <div class="title">流程信息</div>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <div class="block">
          <el-timeline>
            <el-timeline-item :timestamp="form.byTheTime" placement="top">
              <el-card>
                {{
                  `${form.approvalNodeSelectResp[0].roleName[0]}在 [${form.byTheTime}] 开始处理 [${form.approvalNodeSelectResp[0].nodeName}] 环节`
                }}
              </el-card>
            </el-timeline-item>
            <el-timeline-item :timestamp="form.approvalTime[0]" placement="top">
              <el-card>
                {{
                  `${form.approvalNodeSelectResp[0].roleName[0]}在 [${form.approvalTime[0]}] 处理完 [${form.approvalNodeSelectResp[0].nodeName}] 环节`
                }}
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-row>
      <el-row class="footer-box margin_30">
        <el-button v-if="details" @click="dialogVisible = true" size="small"
          >查看详情</el-button
        >
        <el-button @click="$router.push('/flow2/doneList')" size="small"
          >取消</el-button
        >
      </el-row>
            <el-dialog
        title="更多详情"
        :visible.sync="dialogVisible"
        width="80%"
        append-to-body
        top="20px"
      >
        <el-container style="height: 550px">
          <el-main>
            <component
              :is="componentInfos"
              :data="info"
              model="0"
              examine="1"
              type="detail"
            ></component>
          </el-main>
        </el-container>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
import { listDetail } from "@/api/flow2/todoList.js";
import approvalDetails from "@/mixins/approvalDetails";
export default {
  mixins: [approvalDetails],
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
  },
  data() {
    return {
      details: false,
      dialogVisible: false,
      form: {},
      requesting: false,
      info: {},
      tableData: [],
    };
  },
  created() {
    if (this.$route.query.data) {
      this.getInfo(this.$route.query.data.id);
    }
  },
  methods: {
    async getInfo(id) {
      let res = await listDetail({ projectProcessId: id });
      if (res.data.code === 200) {
        this.form = res.data.data;
        this.info = JSON.parse(this.form.data);
        if (typeof this.info === "number") {
          this.details = true;
          this.getComponent(res.data.data.processType, this.form);
        }
        if (
          this.info.data.length == 1 &&
          this.info.data[0].title == "招聘信息"
        ) {
          this.tableData1 = JSON.parse(this.info.data[0].value);
        } else if (this.info.data[2].title == "产品") {
          this.tableData = JSON.parse(this.info.data[2].value);
        }
      }
    },
  },
};
</script>

<style scoped>
.handlePages {
  background-color: #fff;
  padding: 6px !important;
}
.footer-box {
  padding: 20px 0 30px;
}
</style>