// 生产执行
<template>
  <div class="container">
    <div class="title">
      <div class="item">
        <span class="font subWorkNameBox">{{ workTypeName }}</span>
      </div>
      <div class="item" v-if="workType != 'cutMendWork'">
        <i class="el-icon-coin"></i>
        <span class="font">生产车间：{{ form.manufacturingShop }}</span>
      </div>
      <div class="item">
        <i class="icon-mes-gongyiguanli" style="font-weight: 700"></i>
        <span class="font">班组：{{ form.job }}</span>
      </div>
      <div class="item">
        <span class="font"
          >{{ riqi }} &nbsp; &nbsp;{{ days }} &nbsp; {{ shijian }}</span
        >
      </div>
      <div class="item">
        <img class="top-bar__img" :src="userInfo.avatar" />
        <span class="font">
          {{ userInfo.user_name }}
        </span>
      </div>
      <div class="item">
        <div class="back" @click="$router.back()">
          <i class="icon-mes-fanhui"></i>
          <span class="font">返回</span>
        </div>
      </div>
    </div>
    <div class="table" v-if="workType == 'cutMendWork'">
      <div class="item">
        <div class="key">原产品编码</div>
        <div class="value">{{ form.materialSn }}</div>
      </div>
      <div class="item">
        <div class="key">原产品名称</div>
        <div class="value">{{ form.materialName }}</div>
      </div>
      <div class="item">
        <div class="key">原产品规格</div>
        <div class="value">{{ form.model }}</div>
      </div>
      <div class="item">
        <div class="key">项目名称</div>
        <div class="value">{{ form.projectName }}</div>
      </div>
      <div class="item">
        <div class="key">现产品编码</div>
        <div class="value">{{ form.materialSnNew }}</div>
      </div>
      <div class="item">
        <div class="key">现产品名称</div>
        <div class="value">{{ form.materialNameNew }}</div>
      </div>
      <div class="item">
        <div class="key">现产品规格</div>
        <div class="value">{{ form.modelNew }}</div>
      </div>
      <div class="item">
        <div class="key">客户名称</div>
        <div class="value">{{ form.organName }}</div>
      </div>
      <div class="item">
        <div class="key">计划数</div>
        <div class="value" v-if="workType == 'cutMendWork'">
          {{ form.sumNew }}
        </div>
        <div class="value" v-else>{{ form.sum }}</div>
      </div>
      <div class="item">
        <div class="key">合格数(方)</div>
        <div class="value">{{ form.qualifiedSum }}</div>
      </div>
      <div class="item">
        <div class="key">报废数</div>
        <div class="value">{{ form.scrapSum }}</div>
      </div>
      <div class="item">
        <div class="key">切补员</div>
        <div class="value">{{ form.handsPersonName }}</div>
      </div>
      <div class="item">
        <div class="key">计划完成时间</div>
        <div class="value">{{ form.deliveryDate }}</div>
      </div>
      <div class="item">
        <div class="key">权重等级</div>
        <div class="value">{{ form.weight | weightName }}</div>
      </div>
      <div class="item">
        <div class="key">班组工单号</div>
        <div class="value">{{ form.jobSn }}</div>
      </div>

      <div class="item">
        <div class="key"></div>
        <div class="value"></div>
      </div>
    </div>
    <div class="table" v-else-if="workType == 'meshWork'">
      <div class="item">
        <div class="key">产品编码</div>
        <div class="value">{{ form.materialSn }}</div>
      </div>
      <div class="item">
        <div class="key">产品名称</div>
        <div class="value">{{ form.materialName }}</div>
      </div>
      <div class="item">
        <div class="key">规格型号</div>
        <div class="value">{{ form.model }}</div>
      </div>
      <div class="item">
        <div class="key"></div>
        <div class="value"></div>
      </div>
      <div class="item">
        <div class="key">项目名称</div>
        <div class="value">{{ form.projectName }}</div>
      </div>
      <div class="item">
        <div class="key">客户名称</div>
        <div class="value">{{ form.organName }}</div>
      </div>
      <div class="item">
        <div class="key">交货日期</div>
        <div class="value">{{ form.artisanTime }}</div>
      </div>
      <div class="item">
        <div class="key"></div>
        <div class="value"></div>
      </div>
      <div class="item">
        <div class="key">合格数(片)</div>
        <div class="value">{{ form.qualifiedSum }}</div>
      </div>
      <div class="item">
        <div class="key">不合格数(片)</div>
        <div class="value">{{ form.scrapSum }}</div>
      </div>
      <div class="item">
        <div class="key">班组工单号</div>
        <div class="value">{{ form.jobSn }}</div>
      </div>
      <div class="item">
        <div class="key"></div>
        <div class="value">{{ form.handsPersonName }}</div>
      </div>
      <div class="item">
        <div class="key">计划数(片)</div>
        <div class="value">{{ form.sum }}</div>
      </div>
      <div class="item">
        <div class="key"></div>
        <div class="value"></div>
      </div>
      <div class="item">
        <div class="key"></div>
        <div class="value"></div>
      </div>
      <div class="item">
        <div class="key"></div>
        <div class="value"></div>
      </div>
    </div>
    <div class="table" v-else>
      <div class="item">
        <div class="key">产品编码</div>
        <div class="value">{{ form.materialSn }}</div>
      </div>
      <div class="item">
        <div class="key">项目名称</div>
        <div class="value">{{ form.projectName }}</div>
      </div>
      <div class="item">
        <div class="key">产品名称</div>
        <div class="value">{{ form.materialName }}</div>
      </div>
      <div class="item">
        <div class="key">规格型号</div>
        <div class="value">{{ form.model }}</div>
      </div>
      <div class="item">
        <div class="key">强度</div>
        <div class="value">{{ form.intensity }}</div>
      </div>

      <div class="item">
        <div class="key">客户名称</div>
        <div class="value">{{ form.organName }}</div>
      </div>
      <div class="item">
        <div class="key">预存仓位</div>
        <div class="value">{{ form.location }}</div>
      </div>
      <div class="item">
        <div class="key">密度</div>
        <div class="value">{{ form.density }}</div>
      </div>
      <div class="item">
        <div class="key">计划开始时间</div>
        <div class="value">{{ form.startTime }}</div>
      </div>
      <div class="item">
        <div class="key">计划完成时间</div>
        <div class="value">{{ form.endTime }}</div>
      </div>
      <div class="item">
        <div class="key">实际开始时间</div>
        <div class="value">{{ form.actualStartTime }}</div>
      </div>
      <div class="item">
        <div class="key">实际完成时间</div>
        <div class="value">{{ form.actualEndTime }}</div>
      </div>
      <div class="item">
        <div class="key">计划完成方数</div>
        <div class="value">{{ form.sum }}</div>
      </div>
      <div class="item">
        <div class="key">已完成方数</div>
        <div class="value" v-if="workType == 'home'">{{ form.accomplish }}</div>
        <div class="value" v-if="workType == 'cuttingWork'">
          {{ form.cuttingAccomplish }}
        </div>
        <div class="value" v-if="workType == 'irigamaWork'">
          {{ form.irigamaAccomplish }}
        </div>
        <div class="value" v-if="workType == 'outKettleWork'">
          {{ form.outletAccomplish }}
        </div>
        <div class="value" v-if="workType == 'qualityControlWork'">
          {{ form.qualityAccomplish }}
        </div>
      </div>
      <div class="item">
        <div class="key">已完成块数</div>
        <div class="value" v-if="workType == 'home'">
          {{ form.accomplishWordCount }}
        </div>
        <div class="value" v-if="workType == 'cuttingWork'">
          {{ form.cuttingAccomplishWordCount }}
        </div>
        <div class="value" v-if="workType == 'irigamaWork'">
          {{ form.irigamaAccomplishWordCount }}
        </div>
        <div class="value" v-if="workType == 'outKettleWork'">
          {{ form.outletAccomplishWordCount }}
        </div>
        <div class="value" v-if="workType == 'qualityControlWork'">
          {{ form.qualityAccomplishWordCount }}
        </div>
      </div>
      <div class="item">
        <div class="key">班组工单号</div>
        <div class="value">{{ form.jobSn }}</div>
      </div>
      <div class="item">
        <div class="key">并入产品编码</div>
        <div class="value">
          {{ form.inMaterialSn ? form.inMaterialSn.replace(",", "/") : "" }}
        </div>
      </div>
      <div class="item">
        <div class="key">并入产品已完成方数</div>
        <div class="value" v-if="workType == 'home'">
          {{ form.inAccomplish ? form.inAccomplish.replace(",", "/") : "" }}
        </div>
        <div class="value" v-if="workType == 'cuttingWork'">
          {{
            form.inCuttingAccomplish
              ? form.inCuttingAccomplish.replace(",", "/")
              : ""
          }}
        </div>
        <div class="value" v-if="workType == 'irigamaWork'">
          {{
            form.inIrigamaAccomplish
              ? form.inIrigamaAccomplish.replace(",", "/")
              : ""
          }}
        </div>
        <div class="value" v-if="workType == 'outKettleWork'">
          {{
            form.inOutletAccomplish
              ? form.inOutletAccomplish.replace(",", "/")
              : ""
          }}
        </div>
        <div class="value" v-if="workType == 'qualityControlWork'">
          {{
            form.inQualityAccomplish
              ? form.inQualityAccomplish.replace(",", "/")
              : ""
          }}
        </div>
      </div>
      <div class="item">
        <div class="key">并入产品已完成块数</div>
        <div class="value" v-if="workType == 'home'">
          {{
            form.inAccomplishWordCount
              ? form.inAccomplishWordCount.replace(",", "/")
              : ""
          }}
        </div>
        <div class="value" v-if="workType == 'cuttingWork'">
          {{
            form.inCuttingAccomplishWordCount
              ? form.inCuttingAccomplishWordCount.replace(",", "/")
              : ""
          }}
        </div>
        <div class="value" v-if="workType == 'irigamaWork'">
          {{
            form.inIrigamaAccomplishWordCount
              ? form.inIrigamaAccomplishWordCount.replace(",", "/")
              : ""
          }}
        </div>
        <div class="value" v-if="workType == 'outKettleWork'">
          {{
            form.inOutletAccomplishWordCount
              ? form.inOutletAccomplishWordCount.replace(",", "/")
              : ""
          }}
        </div>
        <div class="value" v-if="workType == 'qualityControlWork'">
          {{
            form.inQualityAccomplishWordCount
              ? form.inQualityAccomplishWordCount.replace(",", "/")
              : ""
          }}
        </div>
      </div>
      <div class="item">
        <div class="key">并入产品规格</div>
        <div class="value">
          {{ form.inModel ? form.inModel.replace(",", "/") : "" }}
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="header">
          <!-- <div class="key">待报工列表</div> -->
          <el-input
            readonly
            class="value"
            @input="changePlanSn"
            v-model="planSn"
          ></el-input>
        </div>
        <el-table
          border
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="table-detail"
          :data="schedulesMaterialList"
          height="423"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column
            v-if="workType == 'home'"
            prop="pouringSn"
            label="浇注工单号"
          ></el-table-column>
          <el-table-column
            v-if="workType == 'cuttingWork'"
            prop="cuttingSn"
            label="切割工单号"
          ></el-table-column>
          <el-table-column
            v-if="workType == 'irigamaWork'"
            prop="irigamaSn"
            label="入釜工单号"
          ></el-table-column>
          <el-table-column
            v-if="workType == 'outKettleWork'"
            prop="outletSn"
            label="出釜工单号"
          ></el-table-column>
          <el-table-column
            v-if="workType == 'qualityControlWork'"
            prop="qualitySn"
            label="质检工单号"
          ></el-table-column>
          <el-table-column
            v-if="workType == 'meshWork'"
            prop="meshWorkOrderSn"
            label="网片工单号"
          ></el-table-column>
          <el-table-column
            v-if="workType == 'cutMendWork'"
            prop="cutMendWorkSn"
            label="切补工单号"
          ></el-table-column>
          <el-table-column
            v-if="workType == 'cutMendWork'"
            prop="sumNew"
            label="可报工数"
          ></el-table-column>
          <el-table-column
            v-else-if="workType == 'meshWork'"
            prop="sum"
            label="可报工数"
          ></el-table-column>
          <el-table-column v-else prop="modulus" label="模数"></el-table-column>
          <el-table-column v-if="workType == 'cuttingWork'" label="窑号">
            <template slot-scope="scope">
              <el-select v-model="scope.row.fambe">
                <el-option
                  v-for="item of stillNoList"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            v-if="workType == 'irigamaWork' || workType == 'outKettleWork'"
            label="釜号"
          >
            <template slot-scope="scope">
              <el-select disabled v-model="scope.row.still">
                <el-option
                  v-for="item of stillNoList"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="still"
            v-if="workType == 'qualityControlWork'"
            label="釜号"
          ></el-table-column>
          <el-table-column width="200" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="medium"
                v-if="scope.$index == 0"
                :loading="buttonLoading"
                :disabled="scope.row.artisanStatus == '1'"
                @click="handleSubmitted(scope.row, 0)"
                >报工</el-button
              >
              <el-button
                size="medium"
                v-if="scope.$index == 0"
                :disabled="
                  workType == 'qualityControlWork' ||
                  workType == 'meshWork' ||
                  workType == 'cutMendWork'||undoDisabled
                "
                @click="handleSubmitted(scope.row, 1)"
                >撤销</el-button
              >
              <el-button disabled size="medium" v-else>报工</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span
          class="isUnfold"
          :class="hidden ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="hidden = !hidden"
        ></span>
      </div>
      <div class="right">
        <div class="rightTop" v-if="form.job">
          <div>
            <div>
              <p v-if="workType == 'cutMendWork' || workType == 'meshWork'">
                合格数
              </p>
              <p v-else>已完成模数</p>
              <p v-if="workType == 'cutMendWork' || workType == 'meshWork'">
                {{ form.qualifiedSum }}
              </p>
              <p v-if="workType == 'home'">{{ form.accomplishSum }}</p>
              <p v-if="workType == 'cuttingWork'">
                {{
                  form.cuttingAccomplishSum * 3 > form.modulus
                    ? form.modulus
                    : form.cuttingAccomplishSum * 3
                }}
              </p>
              <p v-if="workType == 'irigamaWork'">
                {{
                  form.irigamaAccomplishSum * 3 > form.modulus
                    ? form.modulus
                    : form.irigamaAccomplishSum * 3
                }}
              </p>
              <p v-if="workType == 'outKettleWork'">
                {{
                  form.outletAccomplishSum * 3 > form.modulus
                    ? form.modulus
                    : form.outletAccomplishSum * 3
                }}
              </p>
              <p v-if="workType == 'qualityControlWork'">
                {{
                  form.qualityAccomplishSum * 3 > form.modulus
                    ? form.modulus
                    : form.qualityAccomplishSum * 3
                }}
              </p>
            </div>
            <div>
              <p v-if="workType == 'meshWork'">不合格数</p>
              <p v-else-if="workType == 'cutMendWork'">报废数</p>
              <p v-else>计划模数</p>
              <p v-if="workType == 'cutMendWork' || workType == 'meshWork'">
                {{ form.scrapSum }}
              </p>
              <p v-else>{{ form.modulus }}</p>
            </div>
          </div>
          <div>
            <div id="chart" style="height: 300px; width: 95%"></div>
          </div>
        </div>
        <div class="rightTop nullData" v-else>暂无数据</div>
        <div class="rightBottom" v-show="isWorkSuccess">
          <span v-if="type == 0" class="el-icon-success"></span>
          <span v-else class="canerSpan el-icon-error"></span>
          <div v-if="type == 0" class="content">
            工单号:{{ SubmittedSn }}报工成功！
          </div>
          <div v-else class="canerContent">
            工单号:{{ SubmittedSn }}撤销成功！
          </div>
        </div>
      </div>
    </div>
    <!-- <el-row>
      
    </el-row> -->
    <!-- <div v-if="hidden" class="footer-wrapper"> -->
    <div v-if="hidden" class="footer-wrapper">
      <div class="footer-item">
        <img :src="imageList.startImage" @click="to('task')" />
      </div>
      <div class="footer-item">
        <img :src="imageList.checkImage" @click="toQuality('task')" />
        <!--@click="checkDialog = true"-->
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
      :close-on-click-modal="false"
      class="qualityControlDialog"
      :visible.sync="checkDialog"
      v-if="checkDialog"
      :before-close="handleClose"
      :show-close="false"
      title="质检记录单"
      append-to-body
      width="50%"
    >
      <span slot="title" class="titleBox">
        <div>
          <span class="el-icon-document"></span>
          <span>质检记录单</span>
        </div>
        <div class="back" @click="back">
          <i class="icon-mes-fanhui"></i>
          <span class="font">返回</span>
        </div>
      </span>
      <div class="half-title">质检内容</div>
      <table
        width="90%"
        border="1"
        bordercolor="#d7d7d7"
        id="Aclass"
        cellpadding="5"
        cellspacing="15"
        align="center"
        bgcolor="black"
      >
        <tr bgcolor="#f2f2f2">
          <td rowspan="2" width="25%">主单信息</td>
          <td>产品编码</td>
          <td>产品名称</td>
          <td>规格型号</td>
        </tr>
        <tr bgcolor="white">
          <td>{{ form.materialSn }}</td>
          <td>{{ form.materialName }}</td>
          <td>{{ form.model }}</td>
        </tr>
        <tr bgcolor="#f2f2f2">
          <td width="25%">检验项目</td>
          <td>数量(方)</td>
          <td v-if="workType == 'qualityControlWork'">块数</td>
          <td>原因</td>
        </tr>
        <tr bgcolor="white">
          <td>合格数</td>
          <td>
            <el-input
              :readonly="workType == 'qualityControlWork'"
              v-model="qualityForm.qualifiedSum"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @keyup.native="handleKeyUp($event)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td v-if="workType == 'qualityControlWork'">
            <el-input
              v-model="qualityForm.wordCount"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @input="handleKeyUp1($event)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>符合要求</td>
        </tr>
        <tr bgcolor="white">
          <td>{{ workType == "meshWork" ? "不合格数" : "报废数" }}</td>
          <td>
            <el-input
              :readonly="workType == 'qualityControlWork'"
              v-model="qualityForm.scrapSum"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @keyup.native="handleKeyUp($event)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td v-if="workType == 'qualityControlWork'">
            <el-input
              v-model="qualityForm.wordCount1"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @input="handleKeyUp1($event)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>
            <el-select style="width: 90%" v-model="qualityForm.scrapCause">
              <el-option
                v-for="item of FailTraitList"
                :key="item.id"
                :label="item.traitName + item.description"
                :value="item.traitName + item.description"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr bgcolor="white" v-if="workType == 'qualityControlWork'">
          <td>修补数</td>
          <td>
            <el-input
              readonly
              v-model="qualityForm.repairedSum"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @keyup.native="handleKeyUp($event)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>
            <el-input
              v-model="qualityForm.wordCount2"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @input="handleKeyUp1($event)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>
            <el-select style="width: 90%" v-model="qualityForm.repairedCause">
              <el-option
                v-for="item of FailTraitList"
                :key="item.id"
                :label="item.traitName + item.description"
                :value="item.traitName + item.description"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr bgcolor="white" v-if="workType == 'qualityControlWork'">
          <td>降级数</td>
          <td>
            <el-input
              readonly
              v-model="qualityForm.downGradeSum"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @keyup.native="handleKeyUp($event)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>
            <el-input
              v-model="qualityForm.wordCount3"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @input="handleKeyUp1($event)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>
            <el-select style="width: 90%" v-model="qualityForm.downGradeCause">
              <el-option
                v-for="item of FailTraitList"
                :key="item.id"
                :label="item.traitName + item.description"
                :value="item.traitName + item.description"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr bgcolor="white" v-if="workType == 'qualityControlWork'">
          <td>合计</td>
          <td>
            <el-input
              readonly
              v-model="qualityForm.sumAll"
              placeholder="自动带出"
            >
            </el-input>
          </td>
          <td>
            <el-input
              readonly
              v-model="qualityForm.wordCountAll"
              placeholder="自动带出"
            >
            </el-input>
          </td>
          <td></td>
        </tr>
        <tr bgcolor="white" v-if="workType == 'qualityControlWork'">
          <td>实进库位</td>
          <td>
            <el-select v-model="qualityForm.location">
              <el-option
                v-for="item of depotList"
                :key="item.id"
                :label="item.depotName"
                :value="item.depotName"
                @click.native="qualityForm.locationId = item.id"
              ></el-option>
            </el-select>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <table
        v-for="(item, index) in childList"
        :key="index"
        width="90%"
        border="1"
        bordercolor="#d7d7d7"
        id="Aclass"
        cellpadding="5"
        cellspacing="15"
        align="center"
        bgcolor="black"
      >
        <tr bgcolor="#f2f2f2">
          <td rowspan="2" width="25%">子单信息</td>
          <td>产品编码</td>
          <td>产品名称</td>
          <td>规格型号</td>
        </tr>
        <tr bgcolor="white">
          <td>{{ item.materialSn1 }}</td>
          <td>{{ item.materialName }}</td>
          <td>{{ item.model }}</td>
        </tr>
        <tr bgcolor="#f2f2f2">
          <td width="25%">检验项目</td>
          <td>数量(方)</td>
          <td>块数</td>
          <td>原因</td>
        </tr>
        <tr bgcolor="white">
          <td>合格数</td>
          <td>
            <el-input readonly v-model="item.qualifiedSum"> </el-input>
          </td>
          <td>
            <el-input
              v-model="item.wordCount"
              readonly
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @input="handleKeyUp2($event, item, index)"
            >
            </el-input>
          </td>
          <td>符合要求</td>
        </tr>
        <tr bgcolor="white">
          <td>报废数</td>
          <td>
            <el-input readonly v-model="item.scrapSum"> </el-input>
          </td>
          <td>
            <el-input
              v-model="item.wordCount1"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @input="handleKeyUp2($event, item, index)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>
            <el-select style="width: 90%" v-model="item.scrapCause">
              <el-option
                v-for="item1 of FailTraitList"
                :key="item1.id"
                :label="item1.traitName + item1.description"
                :value="item1.traitName + item1.description"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr bgcolor="white">
          <td>修补数</td>
          <td>
            <el-input readonly v-model="item.repairedSum"> </el-input>
          </td>
          <td>
            <el-input
              v-model="item.wordCount2"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @input="handleKeyUp2($event, item, index)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>
            <el-select style="width: 90%" v-model="item.repairedCause">
              <el-option
                v-for="item of FailTraitList"
                :key="item.id"
                :label="item.traitName + item.description"
                :value="item.traitName + item.description"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr bgcolor="white">
          <td>降级数</td>
          <td>
            <el-input readonly v-model="item.downGradeSum"> </el-input>
          </td>
          <td>
            <el-input
              v-model="item.wordCount3"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              @input="handleKeyUp2($event, item, index)"
              placeholder="请输入"
            >
            </el-input>
          </td>
          <td>
            <el-select style="width: 90%" v-model="item.downGradeCause">
              <el-option
                v-for="item of FailTraitList"
                :key="item.id"
                :label="item.traitName + item.description"
                :value="item.traitName + item.description"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr bgcolor="white">
          <td>合计</td>
          <td>
            <el-input readonly v-model="item.sumAll" placeholder="自动带出">
            </el-input>
          </td>
          <td>
            <el-input
              readonly
              v-model="item.wordCountAll"
              placeholder="自动带出"
            >
            </el-input>
          </td>
          <td></td>
        </tr>
        <tr bgcolor="white">
          <td>实进库位</td>
          <td>
            <el-select v-model="item.location">
              <el-option
                v-for="item1 of depotList"
                :key="item1.id"
                :label="item1.depotName"
                :value="item1.depotName"
                @click.native="item.locationId = item1.id"
              ></el-option>
            </el-select>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取消</el-button>
        <el-button
          :loading="buttonLoading"
          type="primary"
          size="small"
          @click="qualityQuery"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- <el-dialog
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
    </el-dialog> -->
  </div>
