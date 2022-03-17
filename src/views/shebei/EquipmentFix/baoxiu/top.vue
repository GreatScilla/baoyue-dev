<template>
      <div style="background-color: #ffffff">

        <el-dialog
          title="搜索"
          :visible.sync="info.searchShow"
          width="30%"
          :modal="false"
          style="background-color: rgba(0,0,0,0.5)"
          :before-close="handleClose">

          <el-form ref="form" class="demo-ruleForm"  :model="form" label-width="80px">

                <el-form-item label="报修单号:">
                  <el-input v-model="form.number"></el-input>
                </el-form-item>


                <el-form-item label="维修部门:">
                  <el-input v-model="form.dept"></el-input>
                </el-form-item>


                <el-form-item label="维修人:">
                  <el-input v-model="form.user"></el-input>
                </el-form-item>


                <el-button type="primary" size="small">查询</el-button>
                <el-button type="info" size="small" @click="removeForm">重置</el-button>


          </el-form>

        </el-dialog>


      </div>
</template>

<script>
    export default {
      props:['info'],
        name: "",
        data() {
            return {
              dialogVisible:true,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
          removeForm(){
            this.form={}
          },
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style  lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  /*.bg-purple-dark {*/
  /*  background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
  /*  background: #d3dce6;*/
  /*}*/
  /*.bg-purple-light {*/
  /*  background: #e5e9f2;*/
  /*}*/
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
