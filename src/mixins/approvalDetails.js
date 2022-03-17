
import { getDetail } from "@/api/salesManage/contract.js"; //合同
import contractInfo from "@/views/salesManage/contract/add"
import { getOrderById } from "@/api/salesManage/common.js"; //销售订单
import saleOrderInfo from "@/views/salesManage/saleOrder/add"
// import { getOrderById } from "@/api/salesManage/common.js"; //销售变更单
import changeSaleOrderInfo from "@/views/salesManage/changeSaleOrder/add"
import { detailsInAndOutBoundPage } from "@/api/storageManage/inAndOutBound.js"; //销售、采购出入库
import saleOutboundInfo from "@/views/salesManage/saleOutbound/add"
import { getOrderReturnInfoDetail } from "@/api/salesManage/saleReturn.js"; //销售退货
import saleReturnInfo from "@/views/salesManage/saleReturn/add"
import { getStatementInfo } from "@/api/salesManage/statement.js"; //销售、采购对账单
import statementInfo from "@/views/salesManage/statement/add"
import { getPricingDetail } from "@/api/purchase/pricing.js"; //核价管理
import spricingInfo from "@/views/purchaseManage/pricing/add"
import { getPurchaseOrderById } from "@/api/purchase/common"; //采购管理
import purchaseOrderInfo from "@/views/purchaseManage/purchaseOrder/add"
import { getPurchaseStockById } from "@/api/purchase/purchaseInbound.js"; //采购进货
import purchaseInboundInfo from "@/views/purchaseManage/purchaseInbound/add"
import { getPurchaseReturnInfoDetail } from "@/api/purchase/return.js"; //采购退货
import purchaseReturnInfo from "@/views/purchaseManage/purchaseReturn/add"
import { getPurchaseCheckById } from "@/api/purchase/feedstockCheck.js"; //进料检验
import feedstockCheckInfo from "@/views/purchaseManage/feedstockCheck/check"
import purStatementInfo from "@/views/purchaseManage/statement/add"//采购对账单
import { detail } from "@/api/manufacture/pre-production-plan.js"; //预生产计划
import preProductionPlan from "@/views/production-management/pre-production-plan/add"
import { productionplanDetail } from "@/api/manufacture/produce-plan"; //生产计划
import productionPlanInfo from "@/views/production-management/produce-plan/edit"
import { procurementplanDetail } from "@/api/manufacture/purchase-plan"; //采购计划
import purchasePlanInfo from "@/views/production-management/purchase-plan/edit"
import { detailsAdjustment } from "@/api/storageManage/adjustment"; //库存调整
import adjustmentInfo from "@/views/storageManage/adjustment/add"
import { detailsReturnGoods } from "@/api/storageManage/returnGoods"; //退货管理
import returnGoodsInfo from "@/views/storageManage/returnGoods/add"
import inAndOutBoundInfo from "@/views/storageManage/allocation/add"; //库存调拨
import { detailBean } from "@/api/storageManage/inventoryCheck"; //库存盘点
import inventoryCheckInfo from "@/views/storageManage/inventoryCheck/add"
import inboundManageInfo from "@/views/storageManage/inboundManage/add"//入库管理
import outboundManageInfo from "@/views/storageManage/outboundManage/add"//出库管理
import { detailsCostItems } from "@/api/financial/costItems"; //费用项目
import costItemsInfo from "@/views/financial/costItems/add"
import { detailsIncomeAndExpenditure } from "@/api/financial/financial"; //收入（支出,其他收入）管理
import incomeStatementInfo from "@/views/financial/incomeStatement/add"
import expenseListInfo from "@/views/financial/expenseList/add" //支出管理
import otherReceivablesInfo from "@/views/financial/otherReceivables/add" //其他收入
import otherPayableInfo from "@/views/financial/otherPayable/add" //其他支出
import maintainPlanInfo from "@/views/asset-management/maintainPlan/add" //保养计划
import { getMaintenanceScheduleByPageDetail } from "@/api/asset-management/maintainPlan.js";
import inventoryPlanInfo from "@/views/asset-management/inventoryPlan/add" //资产盘点计划
import { getAssetBookRequestByPageDetail } from "@/api/asset-management/maintainPlan.js";
import assetReallocationInfo from "@/views/asset-management/assetReallocation/add" //资产调剂
import { assetswapDetail } from "@/api/asset-management/assetReallocation.js";
import borrowReturnInfo from "@/views/asset-management/borrowReturn/add" //资产借用
import { borrowReturnDetail } from "@/api/asset-management/borrowReturn.js";
import equipmentDisposalInfo from "@/views/asset-management/equipmentDisposal/add" //资产处置
import { equipmentDisposalDetail } from "@/api/asset-management/equipmentDisposal.js";
import profitLossSingleInfo from "@/views/asset-management/profitLossSingle/add" //资产盘盈单
import { profitLossSingleDetail } from "@/api/asset-management/profitLossSingle.js";
import assetRepairInfo from "@/views/asset-management/assetRepair/add" //资产保修
import { getAssetsRepairByPageDetails } from "@/api/asset-management/repairPlan.js";
import repairPlanInfo from "@/views/asset-management/repairPlan/add" //维修计划
import { getMaintainDetails } from "@/api/asset-management/repairPlan.js";
import checkingPlanInfo from "@/views/asset-management/checkingPlan/add" //点检计划
import { getCheckingPlanDetails } from "@/api/asset-management/checkingPlan.js";
import patrolSchemeInfo from "@/views/asset-management/patrolScheme/add" //巡检计划
import { getPollingByPageDetails } from "@/api/asset-management/patrolScheme.js";
import producePlanInfo from "@/views/production-management/producePlan/add" //生产计划
import { getProductionPlanByPageDetail } from "@/api/manufacture/producePlan.js";//src/api/manufacture/producePlan.js
import downgradeHandlingOrderInfo from "@/views/production-management/downgradeHandlingOrder/edit" //降级工单
import { getDemotionWorkOrderByPageDetail } from "@/api/manufacture/downgradeHandlingOrder.js";
import cutMendPlanOrderInfo from "@/views/production-management/cutMendPlanOrder/add" //切割修补计划
import { getCutMendPlanByPageDetail } from "@/api/manufacture/cutMendPlanOrder.js";
import meshPlanOrderInfo from "@/views/production-management/meshPlanOrder/add" //网片计划
import { getMeshPlanDetail } from "@/api/manufacture/meshPlanOrder.js";
import changeWireFormInfo from "@/views/production-management/changeWireForm/add" //钢丝记录
import { getSteelWireByPageDetail } from "@/api/manufacture/changeWireForm.js";

