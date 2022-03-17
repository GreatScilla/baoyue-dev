// 分页
const pagination = {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [5, 10, 15, 20, 25]
    };
  },
  methods: {
    async handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 1;
      await this.handleList(this.searchForm);
    },
    async handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      await this.handleList(this.searchForm);
    }
  }
};

export default pagination;
