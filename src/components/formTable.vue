<template>
  <div>
    <el-table
      :data="dataList"
      border
      style="width: 100%"
      :show-summary="hasAmount"
      :summary-method="summaryMethod"
    >
      <el-table-column type="index" width="60"> </el-table-column>
      <el-table-column v-if="type != 'detail'" label="" width="60">
        <template slot-scope="scope">
          <div>
            <span class="el-button--text delete" @click="addRow">
              <i class="el-icon-plus" />
            </span>
            <el-button
              class="el-button--text delete"
              style="margin-left: 5px; font-weight: 700"
              type="text"
              :disabled="dataList.length <= 1"
              @click="deleteRow(scope.$index)"
            >
              <i class="el-icon-minus" />
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in list"
        :prop="item.prop"
        :key="item.prop"
        :label="item.label"
        :width="item.width || 'auto'"
      >
        <template slot-scope="scope">
          <div v-if="item.type == 'image'">
            <img class="image" :src="dataList[scope.$index][item.prop]" alt="">
          </div>
          <div v-else-if="item.type == 'detail' || type == 'detail'">
            {{ dataList[scope.$index][item.prop] }}
          </div>
          <div v-else>
            <el-input
              v-if="item.type == 'input'"
              v-model="dataList[scope.$index][item.prop]"
              @focus="itemFocus(item, scope.row)"
            ></el-input>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: "edit",
    },
    list: {
      default: [
        {
          label: "列A",
          prop: "asd",
          type: "input",
        },
      ],
    },
    data: {
      default: "",
    },
  },
  data() {
    return {
      dataList: [],
    };
  },
  computed: {
    row() {
      let obj = {};
      this.list.map((x) => x.prop).forEach((x) => (obj[x] = ""));
      return obj;
    },
    hasAmount() {
      return this.list.find((x) => x.amount);
    },
    amountRow() {
      if (!this.hasAmount) return;
      let a = [];
      this.list.forEach((x, i) => {
        if (x.amount) {
          let s = 0;
          this.dataList.forEach((xx) => {
            s += xx[x.prop] - 0;
          });
          a[i] = "";
          if (s - 0 == s) a[i] = s;
        }
      });
      if (this.type!='detail') a.unshift('')
      a.unshift("合计");
      return a;
    },
  },
  created() {
    if (this.type != "detail") this.dataList = [{ ...this.row }];
    if (this.data) this.dataList = this.data;
  },
  methods: {
    addRow() {
      this.dataList.push({ ...this.row });
    },
    deleteRow(index) {
      this.dataList.splice(index, 1);
    },
    summaryMethod(e) {
      return this.amountRow;
    },
    itemFocus(item, row) {
      if (typeof item.onfocus == "function") row[item.prop] = item.onfocus(row);
    },
    getData() {
      return {
        list: this.dataList,
        amount: this.amountRow,
      };
    },
    setData(data) {
      this.dataList = data;
    },
    setRowData(row, i) {
      this.dataList[i] = row;
    },
  },
};
</script>

<style lang="scss">
.image{
  width: 100%;
} 
</style>