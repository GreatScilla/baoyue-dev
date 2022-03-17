<template>
  <div>
    <div v-if="status == 'detail'">
      <div
        tabindex="0"
        class="file-item"
        v-for="(item, index) in fileList"
        :key="index"
        @click="handlePictureCardPreview(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <div v-else-if="status == 'pic-list'">
      <div
        tabindex="0"
        class="pic-list-item"
        v-for="(item, index) in fileList"
        :key="index"
        @click="handlePictureCardPreview(item)"
      >
        <img class="pic-list-img" :src="item.name" alt="" />
      </div>
    </div>

    <div class="uploadBox" v-else>
      <el-upload
        action="#"
        :list-type="listType"
        :limit="limit"
        :multiple="multiple"
        :on-exceed="handleOverLimit"
        :on-success="handleSuccess"
        :before-upload="handleBefore"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :http-request="handleBeforeUpload"
      >
        <el-button v-if="listType === 'text'" size="small" type="primary"
          >点击上传</el-button
        >
        <i v-else class="el-icon-plus"></i>
        <div
          slot="tip"
          class="el-upload__tip"
          v-if="listType !== 'picture-card'"
        >
          <span v-if="message">建议上传{{ message }}，</span>
          单个附件最大支持20MB,PDF/Word/Excel/Txt/JPG/PNG/BMP/GIF/RAR/ZIP
        </div>
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <el-carousel v-if="isCarousel" trigger="click" height="600px">
        <el-carousel-item v-for="item in fileList" :key="item.url">
          <img :src="item.url" />
        </el-carousel-item>
      </el-carousel>
      <img v-else width="100%" :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>

<script>
import { upload } from "@/api/common";
import uploadUrl from "@/config/uploadConfig";
import { download } from "@/util/util";
import { client } from "@/util/oss.js";
const formatImg = [
  "png",
  "jpg",
  "jpeg",
  "bmp",
  "gif",
  "webp",
  "psd",
  "svg",
  "tiff",
];
export default {
  name: "UploadImage",
  props: {
    limit: {
      // 最大上传张数
      type: Number,
      default: 100,
    },
    multiple: {
      // 是否支持多选
      type: Boolean,
      default: false,
    },
    imageList: {
      // 已上传的文件列表
      type: Array,
      default() {
        return [];
      },
    },
    isCarousel: {
      // 查看大图时是否轮播图展示
      type: Boolean,
      default: false,
    },
    message: {
      // 上传信息
      type: String,
      default: "订单付款凭证",
    },
    listType: {
      type: String,
      default: "text",
    },
    status: String,
  },
  data() {
    return {
      // headers: {process.env.VUE_APP_BASE_API}, // 请求头
      dialogImageUrl: "", // 查看大图
      disabled: false,
      fileList: [],
      dialogVisible: false,
    };
  },
  watch: {
    imageList: {
      handler(value) {
        this.fileList = [];
        value.forEach((item, index) => {
          let obj = {
            name: item,
            url: item,
            uid: index,
          };
          this.fileList.push(obj);
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      // 查看大图
      if (file.name.url) file = file.name;
      if (!file.url) file = { url: file };
      let s = file.url.split(".");
      if (formatImg.indexOf(s[s.length - 1]) !== -1) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      } else {
        let aEle = document.createElement("a");
        aEle.target = "_blank";
        aEle.href = file.url;
        aEle.click();
      }
    },
    handleRemove(file, fileList) {
      // 删除时的钩子
      this.$emit("on-remove", fileList);
      // debugger
      // this.fileList = this.fileList.filter(item => item.url !== file.url)
      this.fileList = fileList;
    },
    handleOverLimit(file) {
      this.$message.error({
        message: "图片超出限制张数",
      });
    },
    clearFiles() {
      this.fileList = [];
    },
    handleBefore(file) {
      if (this.listType !== "picture-card") {
        return;
      }
      if (formatImg.indexOf(file.name.split(".")[1]) === -1) {
        this.$message.error("请上传图片");
        return false;
      }
    },
    async handleBeforeUpload(param) {
      const fd = new FormData();
      fd.append("file", param.file);
      let res = await upload(fd);
      if (res.data.code === 200) {
        return `${res.data.data.url}`;
      }
    },
    handleSuccess(url, file) {
      file.url = url;
      this.$emit("on-success", url);
    },
  },
};
</script>
<style lang="scss">
.uploadBox {
  .el-upload-list__item {
    transition: none !important;
  }
}
.file-item:hover {
  cursor: pointer;
  color: #157a2c;
  background-color: #f5f7fa;
}
.pic-list-item {
  display: inline-block;
  width: 148px;
  height: 148px;
  margin-right: 10px;
}
</style>