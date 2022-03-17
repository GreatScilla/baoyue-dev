      <template>
        <div>
          <el-dialog
            title="新增维修工单"
            :visible.sync="info.addShow"
            width="68%"
            @opened="open_all"
            :modal="false"
            style="background-color: rgba(0,0,0,0.5)"
            :before-close="handleClose">
            <el-divider></el-divider>
            <div class="box">
              <b>·工单信息</b>
              <el-button
                type="primary"
                @click="disp"
                size="small"
                style="float: right"
                v-show="this.$data.out==0">
                &nbsp;指派
              </el-button>
              <el-button
                type="primary"
                @click="outsourcingSave"
                size="small"
                style="float: right"
                v-show="this.$data.out==1">
                &nbsp;&nbsp;保存 &nbsp;&nbsp;
              </el-button>
              <br>
              <br>
<!--              <button @click="ceshi">测试</button>-->
            </div>
            <el-divider></el-divider>
            <br>
            <br>

            <!--      单选框-->
            <span  @click="sel"><el-radio v-model="radio" label="1">自主维修</el-radio></span>&nbsp;
            <span  @click="ot"><el-radio v-model="radio" label="2">委外维修</el-radio></span>

            <br>
            <br>
            <br>

            <!--     form表单-->
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="工单编号" prop="number" >
                      <el-input v-model="ruleForm.number" disabled></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-light">
                    <el-form-item label="工单名称" prop="name" >
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="工单日期" prop="createTime" >
                      <div class="block">
                        <!--              <span class="demonstration">默认</span>-->
                        <el-date-picker
                          v-model="ruleForm.createTime"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="制单人" prop="creatUsername" >
                      <el-input v-model="ruleForm.creatUsername"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-light">
                    <el-form-item label="紧急程度" prop="urgency" >
                      <el-select v-model="ruleForm.urgency" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="故障类别" prop="category" >
                      <el-select v-model="ruleForm.category" placeholder="请选择" >
                        <el-option
                          v-for="item in categorys"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
            <br>
            <b>·维修对象</b>
            <el-divider></el-divider>
            <el-button type="primary" @click="addEq" size="small">添加设备</el-button>
            <el-button type="info" @click="delEq" size="small">移除设备</el-button>

            <!--    自主维修  表格-->
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
                label="资产编号"
                prop="assetTag"
                width="120">
              </el-table-column>
              <el-table-column
                prop="equipmentCoding"
                label="设备编号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                width="120"
                label="设备名称">
              </el-table-column>
              <el-table-column
                prop="category"
                label="设备类别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="specifications"
                label="规格型号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="dept"
                label="所在部门"
                width="120">
              </el-table-column>
              <el-table-column
                prop="location"
                label="所在位置"
                width="120">
              </el-table-column>
              <el-table-column
                prop="custodian"
                label="所属人员"
                width="120">
              </el-table-column>
            </el-table>


            <div  v-show="this.$data.out==1">
              <br>
              <b>·委外信息</b>
              <br>
              <br>
              <el-divider></el-divider>
              <!--      委外表格-->
              <el-form ref="form" :model="outForm" label-width="80px" :rules="outrules">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="维修商" prop="company" >
                        <el-input v-model="outForm.company"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                      <el-form-item label="联系人" prop="contacts" >
                        <el-input v-model="outForm.contacts"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="联系电话" prop="telephone" >
                        <el-input v-model="outForm.telephone"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="预估时长" prop="estimatedDuration" >
                        <el-input v-model="outForm.estimatedDuration"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                      <el-form-item label="预估费用" prop="estimatedPrice" >
                        <el-input v-model="outForm.estimatedPrice"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8" style="display: none">
                    <div class="grid-content bg-purple">
                      <el-form-item label="故障类别" prop="name" >
                        <el-select v-model="category" placeholder="请选择">
                          <el-option
                            v-for="item in categorys"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple bbox">
                      <el-form-item label="发货地址" prop="name" >
                        <el-input v-model="input" placeholder="请输入详细地址"  class="ipt"></el-input>
                      </el-form-item>
      <!--                <el-input v-model="input" placeholder="请输入详细地址" class="ipt"></el-input>-->
                    </div>

                  </el-col>
                </el-row>
              </el-form>
            </div>
            <br>
            <b>·备注</b>
            <el-divider></el-divider>
            <el-input v-model="ruleForm.input" placeholder="请输入内容"></el-input>
          </el-dialog>
          <!--    添加设备组件-->
          <el-dialog
            title="添加设备"
            :modal="false"
            style="background-color: rgba(0,0,0,0.5)"
            :visible.sync="adshow"
            width="65%"
            @open="addOpen"
            :before-close="handleClose">
            <el-divider></el-divider>
            <div>
              <b>·设备筛选</b>
              <el-button size="small" type="primary" style="float: right" @click="choiceAdd">选择添加</el-button>
            </div>
            <br>
            <el-divider></el-divider>
            <!--      添加设备开始-->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="资产编号">
                <el-input v-model="formInline.assetTag" placeholder="手动输入"></el-input>
              </el-form-item>
              <el-form-item label="设备编号">
                <el-input v-model="formInline.equipmentCoding" placeholder="手动输入"></el-input>
              </el-form-item>
              <el-form-item label="设备名称">
                <el-input v-model="formInline.name" placeholder="手动输入"></el-input>
              </el-form-item>
            </el-form>
            <!--      结束-->
            <div style="width: 100%;height: 33px" class="btnbox">
              <el-button type="primary" size="small" @click="search">查询</el-button>
              <el-button type="primary" size="small" @click="reset">重置</el-button>
            </div>
            <!--      添加设备表格-->
            <el-table
              ref="multipleTable"
              :data="addtableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="sele_change"
              @row-click="roeClick">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
