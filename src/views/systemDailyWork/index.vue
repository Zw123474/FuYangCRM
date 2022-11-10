<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <!-- 头部信息和按钮 -->
      <div slot="header">
        历史系统人员日志记录 <span class="num"> {{total}} </span> 条
      </div>
      <!-- 大搜索框 -->
      <div class="searchForm">
        <el-form ref="form" :model="search" label-width="100px" style="margin-bottom:30px">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item label="系统人员">
                <el-input v-model="search.sysUserName" placeholder="请输入系统人员名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="发送时间">
                <el-date-picker v-model="search.createTime" type="date" placeholder="请输入发送时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="操作类型">
                <el-select v-model="search.operationType" clearable placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="运维工单编号">
                <el-input v-model="search.workOrderCode" placeholder="请输入运维工单编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button style="float:right" type="primary" icon="el-icon-search" size="small" @click="getLogList()">搜索</el-button>
        <el-button style="float:right" icon="el-icon-refresh-right" size="small" @click="resetSearch">重置</el-button>
        <!-- 清除按钮浮动 -->
        <div style="clear:both"></div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column prop="sysUserName" label="系统人员" align="center">
        </el-table-column>
        <el-table-column prop="operationType" label="操作类型" :formatter="formatter1" align="center">
        </el-table-column>
        <el-table-column prop="logDescription" label="日志描述" align="center">
        </el-table-column>
        <el-table-column prop="workOrderCode" label="对应运维工单编号" align="center">
        </el-table-column>
        <el-table-column prop="workOrderStatus" label="操作后状态" align="center" :formatter="formatter2">
        </el-table-column>
        <el-table-column prop="updateTime" label="时间" align="center">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: 'DH_ASSIGN',
        label: '部门主管指派接单'
      }, {
        value: 'DH_RETURN',
        label: '部门主管退回工单'
      }, {
        value: 'DH_REVOKE',
        label: '部门主管撤销退回工单'
      }, {
        value: 'MP_COMPLETE_PENDING',
        label: '运维人员处理完成待结单'
      }, {
        value: 'MP_RECEIVE',
        label: '运维人员接单'
      }, {
        value: 'MP_REPLENISH',
        label: '运维人员补充工单'
      }, {
        value: 'MP_REVOKE_COMPLETE_PENDING',
        label: '运维人员撤销处理完成待结单运维工单'
      }, {
        value: 'OS_CREATE',
        label: '总调度创建工单'
      }, {
        value: 'OS_EDIT',
        label: '总调度修改工单'
      }, {
        value: 'OS_FINISH',
        label: '总调度完结工单'
      }, {
        value: 'OS_REDISTRIBUTE',
        label: '总调度重新派发工单'
      }, {
        value: 'OS_TURN_DOWN',
        label: '总调度驳回工单'
      }],
      orderStatus: [
        {
          value: 'PENDING_ORDER',
          label: '待接单'
        }, {
          value: 'RETURN',
          label: '退回'
        }, {
          value: 'PROCESSING',
          label: '处理中'
        }, {
          value: 'TURN_DOWN',
          label: '处理完成待结单'
        }, {
          value: 'OS_TURN_DOWN',
          label: '已驳回'
        }, {
          value: 'CHECK',
          label: '已结单'
        }],
      search: {
        createTime: '',
        operationType: '',
        sysUserName: '',
        workOrderCode: '',
      },
      tableData: [],
      size: 10,
      total: 20,
      currentPage: 1,
      dialogVisible: false,
      roleDialog: false,
      dialogTitle: '',
      loading: false,
    }
  },
  created () {
    this.getLogList()
  },
  methods: {
    getLogList () {
      let data = {
        createTime: this.search.createTime,
        operationType: this.search.operationType,
        sysUserName: this.search.sysUserName,
        workOrderCode: this.search.workOrderCode,
        current: this.currentPage,
        size: this.size
      }
      this.$Apis.getLogList(data).then(res => {
        console.log(res.data);
        this.tableData = res.data.list
        this.currentPage = res.data.current
        this.size = res.data.size
        this.total = res.data.total
      })
    },
    resetSearch () {
      this.search = {}
      this.getLogList()
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.size = val;
      this.getLogList()
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getLogList()
    },
    formatter1 (row, column) {
      return this.options.map(item => {
        if (item.value == row.operationType) return item.label
      })
    },
    formatter2 (row) {
      return this.orderStatus.map(item => {
        if (item.value == row.workOrderStatus) return item.label
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.searchForm {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 30px;
}
.tableCard {
  border-radius: 20px;
  .btn {
    span {
      font-size: 16px;
      color: #92929a;
      margin-right: 20px;
    }
  }
  ::v-deep .el-card__header {
    font-size: 20px;
    img {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
    .num {
      color: blue;
    }
    .el-button {
      font-size: 16px;
      float: right;
    }
  }
  ::v-deep .el-card__header,
  el-card__body {
    padding: 30px 0;
    margin: 0 35px;
    border-bottom: none;
  }
  ::v-deep .el-card__body {
    margin: 0 35px;
    padding: 30px 0;
  }
  .el-button {
    margin: 0 15px;
  }
  .dingdingBtn .el-button {
    margin: 30px 0;
    font-size: 16px;
    .VectorIcon {
      margin-right: 5px;
    }
  }
  ::v-deep .el-table tr {
    height: 70px;
  }
  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: right;
  }
  .el-button--text {
    font-size: 16px;
  }
  .el-button--text:nth-child(2) {
    color: #34a47e;
  }
  .el-button--text:nth-child(3) {
    color: #ec4040;
  }
  .el-button--text:nth-child(4) {
    color: #ff9d0a;
  }
}
</style>

