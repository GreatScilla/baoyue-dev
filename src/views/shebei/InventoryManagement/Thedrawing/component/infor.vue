<template>
  <div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="21"
        ><div class="grid-content bg-purple-dark">
          <strong>● 设备筛选</strong>
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
            <el-form-item label="资产编号">
              <el-input
                v-model="form.assetTag"
                placeholder="手动输入"
              ></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-form-item label="设备编号">
              <el-input
                v-model="form.equipmentCoding"
                placeholder="手动输入"
              ></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="设备名称">
              <el-input v-model="form.name" placeholder="手动输入"></el-input>
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
      <el-table-column prop="assetTag" label="资产编号"></el-table-column>
      <el-table-column
        prop="equipmentCoding"
        label="设备编号"
      ></el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="category" label="设备类别"></el-table-column>
      <el-table-column prop="model" label="规格型号"></el-table-column>
      <el-table-column prop="barCode" label="库位编码"></el-table-column>
      <el-table-column label="所在位置"></el-table-column>
      <el-table-column label="所属人员"></el-table-column>
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
import { sbpageList } from "../../../../../api/shebei/InventoryManagement";
export default {
  name: "",
  components: { pagingEle },
  props: {},
  data() {
    return {
      form: {
        assetTag: "", // 资产编号
        equipmentCoding: "", // 设备编号
        name: "" // 设备名称
      },
      tableData: [],
      total: null,
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
    // ininT
    async ininTab() {
      const { data: res } = await sbpageList();
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 查询
    async infoQuery() {
      const { data: res } = await sbpageList(this.form);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 重置
    clearform() {
      this.form.assetTag = "";
      this.form.equipmentCoding = "";
      this.form.name = "";
    },

    // 添加设备
    addform() {
      this.$emit("addTabData", this.selechange);
      this.tableData = [];
    },

    // 批量操作
    handleSelectionChange(val) {
      this.selechange = val;
    },

    // 分页
    async updatepageNum(val) {
      const { data: res } = await sbpageList(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    async updatepageSize(val) {
      const { data: res } = await sbpageList(val);
      this.tableData = res.data.records;
      this.total = res.data.total;
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss"></style>
