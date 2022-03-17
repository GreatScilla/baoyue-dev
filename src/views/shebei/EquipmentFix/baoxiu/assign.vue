<template>
    <div>
      <el-dialog
        title="工单指派"
        :visible.sync="info.assShow"
        width="30%"
        :modal="false"

        :before-close="handleClose"
        style="background-color: rgba(0,0,0,0.5)"
      >
        <el-select v-model="dept" placeholder="选择部门" style="width: 120px">
          <el-option
            v-for="item in options"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptName">
          </el-option>
        </el-select>

          <el-select v-model="repairman" placeholder="选择用户" style="margin-left: 20px;width: 120px">
            <el-option label="测试一" value="测试一"></el-option>
            <el-option label="测试二" value="测试二"></el-option>
        </el-select>

        <el-button type="primary" size="small" style="margin-left: 20px" @click="zhipai">指派</el-button>
      </el-dialog>
    </div>
</template>

<script>
    import {appoint} from "@/api/shebei/fix"
    import {getDept} from "@/api/shebei/fix"
    export default {
        props: ["info"],
        data() {
            return {
              nrs:true,
              options: [],
              repairman: '',
              dept: ''
            }
        }
        ,
      mounted() {
        this.getList()
      },
      methods: {
       async zhipai(){
         let para = {
              id:this.info.rowIds,
              repairman:this.repairman,
              dept:this.dept
         }
         let res = await appoint(para)
         if(res.data.code==200){
           this.$message({
             message: '指派成功',
             type: 'success'
           });
         }
         this.info.assShow=false
         this.$parent.handleList();
        },
            getList(){
              axios({
                url:"/api/blade-user/page",
                method:"get"
              }).then(res=>{
                // console.log(res.data.data.records,"你是")
                this.options=res.data.data.records
              })

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>
.btn{
  opacity: 0;
}
</style>
