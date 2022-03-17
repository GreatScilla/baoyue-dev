// 分页
import {getCode} from "@/api/common"
const code = {
  data() {
    return {
    };
  },
  methods: {
    async initCode(codeName,object,key){
      let res = await getCode({codeName:codeName})
      if (res.data.success && Object.keys(res.data.data).length !== 0) {
        this.$set(object,key,res.data.data)
      }
      console.log(object)
    }
  }
};

export default code;
