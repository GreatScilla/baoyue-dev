<template>
  <div class="pages addPages">
    <el-form :inline="true" label-width="180px" class="detail-form">
      <el-row style="margin: 10px 0">
        <el-col :span="12">
          <el-form-item label="日期">
            <span v-if="type === 'detail'">
              {{ form.date }}
            </span>
            <el-date-picker
              v-else
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班次">
            <el-select
              :disabled="type === 'detail'"
              v-model="form.shift"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.className"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-table border :data="form.sublistList">
          <el-table-column type="index" align="center" width="80">
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
                @click="handleDelete(scope.$index)"
                :disabled="type === 'detail'"
              ></el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column
            v-if="type !== 'detail'"
            type="selection"
            width="60"
          ></el-table-column> -->
          <el-table-column width="120px" label="模数">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.modulus }}
              </span>
              <el-input v-else v-model="row.modulus"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="模框侧板号">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.boardNo }}
              </span>
              <el-input v-else v-model="row.boardNo"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="产品类型">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.type }}
              </span>
              <el-input v-else v-model="row.type"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="浇注时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.pourTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.pourTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="提模时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.toDieTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.toDieTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>

          <el-table-column width="120px" label="静停室温度">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.temperature }}
              </span>
              <el-input v-else v-model="row.temperature"></el-input
            ></template>
          </el-table-column>

          <el-table-column width="180px" label="静停时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.staticStopTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.staticStopTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="提模硬度">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.rigidity }}
              </span>
              <el-input v-else v-model="row.rigidity"></el-input
            ></template>
          </el-table-column>
          <el-table-column width="120px" label="模框是否有残渣">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.isResidue }}
              </span>
              <el-input v-else v-model="row.isResidue"></el-input
            ></template>
          </el-table-column>
          <el-table-column width="120px" label="模框涂油是否正常">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.isLiquoring }}
              </span>
              <el-input v-else v-model="row.isLiquoring"></el-input>
            </template>
          </el-table-column>

          <el-table-column width="120px" label="模框是否漏浆">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.isMortarLeakage }}
              </span>
              <el-input v-else v-model="row.isMortarLeakage"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="坯体发起高度">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.height }}
              </span>
              <el-input v-else v-model="row.height"></el-input
            ></template>
          </el-table-column>
          <el-table-column width="120px" label="涂油机及脱模油液位是否正常">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.isTheOil }}
              </span>
              <el-input v-else v-model="row.isTheOil"></el-input
            ></template>
          </el-table-column>
          <el-table-column width="120px" label="静停摆渡车是否正常">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.isStaticStop }}
              </span>
              <el-input v-else v-model="row.isStaticStop"></el-input
            ></template>
          </el-table-column>
        </el-table>
        <div class="table_p">
          <span class="th">交班人</span>
          <span class="td">
            <span v-if="type === 'detail'">
              {{ form.junction }}
            </span>
            <el-input v-else v-model="form.junction"></el-input>
          </span>
          <span class="th">接班人</span>
          <span class="td">
            <span v-if="type === 'detail'">
              {{ form.successor }}
            </span>
            <el-input v-else v-model="form.successor"></el-input
          ></span>
        </div>
      </el-row>
      <el-row class="footer-box">
        <el-button
          @click="$router.push('/production-management/shuttleBusPosition')"
          size="small"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="submit"
          >保存</el-button
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { shuttleBusPositionSubmit } from "@/api/recordSheet/index";
import { getShiftList } from "@/api/humanResources/shift";
export default {
  props: {
    type: {
      // 类型分add,edit,detail
      type: String,
      default: "add",
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
      form: {
        sublistList: [{}], //列表
      },
      options: [],
    };
  },
  computed: {},
  async created() {
    let res = await getShiftList({ current: 1, size: 10000, name: "" });
    this.options = res.data.data.records;
    if (this.type !== "add") {
      this.form = this.$route.query.data;
      this.form.shift = Number(this.form.shift);
    }
  },
  methods: {
    handleAdd() {
      this.form.sublistList.push({});
    },
    handleDelete(index) {
      this.form.sublistList.splice(index, 1);
    },
    async submit() {
      const res = await shuttleBusPositionSubmit(this.form);
      if (res.data.code === 200) {
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/production-management/shuttleBusPosition",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.footer-box {
  margin: 20px 0;
}
.table_p {
  height: 32px;
  line-height: 32px;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  font-size: 14px;
  display: flex;

  .th {
    background: #fafafa;
    display: inline-block;
    border-right: 1px solid #ebeef5;
    padding: 0 20px;
  }
  .td {
    padding: 0 5px;
  }
}
</style>