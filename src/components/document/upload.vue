<template>
  <div style="display: flex; justify-content: center">
    <el-upload
      action="#"
      drag
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
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">文件不能超过8M，否则上传失效！</div>
    </el-upload>
  </div>
</template>

<script>
import { upload } from "@/api/common";
import uploadUrl from "@/config/uploadConfig";
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
  name: "Upload",
  props: {
    limit: {
      // 最大上传张数
      type: Number,
      default: 1,
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
      fileList: [],
      fileType: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // 删除时的钩子
      this.$emit("on-remove", fileList);
      // debugger
      // this.fileList = this.fileList.filter(item => item.url !== file.url)
      this.fileList = fileList;
    },
    handleOverLimit(file) {
      this.$message.error({
        message: "单次只能上传一个文件",
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
        this.fileType = res.data.data.type;
        return `${uploadUrl}${res.data.data.url}`;
      }
    },
    handleSuccess(url, file) {
      let form = {
        file: url,
        fileSize: Number(file.size),
        fileType: this.fileType,
        folderName: file.name.match(/(.*)\.[^.]+/)[1],
        type: 1,
      };
      this.$emit("on-success", form);
    },
  },
};
</script>
<style lang="scss">
// .uploadBox {
//   .el-upload-list__item {
//     transition: none !important;
//   }
// }
// .file-item:hover {
//   cursor: pointer;
//   color: #157a2c;
//   background-color: #f5f7fa;
// }
// .pic-list-item {
//   display: inline-block;
//   width: 148px;
//   height: 148px;
//   margin-right: 10px;
// }
</style>