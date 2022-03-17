import { getDepot, findStockByDepotIdAndProductId } from "@/api/common";
// 仓库列表
const depotList = {
  data() {
    return {
      depotList: [],
    }
  },
  mounted() {
    this.getDepotList()
  },
  methods: {
    async getDepotList() {
      const data = await getDepot()
      this.depotList = data.data.data
    },
    async changeDepot(val, index, type) { // 改变仓库
      console.log(index);
      const res = await findStockByDepotIdAndProductId({
        depotId: val,
        productId: this.tableData[index].productId
      })
      if (type === 'rowDepot') {
        this.tableData[index].depotList.forEach(item => {
          if (item.id === val) {
            this.tableData[index].depotName = item.depotName
            if (res.data.data.stock) {
              this.tableData[index].stock = res.data.data.stock
            } else {
              this.tableData[index].stock = 0
            }
          }
        })
        // this.itemKey = Math.random()
      } else {
        this.depotList.forEach(item => {
          if (item.id === val) {
            this.tableData[index].depotName = item.depotName
            // this.tableData[index].stock = res.data.data.stock
            if (res.data.data.stock) {
              this.tableData[index].stock = res.data.data.stock
            } else {
              this.tableData[index].stock = 0
            }
          }
        })
        // this.itemKey = Math.random()
      }
      this.itemKey = Math.random()
    },
  }
}

export default depotList