
<template>
  <div class="handlePages addPages">
    <el-row>
      <div class="title">基础数据</div>
      <el-divider></el-divider>
    </el-row>
    <el-form :model="form" label-width="150px" class="detail-form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="单据编号:">
            <span>{{ form.reportNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间:">
            <span>{{ form.createTime }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品编号:">
            <span>{{ form.productSn }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="执行人:">
            <span>{{ form.executeUserName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="实际工时:">
            <el-input
              v-if="type === 'edit'"
              class="iptWidth"
              v-model="form.hour"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.hour }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报工人:">
            <el-input
              v-if="type === 'edit'"
              class="iptWidth"
              v-model="form.doneUserName"
              suffix-icon="el-icon-search"
              placeholder="请选择报工人"
              @focus="checkUserVisible = true"
              disabled
            ></el-input>
            <span v-else>{{ form.doneUserName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注:">
            <el-input
              v-if="type === 'edit'"
              class="iptWidth"
              v-model="form.remark"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.remark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-row style="margin: 20px 0 10px">
          <div class="title">质检内容</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态:">
              <el-radio
                :disabled="type === 'detail'"
                v-model="form.status"
                :label="1"
                >合格</el-radio
              >
              <el-radio
                :disabled="type === 'detail'"
                v-model="form.status"
                :label="2"
                >不合格</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="margin-bottom-20">
          <el-table
            :data="tableData"
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
                  <el-table-column type="index" width="80">
                    <template slot="header">
                      <span @click="handleAdd(props.row.courses)">
                        <i class="el-icon-plus"></i>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="过程" prop="courseTime">
                    <template slot-scope="scop">
                      <el-input
                        v-if="type === 'edit'"
                        class="iptAuto"
                        v-model="scop.row.courseTime"
                        placeholder="请输入过程"
                      ></el-input>
                      <span v-else>{{ scop.row.courseTime }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="结果" prop="result">
                    <template slot-scope="scop">
                      <el-input
                        v-if="type === 'edit'"
                        class="iptAuto"
                        v-model="scop.row.result"
                        placeholder="请输入结果"
                      ></el-input>
                      <span v-else>{{ scop.row.result }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="80" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        circle
                        @click="coursesDelete(scope.$index, props.row.courses)"
                        :disabled="type === 'detail'"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="检验项目" prop="inspectionName">
            </el-table-column>
            <el-table-column label="检验标准" prop="inspectionStandard">
            </el-table-column>
            <el-table-column label="检验结果" prop="result">
              <template slot-scope="scope">
                <el-input
                  v-if="type === 'edit'"
                  class="iptAuto"
                  v-model="scope.row.result"
                  placeholder="请输入结果"
                ></el-input>
                <span v-else>{{ scope.row.result }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-form-item label="附件信息">
            <upload-file
              @on-remove="handleRemove"
              @on-success="handleSuccess"
              :imageList="file"
              message="合同"
              :status="type"
            ></upload-file>
          </el-form-item>
        </el-row>
      </div>
      <el-row class="footer-box margin_30">
        <el-button
          v-if="type === 'edit'"
          type="primary"
          :loading="requesting"
          size="small"
          @click="submit"
          >保存</el-button
        >
        <el-button size="small" @click="handleBack">返回</el-button>
      </el-row>
    </el-form>
    <!-- 选择报工人弹窗 -->
    <leadingCadre
      title="报工人"
      :checkUserVisible.sync="checkUserVisible"
      @on-selected="addUser"
    />
  </div>
</template>

<script>
import { reportDetails, updateReport } from "@/api/quality/process";
import leadingCadre from "@/components/quality/leadingCadre";
import upload from "@/mixins/upload";

export default {
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
  components: { leadingCadre },
  mixins: [upload],
  data() {
    return {
      form: {},
      tableData: [],
      requesting: false,
      checkUserVisible: false, //弹窗
    };
  },
  computed: {},
  async created() {
    let res = await reportDetails(this.$route.query.data.id);
    this.tableData = res.data.data.resultList;
    this.form = this.$route.query.data;
    if (this.form.files) {
      this.file = this.form.files.split(",");
    }
  },
  mounted() {},
  methods: {
    //选择报工人
    addUser(info) {
      (this.form.doneUserId = info.id), (this.form.doneUserName = info.name);
    },
    //新增过程
    handleAdd(table) {
      table.push({});
    },
    //删除过程
    coursesDelete(index, table) {
      table.splice(index, 1);
    },
    async submit() {
      this.form.resultList = this.tableData;
      this.form.files = this.file.join(",");
      let res = await updateReport(this.form);
      this.requesting = true;
      if (res.data.code === 200) {
        this.requesting = false;
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push("/quality/report");
      }
    },
    handleBack() {
      this.$router.push("/quality/report");
    },
  },
};
</script>
<style src="../common.css"  scoped>
</style>
