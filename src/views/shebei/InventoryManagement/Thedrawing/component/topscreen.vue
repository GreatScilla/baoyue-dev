<template>
  <div>

    <el-dialog
      title="条件搜索"
      :visible.sync="info.searchShow"
      width="30%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-form inline :label-position="labelPosition" :model="form">
        <el-row>
<!--          <el-col :span="6"><div class="grid-content bg-purple">-->
            <el-form-item label="调拨类型">
              <el-select v-model="form.allotType" placeholder="请选择">
                <el-option
                  v-for="item in allotTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--          </div></el-col>-->
<!--          <el-col :span="6"><div class="grid-content bg-purple-light">-->
            <el-form-item label="调出仓库">
              <el-select v-model="form.inIocation" placeholder="请选择">
                <el-option
                  v-for="item in inIocationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--          </div></el-col>-->
<!--          <el-col :span="6"><div class="grid-content bg-purple">-->
            <el-form-item label="调入仓库">
              <el-select v-model="form.outlocation" placeholder="请选择">
                <el-option
                  v-for="item in outlocationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
<!--          </div></el-col>-->
        </el-row>

        <el-row>
<!--          <el-col :span="7"><div class="grid-content bg-purple">-->
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
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <el-button type="primary" @click="InfoQuery"  size="small">查询</el-button>
            <el-button type="info" @click="clearForm" size="small">重置</el-button>
          </div></el-col>
        </el-row>
      </el-form>
    </el-dialog>



  </div>
</template>
<script>
import { pageTable } from "@/api/shebei/InventoryManagement";
export default {
  name: "",
  components: {},
  props: ["info"],
  data() {
    return {
      dialogVisible:"true",
      form: {
        allotType: "", // 设备类型
        documentTime: "", // 单据日期,
        inlocation: "", // 入仓库
        outlocation: "" // 出仓库
      },

      // 设备类型sle
      allotTypeOptions: [
        {
          value: "0",
          label: "库内调拨"
        },
        {
          value: "1",
          label: "库外调拨"
        }
      ],
      // 出
      inIocationOptions: [
        {
          value: "仓库a",
          label: "仓库a"
        },
        {
          value: "仓库b",
          label: "仓库b"
        }
      ],
      // 入
      outlocationOptions: [
        {
          value: "仓库A",
          label: "仓库A"
        },
        {
          value: "仓库B",
          label: "仓库B"
        }
      ]
    };
  },
  activated() {},
  watch: {
    // 方法一 : name function () {}
    // 方法二 : name { 1. handler () {} 此方法可加 2. immediate = true 该回调开始立刻调用 方法一没有}
  },
  created() {},
  mounted() {},
  methods: {
    // 查询
    async InfoQuery() {
      this.info.searchShow=false
      console.log(this.info.searchShow)
      const { data: res } = await pageTable(this.form);
      if (res.code == 200) {
        this.$emit("updateTB", res.data);
      }
    },
    clearForm() {
      this.form = {};
      this.InfoQuery();
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
/deep/.el-range-editor.el-input__inner {
  width: 255px;
  padding: 0 0 0 5px;
}
</style>
