import { getBasicInfoByType } from '@/api/salesManage/common'
import customer from '@/components/customer'
import dept from '@/components/dept'
import user from '@/components/user'
import { getPriceByProductId } from "@/api/common";
const common = {
  data() {
    return {
      linkNumberList: [], // 源订单option销售
      showCustomer: false, // 展示选择客户弹窗
      showDept: false, // 展示选择部门
      showUser: false,
      deptId: '' // 选择的部门id
    }
  },
  components: {
    customer,
    dept,
    user
  },
  mounted() {
    // if (this.types !== '采购') {
    //   this.getBasicInfo()
    // } else {
    //   this.getLinknumberOption()
    // }
  },
  methods: {
    async getBasicInfo() { // 获取源订单号销售
      const data = await getBasicInfoByType('销售')
      this.linkNumberList = data.data.data
    },
    selectCustomer(index) { // 选择往来单位处理
      this.showCustomer = true
      this.index = index
    },
    closeCustomer() {
      this.showCustomer = false
    },
    async submitCustomer(val) {
      console.log(val, this.module)
      this.showCustomer = false
      if (this.module === '销售') {
        this.form.memberId = val.id
        this.form.memberUserName = val.name
        this.form.shipInformation.linkName = val.linkName
        this.form.shipInformation.linkPhone = val.phone
        this.customerId = val.id
        this.form.paymentTypeId = val.settlementContactUnitId //带出结算方式
      } else if (this.module === '合同') {
        this.form.memberId = val.id
        this.form.memberName = val.name
      } else if (this.module === '资产台账') {
        this.form.organId = val.id
        this.form.organName = val.name
        this.form.organPhone = val.phone
      }
      else if (this.module === "仓储退货") {
        this.returnManagement.returnManagementItems[this.index].contactUnitName = val.name
        this.returnManagement.returnManagementItems[this.index].contactUnitId = val.id
        let obj = {
          productId: this.returnManagement.returnManagementItems[this.index].productId,
          supplierId: val.id,
        }
        let res = await getPriceByProductId(obj);
        this.returnManagement.returnManagementItems[this.index].unitPrice = res.data.data
      } else if (this.module === "项目") {
        console.log(val)
        this.projectOverviewForm.customerId = val.id
        this.projectOverviewForm.customerLead = val.linkName
        this.projectOverviewForm.customerPhone = val.phone
        this.projectOverviewForm.customerName = val.name
      }
      else if (this.module === "采购退货") {
        this.form.shipInformation.linkName = val.linkName
        this.form.shipInformation.linkPhone = val.phone
        this.form.supplierName = val.name
        this.form.supplierId = val.id
        this.form.paymentTypeId = val.settlementContactUnitId
      }
      else if (this.module === 1) {
        this.form.supplierName = val.name
        this.form.supplierId = val.id
        this.form.paymentTypeId = val.settlementContactUnitId //带出结算方式
        this.form.businessScope = val.businessScope
      }
      else {
        this.form.supplierName = val.name
        this.form.supplierId = val.id
        this.form.paymentTypeId = val.settlementContactUnitId //带出结算方式
      }
    },
    selectDepot() { // 选择部门处理
      this.showDept = true
    },
    closeDept() {
      this.showDept = false
    },
    submitDept(val) {
      console.log(this.module)
      this.showDept = false
      this.deptId = val.id
      if (this.module === '销售') {
        this.form.salesDepot = val.deptName
        this.form.salesDepotId = val.id
      } else if (this.module === '合同') {
        this.form.depotName = val.deptName
        this.form.depotId = val.id
      } else if (this.module === '资产台账') {
        this.form.department = val.deptName
        this.form.departmentId = val.id
      } else if (this.module === '盘点计划') {
        this.form.inventoryRange = val.deptName
        this.form.inventoryRangeId = val.id
      }else if (this.module === '资产借用及归还') {
        this.form.borrowDepartment = val.deptName
        this.form.borrowDepartmentId = val.id
      }
      else if (this.module === '保养计划') {
        this.form.planDepartment = val.deptName
        this.form.planDepartmentId = val.id
      }
      else {
        this.form.purchaseDepot = val.deptName
        this.form.purchaseDepotId = val.id
      }
    },
    selectUser() { // 选择销售员、采购员
      this.showUser = true
    },
    closeUser() {
      this.showUser = false
    },
    submitUser(val) {
      this.showUser = false
      if (this.module === '销售' || this.module === '合同') {
        this.form.salesMan = val.name
        this.form.salesManId = val.id
      } else if (this.module === '校验') {
        this.form.checkPerson = val.name
        this.form.checkPersonId = val.id
      } else if (this.module === '采购计划') {
        this.formInline.buyerName = val.name
        this.formInline.buyerNo = val.id
      } else if (this.module === '资产台账') {
        this.form.whomBelongs = val.name
        this.form.whomBelongsId = val.id
      }
      else if (this.module === '资产借用及归还') {
        this.form.borrower = val.name
        this.form.borrowerId = val.id
      } else if (this.module === '设备处置') {
        this.form.disposalPerson = val.name
        this.form.disposalPersonId = val.id
      }
      else {
        this.form.purchaseMan = val.name
        this.form.purchaseManId = val.id
      }
    },
    handleCancel() {
      this.show = false
    },
  }
}

export default common