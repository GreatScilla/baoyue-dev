<template>
  <div class="pages addPages">
    <el-form :inline="true" label-width="150px" class="detail-form">
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
        <el-col :span="12">
          <el-form-item label="操作员">
            <el-select
              :disabled="type === 'detail'"
              v-model="form.operatorId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-table border :data="form.sublistList">
          <el-table-column>
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
          </el-table-column>
          <el-table-column>
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
          </el-table-column>
          <!-- <el-table-column
            v-if="type !== 'detail'"
            type="selection"
            width="60"
          ></el-table-column> -->
          <el-table-column width="120px" label="工艺指标">
            <el-table-column width="120px" label="釜号">
              <template slot-scope="{ row }">
                <span v-if="type === 'detail'">
                  {{ row.stillNo }}
                </span>
                <el-input v-else v-model="row.stillNo"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column width="120px" label="型号种类">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.type }}
              </span>
              <el-input v-else v-model="row.type"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="入釜时间">
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
          <el-table-column align="center" label="板材蒸养控制">
            <el-table-column width="80px" label="抽真空(MPa)-0.06">
              <el-table-column width="80px" label="30min">
                <template slot-scope="{ row }">
                  <span v-if="type === 'detail'">
                    {{ row.sp1 }}
                  </span>
                  <el-input v-else v-model="row.sp1"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="升压阶段（MPa)">
              <el-table-column width="80px" label="负0.06-0">
                <el-table-column width="80px" label="60min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp2 }}
                    </span>
                    <el-input v-else v-model="row.sp2"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="0-0.1">
                <el-table-column width="80px" label="60min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp3 }}
                    </span>
                    <el-input v-else v-model="row.sp3"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="0.1-0.3">
                <el-table-column width="80px" label="60min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp4 }}
                    </span>
                    <el-input v-else v-model="row.sp4"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="0.3-0.6">
                <el-table-column width="80px" label="60min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp5 }}
                    </span>
                    <el-input v-else v-model="row.sp5"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="0.6-1.25">
                <el-table-column width="80px" label="60min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp6 }}
                    </span>
                    <el-input v-else v-model="row.sp6"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="恒压阶段(MPa)">
              <el-table-column width="80px" label="1.2±0.05MPa">
                <el-table-column width="80px" label="10板9h">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp7 }}
                    </span>
                    <el-input v-else v-model="row.sp7"></el-input>
                  </template>
                </el-table-column>
                <el-table-column width="80px" label="20板8h">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp8 }}
                    </span>
                    <el-input v-else v-model="row.sp8"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="降压阶段(MPa)">
              <el-table-column width="80px" label="1.25-0.3">
                <el-table-column width="80px" label="120min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp9 }}
                    </span>
                    <el-input v-else v-model="row.sp9"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="0.3-0">
                <el-table-column width="80px" label="30min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp10 }}
                    </span>
                    <el-input v-else v-model="row.sp10"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="开釜门">
                <el-table-column width="80px" label="20min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp11 }}
                    </span>
                    <el-input v-else v-model="row.sp11"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column align="center" label="砌块蒸养控制">
            <el-table-column width="80px" label="抽真空(MPa)-0.05">
              <el-table-column width="80px" label="30min">
                <template slot-scope="{ row }">
                  <span v-if="type === 'detail'">
                    {{ row.sp12 }}
                  </span>
                  <el-input v-else v-model="row.sp12"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="升压阶段（MPa)">
              <el-table-column width="80px" label="0-0.3">
                <el-table-column width="80px" label="30min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp13 }}
                    </span>
                    <el-input v-else v-model="row.sp13"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="0.3-0.6">
                <el-table-column width="80px" label="60min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp14 }}
                    </span>
                    <el-input v-else v-model="row.sp14"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="0.6-1.25">
                <el-table-column width="80px" label="60min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp15 }}
                    </span>
                    <el-input v-else v-model="row.sp15"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="恒压阶段(MPa)">
              <el-table-column width="80px" label="1.2±0.05MPa">
                <el-table-column width="80px" label="10砖>6.5h">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp16 }}
                    </span>
                    <el-input v-else v-model="row.sp16"></el-input>
                  </template>
                </el-table-column>
                <el-table-column width="80px" label="20砖>5.5h">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp17 }}
                    </span>
                    <el-input v-else v-model="row.sp17"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="降压阶段(MPa)">
              <el-table-column width="80px" label="1.25-0.3">
                <el-table-column width="80px" label="60min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp18 }}
                    </span>
                    <el-input v-else v-model="row.sp18"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column width="80px" label="0.3-0">
                <el-table-column width="80px" label="30min">
                  <template slot-scope="{ row }">
                    <span v-if="type === 'detail'">
                      {{ row.sp19 }}
                    </span>
                    <el-input v-else v-model="row.sp19"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column width="180px" label="出釜时间">
            <template slot-scope="{ row }">
              <span v-if="type === 'detail'">
                {{ row.comeTime }}
              </span>
              <el-date-picker
                v-else
                v-model="row.comeTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_p">
          <span style="width: 15%" class="th">疏水要求</span>
          <span style="width: 85%" class="td">
            1、 0.05Mpa 打开 手动疏水阀疏水至0.5Mpa关闭；2、 0.9Mpa 打开
            手动疏水阀疏水 10 分钟；3、 1.1Mpa 打开 手动疏水阀疏水 10 分钟；
            4、恒压一小时后， 打开手动疏水阀疏水 10分钟。
          </span>
        </div>
        <div class="table_p">
          <span style="width: 15%" class="th">本班设备工艺异常情况</span>
          <span style="width: 85%" class="td">
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
          @click="$router.push('/production-management/pipePosition')"
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
import { pipePositionSubmit } from "@/api/recordSheet/index";
import { getShiftList } from "@/api/humanResources/shift";
import { getUser } from "@/api/base-data/user";
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
      userList: [],
    };
  },
  computed: {},
  async created() {
    let res = await getShiftList({ current: 1, size: 10000, name: "" });
    this.options = res.data.data.records;
    let user = await getUser({ current: 1, size: 10000, status: 0 });
    this.userList = user.data.data.records;
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
      const res = await pipePositionSubmit(this.form);
      if (res.data.code === 200) {
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/production-management/pipePosition",
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
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  font-size: 14px;
  display: flex;

  .th {
    background: #fafafa;
    display: inline-block;
    border-right: 1px solid #ebeef5;
    padding: 10px 20px;
  }
  .td {
    padding: 5px 5px;
    display: inline-block;
  }
}
</style>