<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <div style="font-size:14px;color:#666;margin:30px 0 10px 10px">状态说明: 待接单状态下，发起人可以编辑修改基本信息; 处理中， 运维人员可以编辑补充字段、状态; 待结但状态 下运维人员可编辑补充字段，发起人可进行编辑; 已结单状态下，不可进行编辑; 退回状态，发起人可编辑修改基本信息
    </div>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <!-- 头部信息和按钮 -->
      <div slot="header">
        运维工单列表
        <el-button plain type="primary" size="medium"><img src="@/assets/common/excel.png" alt=""> 导出搜索结果</el-button>
        <el-button type="primary" size="medium" @click="handleAdd">
          <img src="@/assets/common/add.png" alt="">
          创建运维工单
        </el-button>
      </div>
      <!-- 大搜索框 -->
      <div class="searchForm">
        <el-form ref="form" :model="search" label-width="auto" style="border-bottom:1px solid #ccc;padding:20px 20px 10px 10px;margin-bottom:20px">
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
            <el-col :span="18">
              <el-form-item label="运维工单状态">
                <el-radio-group v-model="search.status" size="small">
                  <el-radio label="1" border>待接单</el-radio>
                  <el-radio label="2" border>退回</el-radio>
                  <el-radio label="3" border>处理中</el-radio>
                  <el-radio label="4" border>处理完成待接单</el-radio>
                  <el-radio label="5" border>已结单</el-radio>
                </el-radio-group>
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
        <el-table-column prop="accountName" label="运营工单编号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="cusNum" label="用户编号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="对应客户编号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="userNum" label="对应用户名" width="200" align="center">
        </el-table-column>
        <el-table-column prop="product" label="用户编号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="productClass" label="报修人姓名" width="200" align="center">
        </el-table-column>
        <el-table-column prop="productLine" label="报修人联系号码" width="200" align="center">
        </el-table-column>
        <el-table-column prop="productLine" label="报修地址" width="200" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkDetails(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row,1)">编辑</el-button>
            <el-button type="text" size="small" v-show="scope.row.status==3" @click="handleAdd(scope.row)">撤销</el-button>
            <el-button type="text" size="small" v-show="scope.row.status==4" @click="handlerole(scope.row)">变更审核</el-button>
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
      tableData: [
        { id: 1, accountName: '许三多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556', status: 2, type: 1 },
        { id: 2, accountName: '许二多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556', status: 3, type: 2 },
        { id: 3, accountName: '许四多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556', status: 4, type: 1 },
        { id: 4, accountName: '许五多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556', status: 1, type: 2 },
        { id: 5, accountName: '许三多', cusNum: '13123456789', userName: '主管', userNum: 1, product: '总调度', productClass: '11111', productLine: '5556', status: 3, type: 2 }],
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
      console.log(row.type);
      this.$router.push({ name: 'CheckOrder', query: { id: row.id, type: row.type } })
    },
    handleAdd () {
      this.$router.push({ name: 'AddOrder' })
    },
    handleEdit (row) {
      this.$router.push({ name: 'EditOrder' })
    },
  }
}
</script>

<style lang="scss" scoped>
.searchForm {
  border: 1px solid #ccc;
  margin-bottom: 30px;
  padding-bottom: 20px;
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
    img {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
  }
  ::v-deep .el-card__header,
  el-card__body {
    padding: 20px 0;
    margin: 0 35px;
    border-bottom: none;
  }
  ::v-deep .el-card__body {
    margin: 0 35px;
    padding: 20px 0;
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