</template>

<script>
import { getDepot } from "@/api/common";
import { getJobWorkOrderByPage } from "@/api/manufacture/teamWorkOrder";
import { selectFailTraitPage } from "@/api/quality/index";
import {
  getPouringWorkOrder,
  submitPouringWork,
} from "@/api/manufacture/pouringWorkOrder";
import {
  getCuttingWorkOrder,
  submitCuttingWork,
} from "@/api/manufacture/cuttingWorkOrder";
import {
  getIrigamaWorkOrder,
  submitIrigamaWork,
} from "@/api/manufacture/IntoKettleWorkOrder";
import { getOutletWorkOrder } from "@/api/manufacture/outKettleWorkOrder";
import {
  getQualityWorkOrder,
  submitQualityWork,
} from "@/api/manufacture/qualityControlWorkOrder";
import {
  getCutMendWorkOrderDetails,
  cutMendWorkOrderUpdate,
} from "@/api/manufacture/cutMendWorkOrder";
import {
  getMeshWorkOrderDetails,
  meshWorkOrderUpdate,
} from "@/api/manufacture/meshWorkOrder";
import startImage from "./images/start.png";
import badImage from "./images/bad.png";
import baogongImage from "./images/baogong.png";
import checkImage from "./images/check.png";
import docImage from "./images/doc.png";
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  props: {
    workType: {
      //  报工名称
      type: String,
      default: "home",
    },
  },
  data() {
    return {
      undoDisabled:false,
      childList: [],
      inMaterialNameList: [], //子单产品名称
      inModelList: [], //子单产品规格
      inMaterialSnList: [], //子单产品编码
      inSingleModeVolumeList: [],
      inProportionList: [],
      inVolumeList: [],
      inLocationList: [],
      inLocationIdList: [],
      depotList: [],
      allSum: "",
      wordCount: null,
      qualityForm: {
        qualifiedSum: 0,
        repairedSum: 0,
        scrapSum: 0,
        downGradeSum: 0,
      },
      FailTraitList: [],
      buttonLoading: false,
      workTypeName: "浇注报工", //报工标题
      workTypeSn: "浇注工单号", // 表格报工名称Title
      type: "", // 提示报工成功或撤销
      isWorkSuccess: false,
      SubmittedSn: "",
      optionTitle: "达成率",
      yieldRate: 0, //达成率
      finished: 0, //已完成
      planModule: 0, //计划模数
      stillNoList: [
        { code: "1", value: "1" },
        { code: "2", value: "2" },
        { code: "3", value: "3" },
        { code: "4", value: "4" },
        { code: "5", value: "5" },
        { code: "6", value: "6" },
        { code: "7", value: "7" },
        { code: "8", value: "8" },
        { code: "9", value: "9" },
        { code: "10", value: "10" },
      ],
      riqi: "",
      days: "",
      shijian: "",
      form: {},
      planSn: "待报工列表", // 001000003
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
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    planSn() {
      this.changePlanSn();
    },
  },
  async created() {
    const res = await selectFailTraitPage({ pageNum: 1, pageSize: 99999 }, {});
    this.FailTraitList = res.data.data.records;
    if (this.workType == "cuttingWork") {
      this.workTypeName = "切割报工";
    } else if (this.workType == "irigamaWork") {
      this.workTypeName = "入釜报工";
    } else if (this.workType == "outKettleWork") {
      this.workTypeName = "出釜报工";
    } else if (this.workType == "qualityControlWork") {
      this.workTypeName = "质检报工";
    } else if (this.workType == "cutMendWork") {
      this.workTypeName = "切补报工";
    } else if (this.workType == "meshWork") {
      this.workTypeName = "网片报工";
    }
  },
  async mounted() {
    this.gettime();
    this.mewtime();
    if (this.$route.query.data) {
      this.hidden = true;
      this.handleJobWorkOrderList();
    }
  },
  methods: {
    handleKeyUp2(n, e, i) {
      if (n > e.wordCounts) {
        e.wordCount = e.wordCounts;
        e.wordCount1 = 0;
        e.wordCount2 = 0;
        e.wordCount3 = 0;
        e.scrapSum = 0;
        e.repairedSum = 0;
        e.downGradeSum = 0;
        return this.$message.error(`输入数量不能大于${e.wordCounts}`);
      } else if (
        Number(e.wordCount1) + Number(e.wordCount2) + Number(e.wordCount3) >
        e.wordCounts
      ) {
        e.wordCount = e.wordCounts;
        e.wordCount1 = 0;
        e.wordCount2 = 0;
        e.wordCount3 = 0;
        return this.$message.error(`输入数量不能大于${e.wordCounts}`);
      }

      e.wordCount = (
        Number(e.wordCounts) -
        Number(e.wordCount1) -
        Number(e.wordCount2) -
        Number(e.wordCount3)
      ).toFixed(0);
      e.qualifiedSum = (e.wordCount * (e.volume / 1000000)).toFixed(6);
      e.scrapSum = (e.wordCount1 * (e.volume / 1000000)).toFixed(6);
      e.repairedSum = (e.wordCount2 * (e.volume / 1000000)).toFixed(6);
      e.downGradeSum = (e.wordCount3 * (e.volume / 1000000)).toFixed(6);
      e.sumAll = (
        Number(e.qualifiedSum) +
        Number(e.scrapSum) +
        Number(e.repairedSum) +
        Number(e.downGradeSum)
      ).toFixed(2);
      e.wordCountAll =
        Number(e.wordCount) +
        Number(e.wordCount1) +
        Number(e.wordCount2) +
        Number(e.wordCount3);
    },

    handleKeyUp(e) {
      if (e.target.value > this.form.sum) {
        e.target.value = 0;
        return this.$message.error(`输入数量不能大于${this.allSum}`);
      }
      this.qualityForm.qualifiedSum =
        Number(this.allSum) -
        Number(this.qualityForm.repairedSum) -
        Number(this.qualityForm.scrapSum) -
        Number(this.qualityForm.downGradeSum);
    },
    handleKeyUp1(e) {
      if (e > this.wordCount) {
        this.qualityForm.wordCount = this.wordCount;
        this.qualityForm.wordCount1 = 0;
        this.qualityForm.wordCount2 = 0;
        this.qualityForm.wordCount3 = 0;
        return this.$message.error(`输入数量不能大于${this.wordCount}`);
      } else if (
        Number(this.qualityForm.wordCount1) +
          Number(this.qualityForm.wordCount2) +
          Number(this.qualityForm.wordCount3) >
        this.wordCount
      ) {
        this.qualityForm.wordCount = this.wordCount;
        this.qualityForm.wordCount1 = 0;
        this.qualityForm.wordCount2 = 0;
        this.qualityForm.wordCount3 = 0;
        return this.$message.error(`输入数量不能大于${this.wordCount}`);
      }
      this.qualityForm.wordCount =
        Number(this.wordCount) -
        Number(this.qualityForm.wordCount1) -
        Number(this.qualityForm.wordCount2) -
        Number(this.qualityForm.wordCount3);
      this.qualityForm.qualifiedSum = (
        this.qualityForm.wordCount *
        (this.form.volume / 1000000)
      ).toFixed(6);
      this.qualityForm.scrapSum = (
        this.qualityForm.wordCount1 *
        (this.form.volume / 1000000)
      ).toFixed(6);
      this.qualityForm.repairedSum = (
        this.qualityForm.wordCount2 *
        (this.form.volume / 1000000)
      ).toFixed(6);
      this.qualityForm.downGradeSum = (
        this.qualityForm.wordCount3 *
        (this.form.volume / 1000000)
      ).toFixed(6);

      this.qualityForm.sumAll = (
        Number(this.qualityForm.qualifiedSum) +
        Number(this.qualityForm.scrapSum) +
        Number(this.qualityForm.repairedSum) +
        Number(this.qualityForm.downGradeSum)
      ).toFixed(2);
      this.qualityForm.wordCountAll =
        Number(this.qualityForm.wordCount) +
        Number(this.qualityForm.wordCount1) +
        Number(this.qualityForm.wordCount2) +
        Number(this.qualityForm.wordCount3);
    },
    //确定
    async qualityQuery() {
      this.buttonLoading = true;
      let submitQualityWorkApi = "";
      if (this.workType == "meshWork") {
        submitQualityWorkApi = meshWorkOrderUpdate;
      } else if (this.workType == "cutMendWork") {
        submitQualityWorkApi = cutMendWorkOrderUpdate;
      } else if (this.workType == "qualityControlWork") {
        var list = JSON.parse(JSON.stringify(this.childList));
        list.unshift(this.qualityForm);
        // submitQualityWorkApi = submitQualityWork;
        const res1 = await submitQualityWork(list);
        if (res1.data.code == 200) {
           this.handleJobWorkOrderList();
          setTimeout(() => {
            this.buttonLoading = false;
            this.checkDialog = false;
            this.isWorkSuccess = true;
            this.qualityForm.qualifiedSum = 0;
            this.qualityForm.repairedSum = 0;
            this.qualityForm.scrapSum = 0;
            this.qualityForm.downGradeSum = 0;
            // this.schedulesMaterialList = [];
            this.$message.success("报工成功");
           
          }, 3000);
        }
        return;
      }
      const res = await submitQualityWorkApi(this.qualityForm);
      if (res.data.code == 200) {
         this.handleJobWorkOrderList();
        setTimeout(() => {
          this.buttonLoading = false;
          this.checkDialog = false;
          this.isWorkSuccess = true;
          this.qualityForm.qualifiedSum = 0;
          this.qualityForm.repairedSum = 0;
          this.qualityForm.scrapSum = 0;
          this.qualityForm.downGradeSum = 0;
          // this.schedulesMaterialList = [];
          this.$message.success("报工成功");
         
        }, 3000);
      }
    },
    //取消
    cancel() {
      this.checkDialog = false;
      this.qualityForm.qualifiedSum = 0;
      this.qualityForm.repairedSum = 0;
      this.qualityForm.scrapSum = 0;
      this.qualityForm.downGradeSum = 0;
    },
    //返回
    back() {
      this.checkDialog = false;
      this.qualityForm.qualifiedSum = 0;
      this.qualityForm.repairedSum = 0;
      this.qualityForm.scrapSum = 0;
      this.qualityForm.downGradeSum = 0;
    },
    async handleJobWorkOrderList() {
      var params = { id: this.$route.query.data.id };
      if (this.workType == "meshWork") {
        const res = await getMeshWorkOrderDetails(params);
        this.form = res.data.data;
        var obj = {
          artisanStatus: this.form.artisanStatus,
          meshWorkOrderSn: this.form.meshWorkOrderSn,
          id: this.form.id,
          sum: this.form.sum,
        };
        this.schedulesMaterialList.push(obj);
      } else if (this.workType == "cutMendWork") {
        const res = await getCutMendWorkOrderDetails(params);
        this.form = res.data.data;
        obj = {
          artisanStatus: this.form.artisanStatus,
          cutMendWorkSn: this.form.cutMendWorkSn,
          sumNew: this.form.sumNew,
          id: this.form.id,
          sum: this.form.sum,
        };
        this.schedulesMaterialList.push(obj);
      } else {
        const res = await getJobWorkOrderByPage(params);
        this.form = res.data.data.records[0];
        this.handleList();
      }
      if (this.workType == "home") {
        this.yieldRate = (this.form.accomplishSum / this.form.modulus) * 100;
        this.finished = this.form.accomplishSum;
        this.planModule = this.form.modulus;
      } else if (this.workType == "cuttingWork") {
        this.yieldRate =
          ((this.form.cuttingAccomplishSum * 3 > this.form.modulus
            ? this.form.modulus
            : this.form.cuttingAccomplishSum * 3) /
            this.form.modulus) *
          100;
        this.finished =
          this.form.cuttingAccomplishSum * 3 > this.form.modulus
            ? this.form.modulus
            : this.form.cuttingAccomplishSum * 3;
        this.planModule = this.form.modulus;
      } else if (this.workType == "irigamaWork") {
        this.yieldRate =
          ((this.form.irigamaAccomplishSum * 3 > this.form.modulus
            ? this.form.modulus
            : this.form.irigamaAccomplishSum * 3) /
            this.form.modulus) *
          100;
        this.finished =
          this.form.irigamaAccomplishSum * 3 > this.form.modulus
            ? this.form.modulus
            : this.form.irigamaAccomplishSum * 3;
        this.planModule = this.form.modulus;
      } else if (this.workType == "outKettleWork") {
        this.yieldRate =
          ((this.form.outletAccomplishSum * 3 > this.form.modulus
            ? this.form.modulus
            : this.form.outletAccomplishSum * 3) /
            this.form.modulus) *
          100;
        this.finished =
          this.form.outletAccomplishSum * 3 > this.form.modulus
            ? this.form.modulus
            : this.form.outletAccomplishSum * 3;
        this.planModule = this.form.modulus;
      } else if (this.workType == "qualityControlWork") {
        this.yieldRate =
          ((this.form.qualityAccomplishSum * 3 > this.form.modulus
            ? this.form.modulus
            : this.form.qualityAccomplishSum * 3) /
            this.form.modulus) *
          100;
        this.finished =
          this.form.qualityAccomplishSum * 3 > this.form.modulus
            ? this.form.modulus
            : this.form.qualityAccomplishSum * 3;
        this.planModule = this.form.modulus;
      } else if (this.workType == "cutMendWork") {
        this.yieldRate = (this.form.qualifiedSum / this.form.sum) * 100;
        this.finished = this.form.qualifiedSum; //合格数
        this.planModule = this.form.sum; //报废数
        this.optionTitle = "合格率";
      } else if (this.workType == "meshWork") {
        this.yieldRate = (this.form.qualifiedSum / this.form.sum) * 100;
        this.finished = this.form.qualifiedSum; //合格数
        this.planModule = this.form.sum; //报废数
        this.optionTitle = "合格率";
      }
      this.getEcharts(parseInt(this.yieldRate), this.finished, this.planModule);
    },
    async handleList() {
      var workApi = "";
      if (this.workType == "home") {
        workApi = getPouringWorkOrder;
      } else if (this.workType == "cuttingWork") {
        workApi = getCuttingWorkOrder;
      } else if (this.workType == "irigamaWork") {
        workApi = getIrigamaWorkOrder;
      } else if (this.workType == "outKettleWork") {
        workApi = getOutletWorkOrder;
      } else if (this.workType == "qualityControlWork") {
        workApi = getQualityWorkOrder;
      }
      const res = await workApi({ id: this.form.id });
      if (this.workType == "irigamaWork") {
        res.data.data.map((el) => {
          el.still = el.fambe;
        });
      } else if (this.workType == "outKettleWork") {
        res.data.data.map((el) => {
          el.still = el.fambe;
          el.artisanStatus = el.outletArtisanStatus;
        });
      }
      if (res.data.success) {
        this.schedulesMaterialList = res.data.data;
      }
      
    },
    //报工
    async handleSubmitted(row, type) {
      var SubmittedWorkApi = "";
      var status = "";
      if (type == 0 && this.workType == "meshWork") {
        this.SubmittedSn = row.meshWorkOrderSn;
        this.allSum = row.sum;
        this.qualityForm.qualifiedSum = row.sum;
        this.qualityForm.id = row.id;
        this.checkDialog = true;
        return;
      }
      if (type == 0 && this.workType == "cutMendWork") {
        this.SubmittedSn = row.cutMendWorkSn;
        this.allSum = row.sum;
        this.qualityForm.qualifiedSum = row.sumNew;
        this.qualityForm.id = row.id;
        this.checkDialog = true;
        return;
      }
      if (type == 0 && this.workType == "qualityControlWork") {
        this.SubmittedSn = row.qualitySn;
        this.allSum = row.sum;
        this.qualityForm.qualifiedSum = (
          row.wordCount *
          (this.form.volume / 1000000)
        ).toFixed(6);
        this.qualityForm.sumAll = (
          row.wordCount *
          (this.form.volume / 1000000)
        ).toFixed(6);
        this.qualityForm.wordCount = row.wordCount;
        this.qualityForm.wordCountAll = row.wordCount;
        this.qualityForm.location = row.location;
        this.qualityForm.locationId = row.locationId;
        this.wordCount = row.wordCount;
        this.qualityForm.repairedSum = 0;
        this.qualityForm.wordCount1 = 0;
        this.qualityForm.wordCount2 = 0;
        this.qualityForm.wordCount3 = 0;
        this.qualityForm.id = row.id;
        this.qualityForm.type = type;
        this.qualityForm.modulus = row.modulus;
        this.qualityForm.volume = null;
        this.qualityForm.wordCounts = null;
        this.qualityForm.inPlanSn = this.form.planSn;
        this.qualityForm.materialSn = this.form.materialSn;
        const resDepot = await getDepot();
        this.depotList = resDepot.data.data;
        if (this.form.inMaterialSn) {
          //子单产品名称
          this.inMaterialNameList = this.form.inMaterialName.split(",");
          //子单产品规格
          this.inModelList = this.form.inModel.split(",");
          //子单产品编码
          this.inMaterialSnList = this.form.inMaterialSn.split(",");
          //库位
          this.inLocationList = this.form.inLocation.split(",");
          //库位id
          this.inLocationIdList = this.form.inLocationId.split(",");
          //模数比例
          this.inProportionList = this.form.inProportion.split(",");
          //单位体积
          this.inVolumeList = this.form.inVolume.split(",");
          //单模体积
          this.inSingleModeVolumeList = this.form.inSingleModeVolume.split(",");
          this.childList = this.inLocationList.map((el, i) => ({
            materialSn1: this.inMaterialSnList[i],
            materialName: this.inMaterialNameList[i],
            model: this.inModelList[i],
            location: this.inLocationList[i],
            locationId: this.inLocationIdList[i],
            qualifiedSum: (
              Number(this.inSingleModeVolumeList[i]) *
              Number(this.inProportionList[i]) *
              Number(row.modulus)
            ).toFixed(6),
            wordCount: (
              (Number(this.inSingleModeVolumeList[i]) *
                Number(this.inProportionList[i]) *
                Number(row.modulus) *
                1000000) /
              Number(this.inVolumeList[i])
            ).toFixed(0),
            wordCounts: (
              (Number(this.inSingleModeVolumeList[i]) *
                Number(this.inProportionList[i]) *
                Number(row.modulus) *
                1000000) /
              Number(this.inVolumeList[i])
            ).toFixed(0),
            volume: Number(this.inVolumeList[i]),
            downGradeSum: 0,
            repairedSum: 0,
            scrapSum: 0,
            sumAll: 0,
            id: row.id,
            type: 0,
            modulus: row.modulus,
            wordCount1: 0,
            wordCount2: 0,
            wordCount3: 0,
            wordCountAll: 0,
            inPlanSn: this.form.inPlanSn,
            materialSn: this.form.inMaterialSn,
          }));
        }
        this.checkDialog = true;
        return;
      }
      if (type == 0 && !row.fambe && this.workType == "cuttingWork") {
        return this.$message.error(`请选择${row.cuttingSn}工单的窑号`);
      }
      // if (type == 0 && !row.still && this.workType == "irigamaWork") {
      //   return this.$message.error(`请选择${row.irigamaSn}工单的釜号`);
      // }
      if (this.workType == "home") {
        SubmittedWorkApi = submitPouringWork;
        this.SubmittedSn = row.pouringSn;
      } else if (this.workType == "cuttingWork") {
        SubmittedWorkApi = submitCuttingWork;
        this.SubmittedSn = row.cuttingSn;
      } else if (this.workType == "irigamaWork") {
        SubmittedWorkApi = submitIrigamaWork;
        this.SubmittedSn = row.irigamaSn;
        status = 0;
      } else if (this.workType == "outKettleWork") {
        SubmittedWorkApi = submitIrigamaWork;
        this.SubmittedSn = row.outletSn;
        status = 1;
      }
      this.buttonLoading = true;
      this.undoDisabled = true;
      this.type = type;
      const res = await SubmittedWorkApi({
        id: row.id,
        fambe: row.fambe,
        still: row.still,
        type,
        status,
      });
      if (res.data.code == 200) {
         this.handleJobWorkOrderList();
        setTimeout(() => {
          this.isWorkSuccess = true;
          if (type == 1) {
            this.$message.info("撤销报工");
          } else {
            this.$message.success("报工成功");
          }
           this.buttonLoading = false;
            this.undoDisabled = false;
        }, 3000);
      }
    },
    getEcharts(yieldRate, accomplishSum, issueSum) {
      this.$nextTick(() => {
        let myChart = this.echarts.init(document.getElementById("chart"));
        let option = {
          title: [
            {
              text:
                "{name|" +
                this.optionTitle +
                "}\n{val|" +
                yieldRate +
                "%" +
                "}",
              top: "center",
              left: "center",
              textStyle: {
                rich: {
                  name: {
                    fontSize: 16,
                    fontWeight: "normal",
                    color: "#666666",
                    padding: [10, 0],
                  },
                  val: {
                    fontSize: 48,
                    fontWeight: "700",
                    color: "#16792c",
                  },
                },
              },
            },
          ],
          // tooltip: {
          //   formatter: function (params) {
          //     return params.name + "：" + params.percent + " %";
          //   },
          // },
          series: [
            {
              name: "circle",
              type: "pie",
              clockWise: true,
              radius: ["60%", "80%"],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
              hoverAnimation: false,
              data: [
                {
                  name: "已完成", //合格数
                  value: Number(accomplishSum), //
                  itemStyle: {
                    normal: {
                      color: "#16792c",
                    },
                  },
                },
                {
                  value: Number(issueSum) - Number(accomplishSum),
                  name: "未完成", //报废数
                  itemStyle: {
                    normal: {
                      color: "#e9e9e9",
                      label: {
                        show: false,
                      },
                      labelLine: {
                        show: false,
                      },
                    },
                  },
                },
              ],
            },
          ],
        };
        option && myChart.setOption(option);
      });
    },
    mewtime() {
      setInterval(() => {
        this.gettime();
      }, 1000);
    },
    gettime() {
      var date = new Date();
      let year = date.getFullYear();
      let mou = date.getMonth() + 1;
      let day = date.getDate();
      let days = date.getDay();
      switch (days) {
        case 1:
          days = "星期一";
          break;
        case 2:
          days = "星期二";
          break;
        case 3:
          days = "星期三";
          break;
        case 4:
          days = "星期四";
          break;
        case 5:
          days = "星期五";
          break;
        case 6:
          days = "星期六";
          break;
        case 0:
          days = "星期日";
          break;
      }
      let hou = date.getHours(); //获取当前小时数(0-23)
      let min = date.getMinutes(); //获取当前分钟数(0-59)
      let sec = date.getSeconds(); //获取当前秒数(0-59)
      if (mou < 10) mou = "0" + mou;
      if (day < 10) day = "0" + day;
      if (hou < 10) hou = "0" + hou;
      if (min < 10) min = "0" + min;
      if (sec < 10) sec = "0" + sec;
      this.riqi = year + "/" + mou + "/" + day;
      this.days = days;
      this.shijian = hou + ":" + min + ":" + sec;
    },
    // async handleChenck(info) {
    //   let form = {
    //     factoryId: info.id,
    //     schedulesOrdersEncode: "",
    //   };
    //   let res = await this.getExecuteDetail(form);
    //   if (res.data.code === 200) {
    //     this.executeDetail.workStation = info.factoryName;
    //   }
    // },
    // changePlanSn: _.debounce(async function () {
    //   await this.getSchedulesMaterialList(
    //     this.executeDetail.orderId,
    //     this.executeDetail.lineId,
    //     this.executeDetail.schedulesId
    //   );
    //   const res = await scanCode({ code: this.planSn });
    //   console.log(res);
    // }, 1000),
    // 操作执行主页面接口
    // async getExecuteDetail(planSn) {
    //   const res = await getExecuteDetail(planSn);
    //   if (res.data.code === 200) {
    //     this.executeDetail = res.data.data;
    //     if (res.data.data.orderSn) {
    //       this.hidden = true;
    //     }
    //   }
    // },
    // // 排程工序物料列表
    // async getSchedulesMaterialList(orderId, lineId, schedulesId) {
    //   const res = await getSchedulesMaterialList({
    //     orderId,
    //     lineId,
    //     schedulesId,
    //   });
    //   if (res.data.code === 200) {
    //     this.schedulesMaterialList = res.data.data;
    //   }
    // },
    //检验发起
    // async query() {
    //   let form = {
    //     planType: this.dialogForm.planId,
    //     schedulesOrdersEncode: this.executeDetail.planSn,
    //   };
    //   const res = await Check(form);
    //   if (res.data.code === 200) {
    //     this.$message.success("检验成功");
    //     this.checkDialog = false;
    //   }
    // },
    to(route) {
      if (this.workType == "qualityControlWork") {
        return;
      }
      this.$router.replace({
        path: "/production-execution/" + route,
        query: {
          workType: this.workType,
        },
      });
    },
    toQuality(route) {
      if (this.workType != "qualityControlWork") {
        return;
      }
      this.$router.replace({
        path: "/production-execution/" + route,
        query: {
          workType: this.workType,
        },
      });
    },
    toDoc(route) {
      ///production-management/downgradeHandlingOrder
      // this.$router.push({
      //   path: "/production-execution/" + route,
      //   query: {
      //     lineId: this.executeDetail.lineId,
      //   },
      // });
    },
    // toBad(route) {
    //   this.$router.push({
    //     path: "/production-execution/" + route,
    //     query: {
    //       data: this.executeDetail,
    //     },
    //   });
    // },
    toBad() {
      this.$router.push({
        path: "/production-management/downgradeHandlingOrder",
      });
    },
    toInfo(route) {
      // this.$router.push({
      //   path: "/production-execution/" + route,
      //   query: {
      //     data: this.executeDetail,
      //   },
      // });
    },
  },
  filters: {
    weightName(value) {
      if (value == 1) {
        value = "A";
      } else if (value == 2) {
        value = "B";
      } else if (value == 3) {
        value = "C";
      }
      return value;
    },
  },
};
</script>
<style lang="scss" scoped>
#Aclass {
  color: #606266;
  font-size: 14px;
  td {
    vertical-align: middle;
    text-align: center;
    /deep/.el-input__inner {
      padding-right: 18px;
      // margin: 22px 0;
      text-align: center;
    }
  }
}
.qualityControlDialog {
  /deep/.el-dialog__header {
    background-color: #16792c;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 12px;
  }
  .titleBox {
    display: flex;
    justify-content: space-between;
    .back {
      cursor: pointer;
    }
  }
  .half-title {
    padding: 10px 0;
    color: #000;
    font-weight: 500;
  }
}
@import "../common.scss";
.isUnfold {
  position: absolute;
  cursor: pointer;
  font-size: 40px;
  left: 1.5%;
  bottom: 23%;
  color: #a2a2a2;
}
.el-table {
  /deep/.el-button {
    margin: 20px 0;
  }
  /deep/.el-input__inner {
    padding-right: 18px;
    // margin: 22px 0;
    text-align: center;
  }
}
.container {
  width: 100%;
  height: 100%;
  overflow: scroll;

  .content {
    display: flex;
    padding: 0 29px 0 29px;

    .left {
      width: 60%;
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
      width: 40%;
      height: 496px;
      border: 1px solid #dedede;
      .nullData {
        color: #919399;
      }
      // background-color: rgb(110, 35, 35);
      .rightTop {
        display: flex;
        height: 60%;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        div {
          flex: 1;
          text-align: center;
          p:nth-child(1) {
            margin: 10px;
            font-size: 18px;
            color: #333333;
            font-weight: normal;
          }
          p:nth-child(2) {
            margin: 10px;
            font-size: 48px;
            color: #16792c;
            font-weight: 700;
          }
        }
        // div:nth-child(1) {
        //   flex: 1;
        //   text-align: center;
        // }
        // div:nth-child(2) {
        //   flex: 1;
        //   text-align: center;
        // }
      }
      .rightBottom {
        display: flex;
        height: 200px;
        justify-content: center;
        align-items: center;
        // img {
        //   width: 50px;
        //   height: 50px;
        // }
        span {
          color: #16792c;
          font-size: 50px;
        }
        .canerSpan {
          color: #f46c6c;
          font-size: 50px;
        }
        .content {
          font-size: 28px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          color: #16792c;
          line-height: 32px;
        }
        .canerContent {
          font-size: 28px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          color: #f46c6c;
          line-height: 32px;
        }
      }
    }
  }

  .table {
    display: flex;
    flex-wrap: wrap;

    margin: 10px 29px 10px 29px;
    border-top: 1px solid #dedede;
    // border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;

    .item {
      width: 25%;
      display: flex;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      line-height: 40px;
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
    margin-left: 0;
    .item:nth-child(1) {
      flex: 1;
    }
    .item:nth-child(2) {
      flex: 2;
      text-align: left;
    }
    .item:nth-child(3) {
      flex: 2;
      text-align: left;
    }
    .item:nth-child(4) {
      flex: 2;
      text-align: right;
    }
    .item:nth-child(5) {
      flex: 1;
    }
    .subWorkNameBox {
      font-size: 24px;
    }
  }

  .footer-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .footer-item {
      position: relative;
      width: 20%;

      img {
        cursor: pointer;
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
