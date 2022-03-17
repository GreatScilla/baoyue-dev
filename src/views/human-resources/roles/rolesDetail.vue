// 角色新增、修改、详情
<template>
  <basic-container>
    <el-row>
      <el-row>
        <div class="title">角色信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-form
        label-width="100px"
        :model="roleFormData"
        class="detail-form"
        ref="roleFormData"
        :rules="rules"
        :inline-message="true"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item required label="角色代码:" prop="roleAlias">
              <span v-if="operationState === 'details'"> {{roleFormData.roleAlias}}</span>
              <el-input
                v-else
                size="small"
                v-model="roleFormData.roleAlias"
                placeholder="请输入角色代码">
              </el-input>
            </el-form-item>
            <el-form-item label="上级角色:">
              <span v-if="operationState === 'details'"> {{roleFormData.parentName}}</span>
              <el-select size="small" v-model="roleFormData.parentName" placeholder="请选择" @change="changeSuperiorRole" v-else>
                <el-input v-model="filterSuperiorRoleInput" placeholder="输入关键词进行过滤" class="el-select-tree-input" size="small"></el-input>
                <el-option class="el-select-tree-option">
                  <el-tree :data="superiorRoleTreeData" :props="defaultProps" @node-click="handleNodeClick"
                    :filter-node-method="filterNode" ref="superiorRoleTree"></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否开启:">
              <span v-if="operationState === 'details'"> {{roleFormData.isEnabled | control}}</span>
              <el-select size="small" v-model="roleFormData.isEnabled" placeholder="请选择" v-else>
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="角色名称:" prop="roleName">
              <span v-if="operationState === 'details'"> {{roleFormData.roleName}}</span>
              <el-input
                v-else
                size="small"
                v-model="roleFormData.roleName"
                placeholder="请输入角色名称">
              </el-input>
            </el-form-item>
            <el-form-item label="角色描述:">
              <span v-if="operationState === 'details'">{{roleFormData.descInfo || '无'}}</span>
              <el-input
                v-else
                :rows="5"
                type="textarea"
                v-model="roleFormData.descInfo"
                placeholder="请输入内容"
                maxlength="200"
                show-word-limit>
              </el-input>
            </el-form-item>
            <!-- <el-form-item required label="角色类型" prop="roleTypeId">
              <span v-if="operationState === 'details'"> {{roleFormData.roleType}}</span>
              <el-select size="small" v-model="roleFormData.roleTypeId" placeholder="请选择" @change="changeRoleType" v-else>
                <el-option
                  v-for="item in roleType"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey">
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="8">
            
            <!-- <el-form-item required label="资源类型" prop="resourceTypeId">
              <span v-if="operationState === 'details'"> {{roleFormData.resourceType}}</span>
              <el-select size="small" v-model="roleFormData.resourceTypeId" placeholder="请选择" @change="changeResourceType" v-else>
                <el-option
                  v-for="item in resourceType"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey">
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row >
      <el-row>
        <div class="title">权限配置</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
    </el-row>
    <el-row style="margin-bottom:20px">
      <el-tree
        :props="menuTreeprops"
        :data="menuTreeData"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        @check="handleCheck"
      >
       <!-- :load="loadNode" -->
        <!-- lazy -->
      </el-tree>
    </el-row>
    <el-row class="button-wrapper-footer" v-if="operationState !== 'details'" style="margin-bottom:27px">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="saveRole('roleFormData')">保存</el-button>
    </el-row>
  </basic-container>
</template>

