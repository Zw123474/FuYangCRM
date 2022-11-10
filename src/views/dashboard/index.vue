<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="userInfoBox" shadow="never">
          <h3>您好，{{name}}</h3>
          <p>总调度 | {{role}}</p>
          <p><span>您的上次登录信息：</span> {{time}}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="noticeBox" shadow="never">
          <div slot="header" class="clearfix">
            <span>最近公告</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div v-for="(item,index) in notice" :key="index" class="textItem">
            <p class="el-icon-document">{{item.title}}</p>
            <span>{{item.time}}</span>
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
          <div id="myCharts" style="height:100%;width:100%;"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="workEcharts">
          <div class="btn">
            <el-button size="mini" icon="el-icon-more"></el-button>
          </div>
          <div class="pieChart" style="height:100%;width:100%;">
            <PieChart></PieChart>
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
          <div class="pieChart" style="height:100%;width:100%;">
            <fourCardEcharts :piedata="data1"></fourCardEcharts>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="fourCards">
          <div slot="header">
            修复率
          </div>
          <div class="pieChart" style="height:100%;width:100%;">
            <fourCardEcharts :piedata="data2"></fourCardEcharts>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="fourCards">
          <div slot="header">
            超时率
          </div>
          <div class="pieChart" style="height:100%;width:100%;">
            <fourCardEcharts :piedata="data3"></fourCardEcharts>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="fourCards">
          <div slot="header">
            调用施工队比例
          </div>
          <div class="pieChart" style="height:100%;width:100%;">
            <fourCardEcharts :piedata="data4"></fourCardEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="never" class="fourCards">
          <div slot="header">保修业务产品分析比例</div>
          <div class="tableCard">
            <el-table :data="tableData" :show-header="false" style="width: 100%;height:100%">
              <el-table-column prop="type" style="width:40%" align="center">
              </el-table-column>
              <el-table-column prop="number" style="width: 40%" align="center">
              </el-table-column>
              <el-table-column prop="ratio" style="width: 20%" align="center">
              </el-table-column>
            </el-table>
            <el-pagination small @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="total, prev, pager, next" :total="total" align="right">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="fourCards">
          <div slot="header">保修业务产品分析比例</div>
          <div class="tableCard">
            <el-table :data="tableData" :show-header="false" style="width: 100%;height:100%">
              <el-table-column prop="type" style="width:40%" align="center">
              </el-table-column>
              <el-table-column prop="number" style="width: 40%" align="center">
              </el-table-column>
              <el-table-column prop="ratio" style="width: 20%" align="center">
              </el-table-column>
            </el-table>
            <el-pagination small @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="total, prev, pager, next" :total="total" align="right">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="fourCards">
          <div slot="header">个人工作量排行</div>
          <div class="tableCard">
            <el-table :data="tableData" :show-header="false" style="width: 100%;height:100%">
              <el-table-column prop="type" style="width:40%" align="center">
              </el-table-column>
              <el-table-column prop="number" style="width: 40%" align="center">
              </el-table-column>
              <el-table-column prop="ratio" style="width: 20%" align="center">
              </el-table-column>
            </el-table>
            <el-pagination small @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="total, prev, pager, next" :total="total" align="right">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PieChart from '@/components/echarts/workEcharts.vue'
import fourCardEcharts from '@/components/echarts/fourCardEcharts'
export default {
  name: 'Dashboard',
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // },
  components: {
    PieChart,
    fourCardEcharts
  },
  data () {
    return {
      name: 'Avicii',
      role: '总管',
      time: '2022年10月20日',
      notice: [{ title: '调用施工队情况需求', time: '2022-09-23 10:00' }, { title: '运维工单创建说明', time: '2022-09-23 10:00' }, { title: '员工维护运维相关规范', time: '2022-09-23 10:00' }, { title: '关于个人信息数据统计', time: '2022-09-23 10:00' }],
      data1: [{ value: 100, name: '日常' },
      { value: 150, name: '夜间' },],
      data2: [{ value: 100, name: '超时' },
      { value: 150, name: '未超时' },],
      data3: [{ value: 100, name: '超时' },
      { value: 150, name: '未超时' },],
      data4: [{ value: 100, name: '调用' },
      { value: 150, name: '未调用' },],
      tableData: [
        { type: '业务产品类型1', number: '运维工单数量:100', ratio: '占比5%' },
        { type: '业务产品类型2', number: '运维工单数量:100', ratio: '占比5%' },
        { type: '业务产品类型3', number: '运维工单数量:100', ratio: '占比5%' },
      ],
      size: 3,
      total: 100,
      currentPage: 1,
    }
  },
  mounted () {
    this.getLoadEcharts()
  },
  methods: {
    getLoadEcharts () {
      const myCharts = this.$echarts.init(document.getElementById('myCharts'));
      var data = [200, 300, 150, 280, 240];
      var department = ['代维部', '运维部', '保修部', '信息部', '总调度部门']
      let options = {
        legend: {},
        //画布边距
        grid: {
          left: '5%',
          right: '8%',
          top: '3%',
          bottom: '3%',
          width: "90%", // 宽度
          height: "80%",// 高度
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitNumber: 5,
          splitLine: {//虚线
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#D0DEEE40'
            }
          },
          axisLabel: {
            color: '#333',//x字体颜色
            fontSize: '14px',
          },
        },
        yAxis: {
          type: 'category',
          data: department,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#333',//y字体颜色
            fontSize: '12px',
          },

        },
        series: [
          {
            type: 'bar',
            barWidth: 12,
            data: data,
            showBackground: true,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [ // color在这里
                {
                  offset: 0,
                  color: '#84a7fb'
                },
                {
                  offset: 1,
                  color: '#4578fb'
                }
              ])

            },
            label: {
              show: true,
              lineHeight: 20,
              position: 'right',
              color: 'black',
              fontSize: 10
            }
          }
        ]
      }
      myCharts.setOption(options);
    },
    // handleSizeChange (val) {
    //   this.currentPage = 1;
    //   this.pageSize = val
    // },
    handleCurrentChange (val) {
      this.currentPage = val;
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
        }
        span {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
    .workEcharts {
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
        top: 20px;
        right: 30px;
      }
    }
    .fourCards {
      height: 270px;
      ::v-deep .el-card__body {
        height: 200px;
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
