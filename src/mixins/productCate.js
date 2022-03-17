import { getProductByCate, getProductByCateIds } from "@/api/common";
import paginationMixin from "@/mixins/pagination";
import { FormItem } from "element-ui";
// 产品列表
const productList = {
  data() {
    return {
      productCateList: [],
      productList: [],
      id: ''
    }
  },
  mixins: [paginationMixin],
  mounted() {
    this.getProductList()
  },
  methods: {
    async getProductList() { // 获取左侧数据树
      const data = await getProductByCate(this.keyWord)
      // this.productList = []
      this.productCateList = data.data.data
      if (this.productCateList.length > 0) {
        this.id = this.productCateList[0].productCateList[0].id
        this.handleList()
      }
      // this.productCateList.forEach(items => {
      //   items.productCateList.forEach(item => {
      //     this.productList = [...this.productList, ...item.productList]
      //   })
      // })
    },
    async handleList() { // 获取表格数据
      let form = {}
      if (this.searchForm) {
        form = this.searchForm
      }
      const res = await getProductByCateIds({
        name: form.name,
        model: form.model,
        supplierId: this.supplierId,
        cateIds: this.id,
        productGrade: this.productGrade,
        current: this.currentPage,
        size: this.pageSize,
      })
      for (var i = 0; i < res.data.data.records.length; i++) {
        if (res.data.data.records[i].status == '1' && parseFloat(res.data.data.records[i].stock) <= 0) {
          res.data.data.records.splice(i, 1);
        }
      }
      this.productList = res.data.data.records
      this.total = res.data.data.total
    }
  }
}

export default productList