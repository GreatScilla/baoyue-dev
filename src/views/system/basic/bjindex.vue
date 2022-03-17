<template>
  <div>
    <el-form
      inline
      ref="form"
      :model="form"
      :rules="rules"
      :hide-required-asterisk="false"
    >
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item
              prop="equipmentCoding"
              label="备件编号"
              placeholder="请输入备件编号"
            >
              <el-input v-model="form.equipmentCoding"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            <el-form-item
              prop="name"
              label="备件名称"
              placeholder="请输入备件名称"
            >
              <el-input v-model="form.name"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-button type="primary" @click="infoQuery">查询</el-button>
            <el-button type="info" @click="clearform">重置</el-button>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
    </el-form>
    <!-- 新增 -->
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <el-button type="primary" @click="showAdd">新增</el-button>
        </div></el-col
      >
    </el-row>

    <!-- 设备树 -->
    <el-row :gutter="24" class="Mtop">
      <el-col :span="4">
        <el-card shadow="hover" class="back-C">
          <span class="Sleft">备件类别</span>
          <!-- ----- -->

          <el-tree
            class="back-C"
            :data="selecTtree.data"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-table
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          max-height="350"
          style="width: 100%"
        >
          <el-table-column prop="equipmentCoding" label="备件编号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="备件名称"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="specifications"
            label="规格型号"
          ></el-table-column>
          <el-table-column
            prop="category"
            label="备件类别"
            width="120"
          ></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column
            prop="isDepreciation"
            width="100"
            label="是否转资产"
          ></el-table-column>
          <el-table-column prop="amountMax" label="库存下限"></el-table-column>
          <el-table-column prop="amountMin" label="库存上限"></el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
            <template v-slot:default="slotProps">
              <el-button
                type="primary"
                size="mini"
                @click="showEdit('0', slotProps.row)"
                >详情</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="showEdit('1', slotProps.row)"
                >编辑</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="delList(slotProps.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <paging-ele
      :total="total"
      @updatepageNum="updatepageNum"
      @updatepageSize="updatepageSize"
      class="paging"
    ></paging-ele>
    <!-- 添加 -->
    <add-ele @addupdate='addupdate' ref="add"></add-ele>
    <!-- 编辑 -->
    <edit-ele
      ref="edit"
      :detailAll='detailAll'
      :flag="flag"
      @updateEdit='updateEdit'
      @updateFalg="flag = '0'"
      @updateFalgC="flag = '1'"
    ></edit-ele>
  </div>
</template>
<script>
import { selecTtree } from "@/api/shebei/account";
import { initspareDatabase, detailSpareDatabase, removeBeanSpareDatabase } from "@/api/shebei/InventoryManagement";

import pagingEle from "./component/pagingele";
import addEle from "./popup/bjadd";
import editEle from "./popup/bjedit";
export default {
  name: "",
  components: { pagingEle, addEle, editEle },
  props: {},
  data() {
    return {
      // 表单
      form: {
        equipmentCoding: "",
        name: ""
      },
      // 规则
      rules: {
        equipmentCoding: [{ required: false }],
        name: [{ required: false }]
      },

      // 树
      selecTtree: {
        data: []
      },

      // 树形 规则
      defaultProps: {
        children: "children",
        label: "name"
      },

      // table数据
      tableData: [{ name: 1213 }],
      total: null,
      flag: null,
      detailAll:{}
    };
  },
  activated() {},
  watch: {},
  async created() {
    // 树形 data
    const { data: res } = await selecTtree();
    this.selecTtree.data = res.data;

    this.ininTab();
  },
  mounted() {},
  methods: {
    // 重置
    clearform() {
      this.$refs.form.resetFields();
    },

     // 查询
    async infoQuery() {
      const { data: res } = await initspareDatabase(this.form);
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 添加
    showAdd() {
      this.$refs.add.dialogVisible = true;
      this.ininTab();
    },

    // 编辑/ 详情
    async showEdit(val, ele) {
       const { data: res } = await detailSpareDatabase({ id: ele.id });
      this.detailAll = res.data;
      this.flag = val;
      this.$refs.edit.dialogVisible = true;
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
    },

    // 新增成功
    addupdate() {
      this.ininTab();
    },

    // 编辑成功
    updateEdit() {
      this.ininTab();
    },

    // 初始化数据
    async ininTab() {
      const { data: res } = await initspareDatabase();
      this.tableData = res.data.records;
      this.total = res.data.total;
    },

    // 删除
    async delList(val) {
      const rest = await this.$confirm("是否确定删除本条数据?", "数据删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      //  取消删除
      if (rest !== "confirm") return this.$message("取消删除成功");
      const { data: res } = await removeBeanSpareDatabase({ids: val});
      if (res.code !== 200) return this.$message.error(res.msg);
      this.$message.success("删除成功");
      // 初始话数据
      this.ininTab();
    }
  },
  computed: {}
};
</script>
<style scoped lang="scss">
.paging {
  margin-left: 30%;
}
/deep/.cell {
  text-align: center;
}
</style>
