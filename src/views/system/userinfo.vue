<template>
  <div>
    <basic-container>
      <avue-tabs
        :option="option"
        v-model="form"
        @change="handleChange"
        @submit="handleSubmit"
        :upload-after="uploadAfter"
      ></avue-tabs>
    </basic-container>
  </div>
</template>

<script>
import option from "@/const/user/info";
import { getUserInfo, updateInfo, updatePassword } from "@/api/system/user";
import md5 from "js-md5";

export default {
  data() {
    return {
      type: "info",
      option: option,
      form: {},
    };
  },
  created() {
    this.handleWitch();
  },
  methods: {
    handleSubmit() {
      if (this.type === "info") {
        updateInfo(this.form).then((res) => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "修改信息成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
          }
        });
      } else {
        updatePassword(
          this.form.oldPassword,
          this.form.newPassword,
          this.form.newPassword1
        ).then((res) => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "修改密码成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
          }
        });
      }
    },
    handleWitch() {
      if (this.type === "info") {
        getUserInfo().then((res) => {
          const user = res.data.data;
          this.form = {
            id: user.id,
            avatar: user.avatar,
            name: user.name,
            realName: user.realName,
            phone: user.phone,
            email: user.email,
          };
        });
      }
    },
    handleChange(item) {
      this.type = item.prop;
      this.handleWitch();
    },
    uploadAfter(res, done, loading) {
      done();
      if (res.url != null) {
        this.form.avatar = window.baseServerUrl + "/" + res.url;
      }
      return;
    },
  },
};
</script>

<style>
</style>
