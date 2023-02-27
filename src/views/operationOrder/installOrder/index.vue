<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <!-- 头部信息和按钮 -->
      <div slot="header">
        项目安装单信息 <span class="num"> {{total}} </span> 条
        <!-- <el-button plain type="primary" size="medium"><img src="@/assets/common/excel.png" alt=""> Excel导入</el-button> -->
      </div>
      <!-- 大搜索框 -->
      <div class="searchForm">
        <el-form ref="form" :model="search" label-width="100px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="用户名称">
                <el-input v-model="search.userName" placeholder="账户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户编号">
                <!-- <el-input v-model="search.userNumber" placeholder="请输入客户编号"></el-input> -->
                <el-select v-model="search.userNumber" placeholder="用户编号" filterable>
                  <el-option v-for="(item,inde) in oneToOneUserOptions" :key="inde" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目型名称">
                <el-input v-model="search.itemName" placeholder="项目型名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工单实例编号">
                <el-input v-model="search.ticketInstanceNumber" placeholder="工单实例编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间">
                <el-date-picker v-model="search.createTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="实际完工日期">
                <el-date-picker v-model="search.actualCompletionDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="受理类型">
                <!-- <el-input v-model="search.acceptanceType" placeholder="请输入用户名称"></el-input> -->
                <el-select v-model="search.acceptanceType" placeholder="受理类型">
                  <el-option label="批量新装" value="批量新装"></el-option>
                  <el-option label="新装" value="新装">
                  </el-option>
                  <el-option label="移机" value="移机">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工单流转情况">
                <el-select v-model="search.workOrderFlow" placeholder="工单流转情况">
                  <el-option v-for="item in orderFlowOptions" :key="item.id" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button style="float:right" type="primary" icon="el-icon-search" size="small" @click="getWorkOrderList()">搜索</el-button>
        <el-button style="float:right" icon="el-icon-refresh-right" size="small" @click="resetSearch">重置</el-button>
        <!-- 清除按钮浮动 -->
        <div style="clear:both"></div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column prop="userName" label="用户名称" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="userNumber" label="用户编号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="itemName" label="项目型名称" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="itemNumber" label="项目型编号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="acceptanceType" label="受理类型" min-width="200" align="center">
        </el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间" min-width="120" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" min-width="120" align="center">
        </el-table-column> -->
        <el-table-column prop="ticketInstanceNumber" label="工单实例编号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="productLevelNameStr" label="业务类型" min-width="300" align="center">
        </el-table-column>
        <el-table-column prop="workOrderFlow" label="工单流转情况" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="requiredCompletionDate" label="要求完工日期" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="actualCompletionDate" label="实际完工日期" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="otherRemarks" label="其他备注" min-width="300" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkDetails(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row,1)">编辑</el-button>
            <el-button type="text" size="small" @click="handleAdd(scope.row)">删除</el-button>
          </template>
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
      productOptions: [{ id: 1, label: '类别1' }, { id: 2, label: '类别2' }, { id: 3, label: '类别3' }],
      search: {
        userName: '',
        userNumber: '',
        itemName: '',
        ticketInstanceNumber: '',
        createTime: '',
        actualCompletionDate: '',
        acceptanceType: '',
        workOrderFlow: '',
      },
      tableData: [],
      size: 10,
      total: 20,
      currentPage: 1,
      dialogVisible: false,
      roleDialog: false,
      dialogTitle: '',
      loading: false,
      form: {
        name: '',
        position: '',
        department: '',
        phone: '',
        pwd: '',
        email: ''
      },
      dialogVisible: true,
      orderFlowOptions: [
        { id: 1, label: '回退' }, { id: 2, label: '退回延期' }, { id: 3, label: '延期' }, { id: 4, label: '正常流转' }
      ],
      oneToOneUserOptions:[]
    }
  },
  created () {
    this.getWorkOrderList()
    this.getUserOptions()
  },
  methods: {
    // 获取用户编号下拉框
    getUserOptions () {
      this.$Apis.getUserOptions().then(res => {
        this.oneToOneUserOptions = res.data
      })
    },
    resetSearch () {
      this.search = {}
      this.getWorkOrderList()
    },
    getWorkOrderList () {
      let data = {
        userName: this.search.userName,
        userNumber: this.search.userNumber,
        itemName: this.search.itemName,
        ticketInstanceNumber: this.search.ticketInstanceNumber,
        createTime: this.search.createTime,
        actualCompletionDate: this.search.actualCompletionDate,
        acceptanceType: this.search.acceptanceType,
        workOrderFlow: this.search.workOrderFlow,
        current: this.currentPage,
        size: this.size
      }
      this.$Apis.workOrderList(data).then(res => {
        // console.log(res.data);
        this.tableData = res.data.list
        this.currentPage = res.data.current
        this.size = res.data.size
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.size = val;
      this.getWorkOrderList()
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getWorkOrderList()
    },
    checkDetails (row) {
      this.$router.push({ name: 'workOrderDetails', query: { id: row.id, mode: 'a' } })
    },
    handleEdit (row) {
      this.$router.push({ name: 'workOrderDetails', query: { id: row.id, mode: 'c' } })
    },
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
    .num {
      color: blue;
    }
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
}
</style>

