<template>

  <div class="choose-img">
    <el-image
      v-if='imgUrl'
      style="position:absolute;width:102px;height:102px"
      :src="imgUrl"
      fit="cover">
    </el-image>
    <i class="el-icon-plus " v-if="!imgUrl"></i>
    <input type="file" @change="changeImg">
  </div>
</template>

<script>
import { client } from "@/util/oss.js";
export default {
  data() {
    return {
    
    }
  },
  props:{
    imgUrl:String
  },
  methods: {
    async changeImg(el){
      let that = this
      let oFReader = new FileReader()
      let file = el.path[0].files[0]
      oFReader.readAsDataURL(file)
      oFReader.onloadend = function(oFRevent){
        that.imgUrl = oFRevent.target.result
        let formData = that.dataURLtoFile(oFRevent.target.result, 'fileName.jpg')
        client.put(formData.name, formData)
        .then(res => {
          if (res.res && res.res.status == 200) {
            that.$emit('handleUploadImgUrl',res.url)
          }
        })
      }
    },
    // base64转file
    dataURLtoFile(dataurl, filename) { 
	    let arr = dataurl.split(','),
	        mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]),
	        n = bstr.length,
	        u8arr = new Uint8Array(n)
	    while (n--) {
	      u8arr[n] = bstr.charCodeAt(n)
	    }
	    return new File([u8arr], filename, { type: mime })
	  }
  }
}
</script>

<style lang="scss" scoped>
.choose-img{
  box-sizing: border-box;
  width: 104px;
  height: 104px;
  border: 1px dashed #8c939d;
  border-radius: 5px;
  display: inline-block;
  overflow: hidden;
}
.el-icon-plus{
  position: absolute;
  left:100%;
  top:37%
}
.choose-img input{
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>