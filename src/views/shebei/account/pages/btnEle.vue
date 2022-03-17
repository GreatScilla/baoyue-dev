<template>
  <div class="btnEle">
    <el-button size="small" type="primary" @click="searchBtn"><i class="el-icon-search"></i> 搜索</el-button>
    <el-button type="primary" size="small" @click="dialogVisible = true"
      >+ 新增</el-button
    >
    <el-button type="primary" size="small"  @click="upd"
      ><i class="el-icon-download"></i>导入</el-button
    >
    <el-button type="primary" size="small"  @click="loadExcel"
      ><i class="el-icon-upload2"></i>导出</el-button
    >
    <el-button type="danger" size="small" plain @click="delTable"
      ><i class="el-icon-delete-solid"></i>删除</el-button
    >
    <el-button type="primary" size="small"
      ><i class="el-icon-folder-checked"></i>
      <a
        style="color:#ffffff"
        href="http://bipinyun.oss-cn-shenzhen.aliyuncs.com/excel%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls"
        target="_blank"
        >下载模板</a
      >
    </el-button>
    <!-- 添加 -->
    <add-dialog
      @updateTable="$emit('updateTable')"
      :dialogVisible="dialogVisible"
      @updateVisible="updateVisible"
    ></add-dialog>

    <!-- 上传 -->
    <upload :info="info"></upload>
  </div>
</template>
<script>
import upload from "./upload.vue";
import addDialog from "./add";
import {deptList,depotList,userList} from "@/api/shebei/commit"
import { delList } from "../../../../api/shebei/account";
export default {
  name: "",
  components: {
    addDialog,
    upload
  },
  props: {
    rowIds: {
      // ids：数据格式 '12,13,14'
      type: [String, Object, Array]
    }
  },
  data() {
    return {
      info: {
        updshow: false
      },
      dialogVisible: false,

      array: { ids: "" }
    };
  },
  activated() {},
  watch: {
    rowIds(val) {
      this.array.ids = val;
    }
    // 方法一 : name function () {}
    // 方法二 : name { 1. handler () {} 此方法可加 2. immediate = true 该回调开始立刻调用 方法一没有}
  },
  created() {},
  mounted() {},
  methods: {
   async searchBtn(){
        let res = await userList()
     console.log(res.data.data)
    },
    upd() {
      this.info.updshow = true;
    },

    // 添加
    updateVisible() {
      this.dialogVisible = false;
    },
    //导出excel
    loadExcel() {
      axios({
        url: "/api/blade-rcm/equipmentinfo/export",
        method: "get",
        responseType: "blob",
        params: { ids: this.array.ids }
      })
        .then(res => {
          console.log(res);
          const link = document.createElement("a");
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          link.style.display = "none";
          //设置连接
          link.href = URL.createObjectURL(blob);
          console.log(link.href);
          link.download = "设备文件";
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 删除
    async delTable() {
      const rest = await this.$confirm("是否确定删除本条数据?", "删除角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      //  取消删除
      if (rest !== "confirm") return this.$message("取消删除成功");
      const { data: res } = await delList({ ids: this.array.ids });
      if (res.code !== 200) return this.$message.error(res.meta.msg);
      this.$message.success("删除成功");
      this.$emit("updateTable");
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
.btnEle {
  margin: 0 0 20px 0;
}
</style>
