<template>
  <div class="component-upload-img">
    <el-upload
      action="#"
      :list-type="listType ? listType :''"
      :limit="limit" 
      :multiple="multiple" 
      :on-exceed="handleOverLimit" 
      :on-success="handleSuccess" 
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="handleBefore"
      :file-list="fileList"
      :http-request="handleBeforeUpload">
      <i class="el-icon-plus" v-if="listType"></i>
      <el-button size="small" type="primary" v-else>点击上传</el-button>
      <div slot="tip" class="el-upload__tip" v-if="!listType">单个附件最大支持20MB,PDF/Word/Excel/Txt/JPG/PNG/BMP/GIF/RAR/ZIP</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <el-carousel v-if="isCarousel" trigger="click" height="600px">
        <el-carousel-item v-for="item in fileList" :key="item.url">
          <img :src="item.url">
        </el-carousel-item>
      </el-carousel>
      <img v-else width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>

<script>
import { upload } from '@/api/common'
import uploadUrl from "@/config/uploadConfig"
const format = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
export default {
  name: 'UploadImage',
  props: {
    limit: { // 最大上传张数
      type: Number,
      default: 100
    },
    multiple: { // 是否支持多选
      type: Boolean,
      default: false
    },
    imageList: { // 已上传的文件列表
      type: Array,
      default () {
        return []
      }
    },
    isCarousel: { // 查看大图时是否轮播图展示
      type: Boolean,
      default: false
    },
    listType: { // 上传类型
      type: String
    },
  },
  data () {
    return {
      dialogImageUrl: '', // 查看大图
      disabled: false,
      fileList: [],
      dialogVisible: false,
      fileUrlList:[]
    }
  },
  watch: {
    imageList: {
      handler (value) {
        this.fileList = Object.assign(value, [])
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handlePictureCardPreview (file) { // 查看大图
      this.fileUrlList.forEach((item) => {
        if (item.name === file.name) {
          if (format.indexOf(file.name.split('.')[1]) !== -1) {
            this.dialogVisible = true
            this.dialogImageUrl = item.url
          } else {
            let aEle = document.createElement("a")
            aEle.href = item.url
            aEle.click()
          }
        }
      })
    },
    handleRemove (file, fileList) { // 删除时的钩子
      this.$emit('on-remove', file, fileList)
    },
    handleOverLimit (file) {
      this.$message.error({
        message: '图片超出限制张数'
      })
    },
    clearFiles () {
      this.fileList = []
    },
    handleBefore(file){
      if (this.listType !== 'picture-card') {
        return
      }
      if (format.indexOf(file.name.split('.')[1]) === -1) {
        this.$message.error('请上传图片')
        return false
      }
    },
    async handleBeforeUpload (param) {
      const fd = new FormData()
      fd.append('file', param.file)
      let res = await upload(fd)
      if (res.data.code === 200) {
        this.$emit('on-success', uploadUrl + res.data.data.url)
        this.fileUrlList.push({
          name:param.file.name,
          url:uploadUrl + res.data.data.url
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// .component-upload-img{
//   .el-upload--picture-card{
//     width:104px!important;
//     height:104px!important;
//     line-height: 104px!important;
//     i{
//       font-size: 20px;
//     }
//   }
//   .el-upload-list__item{
//     width:104px!important;
//     height:104px!important;
//   }
// }

</style>