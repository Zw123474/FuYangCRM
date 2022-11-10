<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <!-- 头部信息和按钮 -->
      <div slot="header">
        用户信息 <span class="num"> {{total}} </span> 条
        <el-button plain type="primary" size="medium"><img src="@/assets/common/excel.png" alt=""> Excel导入</el-button>
        <el-button type="primary" size="medium" @click="handleAdd">
          <img src="@/assets/common/add.png" alt="">
          创建用户信息
        </el-button>
      </div>
      <!-- 大搜索框 -->
      <div class="searchForm">
        <el-form ref="form" :model="search" label-width="100px" style="margin-bottom:30px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="账户名称">
                <el-input v-model="search.accountName" placeholder="请输入账户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户编号">
                <el-input v-model="search.customerNumber" placeholder="请输入客户编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户名称">
                <el-input v-model="search.userName" placeholder="请输入用户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户编号">
                <el-input v-model="search.userNumber" placeholder="请输入用户编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品层级">
                <!-- <el-select v-model="search.productLevel" placeholder="请选择产品层级">
                  <el-option v-for="item in productOptions" :key="item.id" :label="item.label" :value="item.id">
                  </el-option>
                </el-select> -->
                <el-cascader v-model="search.productLevel" :options="productOptions" :props="props"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订购开始时间">
                <el-date-picker v-model="search.orderStartTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订购结束时间">
                <el-date-picker v-model="search.orderEndTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发展雇员">
                <el-input v-model="search.developEmployees" placeholder="请输入用户编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button style="float:right" type="primary" icon="el-icon-search" size="small" @click="toSearch">搜索</el-button>
        <el-button style="float:right" icon="el-icon-refresh-right" size="small" @click="resetSearch">重置</el-button>
        <!-- 清除按钮浮动 -->
        <div style="clear:both"></div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column prop="accountName" label="账户名称" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="accountNumber" label="账户编号" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="userName" label="用户名称" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="userNumber" label="用户编号" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="vpnName" label="VPN名称" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="accountOpeningTime" label="账户开通时间" align="center" min-width="150">
        </el-table-column>
        <el-table-column prop="accountStartTime" label="账户开始时间" align="center" min-width="150">
        </el-table-column>
        <!-- <el-table-column prop="appendix" label="附件" align="center" min-width="120">
        </el-table-column> -->
        <el-table-column prop="contact" label="联系人" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="contactNumber" label="联系电话" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="creditRating" label="资信等级" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="customerNumber" label="客户编号" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="developEmployees" label="发展雇员" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="faxNumber" label="传真号码" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="mail" label="邮箱" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="mobilePhone" label="移动电话" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="orderStartTime" label="订购开始时间" align="center" min-width="150">
        </el-table-column>
        <el-table-column prop="orderEndTime" label="订购结束时间" align="center" min-width="150">
        </el-table-column>
        <el-table-column prop="otherRemarks" label="其他备注" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="productLevelNameStr" label="产品层级" align="center" min-width="300">
        </el-table-column>
        <el-table-column prop="promotion" label="促销" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="seller" label="销售员" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="userAddress" label="用户地址" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="userCompletionTime" label="用户完工时间" align="center" min-width="150">
        </el-table-column>
        <el-table-column prop="userStatus" label="用户状态" align="center" min-width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="380" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkDetails(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row,1)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handlerole(scope.row)">查看安装单信息</el-button>
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
      props: { value: 'id' },
      productOptions: [{ id: 1, label: '类别1' }, { id: 2, label: '类别2' }, { id: 3, label: '类别3' }],
      search: {
        accountName: '',
        customerNumber: '',
        developEmployees: '',
        orderEndTime: '',
        orderStartTime: '',
        productLevel: '',
        userName: '',
        userNumber: '',
      },
      tableData: [],
      size: 10,
      total: 20,
      currentPage: 1,
    }
  },
  created () {
    this.getuserInfoList()
    this.getProductOptions()
  },
  methods: {
    resetSearch () {
      this.search = {}
      this.getuserInfoList()
    },
    getuserInfoList () {
      let data = {
        accountName: this.search.accountName,
        customerNumber: this.search.customerNumber,
        developEmployees: this.search.developEmployees,
        orderEndTime: this.search.orderEndTime,
        orderStartTime: this.search.orderStartTime,
        productLevel: this.search.productLevel,
        userName: this.search.userName,
        userNumber: this.search.userNumber,
        current: this.currentPage,
        size: this.size
      }
      this.$Apis.userInfoList(data).then(res => {
        console.log(res.data);
        this.tableData = res.data.list
        this.currentPage = res.data.current
        this.size = res.data.size
        this.total = res.data.total
      })
    },
    deleteChildren (arr) {
      let childs = arr
      for (let i = childs.length; i--; i > 0) {
        if (childs[i].children) {
          if (childs[i].children.length) {
            this.deleteChildren(childs[i].children)
          } else {
            delete childs[i].children
          }
        }
      }
      return arr
    },
    getProductOptions () {
      this.$Apis.treeOptionList().then(res => {
        console.log(res);
        let obj = res.data
        this.productOptions = this.deleteChildren(obj)
      })
    },
    toSearch () {
      this.search.productLevel = this.search.productLevel.toString()
      // console.log(this.search.productLevel.toString());
      this.getuserInfoList()
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.size = val;
      this.getuserInfoList()
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getuserInfoList()
    },
    checkDetails (row) {
      this.$router.push({ name: 'addDetails', query: { id: row.id, mode: 'a' } })
    },
    handleAdd () {
      this.$router.push({ name: 'addDetails', query: { mode: 'b' } })
    },
    handleEdit (row) {
      this.$router.push({ name: 'addDetails', query: { id: row.id, mode: 'c' } })
    },
    handleDel(row){
      this.$confirm('确认删除？').then(_ => {
        let data = {
          id: row.id
        }
        this.$Apis.userInfoDel(data).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success('操作成功')
            this.getuserInfoList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(_ => { })
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

