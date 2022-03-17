<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div
        class="avue-breadcrumb"
        :class="[{ 'avue-breadcrumb--active': isCollapse }]"
        v-if="showCollapse"
      >
        <i class="icon-navicon" @click="setCollapse"></i>
      </div>
    </div>
    <div class="top-bar__title">
      <div class="top-bar__item top-bar__item--show" v-if="showMenu">
        <top-menu ref="topMenu"></top-menu>
      </div>
      <span class="top-bar__item" v-if="showSearch">
        <top-search></top-search>
      </span>
    </div>
    <div class="top-bar__right">
      <span class="badge" @click="$router.push('/flow2/todoList')">
        <el-tooltip
          class="item"
          effect="dark"
          content="待办事务（可跳转）"
          placement="bottom"
        >
          <el-badge :value="$store.state.common.unReadNum">
            <icon style="font-size: 22px" class="el-icon-message-solid" />
          </el-badge>
        </el-tooltip>
      </span>

      <!-- 换色 -->
      <!-- <el-tooltip v-if="showColor"
                  effect="dark"
                  :content="$t('navbar.color')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-color></top-color>
        </div>
      </el-tooltip> -->
      <!-- <el-tooltip
        v-if="showDebug"
        effect="dark"
        :content="logsFlag ? $t('navbar.bug') : logsLen + $t('navbar.bugs')"
        placement="bottom"
      >
        <div class="top-bar__item">
          <top-logs></top-logs>
        </div>
      </el-tooltip> -->
      <el-tooltip
        v-if="showLock"
        effect="dark"
        :content="$t('navbar.lock')"
        placement="bottom"
      >
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>
      <!-- <el-tooltip v-if="showTheme"
                  effect="dark"
                  :content="$t('navbar.theme')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme></top-theme>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="$t('navbar.notice')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-notice></top-notice>
        </div>
      </el-tooltip> -->
      <el-tooltip
        effect="dark"
        :content="$t('navbar.language')"
        placement="bottom"
      >
        <div class="top-bar__item top-bar__item--show">
          <top-lang></top-lang>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showFullScren"
        effect="dark"
        :content="
          isFullScren ? $t('navbar.screenfullF') : $t('navbar.screenfull')
        "
        placement="bottom"
      >
        <div class="top-bar__item">
          <i
            :class="isFullScren ? 'icon-tuichuquanping' : 'icon-quanping'"
            @click="handleScreen"
          ></i>
        </div>
      </el-tooltip>
      <img class="top-bar__img" :src="userInfo.avatar" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.userName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">{{ $t("navbar.dashboard") }}</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">{{
              $t("navbar.userinfo")
            }}</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided
            >{{ $t("navbar.logOut") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { getApprovalList } from "@/api/flow2/todoList.js";
import { resetRouter } from "@/router/router";
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from "./top-search";
import topTheme from "./top-theme";
import topLogs from "./top-logs";
import topColor from "./top-color";
import topNotice from "./top-notice";
import topLang from "./top-lang";

export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topColor,
    topNotice,
    topLang,
  },
  name: "top",
  data() {
    return {
      socket: null,
    };
  },
  filters: {},
  async created() {
    let info = JSON.parse(localStorage.getItem("saber-userInfo"));
    console.log('info',info);
    this.openSocket(info.content.account);
  },
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showDebug: (state) => state.common.showDebug,
      showTheme: (state) => state.common.showTheme,
      showLock: (state) => state.common.showLock,
      showFullScren: (state) => state.common.showFullScren,
      showCollapse: (state) => state.common.showCollapse,
      showSearch: (state) => state.common.showSearch,
      showMenu: (state) => state.common.showMenu,
      showColor: (state) => state.common.showColor,
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
    ]),
  },
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    //建立scoket链接
    async openSocket(name) {
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        let _this = this;
        console.log("您的浏览器支持WebSocket");
        //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
        //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
        var socketUrl = window.baseServerUrl + ":8062/imserver/" + name;
        // var socketUrl = " http://192.168.16.50:8062/imserver/" + name;
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");

        if (this.socket != null) {
          this.socket.close();
          this.socket = null;
        }
        this.socket = new WebSocket(socketUrl);
        //打开事件
        this.socket.onopen = function () {
          console.log("websocket已打开");
          //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        this.socket.onmessage = function (msg) {
          _this.$store.commit("SET_CHANGEUNREADNUM");
          console.log(msg.data);
          //发现消息进入    开始处理前端触发逻辑
        };
        //待办事务量
        const res = await getApprovalList({ status: 0 });
        if (res.data.code == 200) {
          this.$store.commit("SET_UNREADNUM", res.data.data.total);
        }
        //关闭事件
        this.socket.onclose = function () {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function () {
          console.log("websocket发生了错误");
        };
      }
    },
    logout() {
      this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning",
      }).then(() => {
        this.socket.close();
        this.$store.dispatch("LogOut").then(() => {
          resetRouter();
          this.$router.push({ path: "/login" });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  margin-right: 10px;
  padding-bottom: 6px;
  line-height: 32px;
  cursor: pointer;
}
</style>
