import { erpTypeSelect } from "@/api/salesManage/saleType";
// 销售类型
const saleTypeList = {
  data () {
    return {
      saleTypeList: []
    }
  },
  mounted () {
    this.getSaleTypeList()
  },
  methods: {
    getSaleTypeList () {
      erpTypeSelect({
        pageNum: 1,
        pageSize: 1000,
        type: 3
      }).then(res => {
        this.saleTypeList = res.data.data.records
      })
    }
  }
}
export default saleTypeList