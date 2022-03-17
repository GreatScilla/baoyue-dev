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
          <el-table-column width="120px" label="罐号">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.tankNo }}
              </span>
              <el-input v-else v-model="row.tankNo"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="料浆类型">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.slurryType }}
              </span>
              <el-input v-else v-model="row.slurryType"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="沙子用量（铲）">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.sandDosage }}
              </span>
              <el-input v-else v-model="row.sandDosage"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="140px" label="粉煤灰用量（铲）">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.flyashDosage }}
              </span>
              <el-input v-else v-model="row.flyashDosage"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="石粉用量（铲）">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.mountainDosage }}
              </span>
              <el-input v-else v-model="row.mountainDosage"></el-input
            ></template>
          </el-table-column>
          <el-table-column width="120px" label="石膏浆比重">
            <el-table-column width="120px" label="1.50-1.55">
              <template slot-scope="{ row }">
                <span v-if="type === 'detail'">
                  {{ row.landPlasterProportion }}
                </span>
                <el-input v-else v-model="row.landPlasterProportion"></el-input
              ></template>
            </el-table-column>
          </el-table-column>
          <el-table-column width="120px" label="废浆比重">
            <el-table-column width="120px" label="1.38-1.45">
              <template slot-scope="{ row }">
                <span v-if="type === 'detail'">
                  {{ row.wastePulpProportion }}
                </span>
                <el-input v-else v-model="row.wastePulpProportion"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column width="120px" label="料浆比重">
            <el-table-column width="120px" label="1.58-1.65">
              <template slot-scope="{ row }">
                <span v-if="type === 'detail'">
                  {{ row.slurryProportion }}
                </span>
                <el-input v-else v-model="row.slurryProportion"></el-input
              ></template>
            </el-table-column>
          </el-table-column>
          <el-table-column width="120px" label="加钢锻量（Kg)">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.addSteelForging }}
              </span>
              <el-input v-else v-model="row.addSteelForging"></el-input
            ></template>
          </el-table-column>
          <el-table-column width="180px" label="启动磨机时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.startTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.startTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="停磨机时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.endTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="料浆扩散度">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.slurryDiffusance }}
              </span>
              <el-input v-else v-model="row.slurryDiffusance"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="磨机电流">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.groundGlass }}
              </span>
              <el-input v-else v-model="row.groundGlass"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="磨完时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.completeTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.completeTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="备注">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.remark }}
              </span>
              <el-input v-else v-model="row.remark"></el-input
            ></template>
          </el-table-column>
        </el-table>
        <div class="table_p">
          <span style="width: 10%" class="th">本班设备运行情况</span>
          <span style="width: 90%" class="td">
            <span v-if="type === 'detail'">
              {{ form.anlagenzustand }}
            </span>
            <el-input v-else v-model="form.anlagenzustand"></el-input>
          </span>
        </div>
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
          @click="$router.push('/production-management/pulpingPost')"
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
import { pulpingPostSubmit } from "@/api/recordSheet/index";
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
      this.form.shift=Number( this.form.shift)
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
      const res = await pulpingPostSubmit(this.form);
      if (res.data.code === 200) {
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/production-management/pulpingPost",
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