// 新增时获取订单编码
import { getId } from "@/api/common";

const getOrderSn = {
  methods: {
    async getOrderSn (name) { // 获取单据编号
      const res = await getId({codeName: name})
      this.form.number = res.data.data
    },
  }
}

export default getOrderSn