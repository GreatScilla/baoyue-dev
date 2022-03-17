<template>
  <div>

    <el-dialog
      title="条件搜索"
      :visible.sync="info.searchShow"
      width="30%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-form inline ref="form" :model="form">
        <el-row>
<!--          <el-col :span="6"><div class="grid-content bg-purple">-->
            <el-form-item label="单据编号">
              <el-input
                class="W-inp"
                v-model="form.number"
                placeholder="请输入单据编号"
              ></el-input>
            </el-form-item>
<!--          </div></el-col>-->
<!--          <el-col :span="8"><div class="grid-content bg-purple-light">-->
            <el-form-item label="单据日期">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.documentTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
<!--          </div></el-col>-->
<!--          <el-col :span="6"><div class="grid-content bg-purple">-->
            <el-form-item label="入库类别">
              <el-select v-model="form.typeClass" placeholder="请选择">
                <el-option
                  v-for="item in typeClassOptions"
                  :key="item.value"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--          </div></el-col>-->
        </el-row>
        <el-row>
<!--          <el-col :span="6"><div class="grid-content bg-purple">-->
            <el-form-item label="入库状态">
              <el-select
                v-model="form.deliveryStatus"
                placeholder="请选择入库状态"
              >
                <el-option
                  v-for="item in deliveryStatuOptions"
                  :key="item.value"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--          </div></el-col>-->
<!--          <el-col :span="8"><div class="grid-content bg-purple-light">-->
          <br>
            <el-button type="primary" @click="InfoQuery"  size="small">查询</el-button>
            <el-button type="info" @click="resetForm" size="small">重置</el-button>
<!--          </div></el-col-->
<!--          >-->
<!--          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
        </el-row>
      </el-form>

    </el-dialog>

  </div>
</template>
<script>
import { pageTable } from "@/api/shebei/InventoryManagement";
import { getdeliveryStatus, rcmStorageStatus } from "@/api/shebei/dictionaries";
export default {
  name: "",
  components: {},
  props: ["info"],
  data() {
    return {
      searchShow:true,
      form: {
        deliveryStatus: "", // 入库状态
        number: "", // 单据编号
        documentTime: "", // 单据日期
        typeClass: "" // 入库类别
      },

      // 入库类别的下拉框
      typeClassOptions: [],

      // 入库状态
      deliveryStatuOptions: []
    };
  },
  activated() {},
  watch: {},
  async created() {
    this.init();
    const { data: res } = await getdeliveryStatus();
    this.deliveryStatuOptions = res.data;
  },
  mounted() {},
  methods: {
    // 查询
    async InfoQuery() {
      this.info.searchShow=false
      const { data: res } = await pageTable(this.form);
      if (res.code == 200) {
        this.$emit("updateTB", res.data);
      }
    },

    resetForm() {
      this.form = {};
      this.InfoQuery();
    },

    async init() {
      const { data: res } = await rcmStorageStatus();
      this.typeClassOptions = res.data;
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
/deep/ .el-range-editor.el-input__inner {
  width: 285px;
  padding: 0 0 0 10px;
}
.W-inp {
  width: 205px;
}
</style>
