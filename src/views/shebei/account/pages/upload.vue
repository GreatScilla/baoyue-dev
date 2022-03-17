<template>
  <div>
    <el-dialog
      title="导入"
      :modal="false"
      :visible.sync="info.updshow"
      width="30%"
      :before-close="handleClose"
    >
      <!-- <input type="file" ref="clearFile" @change="getFile($event)"
      multiple="multiplt" class="add-file-right-input"
      style="margin-left:70px;" accept=".docx,.doc,.pdf"> -->

      <el-upload
        class="upload-demo"
        drag
        show-file-list
        action="http://192.168.0.112/blade-rcm/equipmentinfo/import"
        multiple
        :before-upload="myUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          文件大小不能超过500M
        </div>
      </el-upload>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import website from '@/config/website';
import {Base64} from 'js-base64';
import {getToken} from '@/util/auth';
export default {
  props: ["info"],
  data() {
    return {
      // dialogVisible: true
      website
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
      myUpload(file) {
          console.log(`Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`)
          let result = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`
          var form = new FormData();
          form.append("file", file);
          var xhr = new XMLHttpRequest();
        xhr.onload = function (res) {
              console.log(res,123)
          }; // 添加 上传成功后的回调函数
          xhr.onerror =  function (err) {
              console.log(err,456)
          }; // 添加 上传失败后的回调函数
          xhr.open("POST", '/api/blade-rcm/equipmentinfo/import', true);
          xhr.setRequestHeader('Authorization', result)
          xhr.setRequestHeader(website.tokenHeader, 'bearer ' + getToken())
          xhr.send(form);
        return false
      }
  },
};
</script>

<style lang="scss" scoped>
.upload-demo{
    width: 360px;
    margin: 0 auto;
// margin-right: 50px;
}
</style>