<!--              <el-table-column-->
<!--                width="55">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-radio-->
<!--                    v-model="templateRadio"-->
<!--                    :label="scope.$index"-->
<!--                  >{{""}}</el-radio>-->
<!--                </template>-->
<!--              </el-table-column>-->

              <el-table-column
                label="资产编号"
                prop="assetTag"
                width="120">
              </el-table-column>
              <el-table-column
                prop="equipmentCoding"
                label="设备编号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="设备名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="category"
                label="设备类别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="specifications"
                label="规格型号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="dept"
                label="所在部门"
                width="120">
              </el-table-column>
              <el-table-column
                prop="location"
                label="所在位置"
                width="120">
              </el-table-column>
              <el-table-column
                prop="custodian"
                label="所属人员"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </el-dialog>

          <!--    指派组件-->

          <el-dialog
            title="工单指派"
            :visible.sync="dispatchShow"
            width="65%"
            style="background-color: rgba(0,0,0,0.5)"
            :modal="false"
            :before-close="handleClose">

            <el-form>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple-light">
                    <el-form-item label="维修部门" prop="createDept" >
                      <el-select v-model="createDeptValue" placeholder="请选择">
                        <el-option
                          v-for="item in createDept"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="维修人" prop="createUser" >
                      <el-select v-model="createUserValue" placeholder="请选择">
                        <el-option
                          v-for="item in createUser"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-button size="small" type="primary" @click="delegate">确认指派</el-button>
              </el-row>

            </el-form>
          </el-dialog>
        </div>
      </template>

      <script>
      import {getShebei ,} from "@/api/shebei/account"
      import { creatFix , outsourcing} from "@/api/shebei/fix"
      export default {
        props: ["info"],
        name: "",
        data() {
          return {
            saveData:[],
            dispatchShow:false,
            //radio选择之后绑定的设备id值
            eqId:"",
            //radio的值
            templateRadio:"",
            //控制添加设备的按钮
            adshow:false,
            // 是否显示委外
            out:"",
            //单选框的选择
            radio: '1',
            //备注输入框
            input: '',
            //这是添加设备页面的表单数据
            formInline: {
              assetTag: '',
              equipmentCoding: '',
              name:""
            },
            //表格数据
            tableData: [],
            addtableData: [],
            multipleSelection: [],
            dialogVisible: false,

            ruleForm: {
              number:"",
              name:"",
              creatUsername:"",
              createTime:"",
              urgency:"",
              category:""
            },

            //表单验证规则
            rules: {
              number: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
              ],
              name: [
                { required: true, message: '工单名称不能为空', trigger: 'blur' }
              ],
              creatUsername: [
                { required: true, message: '用户名称不能为空', trigger: 'blur' }
              ],
              createTime: [
                { required: true, message: '创建时间称不能为空', trigger: 'change' }
              ],
              urgency: [
                { required: true, message: '紧急程度不能为空', trigger: 'change' }
              ],
              category: [
                { required: true, message: '故障类别不能为空', trigger: 'change' }
              ],
            },
             // 委外表单
            outForm: {
              company:"",
              contacts:"",
              telephone:"",
              estimatedDuration:"",
              estimatedPrice:"",
              shippingAddress:"",
            },
            //委外表单验证规则
            outrules: {
              company: [
                { required: true, message: '请输入公司名称', trigger: 'blur' },
              ],
              contacts: [
                { required: true, message: '联系人不能为空', trigger: 'blur' }
              ],
              telephone: [
                { required: true, message: '手机号不能为空', trigger: 'blur' }
              ],
              estimatedDuration: [
                { required: true, message: '预估时常不能为空', trigger: 'blur' }
              ],
              estimatedPrice: [
                { required: true, message: '预估费用不能为空', trigger: 'blur' }
              ],
            },
            //下拉框数据
            options: [
              {
                value: '0',
                label: '特别紧急'
              }, {
                value: '1',
                label: '一般紧急'
              }, {
                value: '2',
                label: '比较紧急'
              }, ],
            //委外维修下拉框数据
            createDept: [
              {
                value: '0',
                label: '部门一'
              }, {
                value: '1',
                label: '部门二'
              }, {
                value: '2',
                label: '部门三'
              }, ],
            createUser: [
              {
                value: '0',
                label: '莉莉安'
              }, {
                value: '1',
                label: '董小姐'
              }, {
                value: '2',
                label: '郭源潮'
              }, ],
            createDeptValue:"",
            createUserValue:"",
            categorys: [
              {
                value: '0',
                label: '异常停机'
              }, {
                value: '1',
                label: '异响'
              }, {
                value: '2',
                label: '温度异常'
              }, ],
            // 时间数据
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            },
            value2: '',
          };
        },

        methods: {
          handleSelectionChange(val){
            this.multipleSelection = val
          },
          open_all(){
            let now = new Date();
            this.ruleForm={
              number:now.getTime()
            }
            console.log(777)
          },
          sele_change(sels){
            console.log(sels)
            this.saveData=sels
          },
          //保存委外维修
         async outsourcingSave(){
           let para = {
             company:this.outForm.company,
             contacts:this.outForm.contacts,
             telephone:this.outForm.telephone,
             estimatedDuration:this.outForm.estimatedDuration,
             estimatedPrice:this.outForm.estimatedPrice,
             shippingAddress:this.outForm.shippingAddress,
             id:""
           }
            let res = await outsourcing()
           console.log(res)
          },
            //确认指派按钮
         async delegate(){
             let  para={
               number:this.ruleForm.number,
               name:this.ruleForm.name,
               documentDate:this.ruleForm.createTime+" 00:00:00",
               urgency:this.ruleForm.urgency,
               faultCategory:this.ruleForm.category,
               creatUsername:this.ruleForm.creatUsername,
               pid:this.tableData[0].assetTag,
               dept:this.createDeptValue,
               repairman:this.createUserValue
             }
             let res = await creatFix(para)
           if (res.data.code===200){
             this.$message({
               message: '添加成功',
               type: 'success',
             });
             this.ruleForm={};
             this.dispatchShow=false
           }


           },

          //ceshi
        async  ceshi(){
           console.log(this.ruleForm.createTime)
          },
          //指派按钮
          disp(){
            this.dispatchShow=true
          },

          //移除设备按钮
          delEq(){
            console.log("del")
          },

          //选择添加按钮
          choiceAdd(){
              this.tableData=this.tableData.concat(this.saveData)
              this.adshow=false

          },
          //重置按钮
          reset(){
            this.formInline={}
          },
          //查询具体设备按钮
          async search(){
            let lilian = {
              assetTag:this.formInline.assetTag,
              equipmentCoding: this.formInline.equipmentCoding,
              name:this.formInline.name
            }
            let res = await getShebei(lilian)
            this.addtableData=res.data.data.records
          },
          //获取设备分页方法
          async getpages(){
            let res = await getShebei()
            this.addtableData=res.data.data.records
          },
          //添加设备的open事件
          addOpen(){
            this.getpages()
          },
          //添加设备按钮
          addEq(){
            this.adshow=true
          },
          //不显示
          sel(){
            this.$data.out=0;
          },
          ot(){
            this.$data.out=1;
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                console.log(_)
                done();
              })
              .catch(_ => {
                console.log(_)
              });
          }
        },

      }
      </script>

      <style lang="scss" scoped>
      //.box {
      //  height: 40px;
      //  line-height: 40px;
      //  display: flex;
      //  justify-content: space-between;
      //}

      .el-row {
        /*margin-bottom: 20px;*/

        &:last-child {
          margin-bottom: 0;
        }
      }

      .el-col {
        border-radius: 4px;
      }
      //
      //.bg-purple-dark {
      //  background: #99a9bf;
      //}
      //.bg-purple {
      //  background: #d3dce6;
      //}
      //.bg-purple-light {
      //  background: #e5e9f2;
      //}
      //.grid-content {
      //  border-radius: 4px;
      //  min-height: 36px;
      //}
      //
      //.row-bg {
      //  padding: 10px 0;
      //  background-color: #f9fafc;
      //}
      //.el-table{
      //  margin-top: 10px;
      //  margin-bottom: 10px;
      //}
      //.bbox{
      //  width: 65vw;
      //  display: flex;
      //  justify-content: space-between;
      //}
      //.ipt{
      //  width: 40vw;
      //  float: right;
      //}
      //.btnbox{
      //  display: flex;
      //  justify-content:flex-end;
      //}
      </style>
