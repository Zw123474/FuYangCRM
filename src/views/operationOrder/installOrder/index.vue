<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <!-- 头部信息和按钮 -->
      <div slot="header">
        运维工单信息 <span class="num"> 888 </span> 条
        <el-button plain type="primary" size="medium"><img src="@/assets/common/excel.png" alt=""> Excel导入</el-button>
      </div>
      <!-- 大搜索框 -->
      <div class="searchForm">
        <el-form ref="form" :model="search" label-width="100px">
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="创建时间">
                <el-input v-model="search.createTime" placeholder="请输入创建时间"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="部门id">
                <el-input v-model="search.departmentId" placeholder="请输入部门id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否转单">
                <el-select v-model="search.isTransferOrder" placeholder="请选择是否转单">
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="运维人员id">
                <el-input v-model="search.maintenanceStaffId" placeholder="请输入运维人员id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="报修类别">
                <el-input v-model="search.repairCategory" placeholder="请输入报修类别"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="报修联系人">
                <el-input v-model="search.repairContact" placeholder="请输入报修联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="报修联系电话">
                <el-input v-model="search.repairContactNumber" placeholder="请输入报修联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="报修时间">
                <el-date-picker v-model="search.repairTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="用户编号">
                <el-input v-model="search.userNumber" placeholder="请输入用户编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="用户编号">
                <el-input v-model="search.userNumber" placeholder="请输入用户编号"></el-input>
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
        <el-table-column prop="accountName" label="账户名称" width="200" align="center">
        </el-table-column>
        <el-table-column prop="cusNum" label="客户编号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名称" width="200" align="center">
        </el-table-column>
        <el-table-column prop="userNum" label="用户编号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="product" label="产品子类" width="200" align="center">
        </el-table-column>
        <el-table-column prop="productClass" label="产品细类" width="200" align="center">
        </el-table-column>
        <el-table-column prop="productLine" label="产品线" width="200" align="center">
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

