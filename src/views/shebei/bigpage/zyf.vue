<template>
<div>
  <div class="wrap" v-if="info.show">
    <div class="left">
      <div class="leftp"> <span>釜前静养窑</span></div>
      <div class="leftInner" style="opacity: 0"></div>
      <div class="leftInner" style="">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span @click="opop">{{needdata[8].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[8].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑10</span>
        <div class="leftbage">
          <span @click="lineShow" ref="a8" id="a8" class="a8">A9&nbsp;出</span>
          <span @click="lineShow" class="a18">B9&nbsp;进</span>
        </div>
        <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[18].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[18].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[8].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[8].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑09</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a7">A8&nbsp;出</span>
          <span @click="lineShow"  class="a17">B8&nbsp;进</span>
        </div>
        <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[17].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[17].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[6].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[6].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑08</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a6">A7&nbsp;出</span>
<!--          <span></span>-->
          <span @click="lineShow"  class="a16">B7&nbsp;进</span>
        </div>
        <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[16].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[16].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[5].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[5].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑07</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a5">A6&nbsp;出</span>
<!--          <span></span>-->
          <span @click="lineShow"  class="a15">B6&nbsp;进</span>
        </div>
        <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[15].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[15].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[4].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[4].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑06</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a4">A5&nbsp;出</span>
<!--          <span></span>-->
          <span @click="lineShow"  class="a14">B5&nbsp;进</span>
        </div>
        <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[14].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[14].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[3].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[3].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑05</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a3">A4&nbsp;出</span>
<!--          <span></span>-->
          <span @click="lineShow"  class="a13">B4&nbsp;进</span>
        </div>
        <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[13].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[13].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[2].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[2].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑04</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a2">A3&nbsp;出</span>
<!--          <span></span>-->
          <span @click="lineShow"  class="a12">B3&nbsp;进</span>
        </div>
        <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[12].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[12].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[1].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[1].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑03</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a1">A2&nbsp;出</span>
<!--          <span></span>-->
          <span @click="lineShow"  class="a11">B2&nbsp;进</span>
        </div>
        <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[11].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[11].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[0].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[0].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑02</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a0">A1&nbsp;出</span>
<!--          <span></span>-->
          <span @click="lineShow"  class="a10">B1&nbsp;进</span>
        </div>
         <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[10].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[10].humidity}}%</span></p>
        </div>
      </div>
      <div class="leftInner">
        <div class="leftmini" style="top: 50px">
          <p><span>温度:</span><span>{{needdata[9].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[9].humidity}}%</span></p>
        </div>
        <span class="zyfCode">釜前静养窑01</span>
        <div class="leftbage">
          <span @click="lineShow"  class="a9">A0&nbsp;出</span>
<!--          <span></span>-->
          <span @click="lineShow"  class="a19">B0&nbsp;进</span>
        </div>
         <div class="leftmini">
          <p><span>温度:</span><span>{{needdata[18].temperature}}℃</span></p>
          <p><span>湿度:</span><span>{{needdata[18].humidity}}%</span></p>
        </div>
      </div>
    </div>
    <div class="right">
      <span class="rightTop">静停车间</span>
      <p><i class="el-icon-close" style="float: right" @click="btnclick"></i></p>
      <div class="rightF">
        <div @click="clickC"  class=" endOne" id="a22">C3</div>
        <div class="endbox">
          <div class="endTwo"><span>温度:</span><span>{{needdata[22].temperature}}℃</span></div>
          <div class="endTwo"><span>湿度:</span><span>{{needdata[22].humidity}}%</span></div>
        </div>
      </div>
      <div class="rightF">
        <div @click="clickC"  class=" endOne" id="a25">C6</div>
        <div class="endbox">
          <div class="endTwo"><span>温度:</span><span>{{needdata[25].temperature}}℃</span></div>
          <div class="endTwo"><span>湿度:</span><span>{{needdata[25].humidity}}%</span></div>
        </div>
      </div>
      <div class="rightF">
        <div @click="clickC" class=" endOne" id="a21">C2</div>
        <div class="endbox">
          <div class="endTwo"><span>温度:</span><span>{{needdata[21].temperature}}℃</span></div>
          <div class="endTwo"><span>湿度:</span><span>{{needdata[21].humidity}}%</span></div>
        </div>
      </div>
      <div class="rightF">
        <div @click="clickC"  class=" endOne" id="a24">C5</div>
        <div class="endbox">
          <div class="endTwo"><span>温度:</span><span>{{needdata[24].temperature}}℃</span></div>
          <div class="endTwo"><span>湿度:</span><span>{{needdata[24].humidity}}%</span></div>
        </div>
      </div>
      <div class="rightF">
        <div @click="clickC" class=" endOne"  id="a20">C1</div>
        <div class="endbox">
          <div class="endTwo"><span>温度:</span><span>{{needdata[20].temperature}}℃</span></div>
          <div class="endTwo"><span>湿度:</span><span>{{needdata[20].humidity}}%</span></div>
        </div>
      </div>
      <div class="rightF">
        <div @click="clickC"  class=" endOne" id="a23">C4</div>
        <div class="endbox">
          <div class="endTwo"><span>温度:</span><span>{{needdata[23].temperature}}℃</span></div>
          <div class="endTwo"><span>湿度:</span><span>{{needdata[23].humidity}}%</span></div>
        </div>
      </div>


    </div>
  </div>
  <brokenline :tes="tes"></brokenline>
