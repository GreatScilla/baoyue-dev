// 温度计新增、修改、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="form"
      class="detail-form"
      :rules="rules"
      ref="form"
      :show-message="false"
    >
      <el-row>
        <el-row style="margin-left: -35px">
          <div class="title">基本信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item require required label="参数点位">
              <span v-if="type === 'detail'">{{ paramPointName }}</span>
              <el-select
                multiple
                multiple-limit="2"
                collapse-tags
                placeholder="请选择温度/湿度"
                v-if="type !== 'detail'"
                v-model="paramPointList"
              >
                <el-option
                  v-for="item of paramList"
                  :key="item.id"
                  :label="item.tagName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="温度上限" prop="temTop">
              <span v-if="type === 'detail'">{{ form.temTop }}</span>
              <el-input v-else size="small" v-model="form.temTop">
              </el-input>
            </el-form-item>
            <el-form-item required label="湿度上限" prop="humTop">
              <span v-if="type === 'detail'">{{ form.humTop }}</span>
              <el-input v-else size="small" v-model="form.humTop">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item required label="所在位置" prop="position">
              <span v-if="type === 'detail'">{{ form.position }}</span>
              <el-input v-else size="small" v-model="form.position"> </el-input>
            </el-form-item>
            <el-form-item required label="温度下限" prop="temLow">
              <span v-if="type === 'detail'">{{ form.temLow }}</span>
              <el-input v-else size="small" v-model="form.temLow">
              </el-input>
            </el-form-item>
            <el-form-item required label="湿度下限" prop="humLow">
              <span v-if="type === 'detail'">{{ form.humLow }}</span>
              <el-input v-else size="small" v-model="form.humLow">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-left: -35px">
          <div class="title">其它信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <span v-if="type === 'detail'">{{ form.remark || "无" }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.remark"
                placeholder="请输入备注"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>

      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="saveData"
          >保存</el-button
        >
      </el-row>
    </el-form>
  </basic-container>
</template>

<script>
import {
  getParamlist,
  submit,
  detailList,
} from "@/api/equipmentMaterialAl/thermometer";
export default {
  props: {
    type: {
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
      paramPointName: [],
      paramPointList: [],
      paramList: [],
      tagNames: [],
      form: {},
    };
  },
  async created() {
    const res = await getParamlist();
    this.paramList = res.data.data;
    if (this.type !== "add") {
      const res = await detailList(this.data.id);
      this.form = res.data.data;
      this.paramPointList = res.data.data.paramPoint.split(",");
      this.paramList.map((el) => {
        this.paramPointList.map((item) => {
          if (item == el.id) {
            this.paramPointName.push(el.tagName);
          }
        });
      });
      this.paramPointName = this.paramPointName.join(",\n");
    }
  },
  computed: {},
  methods: {
    async saveData() {
      var arr = new Array();
      this.paramPointList.map((el) => {
        this.paramList.map((item) => {
          if (item.id == el) {
            arr.push(item.tagName);
          }
        });
      });
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      if (this.paramPointList.length <= 0) {
        this.$message.error({
          message: "请选择参数点位",
        });
        return;
      } else if (this.paramPointList.length <= 1) {
        this.$message.error({
          message: "参数点位且必须为两个",
        });
        return;
      } else if (!arr[0].match(RegExp(/温度/))) {
        this.$message.error({
          message: "第一个参数点位且必须温度",
        });
        return;
      } else if (!arr[1].match(RegExp(/湿度/))) {
        this.$message.error({
          message: "第二个参数点位且必须湿度",
        });
        return;
      } else {
        this.form.paramPoint = this.paramPointList.join(",");
      }
      if (Number(this.form.temLow) > Number(this.form.temTop)) {
        return this.$message.error({
          message: "温度下限不能大于温度上限",
        });
      }
      if (Number(this.form.humLow) > Number(this.form.humTop)) {
        return this.$message.error({
          message: "湿度下限不能大于湿度上限",
        });
      }
      submit(this.form)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("保存成功");
            this.$router.back();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.detail-form {
  padding: 30px 35px;
}
.el-input,
.el-select {
  width: 240px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.deatilsColumn {
  display: flex;
  flex-direction: column;
}
</style>
