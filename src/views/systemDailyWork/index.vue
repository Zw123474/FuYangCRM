<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <!-- 头部信息和按钮 -->
      <div slot="header">
        历史系统人员日志记录 <span class="num"> 888 </span> 条
      </div>
      <!-- 大搜索框 -->
      <div class="searchForm">
        <el-form ref="form" :model="search" label-width="100px" style="margin-bottom:30px">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item label="系统人员">
                <el-input v-model="search.accountName" placeholder="请输入账户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="发送时间">
                <el-input v-model="search.cusNum" placeholder="请输入客户编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="操作类型">
                <el-input v-model="search.userName" placeholder="请输入用户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="运维工单编号">
                <el-input v-model="search.userNum" placeholder="请输入用户编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button style="float:right" type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button style="float:right" icon="el-icon-refresh-right" size="small">重置</el-button>
        <!-- 清除按钮浮动 -->
        <div style="clear:both"></div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column prop="accountName" label="系统人员" width="250" align="center">
        </el-table-column>
        <el-table-column prop="cusNum" label="操作类型" width="250" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="日志描述" width="250" align="center">
        </el-table-column>
        <el-table-column prop="userNum" label="对应运维工单编号" width="250" align="center">
        </el-table-column>
        <el-table-column prop="product" label="操作后状态" width="250" align="center">
        </el-table-column>
        <el-table-column prop="productClass" label="时间" width="300" align="center">
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
        department: '',
        name: ''
      },
      tableData: [{ id: 1, accountName: '许三多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556' },
      { id: 2, accountName: '许二多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556' },
      { id: 3, accountName: '许四多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556' },
      { id: 4, accountName: '许五多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556' },
      { id: 5, accountName: '许三多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556' }],
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
      timer: null,
      circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedRoles = val ? roles : checkedRoles;
      this.isIndeterminate = false;
    },
    handlecheckedRolesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.roles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length;
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    checkDetails (row) {
      this.$router.push({ name: 'Details', query: { id: row.id } })
    },
    handleAdd () {
      this.$router.push({ name: 'AddDetails' })
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑子管理员"
      this.form = row
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
    .num{
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

