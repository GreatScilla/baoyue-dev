<template>
  <div>
    <el-dialog
      :title="title"
      style="background-color: rgba(0, 0, 0, 0.5)"
      :modal="false"
      @opened="openAll"
      :visible.sync="info.detailShow"
      width="60%"
      :before-close="handleClose"
    >
      <!--    <br>-->
      <!--    <br>-->
      <b>基本信息</b>
      <el-button
        v-if="info.flag == 'add'"
        @click="savebtn"
        type="primary"
        size="small"
        style="float: right"
        >保存</el-button
      >
      <el-button
        v-if="info.flag == 'edit'"
        @click="editbtn"
        type="primary"
        size="small"
        style="float: right"
        >保存</el-button
      >
      <br />
      <br />
      <el-divider></el-divider>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        ref="formInline"
      >
        <el-form-item label="单据编号">
          <el-input
            v-model="formInline.tagName"
            placeholder="自动生成"
          ></el-input>
        </el-form-item>
        <el-form-item label="监控名称">
          <el-input v-model="formInline.name" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="监控位置">
          <el-input
            v-model="formInline.position"
            placeholder="手动输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="IP地址：">
          <el-input v-model="formInline.url" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <!-- <el-input
            v-model="formInline.isOpened"
            placeholder="手动输入"
          ></el-input> -->
          <div class="slelct3">
            <!-- <el-input v-model="formInline.dydj"></el-input> -->
            <el-select v-model="formInline.isOpened" placeholder="请选择">
              <el-option
                v-for="item in YONOptions"
                :key="item.value"
                :label="item.value"
                :value="item.label"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <!--      <el-form-item label="湿度下限">-->
        <!--        <el-input v-model="formInline.humidityLow" placeholder="手动输入"></el-input>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item label="温度点位">-->
        <!--        <el-input v-model="formInline.pidWd" placeholder="手动输入"></el-input>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item label="湿度点位">-->
        <!--        <el-input v-model="formInline.pidSd" placeholder="手动输入"></el-input>-->
        <!--      </el-form-item>-->
      </el-form>
      <b>其他信息</b>
      <el-form ref="op">
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  cameraAdd,
  cameraDetail,
  cameraUpdate,
  cameraList
} from "@/api/shebei/iInternetOfthings";
export default {
  props: ["info"],
  name: "detail",
  data() {
    return {
      title: "",
      formInline: {},
      YONOptions: [
        { label: 0, value: "是" },
        { label: 1, value: "否" },
      ],
    };
  },
  methods: {
   async editbtn() {
      this.formInline.id = this.info.id;
      delete this.formInline.createTime;
      delete this.formInline.createUser;
      delete this.formInline.createDept;
      let para = JSON.parse(JSON.stringify(this.formInline));
      cameraUpdate(para);
      this.info.detailShow = false;
       let res = await cameraList(para);
       console.log(res);
      this.$parent.getpage();
    },
    async savebtn() {
      let para = this.formInline;
      let res = await cameraAdd(para);
      if (res.data.cede) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        this.$parent.getpage();
      }
    },
    async openAll() {
      switch (this.info.flag) {
        case "edit":
          this.title = "编辑";
          break;
        case "add":
          this.title = "新增";
          break;
        case "detail":
          this.title = "详情";
          break;
      }
      if (this.info.flag == "detail" || this.info.flag == "edit") {
        let res = await cameraDetail({ id: this.info.id });
        this.formInline = res.data.data;
        console.log(this.formInline);
        // if (this.formInline.isOpened == 0) {
        //   this.formInline.isOpened = "是";
        // } else if (this.formInline.isOpened == 1) {
        //   this.formInline.isOpened = "否";
        // }
        setTimeout(() => {
          if (this.info.flag == "detail") {
            this.$refs.formInline.disabled = true;
            this.$refs.op.disabled = true;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.el-form-item {
}
</style>
