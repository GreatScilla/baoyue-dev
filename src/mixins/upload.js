
// 上传文件
const upload = {
  data () {
    return {
      file: []
    }
  },
  methods: {
    handleSuccess (url) {
      console.log(this.file)
      this.file.push(url)
    },
    handleRemove (file) { // 
      console.log(file)
      this.file = this.file.filter(item => item !== file.url)
    }
  }
}
export default upload