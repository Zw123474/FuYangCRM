<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom: 20px"></PageTool>
    <el-card class="tableCard" style="border-radius: 20px" shadow="never">
      <!-- 头部信息和按钮 -->
      <div slot="header">
        运维工单列表
        <!-- <el-button plain type="primary" size="medium"><img src="@/assets/common/excel.png" alt="" /> 导出搜索结果</el-button> -->
      </div>
      <!-- 大搜索框 -->
      <div class="searchForm">
        <el-form ref="form" :model="search" label-width="auto" style="
            border-bottom: 1px solid #ccc;
            padding: 20px 20px 10px 10px;
            margin-bottom: 20px;
          ">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="用户编号">
                <el-select v-model="search.userNumber" placeholder="用户编号" filterable>
                  <el-option v-for="(item,inde) in oneToOneUserOptions" :key="inde" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报修联系人">
                <el-input v-model="search.repairContact" placeholder="报修联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报修联系电话">
                <el-input v-model="search.repairContactNumber" placeholder="报修联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报修类别">
                <el-cascader v-model="search.repairCategory" :options="faultTreeOptions" :props="props" placeholder="报修类别"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报修时间">
                <el-date-picker v-model="search.repairTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间">
                <el-date-picker v-model="search.createTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部门">
                <el-select v-model="search.departmentId" placeholder="选择部门">
                  <el-option v-for="(item,index1) in depOptions" :key="index1" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="运维人员">
                <el-select v-model="search.maintenanceStaffId" placeholder="运维人员">
                  <el-option v-for="(item,index2) in operator" :key="index2" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button style="float: right" type="primary" icon="el-icon-search" size="small" @click="getOrderList">搜索</el-button>
        <el-button style="float: right" icon="el-icon-refresh-right" size="small" @click="resetSearch">重置</el-button>
        <!-- 清除按钮浮动 -->
        <div style="clear: both"></div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%; font-size: 18px" :header-cell-style="{
          background: '#e4eaf6',
          color: '#000000',
          height: '70px',
        }">
        <el-table-column prop="workOrderCode" label="运维工单编号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="userNumber" label="用户编号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="productCategories" label="产品大类" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="productSubcategory" label="产品子类" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="productCategory" label="产品细类" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="productLine" label="产品线" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="product" label="产品" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="repairCategoryName" label="报修类别" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="repairContact" label="报修联系人" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="repairContactNumber" label="报修人联系电话" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="repairAddress" label="报修地址" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="repairSource" label="报修来源" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="repairTime" label="报修时间" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="requireCompletionTime" label="要求完工时间" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="120" align="center">
        </el-table-column>
        <el-table-column prop="workOrderStatus" label="工单状态" min-width="200" align="center" :formatter="formatter">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkDetails(scope.row)">详情</el-button>
            <el-button type="text" size="small" v-if="isOperator == '1' || isDepartmentHeads == '1'" @click="receiveOrder(scope.row)">接单</el-button>
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
      productOptions: [
        { id: 1, label: "类别1" },
        { id: 2, label: "类别2" },
        { id: 3, label: "类别3" },
      ],
      search: {
        createTime: "",
        departmentId: "",
        maintenanceStaffId: "",
        repairCategory: "",
        repairContact: "",
        repairContactNumber: "",
        repairTime: "",
        userNumber: "",
        workOrderStatus: "PENDING_ORDER",
        isTransferOrder: 0,
      },
      orderStatus: [
        {
          value: "PENDING_ORDER",
          label: "待接单",
        },
        {
          value: "RETURN",
          label: "退回",
        },
        {
          value: "PROCESSING",
          label: "处理中",
        },
        {
          value: "TURN_DOWN",
          label: "处理完成待结单",
        },
        {
          value: "PENDING_BILL",
          label: "待结单",
        },
        {
          value: "CHECK",
          label: "已结单",
        },
      ],
      oneToOneUserOptions:[],
      faultTreeOptions:[],
      tableData: [],
      size: 10,
      total: 20,
      currentPage: 1,
      dialogVisible: false,
      roleDialog: false,
      dialogTitle: "",
      loading: false,
      form: {
        name: "",
        position: "",
        department: "",
        phone: "",
        pwd: "",
        email: "",
      },
      isDepartmentHeads: '',
      isTotalSchedule: '',
      isOperator: '-1',
      depOptions: [],
      operator: []
    };
  },
  created () {
    this.isDepartmentHeads = JSON.parse(localStorage.getItem('userInfo')).isDepartmentHeads
    this.isTotalSchedule = JSON.parse(localStorage.getItem('userInfo')).isTotalSchedule
    if (this.isTotalSchedule == '-1') {
      if (this.isDepartmentHeads == '-1') {
        this.isOperator = '1'
      }
    }
    this.getOrderList()
    this.getOperator()
    this.getDeptList()
    this.getfaultTreeOption()
    this.getUserOptions()
  },
  methods: {
    // 获取用户编号下拉框
    getUserOptions () {
      this.$Apis.getUserOptions().then(res => {
        this.oneToOneUserOptions = res.data
      })
    },
    // 获取故障类型下拉框
    getfaultTreeOption () {
      this.$Apis.faultTreeOption().then(res => {
        let obj = res.data
        this.faultTreeOptions = this.deleteChildren(obj)
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
    // 获取部门列表
    getDeptList () {
      let data = {
        current: 1,
        size: 999
      }
      this.$Apis.deptList(data).then(res => {
        this.depOptions = res.data.list
      })
    },
    // 获取同部门运维人员 for 大搜索框筛选运维人员
    getOperator () {
      let data = {
        current: 1,
        size: 99,
        deptId: JSON.parse(localStorage.getItem('userInfo')).deptId
      }
      this.$Apis.SameDeptOperatorList(data).then(res => {
        this.operator = res.data
        // console.log(res);
      })
    },
    resetSearch () {
      this.search = {
        createTime: "",
        departmentId: "",
        maintenanceStaffId: "",
        repairCategory: "",
        repairContact: "",
        repairContactNumber: "",
        repairTime: "",
        userNumber: "",
        workOrderStatus: "PENDING_ORDER",
        isTransferOrder: 0,
      };
      this.getOrderList();
    },
    getOrderList () {
      let data = {
        createTime: this.search.createTime,
        departmentId: this.search.departmentId,
        maintenanceStaffId: this.search.maintenanceStaffId,
        repairCategory: this.search.repairCategory.toString(),
        repairContact: this.search.repairContact,
        repairContactNumber: this.search.repairContactNumber,
        repairTime: this.search.repairTime,
        userNumber: this.search.userNumber,
        isTransferOrder: this.search.isTransferOrder,
        workOrderStatus: this.search.workOrderStatus,
        current: this.currentPage,
        size: this.size,
      };
      this.$Apis.orderList(data).then((res) => {
        // console.log(res.data);
        this.tableData = res.data.list;
        this.currentPage = res.data.current;
        this.size = res.data.size;
        this.total = res.data.total;
      });
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.size = val;
      this.getOrderList();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getOrderList();
    },
    checkDetails (row) {
      this.$router.push({ name: "checkOrder", query: { id: row.id } });
    },
    receiveOrder (row) {
      this.$confirm('确认接单？').then(_ => {
        let data = {
          id: row.id
        }
        this.$Apis.receiveOrder(data).then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message.success('操作成功')
            this.getOrderList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(_ => { })
    },
    formatter (row) {
      return this.orderStatus.map((item) => {
        if (item.value == row.workOrderStatus) return item.label;
      });
    },
  },
};
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
