<template>
  <basic-container>
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div class="bar">
          <div>
            <i
              :style="
                getTime(data.day, 'in') !== '无' &&
                getTime(data.day, 'out') !== '无'
                  ? 'color:#67c23a'
                  : ''
              "
              class="icon-mes-xiaolian-xi"
            ></i>
            <i
              :style="
                getTime(data.day, 'in') !== '无' &&
                getTime(data.day, 'out') !== '无'
                  ? 'color:#f7ba2a'
                  : ''
              "
              class="icon-mes-247shijian-xi time"
            ></i>
          </div>
          <div>{{ data.day.split("-")[2] }}</div>
        </div>
        <div class="in">签到: {{ getTime(data.day, "in") }}</div>
        <div class="out">签退: {{ getTime(data.day, "out") }}</div>
      </template>
    </el-calendar>
  </basic-container>
</template>
<script>
import { getUserInfo } from "@/api/common";
import { getList } from "@/api/attendance/index";
export default {
  data() {
    return {
      value: new Date(),
      form: {
        date: "",
        userId: "",
      },
      list: [],
      status: null,
    };
  },
  async created() {
    if(this.$route.query.id){
      this.form.userId=this.$route.query.id
    }
    this.form.date = this.timeFormate(new Date());
    this.getInfo(this.form);
  },
  watch: {
    value() {
      this.form.date = this.timeFormate(this.value);
      this.getInfo(this.form);
    },
  },
  methods: {
    //获取数据
    async getInfo(info) {
      let res = await getList(info);
      if (res.data.code === 200) {
        this.list = res.data.data;
      }
    },
    //显示当前时间（年月）
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      return year + "-" + month;
    },
    //处理数据
    getTime(date, type) {
      let time = "无";
      this.list.forEach((el) => {
        if (type === "in" && el.signInTime) {
          if (date === el.signInTime.split(" ")[0]) {
            time = el.signInTime.split(" ")[1];
          }
        } else if (type === "out" && el.signOutTime) {
          if (date === el.signOutTime.split(" ")[0]) {
            time = el.signOutTime.split(" ")[1];
          }
        } else {
          time = "无";
        }
      });
      return time;
    },
  },
};
</script>
<style scoped>
.bar {
  display: flex;
  justify-content: space-between;
}
.time {
  margin-left: 20px;
}
.in {
  font-size: 14px;
  margin-top: 6px;
}
.out {
  font-size: 14px;
  margin-top: 6px;
}
</style>