const exports = {
    data() {
        return {
            info: {}
        }
    },
    mounted() {
    },
    methods: {
        //导出
        async getComponent(type, form) {
            let api = ""
            if (type === "合同") {
                api = getDetail
                this.componentInfos = contractInfo
            } else if (type === "销售订单") {
                api = getOrderById
                this.componentInfos = saleOrderInfo
            } else if (type === "销售变更单") {
                api = getOrderById
                this.componentInfos = changeSaleOrderInfo
            } else if (type === "销售出库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = saleOutboundInfo
            } else if (type === "销售退货") {
                api = getOrderReturnInfoDetail
                this.componentInfos = saleReturnInfo
            } else if (type === "销售退货(退货)") {
                api = getOrderReturnInfoDetail
                this.componentInfos = saleReturnInfo
            } else if (type === "销售退货(扣数)") {
                api = getOrderReturnInfoDetail
                this.componentInfos = saleReturnInfo
            } else if (type === "销售对账单") {
                api = getStatementInfo
                this.componentInfos = statementInfo
            } else if (type === "核价管理") {
                api = getPricingDetail
                this.componentInfos = spricingInfo
            } else if (type === "采购管理") {
                api = getPurchaseOrderById
                this.componentInfos = purchaseOrderInfo
            } else if (type === "采购进货") {
                api = getPurchaseStockById
                this.componentInfos = purchaseInboundInfo
            } else if (type === "采购退货") {
                api = getPurchaseReturnInfoDetail
                this.componentInfos = purchaseReturnInfo
            } else if (type === "进料检验") {
                api = getPurchaseCheckById
                this.componentInfos = feedstockCheckInfo
            } else if (type === "采购对账单") {
                api = getStatementInfo
                this.componentInfos = purStatementInfo
            } else if (type === "预生产计划") {
                api = detail
                this.componentInfos = preProductionPlan
            }
            // else if (type === "生产计划") {
            //     api = productionplanDetail
            //     this.componentInfos = productionPlanInfo
            // } 
            else if (type === "采购计划") {
                api = procurementplanDetail
                this.componentInfos = purchasePlanInfo
            } else if (type === "库存调整") {
                api = detailsAdjustment
                this.componentInfos = adjustmentInfo
            } else if (type === "退货管理") {
                api = detailsReturnGoods
                this.componentInfos = returnGoodsInfo
            } else if (type === "库存调拨") {
                api = detailsInAndOutBoundPage
                this.componentInfos = inAndOutBoundInfo
            } else if (type === "库存盘点") {
                api = detailBean
                this.componentInfos = inventoryCheckInfo
            } else if (type === "入库管理") {
                api = detailsInAndOutBoundPage
                this.componentInfos = inboundManageInfo
            } else if (type === "生产入库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = inboundManageInfo
            } else if (type === "盘点入库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = inboundManageInfo
            } else if (type === "带回托盘入库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = inboundManageInfo
            } else if (type === "备品备件入库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = inboundManageInfo
            } else if (type === "修补入库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = inboundManageInfo
            } else if (type === "行政办公入库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = inboundManageInfo
            } else if (type === "出库管理") {
                api = detailsInAndOutBoundPage
                this.componentInfos = outboundManageInfo
            } else if (type === "生产出库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = outboundManageInfo
            } else if (type === "备品备件出库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = outboundManageInfo
            } else if (type === "行政办公出库") {
                api = detailsInAndOutBoundPage
                this.componentInfos = outboundManageInfo
            } else if (type === "费用项目") {
                api = detailsCostItems
                this.componentInfos = costItemsInfo
            } else if (type === "收入管理") {
                api = detailsIncomeAndExpenditure
                this.componentInfos = incomeStatementInfo
            } else if (type === "支出管理") {
                api = detailsIncomeAndExpenditure
                this.componentInfos = expenseListInfo
            } else if (type === "其他收入") {
                api = detailsIncomeAndExpenditure
                this.componentInfos = otherReceivablesInfo
            } else if (type === "其他支出") {
                api = detailsIncomeAndExpenditure
                this.componentInfos = otherPayableInfo
            } else if (type === "保养计划") {
                api = getMaintenanceScheduleByPageDetail
                this.componentInfos = maintainPlanInfo
            } else if (type === "资产盘点计划") {
                api = getAssetBookRequestByPageDetail
                this.componentInfos = inventoryPlanInfo
            } else if (type === "资产调剂") {
                api = assetswapDetail
                this.componentInfos = assetReallocationInfo
            } else if (type === "资产借用") {
                api = borrowReturnDetail
                this.componentInfos = borrowReturnInfo
            } else if (type === "资产处置") {
                api = equipmentDisposalDetail
                this.componentInfos = equipmentDisposalInfo
            } else if (type === "资产盘盈单" || type === "资产盘亏单") {
                api = profitLossSingleDetail
                this.componentInfos = profitLossSingleInfo
            } else if (type === "资产报修") {
                api = getAssetsRepairByPageDetails
                this.componentInfos = assetRepairInfo
            } else if (type === "点检计划") {
                api = getCheckingPlanDetails
                this.componentInfos = checkingPlanInfo
            } else if (type === "巡检计划") {
                api = getPollingByPageDetails
                this.componentInfos = patrolSchemeInfo
            } else if (type === "维修计划") {
                api = getMaintainDetails
                this.componentInfos = repairPlanInfo
            } else if (type === "生产计划") {
                api = getProductionPlanByPageDetail
                this.componentInfos = producePlanInfo
            } else if (type === "降级工单") {
                api = getDemotionWorkOrderByPageDetail
                this.componentInfos = downgradeHandlingOrderInfo
            } else if (type === "切割修补计划") {
                api = getCutMendPlanByPageDetail
                this.componentInfos = cutMendPlanOrderInfo
            } else if (type === "网片计划") {
                api = getMeshPlanDetail
                this.componentInfos = meshPlanOrderInfo
            } else if (type === "钢丝记录") {
                api = getSteelWireByPageDetail
                this.componentInfos = changeWireFormInfo
            }




            if (api) {
                let query = { id: form.data }
                if (type === "预生产计划") {
                    query = {
                        preProductionPlanId: form.data
                    }
                }
                // else if (type === "生产计划") {
                //     query = {
                //         productionPlanId: form.data
                //     }
                // }
                else if (type === "采购计划") {
                    query = {
                        procurementPlanId: form.data
                    }
                }
                let res = await api(query)
                if (res.data.code === 200) {
                    this.info = res.data.data
                    if (type === "销售出库" || type === "库存调拨" || type === "入库管理" ||
                        type === "出库管理" || type === "生产入库" || type === "盘点入库" ||
                        type === "带回托盘入库" || type === "备品备件入库" || type === "修补入库" ||
                        type === "行政办公入库" || type === "生产出库" || type === "备品备件出库" ||
                        type === "行政办公出库") {
                        this.info = res.data.data.depotHead
                        this.info.depotItemList = res.data.data.depotItems
                    } else if (type === "库存盘点") {
                        this.info = res.data.data.stockTaking
                    }
                }
            }

        }

    }
}
export default exports