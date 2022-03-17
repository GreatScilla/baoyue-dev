<template>
  <div  style="background-color: #ffffff">
<!--    <el-button type="primary" @click="addBtn" size="small">新增报修</el-button>-->
<!--    <el-button type="primary" size="small" @click="removeAll">&nbsp;&nbsp;删除&nbsp; &nbsp;</el-button>-->
<!--    <el-button type="primary" @click="zhiPai" size="small"> &nbsp;&nbsp;指派 &nbsp;&nbsp;</el-button>-->
    <vAdd :info="info"></vAdd>
    <v-assign :info="info"></v-assign>
  </div>
</template>

<script>
  import vAdd from "./add"
  import vAssign from "./assign"
    export default {
      components:{
          vAdd,
          vAssign
      },
        name: "",
        data() {
            return {
                info: {
                    addShow: false,
                    assShow:false,
                },
            }
        },
        methods: {
          removeAll(){

          },
            addBtn() {
                this.info.addShow = true;
            },
            zhiPai(){
              console.log(this.info.rowIds)
                this.info.assShow = true;
            }
        }
    }
</script>

<style scoped>

</style>