</div>
</template>

<script>
// import {echartsdata} from "@/api/shebei/commit"
import brokenline from "./brokenline"

export default {
  components:{
    brokenline
  },
  props:['info'],
  name: "zyf",
  data(){
    return{
      needdata:[],
    tes:{
        lineid:"",
      showtwo:false
    },
  }

  },
  created() {
    this.getdata()
  },
  methods:{
    clickC(e){
      this.tes.showtwo=true
      this.tes.lineid=e.currentTarget.id.slice('1')
    },
    opop(){
      console.log(this.needdata)
    },
   async getdata(){

    //   let res = await echartsdata()
    //  this.needdata=res.data.data
     // console.log(res.data.data,999)
     // console.log(res.data.data[0].humidity,77777)
    },
    lineShow(e){
      console.log(e)
      console.log(e.currentTarget.id)
      console.log(e.currentTarget.className.slice('1'),889);
      this.tes.lineid=e.currentTarget.className.slice('1')
      this.tes.showtwo=true
    },
    btnclick(){
      this.info.show=false
      this.$parent.showBack=true
    },
    closeBtn(){
      this.info.showtwo=false
    }
  },
}
</script>

<style scoped>
.rightTop{
  position: absolute;
  color: white;
  right: 430px;
  top: 10px;
  font-size: 22px;
}
.endTwo{
  height: 30px;
  color: white;
}
.endOne{
  width: 60px;
  height: 60px;
  padding-left: 15px;
  cursor:pointer;
  font-size: 38px;
  color: #1E77D2;
}
.rightF{
  display: flex;
  width: 210px;
  height: 139px;
  /* background-color: rgba(33,68,120,1); */
  background-image: url('./img/jycjbg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  justify-content: space-around;
  align-items: center;
}
.endbox{
  padding-right: 10px;
  width: 90px;
  height: 60px;

  /*line-height: 60px;*/
}
.right p{
  width: 500px;
  height: 75px;
  /*background-color: #dd6161;*/
  /*opacity: 0.2;*/
}
.button{
  margin: 0;
  padding: 0;
  font-size: 25px;
  color: white;
  /*border: 1px solid transparent;  */
outline: none;
}
.leftbage span{
  cursor:pointer;
}
.leftbage{
  width: 873px;
  height: 93px;
  transform: scale(0.8);
  background-image: url("./img/brage.png");
  background-size: cover;
  display: flex;
  justify-content: space-between;
  font-size: 38px;
  color: #1E77D2;
  line-height: 93px;
  /*background-color: #dd6161;*/
}
.leftmini span{
  /*background-color: #04d9b2;*/
}
.leftmini{
  width: 101px;
  height: 80px;
  text-align: center;
  font-size: 16px;
  color: white;
}
.leftp{
  margin-top: -5px;
  width: 1200px;
  height: 70px;
  font-size: 22px;
  color: white;
  padding-left: 35px;
    line-height: 60px;
  position: absolute;

  /*background-color: #04d9b2;*/
}
/*.leftmini p{*/
/*  height: 75px;*/
/*}*/
.leftInner{
  /*transform: scale(0.4);*/
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*flex-wrap: wrap;*/
  margin-top: -6px;
  width: 1150px;
  height: 75px;
  /*background-color: #04d9b2;*/
  /* background-color: rgb(31,120,211); */
  border-radius: 6px;
  background-image: url("./img/leftinner.png");
  background-size: 100% 100%;
  position: relative;
}
 .zyfCode {
    color:#fff;
    position: absolute;
    font-size: 18px;
    left: 45%;
    top: 20%;
    padding-bottom: 10px;
  }
.top{
  width: 1920px;
  height: 20px;
}
.right{
  background-image: url("./img/right.png");
  background-size: 100% 100%;
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  /*background-color: #04d9b2;*/
}
.left{
  overflow: hidden;
  background-image: url("./img/back.png");
  background-size: 100% 100%;
  width: 68%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /*background-color: #dd6161;*/
}
.wrap{
  /* overflow: hidden; */
  /*transform: scale(0.8);*/
  position: fixed;
  top: 60px;
  left: 0px;
  width: 100%;
  height: 1010px;
  background-color: #022440;
  display: flex;
  justify-content: space-around;
  /*flex-wrap: wrap;*/
}
.el-dialog__body{
  background-color: #030E34;
}
</style>
