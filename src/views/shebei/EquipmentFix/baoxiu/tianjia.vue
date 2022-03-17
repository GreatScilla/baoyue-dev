<template>
    <div>
<!--      <el-divider></el-divider>-->
<!--      <b>·设备筛选</b>-->
<!--      <el-button type="primary" @click="btn"-->
<!--      style="float: right"-->
<!--      size="small">选择添加</el-button>-->
<!--      <div style="height: 10px"></div>-->
<!--      <el-divider></el-divider>-->
<!--      <el-form ref="form" :model="form" label-width="80px">-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div class="grid-content bg-purple">-->
<!--              <el-form-item label="资产编号" prop="name" >-->
<!--                <el-input v-model="ruleForm.name"></el-input>-->
<!--              </el-form-item>-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div class="grid-content bg-purple-light">-->
<!--              <el-form-item label="设备编号" prop="urgency">-->
<!--                <el-input v-model="ruleForm.urgency"></el-input>-->
<!--              </el-form-item>-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div class="grid-content bg-purple">-->
<!--              <el-form-item label="设备名称" prop="faultCategory">-->
<!--                <el-input v-model="ruleForm.faultCategory"></el-input>-->
<!--              </el-form-item>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <div style="float: right">-->
<!--        <el-button type="primary" size="small">查询</el-button>-->
<!--        <el-button type="primary" size="small" @click="resetForm">重置</el-button>-->
<!--        </div>-->
<!--      </el-form>-->
<!--      <div class="asd"></div>-->
<!--&lt;!&ndash;      //表格&ndash;&gt;-->
<!--      <el-table-->
<!--        ref="multipleTable"-->
<!--        :data="tableData"-->
<!--        border-->
<!--        size="mini"-->
<!--        tooltip-effect="dark"-->
<!--        style="width: 100%"-->
<!--        @selection-change="selsChange">-->
<!--        <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="资产编号"-->
<!--          width="120"-->
<!--          prop="assetTag"-->
<!--        >-->
<!--        </el-table-column><el-table-column-->
<!--          label="设备编号"-->
<!--          width="120"-->
<!--          prop="equipmentCoding"-->
<!--      >-->
<!--        </el-table-column><el-table-column-->
<!--          label="设备名称"-->
<!--          width="120"-->
<!--          prop="name"-->
<!--      >-->
<!--        </el-table-column><el-table-column-->
<!--          label="设备类别"-->
<!--          width="120"-->
<!--          prop="category"-->
<!--      >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="规格型号"-->
<!--          width="120"-->
<!--          prop="specifications"-->
<!--      >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="所在部门"-->
<!--          width="120"-->
<!--          prop="dept"-->
<!--      >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="location"-->
<!--          label="所在位置"-->
<!--          width="120"-->
<!--        >-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="custodian"-->
<!--          label="所属人员"-->
<!--          width="120">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
    </div>
<!--  <el-pagination-->
<!--    background-->
<!--    layout="prev, pager,jumper, next"-->
<!--    :total="total"-->
<!--    @current-change="handleCurrentChange"-->
<!--  >-->
<!--  </el-pagination>-->
</template>

<script>
    import { getShebei , selecTtree} from "../../../../api/shebei/account";
    export default {
        props:["info" ,"tableData"],
        name: "",
        data() {
            return {
                val: "子组建向父组件传的值",
                dialogVisible: false,
                    form: {
                        name: '',
                    },
                //表单假数据
                ruleForm: {
                    number: '',
                    name: '',
                    createTime: '',
                    urgency: '',
                    delivery: false,
                    type: [],
                    faultCategory: '',
                    desc: '',
                    memo:""
                },
                paging: { pageNum: 1, pageSize: 10 },
                //表格假数据
                // tableData: [],
                multipleSelection: []
            };
        },
        //打开时的动画
        open(){
            console.log(456)
        },
        //创建页面
        //  created() {
        //     const res = getShebei(this.paging);
        //     this.total = res.data.data.total;
        //     this.tableData = res.data.data.records;
        //     console.log(this.tableData)
        //     const selecttree = selecTtree();
        //     this.selecttreedata = selecttree.data.data;
        // },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            btn(){
                console.log(this.tableData , 123)
            },

            // resetForm() {
            //     // console.log(this.$data.ruleForm)
            //     this.$data.ruleForm={
            //         number: '',
            //         name: '',
            //         createTime: '',
            //         urgency: '',
            //         delivery: false,
            //         type: [],
            //         faultCategory: '',
            //         desc: '',
            //         memo:""
            //     }
            // },
            // //选中数据
            // selsChange(sels) {
            //     this.sels = sels;
            //     //遍历选中的数组
            //     for (let tableData of this.sels) {
            //         this.disabled = false;
            //     }
            //     let length = this.sels.length;
            //     console.log(sels);
            //     // 将得到的数据传给父组件
            //     this.$emit("setValue",this.val);
            //     console.log(this.val)
            // },
        }
    }
</script>

<style scoped>
      .asd{
        width: 100%;
        height: 55px;
        /*background-color: #1e9fff;*/
      }
</style>
