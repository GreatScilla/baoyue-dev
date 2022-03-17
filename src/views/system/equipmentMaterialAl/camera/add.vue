// 摄像头新增、修改、详情
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
            <el-form-item required label="摄像头名称" prop="name">
              <span v-if="type === 'detail'">{{ form.name }}</span>
              <el-input v-else size="small" v-model="form.name">
              </el-input>
            </el-form-item>
            <el-form-item required label="IP地址" prop="url">
              <span v-if="type === 'detail'">{{ form.url }}</span>
              <el-input v-else size="small" v-model="form.url">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="deatilsColumn">
            <el-form-item required label="摄像头位置" prop="position">
              <span v-if="type === 'detail'">{{ form.position }}</span>
              <el-input v-else size="small" v-model="form.position"> </el-input>
            </el-form-item>
            <el-form-item required label="是否启用" prop="isOpened">
              <span v-if="type === 'detail'">{{ isOpenedName }}</span>
              <el-select v-if="type !== 'detail'" v-model="form.isOpened">
                <el-option
                  v-for="item of isOpenedList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
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
import { submit, detailList } from "@/api/equipmentMaterialAl/camera";
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
      isOpenedName:"",
      isOpenedList: [
        { id: "0", name: "启用" },
        { id: "1", name: "未启用" },
      ],
      form: {},
    };
  },
  async created() {
    if (this.type !== "add") {
      const res = await detailList(this.data.id);
      this.form = res.data.data;
      this.isOpenedList.map(el=>{
        if (this.form.isOpened==el.id) {
          this.isOpenedName = el.name
        }
      })
    }
  },
  computed: {},
  methods: {
    async saveData() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
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
