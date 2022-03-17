<template>
  <div class="container">
    <div class="title">
      <div>
        <div class="item">
          <i class="icon-mes-211dingdan-shi"></i>
          <span class="font">图文档查阅</span>
        </div>
      </div>
      <div class="back" @click="$router.push('/production-execution/index')">
        <i class="icon-mes-fanhui"></i>
        <span class="font">返回</span>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="background">
        <div class="content">
          <div class="left">
            <div
              v-for="(selectItem, index) in selectedArray"
              :key="selectItem"
              class="selected-item"
              :class="{ active: selectItem.isActive }"
              @click="handleActive(selectItem, index)"
            >
              {{ selectItem.name }}
            </div>
          </div>
          <div class="right">
            <el-image
              :src="imgUrl"
              fit="contain"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination";
import { getSopListByLine } from "@/api/productionExecution/index";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      id: "",
      selectedArray: [],
      imgUrl: "",
    };
  },
  async created() {
    if (this.$route.query.lineId) {
      this.id = this.$route.query.lineId;
    }
    let res = await getSopListByLine({ lineId: this.id });
    if (res.data.code === 200) {
      res.data.data.forEach((info) => {
        info.isActive = false;
      });
      this.selectedArray = res.data.data;
    }
  },
  methods: {
    handleActive(item, index) {
      this.selectedArray.forEach((ele) => {
        ele.isActive = false;
      });
      this.selectedArray[index].isActive = true;
      this.imgUrl = item.url;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common.scss";

.container {
  min-height: 100%;
  .content-wrapper {
    padding: 20px;
    background: #f7f8fa;
    .background {
      padding: 30px;
      background-color: #fff;
      padding: 20px 0 20px 0;
      .content {
        height: 930px;
        border: 1px solid #dedede;
        display: flex;
        .left {
          width: 267px;
          border-right: 1px solid #dedede;
          .selected-item {
            height: 42px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #6e6e6e;
            line-height: 42px;
            padding-left: 30px;
            box-shadow: 0px -1px 0px 0px #dedede;
          }
          .active {
            background: #0091ff;
            color: #e5f4ff;
          }
        }
        .right {
          padding: 30px;
          flex: 1;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
