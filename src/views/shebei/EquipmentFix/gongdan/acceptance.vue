<template>
  <div>
    <el-dialog
      title="结果验收"
      :visible.sync="info.accShow"
      width="60%"
      :modal="false"
      @opened="open_all"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <b @click="pp">·明细</b>
          <el-button size="small" type="primary" style="float: right" @click="save_all"> 验收 </el-button>
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table
        :data="tableDataOne"
        style="width: 100%;margin-top: 15px">
        <el-table-column
          prop="assetTag"
          label="资产编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="equipmentCoding"
          label="设备编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="故障类别">
        </el-table-column>
        <el-table-column
          prop="result"
          label="维修结果">
<!--          <template slot-scope="scope">-->
<!--            <el-input v-model="scope.row.how"></el-input>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column
          prop="repairDescribe"
          label="维修描述">
        </el-table-column>
      </el-table>

      <el-row style="margin-top: 25px">
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <b>·备件消耗</b>
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table
        :data="tableDataTwo"
        style="width: 100%;margin-top: 15px">
        <el-table-column
          prop="date"
          label="备件编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="备件名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="规格型号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="所需数量">
        </el-table-column>
        <el-table-column
          prop="address"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="address"
          label="消耗数量">
        </el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
import {fixdetail,acceptance} from "@/api/shebei/fix"
export default {
  props:["info"],
  name: "fixBack",
  data() {
    return {
      tableDataOne: [],
    };
  },
  methods: {
    pp(){
      console.log(this.info)
    },
 async save_all(){
      this.info.accShow=false
    let res = await  acceptance({ id:this.info.id})
    },

    async open_all(){
      let res=await fixdetail({id:this.info.id})
      let obj= Object.assign(res.data.data,res.data.data.equipmentInfo);
      this.tableDataOne.push(obj)
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
