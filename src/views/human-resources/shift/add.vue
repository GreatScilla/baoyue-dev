// 班次管理新增、修改、详情
<template>
  <basic-container>
    <el-row>
      <el-form
        label-width="120px"
        ref="shiftForm"
        :rules="rules"
        :model="shiftForm"
        class="detail-form"
        :inline-message="true"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item required label="班次编号:" prop="code" v-if="shiftForm.code">
              <span v-if="type === 'detail'"> {{ shiftForm.code }}</span>
              <el-input
                v-else
                size="small"
                v-model="shiftForm.code"
                :disabled="true"
                placeholder="请输入班次编号">
              </el-input>
            </el-form-item>
             <el-form-item required label="班次名称:" prop="className">
              <span v-if="type === 'detail'">{{ shiftForm.className }}</span>
              <el-input
                v-else
                size="small"
                v-model="shiftForm.className"
                placeholder="请输入班次名称">
              </el-input>
            </el-form-item>
               <el-form-item required label="上班时间:" prop="upTime">
              <span v-if="type === 'detail'">{{shiftForm.upTime}}</span>
              <el-time-picker
                v-else
                size="small"
                v-model="shiftForm.upTime"
                format="HH:mm"
                value-format="HH:mm"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          
            <el-form-item required label="最迟上班时间:" prop="upTimeTwo">
              <span v-if="type === 'detail'">{{shiftForm.upTimeTwo}}</span>
              <el-time-picker
                v-else
                size="small"
                format="HH:mm"
                value-format="HH:mm"
                v-model="shiftForm.upTimeTwo"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item required label="最早下班时间:" prop="belowTimeOne">
              <span v-if="type === 'detail'">{{shiftForm.belowTimeOne}}</span>
              <el-time-picker
                v-else
                size="small"
                format="HH:mm"
                value-format="HH:mm"
                v-model="shiftForm.belowTimeOne"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="状态:">
              <span v-if="type === 'detail'">{{shiftForm.isEnabled | state}}</span>
              <el-select v-model="shiftForm.isEnabled" placeholder="请选择" size="small" v-else>
                <el-option
                  v-for="item in shiftStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item required label="最早上班时间:" prop="upTimeOne">
              <span v-if="type === 'detail'">{{shiftForm.upTimeOne}}</span>
              <el-time-picker
                v-else
                size="small"
                v-model="shiftForm.upTimeOne"
                format="HH:mm"
                value-format="HH:mm"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item required label="下班时间:" prop="belowTime">
              <span v-if="type === 'detail'">{{shiftForm.belowTime}}</span>
              <el-time-picker
                v-else
                size="small"
                v-model="shiftForm.belowTime"
                format="HH:mm"
                value-format="HH:mm"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item required label="最迟下班时间:" prop="belowTimeTwo">
              <span v-if="type === 'detail'">{{shiftForm.belowTimeTwo}}</span>
              <el-time-picker
                v-else
                size="small"
                v-model="shiftForm.belowTimeTwo"
                format="HH:mm"
                value-format="HH:mm"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer" >
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button v-if="type != 'detail'" size="small" type="primary" @click="handleSave">
        保存
      </el-button>
    </el-row>
  </basic-container>
</template>

<script>
import { addShift, updateShift } from "@/api/humanResources/shift";
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
      shiftForm: {
        code: "",
        className: "",
        upTimeOne: "",
        upTimeTwo: "",
        belowTimeOne: "",
        belowTimeTwo: "",
        isEnabled: 0
      },
      rules: {
        code: [
          { required: true, message: "请输入班次编号", trigger: "blur" }
        ],
        className: [
          { required: true, message: "请输入班次名称", trigger: "blur" }
        ],
        isEnabled: [
          { required: true, message: "请选择班次状态", trigger: "change" }
        ],
        upTimeOne: [
          { required: true, message: "请选择最早上班时间", trigger: "change" }
        ],
        upTimeTwo: [
          { required: true, message: "请选择最迟上班时间", trigger: "change" }
        ],
        belowTimeOne: [
          { required: true, message: "请选择最早下班时间", trigger: "change" }
        ],
        belowTimeTwo: [
          { required: true, message: "请选择最迟下班时间", trigger: "change" }
        ]
      },
      shiftStatus: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "停用"
        }
      ]
    };
  },
  methods: {
    cancel() {
      this.$router.push("/human-resources/shift");
    },
    async handleSave() {
      try {
        await this.$refs.shiftForm.validate();
      } catch (error) {
        return;
      }
      let res;
      const data = this.shiftForm;
      if (this.type === "add") {
        res = await addShift(data);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          this.$router.push({
            path: "/human-resources/shift"
          });
        }
      } else if (this.type === "edit") {
        res = await updateShift(data);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          this.$router.back()
        }
      }
    }
  },
  async mounted() {
    if (this.type!=="add") {
      this.shiftForm = this.data;
    }
  },
  filters: {
    state: function(value) {
      if (value === 0) {
        value = "启用";
      } else if (value === 1) {
        value = "停用";
      }
      return value;
    }
  },
};
</script>

<style lang="scss" scoped>
.el-input,.el-select{
  width:360px
}
</style>
