<template>
  <div>
    <el-divider></el-divider>

    <el-row>
      <el-col :span="21"
        ><div class="grid-content bg-purple-dark">
          <strong>● 备件筛选</strong>
        </div></el-col
      >
      <el-col :span="1"
        ><div class="grid-content bg-purple-light">
          <el-button type="primary" @click="addform">选择添加</el-button>
        </div></el-col
      >
    </el-row>
    <el-divider></el-divider>

    <el-form ref="form" :model="form" inline>
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="备件编号">
              <el-select v-model="form.equipmentCoding" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-form-item label="备件名称">
              <el-select v-model="form.name" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="备件类别">
              <el-select v-model="form.category" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-button type="primary" @click="infoQuery">查询</el-button>
            <el-button type="primary" @click="clearform">重置</el-button>
          </div></el-col
        >
      </el-row>
    </el-form>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="equipmentCoding"
        label="备件编号"
      ></el-table-column>
      <el-table-column prop="name" label="备件名称"></el-table-column>
      <el-table-column prop="category" label="备件类别"></el-table-column>
      <el-table-column prop="model" label="规格型号"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <paging-ele
      :total="total"
      @updatepageNum="updatepageNum"
      @updatepageSize="updatepageSize"
    ></paging-ele>
  </div>
</template>
<script>
import pagingEle from "../../component/pagingele";
import { initspareDatabase } from "../../../../../api/shebei/InventoryManagement";
export default {
  name: "",
  components: { pagingEle },
  props: {},
  data() {
    return {
      form: {
        equipmentCoding: "",
        name: "",
        category: ""
      },
      total: null,
      tableData: [],
      selechange: []
    };
  },
  activated() {},
  watch: {},
  created() {
    this.ininTab();
  },
  mounted() {},
  methods: {
    // ininTab
    async ininTab() {
      const { data: res } = await initspareDatabase();
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 查询
    async infoQuery() {
      const { data: res } = await initspareDatabase(this.form);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 重置
    clearform() {
      this.form.equipmentCoding = "";
      this.form.name = "";
      this.form.category = "";
    },

    // 添加备件
    addform() {
      this.$emit("bjaddTabData", this.selechange);
      this.tableData = [];
    },

    // 批量操作
    handleSelectionChange(val) {
      this.selechange = val;
    },

    // 分页
    async updatepageNum(val) {
      const { data: res } = await initspareDatabase(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    async updatepageSize(val) {
      const { data: res } = await initspareDatabase(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss"></style>
