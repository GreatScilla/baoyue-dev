<template>
  <div>
    <!-- :modal-append-to-body="false" -->
    <el-dialog
      append-to-body
      title="库存明细"
      :visible.sync="detailVisible"
      width="60%"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>
      <!-- 导出按钮 -->
      <el-row>
        <el-col :span="18"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"
          ><div
            class="grid-content bg-purple "
            :style="{ 'margin-left': '150px' }"
          >
            <el-button type="primary">导出</el-button>
          </div></el-col
        >
      </el-row>

      <!-- ---- -->

      <el-row>
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="location"
              label="所在仓库"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="barCode" label="库位" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="assetTag"
              label="资产编号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="equipmentCoding"
              label="设备编号"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="设备名称"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="category"
              label="设备类别"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="model"
              label="规格型号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot:default="slotProps">
                <el-button
                  type="primary"
                  size="small"
                  @click="detailsDalog(slotProps.row)"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <!-- 分页 -->
        <el-col class="newMtop">
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :total="total"
            @size-change="handlePageSize"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-col>
      </el-row>

      <!-- 二层盒子 -->
      <el-dialog
        width="60%"
        title="设备详情"
        :visible.sync="innerVisible"
        @close="detailClosed"
        append-to-body
      >
        <el-divider></el-divider>

        <!-- 详情组件 -->
        <detail-ele :ROWall="ROWall"></detail-ele>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
// 明细
import {
  sbpageList,
  getdetailinfo
} from "../../../../../api/shebei/InventoryManagement";

//组件
import detailEle from "./details";
export default {
  name: "",
  components: {
    detailEle
  },
  props: {
    detailVisible: {
      type: [String, Number, Object]
    },
    roeAll: {
      type: [String, Number, Object]
    }
  },
  data() {
    return {
      // 二层弹框
      innerVisible: false,

      // tablue
      tableData: [],

      // 分页
      total: 50,
      // 条件查询 明细需要的
      paging: {
        pageNum: 1,
        pageSize: 10,
        specifications: "",
        name: "",
        category: ""
      },

      // 详情本条数据
      ROWall: {}
    };
  },
  activated() {},
  watch: {
    // 本条数据
    roeAll(val) {
      this.paging.model = val.model;
      this.paging.name = val.name;
      this.paging.category = val.category;

      this.initTable();
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 隐藏弹框
    updateVisible() {
      this.$emit("updateVisible");
    },

    // 重置
    detailialogClosed() {
    },

    // 二级重置
    detailClosed() {
      this.ROWall = {};
    },

    // 详情
    async detailsDalog(val) {
      const { data: res } = await getdetailinfo({ id: val.id});
      this.ROWall = res.data;
      this.innerVisible = true;
    },

    // 第几页
    handleCurrentChange(val) {
      this.paging.pageNum = val;
      this.initTable();
    },

    // 几条
    handlePageSize(val) {
      this.paging.pageSize = val;
      this.initTable();
    },

    // init table
    async initTable() {
      const { data: res } = await sbpageList(this.paging);
      this.tableData = res.data.records;
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style lang="scss" scoped>
/deep/.el-dialog__body {
  padding: 0px 20px;
}
</style>
