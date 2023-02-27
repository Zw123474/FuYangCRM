<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="userInfoBox" shadow="never">
          <h3>您好，{{userInfo.userName}}</h3>
          <!-- <p>{{userInfo.isTotalSchedule == 1 ? '调度人员' : userInfo.isDepartmentHeads == 1 ? '部门主管' : '运维人员'}} | {{userInfo.title}}</p> -->
          <p>{{userInfo.isAdmin == 1 ? '主管理员' : userInfo.isTotalSchedule == 1 ? '总调度' : userInfo.isDepartmentHeads== 1 ? '部门主管' : '运维人员'}}</p>
          <p><span>您的上次登录信息：</span> {{userInfo.loginTime}}</p>
        </el-card>
      </el-col>
      <el-col :span="6" style="height:260px">
        <el-card class="noticeBox" shadow="never">
          <div slot="header" class="clearfix">
            <span>最近公告</span>
            <el-button @click="toNotice" style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div v-for="(item,index) in notice" :key="index" class="textItem">
            <p class="el-icon-document">{{item.title}}</p>
            <span>{{item.createTime}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card shadow="never" class="workEcharts">
          <div slot="header">
            部门工作量统计
          </div>
          <!-- <div id="myCharts" style="height:100%;width:100%;"></div> -->
          <div class="deptChart" style="height:100%;width:100%;">
            <deptChart :departmentWorkloadStatistics="departmentWorkloadStatistics"></deptChart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="workEcharts">
          <div slot="header">
            部门工作量统计
          </div>
          <div class="btn">
            <el-button size="mini" icon="el-icon-more" @click="toWorkOrder"></el-button>
          </div>
          <div class="pieChart" style="height:100%;width:100%;">
            <PieChart :workOrderStatistics="workOrderStatistics"></PieChart>
            <!-- <PieChart></PieChart> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never" class="fourCards">
          <div slot="header">
            日常/夜间工作量
          </div>
          <div class="fourCardEcharts" style="height:100%;width:100%;">
            <fourCardEcharts :piedata="data1" title="工作总量" :centerData="centerData1"></fourCardEcharts>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="fourCards">
          <div slot="header">
            修复率
          </div>
          <div class="fourCardEcharts" style="height:100%;width:100%;">
            <fourCardEcharts :piedata="data2" title="修复率" :centerData="centerData2"></fourCardEcharts>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="fourCards">
          <div slot="header">
            超时率
          </div>
          <div class="fourCardEcharts" style="height:100%;width:100%;">
            <fourCardEcharts :piedata="data3" title="超时率" :centerData="centerData3"></fourCardEcharts>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="fourCards">
          <div slot="header">
            调用施工队比例
          </div>
          <div class="fourCardEcharts" style="height:100%;width:100%;">
            <fourCardEcharts :piedata="data4" title="调用施工队率" :centerData="centerData4"></fourCardEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="never" class="fourCards">
          <div slot="header">报修业务产品分析比例</div>
          <div class="tableCard">
            <el-table :data="tableData3" :show-header="false" style="width: 100%;height:100%" max-height="250">
              <el-table-column prop="label" align="center" :formatter="label1Formatter">
              </el-table-column>
              <el-table-column prop="value" align="center" :formatter="value1Formatter">
              </el-table-column>
              <el-table-column prop="proportion" align="center" :formatter="proportion1Formatter">
              </el-table-column>
            </el-table>
            <el-pagination small @current-change="handleCurrentChange1" :current-page.sync="currentPage1" :page-size="3" layout="total, prev, pager, next" :total="total1" align="right">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="fourCards">
          <div slot="header">报修类型分析比例</div>
          <div class="tableCard">
            <el-table :data="tableData2" :show-header="false" style="width: 100%;height:100%">
              <el-table-column prop="label" align="center" :formatter="label2Formatter">
              </el-table-column>
              <el-table-column prop="value" align="center" :formatter="value2Formatter">
              </el-table-column>
              <el-table-column prop="proportion" align="center" :formatter="proportion2Formatter">
              </el-table-column>
            </el-table>
            <el-pagination small @current-change="handleCurrentChange2" :current-page.sync="currentPage2" :page-size="3" layout="total, prev, pager, next" :total="total2" align="right">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="fourCards">
          <div slot="header">个人工作量排行</div>
          <div class="tableCard">
            <el-table :data="tableData1" :show-header="false" style="width: 100%;height:100%">
              <el-table-column prop="label" align="center" :formatter="label3Formatter">
              </el-table-column>
              <el-table-column prop="value" align="center" :formatter="value3Formatter">
              </el-table-column>
              <el-table-column prop="proportion" align="center" :formatter="proportion3Formatter">
              </el-table-column>
            </el-table>
            <el-pagination small @current-change="handleCurrentChange3" :current-page.sync="currentPage3" :page-size="3" layout="total, prev, pager, next" :total="total3" align="right">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from '@/components/echarts/workEcharts.vue'
import fourCardEcharts from '@/components/echarts/fourCardEcharts'
import deptChart from '@/components/echarts/deptEcharts.vue'
export default {
  name: 'Dashboard',
  components: {
    PieChart,
    fourCardEcharts,
    deptChart
  },
  data () {
    return {
      userInfo: {},
      notice: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      tableData1: [
      ],
      tableData2: [
      ],
      tableData3: [
      ],
      departmentWorkloadStatistics: {
        value: [],
        label: []
      },
      size: 3,
      total: 100,
      currentPage: 1,
      workOrderStatistics: [],
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      total1: 10,
      total2: 10,
      total3: 10,
      centerData1: '',
      centerData2: '',
      centerData3: '',
      centerData4: '',
    }
  },
  created () {
    this.getWorkEnch()
  },
  mounted () {
    this.repairCategoryAnalyze()
    this.productLevelAnalyze()
    this.personalWorkload()
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(this.departmentWorkloadStatistics);
  },
  methods: {
    toNotice () {
      this.$router.push({ name: 'announcement' })
    },
    getWorkEnch () {
      // console.log(2);
      this.$Apis.workbench().then(res => {
        // console.log(res);
        this.notice = res.data.announcementEntityList
        res.data.departmentWorkloadStatistics.forEach(item => {
          this.departmentWorkloadStatistics.value.push(item.value)
          this.departmentWorkloadStatistics.label.push(item.label)
          // console.log();
        })
        this.workOrderStatistics = res.data.workOrderStatistics
        this.data1 = res.data.dayNightWorkload
        this.data2 = res.data.repairRate
        this.data3 = res.data.timeoutRate
        this.data4 = res.data.constructionTeam
        this.data1.forEach(data1 => {
          this.centerData1 = (this.centerData1 - 0) + (data1.value - 0)
        })
        this.centerData1 = this.centerData1.toString()
        this.data2.forEach(data2 => {
          if (data2.label == '已修复') {
            this.centerData2 = data2.proportion + '%'
          }
        })
        this.data3.forEach(data3 => {
          if (data3.label == '超时') {
            this.centerData3 = data3.proportion + '%'
          }
        })
        this.data4.forEach(data4 => {
          if (data4.label == '调用') {
            this.centerData4 = data4.proportion + '%'
          }
        })
      })
    },
    personalWorkload () {
      let data = {
        current: this.currentPage3,
        size: 3
      }
      this.$Apis.personalWorkload(data).then(res => {
        // console.log(res);
        this.tableData1 = res.data.list
        this.total3 = res.data.total
      })
    },
    productLevelAnalyze () {
      let data = {
        current: this.currentPage2,
        size: 3
      }
      this.$Apis.productLevelAnalyze(data).then(res => {
        // console.log(res);
        this.tableData2 = res.data.list
        this.total2 = res.data.total
      })
    },
    repairCategoryAnalyze () {
      let data = {
        current: this.currentPage1,
        size: 3
      }
      this.$Apis.repairCategoryAnalyze(data).then(res => {
        // console.log(res);
        if (res.data.list) {
          this.tableData3 = res.data.list
          this.total1 = res.data.total
        }
      })
    },
    toWorkOrder(){
      this.$router.push({ name: 'orderList' })
    },
    // handleSizeChange (val) {
    //   this.currentPage = 1;
    //   this.pageSize = val
    // },
    handleCurrentChange1 (val) {
      this.currentPage1 = val;
      this.repairCategoryAnalyze()
    },
    handleCurrentChange2 (val) {
      this.currentPage2 = val;
      this.productLevelAnalyze()
    },
    handleCurrentChange3 (val) {
      this.currentPage3 = val;
      this.personalWorkload()
    },
    label1Formatter (row) {
      return '业务产品 - ' + row.label
    },
    value1Formatter(row){
      return '运维工单数量：' + row.value
    },
    proportion1Formatter(row){
      return '占比：' + row.proportion + '%'
    },
    label2Formatter (row) {
      return '业务产品-' + row.label
    },
    value2Formatter(row){
      return '运维工单数量：' + row.value
    },
    proportion2Formatter(row){
      return '占比：' + row.proportion + '%'
    },
    label3Formatter (row) {
      return '运维人员-' + row.label
    },
    value3Formatter(row){
      return '完成运维单数量：' + row.value
    },
    proportion3Formatter(row){
      return '占比：' + row.proportion + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .el-row {
      margin-bottom: 20px;
    }
    .el-card {
      border-radius: 20px;
    }
    .userInfoBox {
      background: url("~@/./assets/common/userInfoBg.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      padding-left: 10px;
      h3 {
        font-size: 34px;
        font-weight: normal;
      }
      p {
        font-size: 20px;
        margin-bottom: 35px;
      }
      p:nth-child(3) {
        font-size: 16px;
        span {
          color: #e6e6e6;
        }
      }
    }
    ::v-deep .el-card__header {
      margin: 0 20px;
      padding: 15px 0;
      padding-bottom: 10px;
      font-size: 18px;
    }
    .noticeBox {
      ::v-deep .el-card__body {
        padding: 10px 20px;
        height: 210px;
        overflow: hidden;
      }
      .textItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-icon-document:before {
          margin-right: 10px;
        }
        p {
          font-size: 16px;
          max-width: 60%;
          max-height: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
    .workEcharts {
      ::v-deep .el-card__header{
        border-bottom: none;
      }
      .el-button--mini,
      .el-button--mini.is-round {
        padding: 5px 8px;
      }
      .el-button--mini,
      .el-button--small {
        font-size: 16px;
        color: #ccc;
      }
      height: 350px;
      position: relative;
      ::v-deep .el-card__body {
        height: 100%;
      }
      .btn {
        position: absolute;
        top: 12px;
        right: 30px;
      }
    }
    .fourCards {
      height: 300px;
      ::v-deep .el-card__body {
        height: 240px;
      }
      ::v-deep .el-table td,
      .el-table th.is-leaf {
        border: none;
      }
    }
    .tableCard {
      height: 100%;
      .el-table::before {
        height: 0;
      }
    }
  }
}
</style>
