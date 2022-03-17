// 角色新增、修改、详情
<template>
  <basic-container>
    <el-row style="display: flex; justify-content: center">
      <el-form
        label-width="120px"
        :model="cateForm"
        inline-message
        ref="cateForm"
        :rules="rules"
      >
        <el-form-item label="上级分类：">
          <span v-if="type === 'detail'"> {{ cateForm.parentId }}</span>
          <el-select
            v-else
            :disabled="cateForm.disable"
            v-model="cateForm.parentId"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.cateName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称：" prop="cateName">
          <span v-if="type === 'detail'"> {{ cateForm.cateName }}</span>
          <el-input
            v-else
            size="small"
            v-model="cateForm.cateName"
            placeholder="请输入分类名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="分类简称：" prop="shortName">
          <span v-if="type === 'detail'"> {{ cateForm.shortName }}</span>
          <el-input
            v-else
            size="small"
            v-model="cateForm.shortName"
            placeholder="请输入分类简称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="计价方式：" prop="priceType">
          <span v-if="type === 'detail'"> {{ cateForm.priceType }}</span>
          <el-select
            size="small"
            v-model="cateForm.priceType"
            placeholder="请选择"
            v-else
          >
            <el-option label="先进先出法" :value="1"> </el-option>
            <el-option label="个别计价法" :value="2"> </el-option>
            <el-option label="全月平均法" :value="3"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="分类排序：" prop="sort">
          <span v-if="type === 'detail'"> {{ cateForm.sort }}</span>
          <el-input
            v-else
            size="small"
            v-model="cateForm.sort"
            placeholder="请输入排序"
          >
          </el-input>
        </el-form-item>
        <!--        <el-form-item label="可调用范围：">-->
        <!--          <el-radio v-model="cateForm.transRangeType" :label="1"-->
        <!--            >允许所有用户调用</el-radio-->
        <!--          >-->
        <!--          <el-radio v-model="cateForm.transRangeType" :label="2"-->
        <!--            >选择允许调用用户</el-radio-->
        <!--          >-->
        <!--        </el-form-item>-->
        <!--        <el-row v-show="cateForm.transRangeType === 2">-->
        <!--          <el-tree-->
        <!--            :props="userTreeProps"-->
        <!--            :data="allDeptUsers"-->
        <!--            node-key="id"-->
        <!--            ref="tree"-->
        <!--            show-checkbox-->
        <!--            @check-change="handleCheckChange"-->
        <!--          >-->
        <!--          </el-tree>-->
        <!--        </el-row>-->
        <!--        <el-form-item label="调用范围影响：">-->
        <!--          <el-radio v-model="cateForm.effectRangeType" :label="1"-->
        <!--            >影响已存在产品</el-radio-->
        <!--          >-->
        <!--          <el-radio v-model="cateForm.effectRangeType" :label="2"-->
        <!--            >不影响已存在产品</el-radio-->
        <!--          >-->
        <!--        </el-form-item>-->
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="saveRole('cateForm')"
        v-if="type !== 'detail'"
        >保存</el-button
      >
    </el-row>
  </basic-container>
</template>

<script>
import {
  getProductCates,
  getAllDeptUsers,
  saveOrUpdateProductCate,
} from "@/api/product/pruduct-categroy.js";
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
      userTreeProps: {
        children: "deptUsers",
        label: "label",
      },
      options: [],
      rules: {
        cateName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        shortName: [
          { required: true, message: "请输入分类简称", trigger: "blur" },
        ],
        priceType: [
          { required: true, message: "请选择计价方式", trigger: "change" },
        ],
        sort: [{ required: true, message: "请输入分类排序", trigger: "blur" }],
      },
      cateForm: {
        // parentId: "",
        // cateName: "",
        // shortName: "",
        // transRangeType: "",
        // priceType: "",
        // sort: "",
        // effectRangeType: "",
        // productCateEffectUserList: []
      },
    };
  },
  async mounted() {
    // 获取用户列表
    const allDeptUsersRes = await getAllDeptUsers();
    this.allDeptUsers = allDeptUsersRes.data.data;
    // 获取分类数据
    const productCateRes = await getProductCates();
    this.options = productCateRes.data.data;

    if (this.type !== "add") {
      this.cateForm = this.data;
      console.log(this.cateForm);
    }
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      this.cateForm.productCateEffectUserList =
        this.$refs.tree.getCheckedNodes();
    },
    // 剔除空级联
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].productCateList.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].productCateList = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].productCateList);
        }
      }
      return data;
    },
    // 保存
    saveRole(formName) {
      if (this.cateForm.parentId) {
        this.cateForm.parentId = String(this.cateForm.parentId);
      }
      if (
        this.cateForm.productCateEffectUserList &&
        this.cateForm.productCateEffectUserList.length > 0
      ) {
        this.cateForm.productCateEffectUserList.forEach((ele) => {
          ele.userId = ele.value;
          ele.userName = ele.label;
        });
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveOrUpdateProductCate(this.cateForm)
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.$message.success("保存成功");
                this.$router.back();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // if (typeof this.cateForm.parentId !== "string") {
      //   this.cateForm.parentId = this.cateForm.parentId.join(",");
      // }
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}

/deep/ .el-input {
  width: 360px;
}
/deep/ .el-select {
  width: 360px;
}
</style>
