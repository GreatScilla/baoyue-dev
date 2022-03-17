<template>
  <div class="deldialog">
    <el-dialog
      title="提示"
      :visible.sync="DeldialogVisible"
      width="380px"
      append-to-body
      :before-close="handleDeldialog"
    >
      <el-divider></el-divider>
      <div class="ioc-conter">
        <i class="el-icon-warning el-icon"></i>
        <p>此操作将永久删除该文件, 是否继续?</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDeldialog" class="out-btn">取 消</el-button>
        <el-button type="primary" @click="statedialogUp">确 定</el-button>
      </span>
      <!-- 弹框 -->
      <state-dialog
        @updateNotification="ldialogok = false"
        v-if="ldialogok"
      ></state-dialog>
    </el-dialog>
  </div>
</template>

<script>
import stateDialog from "./statedialog";

import { delList } from "../../../../api/shebei/account";
export default {
  components: {
    stateDialog
  },
  props: {
    DeldialogVisible: {
      type: Number
    },
    rowdel: {
      type: [Number, Object, String]
    }
  },
  data() {
    return {
      ldialogok: false
    };
  },
  watch: {},
  methods: {
    handleDeldialog() {
      this.$emit("updateDeldialog", false);
    },
    // 确认事件
    async statedialogUp() {
      let that = this;
      setTimeout( async () => {
      const res = await delList({ ids: that.rowdel.id });
        if (res.data.code == 200) {
          that.ldialogok = true;
          //
          setTimeout(() => {
            that.handleDeldialog();
            that.ldialogok = false;
          }, 1500);
        }
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.ioc-conter {
  text-align: center;
  .el-icon {
    width: 48px;
    height: 48px;
    font-size: 48px;
    color: #e54242;
  }
}
/deep/.el-divider {
  background-color: #bedbf8;
}
.el-button {
  width: 90px;
  height: 34px;
  line-height: 8px;
}
.out-btn {
  color: #409eff;
  border: 1.5px solid #409eff;
}
/deep/.el-dialog__body {
  padding: 10px 20px;
}
</style>
