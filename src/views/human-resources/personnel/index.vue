// 人员管理
<template>
  <basic-container>
    <el-row style="margin-bottom: 25px;">
      <el-input
        size="small"
        style="width: 240px; margin-right: 30px;"
        placeholder="输入姓名或者工号"
        v-model="searchParam">
      </el-input>
      <el-button size="small" type="primary" @click="searchPerson">搜索</el-button>
      <el-button size="small" @click="reset">重置</el-button>
    </el-row>
    <el-row class="content-wrapper">
      <el-col class="content-left" :span="6">
        <div class="top">
          部门机构
        </div>
        <el-tree
          :data="departmentList"
          :props="defaultProps"
          @node-click="handleNodeClick">
        </el-tree>
      </el-col>
      <el-col :span="18">
        <el-row style="margin-bottom: 20px;">
          <el-button
            @click="to('add')"
            size="small"
            icon="el-icon-plus"
            type="primary">
            新增
          </el-button>
          <el-button size="small" icon="el-icon-download" type="primary" plain>
            导入
          </el-button>
          <el-button size="small" icon="el-icon-upload2" type="success" plain>
            导出
          </el-button>
        </el-row>
        <el-row>
          <el-table :data="personnelTableData" style="width: 100%">
            <el-table-column prop="empNo" label="工号">
              <template slot-scope="scope">
                {{ scope.row.empNo || "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="realName" label="名称"> </el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.sex | sex }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="deptName" label="部门"> </el-table-column>
            <el-table-column prop="date" label="状态">
              <template slot-scope="scope">
                <el-switch
                  class="switch"
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#FF4949"
                  :active-value="0"
                  :inactive-value="1"
                  @change="((value)=>{handleSwitchChange(value,scope.row)})">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="entryTime" label="入职时间">
              <template slot-scope="scope">
                {{ scope.row.entryTime || "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="dimissionTime" label="离职时间">
              <template slot-scope="scope">
                {{ scope.row.dimissionTime || "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="createUser" label="创建人">
              <template slot-scope="scope">
                {{ scope.row.createUser || "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
              <template slot-scope="scope">
                {{ scope.row.createTime || "无" }}
              </template>
            </el-table-column>
            <el-table-column width="100" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="to('edit',scope.row)">
                  编辑
                </el-button>
                <el-button
                  type="text"
                  @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="pagination-wrapper">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
          >
          </el-pagination>
        </el-row>
      </el-col>
    </el-row>
  </basic-container>
</template>

<script>
import {getDepartmentTree} from '@/api/humanResources/department'
import {getPersonnel, delPersonnel, editPersonnel} from '@/api/humanResources/personnel'
import paginationMixin from "@/mixins/pagination";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      departmentList: [],
      personnelTableData: [],
      searchParam:'',
      defaultProps: {
        label: "title"
      }
    };
  },
  created(){
    this.handleList()
    this.initDepartment()
  },
  filters: {
    sex: function(value) {
      if (value === 1) {
        value = "男";
      } else if (value === 2) {
        value = "女";
      } else {
        value = "未知"
      }
      return value;
    }
  },
  methods: {
    // Switch状态
    handleSwitchChange(value,row){
      editPersonnel({id: row.id, status: value})
        .then(res => {
          if(res.data.success) {
            this.$message.success('修改成功')
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    // 查询部门
    initDepartment(){
      getDepartmentTree()
      .then(res => {
        this.departmentList = res.data.data
      })
      .catch(error => {
        console.error(error)
      })
    },
    handleList(...arg) {
      let params = {current:this.currentPage,size:this.pageSize}
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      getPersonnel(params)
      .then(res => {
        this.personnelTableData = res.data.data.records
        this.total = res.data.data.total
        // this.personnelTableData.forEach(item => {
        //   if (item.createTime) {
        //     item.createTime = item.createTime.replace(/\s[\x00-\xff]*/g,'')
        //   }
        // })
      })
      .catch(error => {
        console.error(error)
      })
    },
    // 搜素
    searchPerson(){
      if(!this.searchParam) return
      this.handleList({keywords:this.searchParam})
    },
    //重置
    reset(){
      this.searchParam = ''
      this.handleList()
      this.initDepartment()
    },
    // 删除人员
    handleDelete(index,row){
      this.$confirm('确定要删除该人员吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delPersonnel({ids:row.id})
          .then(res => {
            if (res.data.success) {
              this.$message.success('删除成功')
               this.handleList()
            }
          })
          .catch(error => {
            console.error(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    to(operationState,row) {
      this.$router.push({
        path: "/human-resources/personnel/detail",
        query: {
          operationState,
          row
        }
      });
    },
    handleNodeClick(data) {
      this.handleList({deptId:data.id})
    }
  }
};
</script>

<style lang="scss" scoped>
 
.content-wrapper {
  .content-left {
    width: 240px;
    height: 823px;
    border: 1px solid #dedede;
    margin-right: 15px;
    .top {
      background: #f7f8fa;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #3e3e3e;
      line-height: 53px;
      padding-left: 20px;
    }
  }
}
</style>
