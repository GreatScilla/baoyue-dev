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
          <el-table-column width="120px" label="切割模数">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.cuttingModulus }}
              </span>
              <el-input v-else v-model="row.cuttingModulus"></el-input>
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
          <el-table-column width="120px" label="尺寸规格">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.model }}
              </span>
              <el-input v-else v-model="row.model"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="入釜侧板号">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.boardNo }}
              </span>
              <el-input v-else v-model="row.boardNo"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="切割时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.cuttingTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.cuttingTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>

          <el-table-column width="120px" label="切割硬度">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.cuttingRigidity }}
              </span>
              <el-input v-else v-model="row.cuttingRigidity"></el-input
            ></template>
          </el-table-column>

          <el-table-column width="120px" label="切割温度">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.cuttingTemperature }}
              </span>
              <el-input v-else v-model="row.cuttingTemperature"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="切割速度">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.cuttingSpeed }}
              </span>
              <el-input v-else v-model="row.cuttingSpeed"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="更换钢丝时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.changeTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.changeTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="复核钢丝人">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.reviewer }}
              </span>
              <el-input v-else v-model="row.reviewer"></el-input>
            </template>
          </el-table-column>

          <el-table-column width="180px" label="翻转去底皮时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.decorticateTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.decorticateTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="入釜釜号">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.stillNo }}
              </span>
              <el-input v-else v-model="row.stillNo"></el-input
            ></template>
          </el-table-column>
          <el-table-column width="180px" label="进釜时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.enterTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.enterTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_p">
          <span style="width: 10%" class="th">本班设备工艺异常情况</span>
          <span style="width: 90%" class="td">
            <span v-if="type === 'detail'">
              {{ form.anlagenzustand }}
            </span>
            <el-input v-else v-model="form.anlagenzustand"></el-input>
          </span>
        </div>
        <div class="table_p">
          <span class="th">记录人</span>
          <span class="td">
            <span v-if="type === 'detail'">
              {{ form.notekeeper }}
            </span>
            <el-input v-else v-model="form.notekeeper"></el-input>
          </span>
          <span class="th">班长</span>
          <span class="td">
            <span v-if="type === 'detail'">
              {{ form.squadLeader }}
            </span>
            <el-input v-else v-model="form.squadLeader"></el-input
          ></span>
        </div>
      </el-row>
      <el-row class="footer-box">
        <el-button
          @click="$router.push('/production-management/cuttingPost')"
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
import { cuttingPostSubmit } from "@/api/recordSheet/index";
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
      const res = await cuttingPostSubmit(this.form);
      if (res.data.code === 200) {
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/production-management/cuttingPost",
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