<script>
import { getDictionary } from "@/api/system/dict";
import {getResourceType, getRoleType, getMenuTree, detailsRole, getRoleMenuTree, editRole, addRole, getSystemRoleTree} from '@/api/base-data/role'
export default {
  data() {
    return {
      stateOptions: [{
        value: 0,
        label: '启用'
      }, {
        value: 1,
        label: '停用'
      }],
      stateValue:0,
      resourceType:[],
      roleType:[],
      menuTreeData:[],
      roleFormData:{
        isEnabled:0,
        parentName:''
      },
      menuIds:[],
      menuTreeprops: {
        label: "title"
      },
      defaultProps:{
        label: "title"
      },
      defaultCheckedKeys:[],
      filterSuperiorRoleInput:'',
      superiorRoleTreeData:[],
      rules: {
        roleAlias: [
          {required: true, message: '请输入角色代码', trigger: ['blur', 'change']},
        ],
        roleName:[
          { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] },
        ],
        // roleTypeId:[
        //   { required: true, message: '请选择角色类型', trigger: ['blur', 'change'] },
        // ],
        // resourceTypeId:[
        //   { required: true, message: '请选择资源类型', trigger: ['blur', 'change'] },
        // ],
        
      },
    };
  },
  created(){
    this.initType()
    if (this.$route.query.operationState) {
      this.operationState = this.$route.query.operationState
    }
    if (this.operationState !== 'add') {
      this.initRoleDetails()
    }
  },
  watch: {
    filterSuperiorRoleInput(val) {
      this.$refs.superiorRoleTree.filter(val);
    }
  },
  filters: {
    control: function(value) {
      if (value === 0) {
        value = "启用";
      } else if (value === 1) {
        value = "停用";
      }
      return value;
    }
  },
  methods: {
    // 获取资源类型，角色类型,权限
    initType(){
      Promise.all([getResourceType(),getRoleType(),getMenuTree(),getSystemRoleTree()])
      .then(res => {
        this.resourceType = res[0].data.data
        this.roleType = res[1].data.data
        this.menuTreeData = res[2].data.data
        this.superiorRoleTreeData = res[3].data.data
        if (this.operationState === 'details') {
          this.traverseTree(this.menuTreeData)
        }
      })
      .catch(error => {
        console.error(error)
      })
    },
    // 角色详情
    initRoleDetails(){
      console.log(this.$route.query.row)
      Promise.all([detailsRole(this.$route.query.row.id),getRoleMenuTree({roleIds:this.$route.query.row.id})])
      .then(res => {
        this.roleFormData = res[0].data.data
        this.defaultCheckedKeys = res[1].data.data.menu
      })
      .catch(error => {
        console.error(error)
      })
    },
    // 选择角色类型
    // changeRoleType(value){
    //   this.roleType.forEach(item => {
    //     if (item.dictKey === value) {
    //       this.roleFormData.roleType = item.dictValue
    //     }
    //   })
    // },
    // // 选择资源类型
    // changeResourceType(value){
    //   this.resourceType.forEach(item => {
    //     if (item.dictKey === value) {
    //       this.roleFormData.resourceType = item.dictValue
    //     }
    //   })
    // },
    // 上级角色选择
    handleNodeClick(value){
      console.log(value)
      this.roleFormData.parentName = value.title
      this.roleFormData.parentId = value.id
    },
    // 保存
    saveRole(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleFormData.menuIds = this.menuIds
          let addParams = this.roleFormData
          let editParams = {
            id:this.roleFormData.id,
            roleAlias: this.roleFormData.roleAlias,
            roleName: this.roleFormData.roleName,
            descInfo: this.roleFormData.descInfo,
            resourceTypeId: this.roleFormData.resourceTypeId,
            resourceType: this.roleFormData.resourceType,
            roleTypeId: this.roleFormData.roleTypeId,
            roleType: this.roleFormData.roleType,
            isEnabled: this.roleFormData.isEnabled,
            menuIds:this.menuIds
          }
          if (this.operationState === 'add') {
            addRole(addParams)
            .then(res => {
              if (res.data.success) {
                this.$message.success('操作成功')
                this.$router.back()
              }
            })
            .catch(error => {
              console.error(error)
            })
          } else {
            editRole(editParams)
            .then(res => {
              if (res.data.success) {
                this.$message.success('操作成功')
                this.$router.back()
              }
            })
            .catch(error => {
              console.error(error)
            })
          }
        } else {
          return false;
        }
      })
    },
    // 取消
    cancel(){
      this.$router.back()
    },
    // 权限选择
    handleCheck(data,checkNode){
      this.menuIds = []
      checkNode.checkedNodes.forEach(item => {
        this.menuIds.push(item.id)
      })
    },
    // 过滤树状结构
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    traverseTree(data){
      if(!data){return}
      for(let i = 0; i < data.length; i++){
        this.traverseSingle(data[i])
        if(data[i].children && data[i].children.length > 0){
          this.traverseTree(data[i].children)
        }
      }
    },
    traverseSingle(item){
      if (item) {
        item.disabled  = true
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input,.el-select,.el-textarea{
  width:360px
}
.el-col{
  margin-bottom:4px
}
.el-select-dropdown__item.hover{
  background-color: #fff;
}
</style>
