// 员工档案新增
<template>
  <basic-container>
    <el-row>
      <el-row>
        <div class="title">基本信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-form
        label-width="150px"
        :model="employeeFileForm"
        ref="employeeFileForm"
        :rules="rules"
        class="detail-form"
        :inline-message="true"
      >
        <!-- 基本信息 -->
        <el-row>
          <el-col :span="1">
            <el-form-item label-width="10px">
              <el-image
                v-if="type === 'detail'"
                style="width: 104px; height: 104px"
                :src="employeeFileForm.personnelFileBase.pic"
                fit="cover"
              >
              </el-image>
              <upload-one-img
                v-else
                :imgUrl="employeeFileForm.personnelFileBase.pic"
                @handleUploadImgUrl="handleUploadImgUrl"
              >
              </upload-one-img>
            </el-form-item>
          </el-col>
          <el-col :span="11.5">
            <el-form-item
              required
              label="工号:"
              prop="personnelFileBase.jobNumber"
            >
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.jobNumber }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入工号"
                v-model="employeeFileForm.personnelFileBase.jobNumber"
              >
              </el-input>
            </el-form-item>
            <!-- <el-form-item required label="入职编号:">
              <el-input
                size="small"
                placeholder="请输入入职编号"
                v-model="employeeFileForm.personnelFileBase.number">
              </el-input>
            </el-form-item> -->
            <!-- <el-form-item label="英文名:">
              <el-input
                size="small"
                v-model="employeeFileForm.personnelFileBase.englishName">
              </el-input>
            </el-form-item> -->
            <el-form-item label="籍贯:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.address }}</span
              >
              <el-cascader
                v-else
                style="width: 240px; margin-right: 10px"
                size="small"
                :options="addressOptions"
                v-model="baseAddressId"
                @change="handleChange"
                ref="personnelFileBaseAddress"
                placeholder="请选择籍贯"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item
              required
              label="部门:"
              prop="personnelFileBase.deptId"
            >
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.deptName }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileBase.deptId"
                placeholder="请选择部门"
                @change="changeDept"
              >
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              required
              label="职务:"
              prop="personnelFileBase.postId"
            >
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.postName }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileBase.postId"
                placeholder="请选择职务"
                @change="changePost"
              >
                <el-option
                  v-for="item in postNameOptions"
                  :key="item.id"
                  :label="item.postName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="公司邮箱:">
              <el-input
                size="small"
                v-model="employeeFileForm.personnelFileBase.companyEmail">
              </el-input>
            </el-form-item> -->
            <el-form-item
              required
              label="身份证号:"
              prop="personnelFileBase.idNumber"
            >
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.idNumber }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入身份证号"
                v-model="employeeFileForm.personnelFileBase.idNumber"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="婚姻状况:">
              <span v-if="type === 'detail'">
                {{
                  employeeFileForm.personnelFileBase.maritalStatus
                    | maritalStatus
                }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileBase.maritalStatus"
                placeholder="请选择婚姻状况"
              >
                <el-option
                  v-for="item in marriageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="现居地址:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.currentAddress }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入现居地址"
                v-model="employeeFileForm.personnelFileBase.currentAddress"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="紧急联系人姓名:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.secondLinkName }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入紧急联系人姓名"
                v-model="employeeFileForm.personnelFileBase.secondLinkName"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="紧急联系人电话:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.secondLinkPhone }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入紧急联系人电话"
                v-model="employeeFileForm.personnelFileBase.secondLinkPhone"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11.5">
            <el-form-item required label="姓名:" prop="personnelFileBase.name">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.name }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入姓名"
                v-model="employeeFileForm.personnelFileBase.name"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="户籍地址:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.censusAddress }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入户籍地址"
                v-model="employeeFileForm.personnelFileBase.censusAddress"
              >
              </el-input>
            </el-form-item>
            <el-form-item required label="性别:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.sex }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileBase.sex"
                placeholder="请选择性别"
              >
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.birthday }}</span
              >
              <el-date-picker
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileBase.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="政治面貌:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.politicsStatus }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileBase.politicsStatus"
                placeholder="请选择政治面貌"
              >
                <el-option
                  v-for="item in politicsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              required
              label="手机号:"
              prop="personnelFileBase.phone"
            >
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.phone }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入手机号"
                v-model="employeeFileForm.personnelFileBase.phone"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.email }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入邮箱"
                v-model="employeeFileForm.personnelFileBase.email"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="紧急联系人关系:">
              <span v-if="type === 'detail'">
                {{
                  employeeFileForm.personnelFileBase.secondLinkRelation
                }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileBase.secondLinkRelation"
                placeholder="请选择紧急联系人关系"
              >
                <el-option
                  v-for="item in contactsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">入职信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <!-- 入职信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item
              required
              label="入职时间:"
              prop="personnelFileEntry.joinDate"
            >
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileEntry.joinDate }}</span
              >
              <el-date-picker
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileEntry.joinDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="参加工作时间:">
              <el-date-picker
                size="small"
                v-model="employeeFileForm.personnelFileEntry.workDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="合同开始时间:">
              <el-date-picker
                size="small"
                v-model="employeeFileForm.personnelFileEntry.contractStartDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="员工状态:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileEntry.status | status }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileEntry.status"
                placeholder="请选择员工状态"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="上级领导:">
              <el-select size="small" v-model="employeeFileForm.personnelFileEntry.lederId" placeholder="请选择" @change="changeLeder">
                <el-option
                  v-for="item in lederOptions"
                  :key="item.id"
                  :label="item.realName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="转正时间:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileEntry.positiveDate }}</span
              >
              <el-date-picker
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileEntry.positiveDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="上家单位离职时间:">
              <el-date-picker
                size="small"
                v-model="employeeFileForm.personnelFileEntry.lastDimissionDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item> -->
            <!-- <el-form-item label="合同结束时间:">
              <el-date-picker
                size="small"
                v-model="employeeFileForm.personnelFileEntry.contractEndDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="离职时间:">
              <span v-if="type === 'detail'">
                {{
                  employeeFileForm.personnelFileEntry.speedDimissionDate
                }}</span
              >
              <el-date-picker
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileEntry.speedDimissionDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="职责描述:">
          <span v-if="type === 'detail'">
            {{ employeeFileForm.personnelFileEntry.description }}</span
          >
          <el-input
            v-else
            size="small"
            type="textarea"
            placeholder="请输入职责描述"
            v-model="employeeFileForm.personnelFileEntry.description"
          >
          </el-input>
        </el-form-item>
        <el-row>
          <div class="title">教育信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <!-- 教育信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="毕业院校:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileEducation.school }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入毕业院校"
                v-model="employeeFileForm.personnelFileEducation.school"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="最高学历:">
              <span v-if="type === 'detail'">
                {{
                  employeeFileForm.personnelFileEducation.educationBackground
                }}</span
              >
              <el-select
                v-else
                size="small"
                v-model="
                  employeeFileForm.personnelFileEducation.educationBackground
                "
                placeholder="请选择最高学历"
              >
                <el-option
                  v-for="item in educationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="学位:">
              <el-select size="small" v-model="employeeFileForm.personnelFileEducation.degree" placeholder="请选择">
                <el-option
                  v-for="item in degreeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业时间:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileEducation.graduateDate }}</span
              >
              <el-date-picker
                v-else
                size="small"
                v-model="employeeFileForm.personnelFileEducation.graduateDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="专业:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileEducation.major }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入专业"
                v-model="employeeFileForm.personnelFileEducation.major"
              >
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="外语语种:">
              <el-input
                size="small"
                v-model="employeeFileForm.personnelFileEducation.language">
              </el-input>
            </el-form-item> -->
          </el-col>
        </el-row>
        <el-row>
          <div class="title">社保公积金</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <!-- 社保公积金 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="公积金账号:">
              <span v-if="type === 'detail'">
                {{
                  employeeFileForm.personnelFileSocialSecurity
                    .accumulationFundAccount
                }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入公积金账号"
                v-model="
                  employeeFileForm.personnelFileSocialSecurity
                    .accumulationFundAccount
                "
              >
              </el-input>
            </el-form-item>
            <el-form-item label="社保缴纳地:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileBase.address }}</span
              >
              <el-cascader
                v-else
                style="width: 240px; margin-right: 10px"
                size="small"
                :options="addressOptions"
                v-model="securityAddressId"
                @change="handleChangePersonnelFileSocialSecurity"
                ref="personnelFileSocialSecurityAddress"
                placeholder="请选择社保缴纳地"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="工资开户支行:">
              <span v-if="type === 'detail'">
                {{
                  employeeFileForm.personnelFileSocialSecurity.openingBank
                }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入工资开户支行"
                v-model="
                  employeeFileForm.personnelFileSocialSecurity.openingBank
                "
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社保账号:">
              <span v-if="type === 'detail'">
                {{
                  employeeFileForm.personnelFileSocialSecurity
                    .socialSecurityAccount
                }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入社保账号"
                v-model="
                  employeeFileForm.personnelFileSocialSecurity
                    .socialSecurityAccount
                "
              >
              </el-input>
            </el-form-item>
            <el-form-item label="工资卡号:">
              <span v-if="type === 'detail'">
                {{
                  employeeFileForm.personnelFileSocialSecurity.cardNumber
                }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入工资卡号"
                v-model="
                  employeeFileForm.personnelFileSocialSecurity.cardNumber
                "
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">其他信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <!-- 其他信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="兴趣爱好:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileOther.hobby }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入兴趣爱好"
                v-model="employeeFileForm.personnelFileOther.hobby"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="备注:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileOther.remark }}</span
              >
              <el-input
                v-else
                size="small"
                type="textarea"
                placeholder="请输入备注"
                v-model="employeeFileForm.personnelFileOther.remark"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="是否设置转正提醒:">
              <el-radio
                :disabled="type === 'detail' ? true : false"
                v-model="employeeFileForm.personnelFileOther.isPositiveRemind"
                :label="0"
                >是</el-radio
              >
              <el-radio
                :disabled="type === 'detail' ? true : false"
                v-model="employeeFileForm.personnelFileOther.isPositiveRemind"
                :label="1"
                >否</el-radio
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信号:">
              <span v-if="type === 'detail'">
                {{ employeeFileForm.personnelFileOther.wxId }}</span
              >
              <el-input
                v-else
                size="small"
                placeholder="请输入微信号"
                v-model="employeeFileForm.personnelFileOther.wxId"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer" style="margin-bottom: 30px">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveEmployeeFile"
        >提交</el-button
      >
    </el-row>
  </basic-container>
</template>

<script>
import {
  addEmployeeFile,
  getDutiesList,
  detailsEmployeeFile,
  editEmployeeFile,
  getSuperior,
} from "@/api/humanResources/employeeFile";
import { getDepartmentList } from "@/api/humanResources/department";
import uploadOneImg from "@/components/upload/uploadOneImg";
import { isMobile, isIDCard } from "@/util/validate";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  components: {
    uploadOneImg,
  },
  props: {
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      addressOptions: regionData,
      employeeFileForm: {
        personnelFileBase: {
          sex: "男",
          pic: "",
        },
        personnelFileEntry: {
          status: 4,
        },
        personnelFileEducation: {},
        personnelFileSocialSecurity: {},
        personnelFileOther: {},
      },
      sexOptions: [
        {
          value: 0,
          label: "男",
        },
        {
          value: 1,
          label: "女",
        },
      ],
      marriageOptions: [
        {
          value: "0",
          label: "未婚",
        },
        {
          value: "1",
          label: "已婚",
        },
        {
          value: "2",
          label: "离异",
        },
        {
          value: "3",
          label: "不婚族",
        },
        {
          value: "4",
          label: "丁克",
        },
      ],
      contactsOptions: [
        {
          value: 0,
          label: "父子",
        },
        {
          value: 1,
          label: "母子",
        },
        {
          value: 2,
          label: "兄长",
        },
        {
          value: 3,
          label: "情侣",
        },
        {
          value: 4,
          label: "朋友",
        },
      ],
      politicsOptions: [
        {
          value: 0,
          label: "中共党员",
        },
        {
          value: 1,
          label: "普通群众",
        },
        {
          value: 2,
          label: "预备党员",
        },
      ],
      statusOptions: [
        {
          value: 4,
          label: "正式",
        },
        {
          value: 5,
          label: "试用",
        },
        {
          value: 2,
          label: "兼职",
        },
      ],
      educationOptions: [
        {
          value: 0,
          label: "本科",
        },
        {
          value: 1,
          label: "专科",
        },
        {
          value: 1,
          label: "研究生",
        },
        {
          value: 1,
          label: "博士",
        },
        {
          value: 1,
          label: "专科以下",
        },
      ],
      degreeOptions: [
        {
          value: 0,
          label: "学士学位",
        },
        {
          value: 1,
          label: "硕士学位",
        },
        {
          value: 1,
          label: "博士学位",
        },
      ],
      postNameOptions: [],
      deptOptions: [],
      lederOptions: [],
      baseAddressId: "",
      securityAddressId: "",
      rules: {
        "personnelFileBase.name": [
          {
            required: true,
            message: "请输入姓名",
            trigger: ["blur", "change"],
          },
        ],
        "personnelFileBase.jobNumber": [
          {
            required: true,
            message: "请输入工号",
            trigger: ["blur", "change"],
          },
        ],
        "personnelFileBase.postId": [
          {
            required: true,
            message: "请选择职务",
            trigger: ["blur", "change"],
          },
        ],
        "personnelFileBase.deptId": [
          {
            required: true,
            message: "请选择部门",
            trigger: ["blur", "change"],
          },
        ],
        "personnelFileBase.phone": [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入手机号"));
              } else {
                if (!isMobile(value)) {
                  callback(new Error("手机号格式错误"));
                } else {
                  callback();
                }
              }
            },
          },
        ],
        "personnelFileBase.idNumber": [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入身份证"));
              } else {
                if (!isIDCard(value)) {
                  callback(new Error("身份证格式错误"));
                } else {
                  callback();
                }
              }
            },
          },
        ],
        "personnelFileEntry.joinDate": [
          {
            required: true,
            message: "请选择入职时间",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.initDeptDuties();
    if (this.type !== "add") {
      let id = this.data.id;
      this.initEmployeeFile(id);
    }
  },
  methods: {
    // 详情
    async initEmployeeFile(id) {
      let res = await detailsEmployeeFile({ id: id });
      this.employeeFileForm = res.data.data;
      if (this.employeeFileForm.personnelFileBase.addressId) {
        this.baseAddressId =
          this.employeeFileForm.personnelFileBase.addressId.split(",");
      }
      if (this.employeeFileForm.personnelFileSocialSecurity.addressId) {
        this.securityAddressId =
          this.employeeFileForm.personnelFileSocialSecurity.addressId.split(
            ","
          );
      }
    },
    // 选择地址
    handleChange(value) {
      this.employeeFileForm.personnelFileBase.addressId = value.toString();
      this.employeeFileForm.personnelFileBase.address = this.$refs[
        "personnelFileBaseAddress"
      ]
        .getCheckedNodes()[0]
        .pathLabels.toString();
    },
    // 社保选择地址
    handleChangePersonnelFileSocialSecurity(value) {
      this.employeeFileForm.personnelFileSocialSecurity.addressId =
        value.toString();
      this.employeeFileForm.personnelFileSocialSecurity.address = this.$refs[
        "personnelFileSocialSecurityAddress"
      ]
        .getCheckedNodes()[0]
        .pathLabels.toString();
    },
    // 选择部门
    changeDept(value) {
      let item = this.deptOptions.filter((item) => {
        return item.id === value;
      });
      this.employeeFileForm.personnelFileBase.deptName = item[0].deptName;
    },
    // 选择岗位
    changePost(value) {
      let item = this.postNameOptions.filter((item) => {
        return item.id === value;
      });
      this.employeeFileForm.personnelFileBase.postName = item[0].postName;
    },
    // 选择上级
    changeLeder(value) {
      let item = this.lederOptions.filter((item) => {
        return item.id === value;
      });
      this.employeeFileForm.personnelFileEntry.lederName = item[0].realName;
    },
    // 上传图片url
    handleUploadImgUrl(value) {
      this.employeeFileForm.personnelFileBase.pic = value;
    },
    //获取部门/职务/上级
    async initDeptDuties() {
      let res = await Promise.all([
        getDepartmentList(),
        getDutiesList({ current: 1, size: 10000 }),
        getSuperior({ current: 1, size: 10000 }),
      ]);
      this.deptOptions = res[0].data.data;
      this.postNameOptions = res[1].data.data.records;
      this.lederOptions = res[2].data.data.records;
    },
    // 提交
    async saveEmployeeFile() {
      try {
        await this.$refs.employeeFileForm.validate();
      } catch (error) {
        return;
      }
      if (this.type === "add") {
        let res = await addEmployeeFile(this.employeeFileForm);
        if (res.data.success) {
          this.$message.success("操作成功");
          this.$router.back();
        }
      } else {
        let res = await editEmployeeFile(this.employeeFileForm);
        if (res.data.success) {
          this.$message.success("操作成功");
          this.$router.back();
        }
      }
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
  filters: {
    maritalStatus: function (value) {
      if (value === "0") {
        value = "未婚";
      } else if (value === "1") {
        value = "已婚";
      } else if (value === "2") {
        value = "离异";
      } else if (value === "3") {
        value = "不婚族";
      } else if (value === "4") {
        value = "丁克";
      }
      return value;
    },
    status: function (value) {
      if (value === 4) {
        value = "正式";
      } else if (value === 5) {
        value = "试用";
      } else if (value === 2) {
        value = "兼职";
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-input,
.el-select,
.el-cascader,
.el-textarea {
  width: 360px;
}
</style>

