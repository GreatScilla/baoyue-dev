<template>
<div>
  <el-dialog
    title="结果反馈"
    :visible.sync="info.backShow"
    width="60%"
    :modal="false"
    @opened="open_all"
    style="background-color: rgba(0,0,0,0.5)"
    :before-close="handleClose">
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <b @click="qqqqq">·明细</b>
        <el-button size="small" type="primary" style="float: right" @click="save_all"> 提交</el-button>
      </div></el-col>
    </el-row>
    <el-divider></el-divider>
      <el-table
        :data="tableDataOne"
        border
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
          label="维修结果"
          width="120"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.result" placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="维修描述">
          <template slot-scope="scope">
            <el-input v-model="scope.row.repairDescribe"></el-input>
          </template>
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
        border
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
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
      </el-table>

  </el-dialog>
</div>
</template>

<script>
import {resultFeedback,fixdetail,fixFeedback} from "@/api/shebei/fix"
export default {
  props:["info"],
  name: "fixBack",
  data() {
    return {
      options: [{
        value: '0',
        label: '已修好'
      }, {
        value: '1',
        label: '未修好'
      }],
      tableDataOne: [],
      tableDataTwo: [],
    };
  },
  methods: {
   async qqqqq(){
          let res = await fixFeedback({id:this.row_id})
     console.log(res)
    },
   async save_all(){
      let para = {
        result:this.tableDataOne[0].result,
        repairDescribe:this.tableDataOne[0].repairDescribe,
        id:this.info.row_id
      }
      let res = await resultFeedback(para)
     this.info.backShow=false
     this.$parent.getPage();
    },

   async open_all(){
        let res = await fixdetail({id:this.info.row_id})


     let obj = JSON.parse(JSON.stringify(res.data.data.equipmentInfo))
     this.tableDataOne.push(obj)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.tableDataOne=[]
          done();
        })
        .catch(_ => {});
    }
  }
}

</script>

<style scoped>

</style>
