<template>
  <div>
    <!-- 基本信息 -->
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <storng>* 基本信息</storng>
        </div></el-col
      >
    </el-row>
    <el-divider></el-divider>

    <el-form ref="form" :model="detaliForm">
      <!-- 1： -->
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="设备编号 :">
              {{ detaliForm.equipmentCoding }}
            </el-form-item>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-form-item label="设备名称 :">{{detaliForm.name}}</el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="资产编号 :">{{detaliForm.assetTag}}</el-form-item></div
        ></el-col>
      </el-row>
      <!-- 2： -->
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="设备类别 :">
              {{ detaliForm.category }}
            </el-form-item>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-form-item label="设备状态 :">
              <!-- status 有可能 -->
              {{ detaliForm.equipStatus }}</el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="所在仓库 :">{{ detaliForm.location }}</el-form-item></div
        ></el-col>
      </el-row>
      <!-- 3： -->
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="购置日期 :">
              {{ detaliForm.purchaseDate }}
            </el-form-item>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-form-item label="供应商 :">{{ detaliForm.supplierName }}</el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="库位编码 :">{{ detaliForm.barCode }}</el-form-item></div
        ></el-col>
      </el-row>

      <!-- 更多信息 -->
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">
            <storng>* 更多信息</storng>
          </div></el-col
        >
      </el-row>
      <el-divider></el-divider>
      <!-- 1： -->
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="设备图片 :">
              <el-image
                style="width: 50px; height: 50px"
                :src="detaliForm.picture"
                fit="cover"
              ></el-image>
            </el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-form-item label="品牌 :">{{detaliForm.brand}}</el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="购置金额 :">{{detaliForm.price}}</el-form-item></div
        ></el-col>
      </el-row>
      <!-- 2： -->
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="出场日期 :">
              {{ detaliForm.productionDate }}
            </el-form-item>
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            <el-form-item label="质保日期 :">{{ detaliForm.qualityGuaranteePeriod }}</el-form-item></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <el-form-item label="计量单位 :">{{ detaliForm.unit }}</el-form-item></div
        ></el-col>
      </el-row>

      <!-- 备注 -->
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">
            <storng>* 备注</storng>
          </div></el-col
        >
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">
            <p>{{detaliForm.memo}}</p>
          </div></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>
<script>

export default {
  name: "",
  components: {},
  props: {
    ROWall: {
      type: [String, Object]
    }
  },
  data() {
    return {
      detaliForm: {
      }
    };
  },
  activated() {},
  watch: {
    // 详情本条数据
    ROWall: {
      handler:  function (val) {
        this.detaliForm = val;
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {},
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="less"></style>
