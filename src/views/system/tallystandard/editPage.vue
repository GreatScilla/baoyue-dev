<template>
  <div>
    <el-dialog
      title="编辑点检标准"
      :visible.sync="info.editShow"
      width="60%"
      :modal="false"
      @opened="opened"
      :before-close="handleClose">
      <el-divider></el-divider>
      <button @click="jkdsjh">ffdjfjfd</button>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <b>·标准信息</b>
          <el-button size="small" type="primary" style="float: right" @click="saveAll">保存编辑</el-button>
          <el-button size="small" type="primary" style="float: right;margin-right: 15px" @click="resetAll">取消编辑</el-button>
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备编号">
          <el-input v-model="formInline.equipmentCoding" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="formInline.equipmentName" placeholder="手动输入"></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-button type="primary" size="small" @click="addStandard">添加标准</el-button>
          <el-button type="info" size="small">移除标准</el-button>
        </div></el-col>
      </el-row>


      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="点检项目"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="method"
          label="点检方法"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="标准类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="resource"
          label="参考"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <br>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <b>·备注</b>
          <br>
          <el-input v-model="formInline.memo"></el-input>
        </div></el-col>
      </el-row>
    </el-dialog>
    <!-------------------------------------------------  添加项目标准----------------------------------------------------->
    <el-dialog
      title="添加项目标准"
      :visible.sync="dialogVisible"
      width="60%"
      :modal="false"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <b>·项目标准</b>
          <el-button @click="saveStandard" size="small" type="primary" style="float: right">保存</el-button>
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form :inline="true" :model="standardform" class="demo-form-inline">
        <el-form-item label="点检项目">
          <el-input v-model="standardForm.name" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="点检方法">
          <el-input v-model="standardForm.method" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="标准类型">
          <el-input v-model="standardForm.type" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label=" 参考：">
          <el-input v-model="standardForm.resource" placeholder="手动输入" style="margin-left: 12px;width: 190px"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import  {addCheckItem,saveCheckStandard,editCheckStandard,CheckStandardDetail} from "@/api/shebei/equipmentCheck"
export default {
  props:["info"],
  data() {
    return {
      rowIds:"",
      dialogVisible:false,
      formInline: {
        memo:""
      },
      standardForm:{
      },
      tableData: [ ],
    };
  },
  methods: {
    jkdsjh(){
      this.getDetail()
    },
    opened(){
      this.formInline={
        equipmentCoding:this.info.equipmentCoding,
        equipmentName:this.info.equipmentName,
      }
      this.formInline.equipmentCoding=this.info.equipmentCoding,
      this.formInline.equipmentName=this.info.equipmentName,
       this.getDetail()
      console.log(666)
    },
   async getDetail(){
      let res = await CheckStandardDetail({id:this.info.id})
     this.tableData=res.data.data.checkItems
     console.log(res.data.data.checkItems)
    },
    async saveAll(){
      let para = {
        id:this.info.id,
        equipmentCoding:this.formInline.equipmentCoding,
        equipmentName:this.formInline.equipmentName,
        checkItemIds:this.rowIds,
        memo:this.formInline.memo
      }
      let res = await editCheckStandard(para)
      if(res.data.code==200){
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      }else{
        this.$message.error('操作失败');
      }
      console.log(res.data.code)
      console.log(para)
    },
    handleSelectionChange(val){
      console.log(123)
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
      console.log(this.rowIds)
    },

    async saveStandard(){
      let para = {
        name:this.standardForm.name,
        method:this.standardForm.method,
        type:this.standardForm.type,
        resource:this.standardForm.resource,
      }
      let res = await addCheckItem(para)
      if(res.data.code==200){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.standardForm={}
        this.tableData.push(res.data.data)
      }
      console.log(res.data.data)
    },
    addStandard(){
      this.dialogVisible=true
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

</style>
