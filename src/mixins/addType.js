import { erpTypeSelect } from "@/api/salesManage/saleType";
import addType from '@/views/components/addType'

const addTypes = {
  data () {
    return {
      typeOptions: [],
      showAddType: false
    }
  },
  components: {
    addType
  },
  mounted () {
    console.log(this)
    this.getTypeOptions();
    // this.getSaleTypeOptions();
  },
  methods: {
    async getTypeOptions() {
      const params = {
        pageNum: 1,
        pageSize: 100,
        type: this.module // 采购类型传1,销售类型传3
      }
      const res = await erpTypeSelect(params);
      this.typeOptions = res.data.data.records;
      this.total = res.data.data.total;
    },
    // async getSaleTypeOptions() {
    //   const params = {
    //     pageNum: 1,
    //     pageSize: 100,
    //     type: 3 // 销售类型传3
    //   }
    //   const res = await erpTypeSelect(params);
    //   this.typeOptions = res.data.data.records;
    //   this.total = res.data.data.total;
    // },
    handleAddType () {
      this.showAddType = true
    },
    changeTypes (value) {
      this.typeOptions.forEach(item => {
        if (value === item.id) {
          if (this.menu === '销售出货') {
            this.form.subTypeName = item.name
          } else if (this.menu === '采购进货') {
            this.form.purTypeName = item.name
          } else {
            this.form.subType = item.name
          }
        }
      })
    }
  }
}

export default addTypes;
