// 生产执行
<template>
  <div class="container">
    <div class="title">
      <div class="item">
        <i class="icon-mes-tubiao_chejian"></i>
        <span class="font">所属车间：{{ executeDetail.workShop }}</span>
      </div>
      <!-- <div
        class="item"
        style="margin-right: 30px"
        @click="to('stationSelection')"
      > -->
      <div class="item" style="margin-right: 30px">
        <i class="icon-mes-242zaixianshenqing-xi"></i>
        <span class="font"
          >操作工位：{{ executeDetail.workStation }}
          <el-dropdown @command="handleChenck">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in dataList"
                :key="index"
                :command="item"
              >
                {{ item.factoryName }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
    <div class="table">
      <div class="item">
        <div class="key">工单号</div>
        <div class="value">{{ executeDetail.orderSn }}</div>
      </div>
      <div class="item">
        <div class="key">工单类型</div>
        <div class="value">{{ executeDetail.ordersTypeName }}</div>
      </div>
      <div class="item">
        <div class="key">良品数</div>
        <div class="value">{{ executeDetail.goodNum }}</div>
      </div>
      <div class="item">
        <div class="key">加工时间</div>
        <div class="value">{{ executeDetail.processTime }}</div>
      </div>
      <div class="item">
        <div class="key">排程号</div>
        <div class="value">{{ executeDetail.planSn }}</div>
      </div>
      <div class="item">
        <div class="key">产品名称</div>
        <div class="value">{{ executeDetail.productName }}</div>
      </div>
      <div class="item">
        <div class="key">报废数</div>
        <div class="value">{{ executeDetail.scrapNum }}</div>
      </div>
      <div class="item">
        <div class="key">当前工序</div>
        <div class="value">{{ executeDetail.thisProcessName }}</div>
      </div>
      <div class="item">
        <div class="key">排程数</div>
        <div class="value">{{ executeDetail.planNum }}</div>
      </div>
      <div class="item">
        <div class="key">产品编号</div>
        <div class="value">{{ executeDetail.productSn }}</div>
      </div>
      <div class="item">
        <div class="key">不良数</div>
        <div class="value">{{ executeDetail.badNum }}</div>
      </div>
      <div class="item">
        <div class="key">下工序</div>
        <div class="value">{{ executeDetail.nextProcessName }}</div>
      </div>
      <div class="item">
        <div class="key">完成数</div>
        <div class="value">{{ executeDetail.completeNum }}</div>
      </div>
      <div class="item">
        <div class="key">计划开始</div>
        <div class="value">{{ executeDetail.preStartTime }}</div>
      </div>
      <div class="item">
        <div class="key">实际开始</div>
        <div class="value">{{ executeDetail.realStartTime }}</div>
      </div>
      <div class="item">
        <div class="key">设备状态</div>
        <div class="value">{{ executeDetail.equipmentStatus }}</div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="header">
          <div class="key">SN</div>
          <el-input
            class="value"
            @input="changePlanSn"
            v-model="planSn"
          ></el-input>
        </div>
        <el-table class="table-detail" :data="schedulesMaterialList">
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="productName" label="名称"></el-table-column>
          <el-table-column prop="remark" label="内容">
            <template slot-scope="scope">
              {{ `${scope.row.id} / ${scope.row.productName}` }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <img src="./images/yes.png" alt="" />
        <div class="content">OK:S1020102过站成功</div>
      </div>
    </div>
    <div v-if="hidden" class="footer-wrapper">
      <div class="footer-item">
        <img :src="imageList.startImage" @click="to('task')" />
      </div>
      <div class="footer-item">
        <img  :src="imageList.checkImage" />  <!--@click="checkDialog = true"-->
      </div>
      <div class="footer-item">
        <img :src="imageList.badImage" @click="toBad('bad-record')" />
      </div>
      <div class="footer-item">
        <img :src="imageList.docImage" @click="toDoc('doc-check')" />
      </div>
      <div class="footer-item">
        <img :src="imageList.baogongImage" @click="toInfo('baogong')" />
      </div>
    </div>
    <el-dialog
      :visible.sync="checkDialog"
      :before-close="handleClose"
      title="请选择质检申请类别:"
      append-to-body
      width="30%"
    >
      <el-form ref="searchForm" label-width="90px" class="form-footer">
        <el-form-item label="类别">
          <el-select
            style="width: 90%"
            v-model="dialogForm.planId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkDialog = false" size="small">取消</el-button>
        <el-button type="primary" size="small" @click="query">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getExecuteDetail,
  scanCode,
  getSchedulesMaterialList,
  getWorkStation,
  Check,
} from "@/api/productionExecution/home";
import startImage from "./images/start.png";
import badImage from "./images/bad.png";
import baogongImage from "./images/baogong.png";
import checkImage from "./images/check.png";
import docImage from "./images/doc.png";
import _ from "lodash";

export default {
  data() {
    return {
      form: {
        factoryId: "",
        schedulesOrdersEncode: "",
      },
      planSn: "", // 001000003
      imageList: {
        startImage,
        badImage,
        baogongImage,
        checkImage,
        docImage,
      },
      executeDetail: {},
      schedulesMaterialList: [],
      dataList: [],
      factoryName: "", //工位显示
      checkDialog: false,
      dialogForm: {
        planId: "",
      },
      hidden: false,
      options: [
        {
          value: 1,
          label: "送样检验",
        },
        {
          value: 2,
          label: "首件检验",
        },
        {
          value: 3,
          label: "完工检验",
        },
      ],
    };
  },
  watch: {
    planSn() {
      this.changePlanSn();
    },
  },
  async mounted() {
    let list = await getWorkStation();
    if(list.data.code===200){
        this.dataList = list.data.data;
    }else{
      this.dataList =[];
    }
  
    if (this.$route.query.data) {
      this.form.schedulesOrdersEncode = this.$route.query.data.id;
    }
    await this.getExecuteDetail(this.form);
    await this.getSchedulesMaterialList(
      this.executeDetail.orderId,
      this.executeDetail.lineId,
      this.executeDetail.schedulesId
    );
    this.planSn=this.executeDetail.planSn
  },
  methods: {
    async handleChenck(info) {
      let form = {
        factoryId: info.id,
        schedulesOrdersEncode: "",
      };
      let res = await this.getExecuteDetail(form);
      if (res.data.code === 200) {
        this.executeDetail.workStation = info.factoryName;
      }
    },
    changePlanSn: _.debounce(async function () {
      await this.getSchedulesMaterialList(
        this.executeDetail.orderId,
        this.executeDetail.lineId,
        this.executeDetail.schedulesId
      );
      const res = await scanCode({ code: this.planSn });
      console.log(res);
    }, 1000),
    // 操作执行主页面接口
    async getExecuteDetail(planSn) {
      const res = await getExecuteDetail(planSn);
      if (res.data.code === 200) {
        this.executeDetail = res.data.data;
        if (res.data.data.orderSn) {
          this.hidden = true;
        }
      }
    },
    // 排程工序物料列表
    async getSchedulesMaterialList(orderId, lineId, schedulesId) {
      const res = await getSchedulesMaterialList({
        orderId,
        lineId,
        schedulesId,
      });
      if (res.data.code === 200) {
        this.schedulesMaterialList = res.data.data;
      }
    },
    //检验发起
    async query() {
      let form = {
        planType: this.dialogForm.planId,
        schedulesOrdersEncode: this.executeDetail.planSn,
      };
      const res = await Check(form);
      if (res.data.code === 200) {
        this.$message.success("检验成功");
        this.checkDialog = false;
      }
    },
    to(route) {
      this.$router.push({
        path: "/production-execution/" + route,
      });
    },
    toDoc(route) {
      this.$router.push({
        path: "/production-execution/" + route,
        query: {
          lineId: this.executeDetail.lineId,
        },
      });
    },
    toBad(route) {
      this.$router.push({
        path: "/production-execution/" + route,
        query: {
          data: this.executeDetail,
        },
      });
    },
    toInfo(route) {
      this.$router.push({
        path: "/production-execution/" + route,
        query: {
          data: this.executeDetail,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common.scss";

.container {
  width: 100%;
  height: 100%;
  overflow: scroll;

  .content {
    display: flex;
    padding: 0 29px 0 29px;

    .left {
      width: 50%;
      margin-right: 30px;

      .table-detail {
        margin-top: 20px;
        height: 416px;
        overflow: scroll;
      }

      .header {
        display: flex;

        .key {
          width: 95px;
          background: #157a2c;
          text-align: center;
          font-size: 24px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          color: #ffffff;
          line-height: 60px;
        }

        .value {
          flex: 1;
          border: 1px solid #dedede;
          padding-left: 20px;
          font-size: 24px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.85);
          line-height: 60px;
        }

        /deep/ input {
          border: #fff;
        }
      }
    }

    .right {
      width: 50%;
      height: 496px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #dedede;

      img {
        width: 181px;
        height: 181px;
      }

      .content {
        font-size: 32px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #13ce66;
        line-height: 32px;
      }
    }
  }

  .table {
    display: flex;
    flex-wrap: wrap;

    margin: 29px;
    border-top: 1px solid #dedede;
    // border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;

    .item {
      width: 25%;
      display: flex;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      line-height: 44px;
      border-bottom: 1px solid #dedede;

      .key {
        font-weight: 600;
        width: 40%;
        text-align: center;
        background: #fafafa;
        color: #3e3e3e;
        border-right: 1px solid #dedede;
        border-left: 1px solid #dedede;
      }

      .value {
        padding-left: 20px;
        color: #6e6e6e;
      }
    }
  }

  .title {
    display: flex;
    justify-content: flex-start;
  }

  .footer-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .footer-item {
      position: relative;
      width: 20%;

      img {
        width: 100%;
        height: 214px;
        object-fit: fill;
      }

      .content {
        position: absolute;
        top: 0;
        left: 50%;
        font-size: 28px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        // color: #ffffff;
        color: red;
        line-height: 28px;
      }
    }
  }
}
</style>
