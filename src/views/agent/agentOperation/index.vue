<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom: 20px"></PageTool>
    <div style="font-size: 14px; color: #666; margin: 30px 0 10px 10px">
      状态说明: 待接单状态下，发起人可以编辑修改基本信息; 处理中，运维人员可以编辑补充字段、状态;
      待结单状态下运维人员可编辑补充字段，发起人可进行编辑; 已结单状态下，不可进行编辑;
      退回状态，发起人可编辑修改基本信息
    </div>
    <el-card class="tableCard" style="border-radius: 20px" shadow="never">
      <!-- 头部信息和按钮 -->
      <div slot="header">
        代维单位转单记录
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
            <el-col :span="6" v-if="isTotalSchedule == '1'">
              <el-form-item label="部门">
                <el-select v-model="search.departmentId" placeholder="选择部门">
                  <el-option v-for="(item,index1) in depOptions" :key="index1" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="isOperator != '1'">
              <el-form-item label="运维人员">
                <el-select v-model="search.maintenanceStaffId" placeholder="运维人员">
                  <el-option v-for="(item,index2) in operator" :key="index2" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="运维工单状态">
                <el-radio-group v-model="search.workOrderStatus" size="small">
                  <el-radio label="PENDING_ORDER" border>待接单</el-radio>
                  <el-radio label="RETURN" border>退回</el-radio>
                  <el-radio label="PROCESSING" border>处理中</el-radio>
                  <el-radio label="PENDING_BILL" border>处理完成待结单</el-radio>
                  <el-radio label="TURN_DOWN" border>已驳回</el-radio>
                  <el-radio label="CHECK" border>已结单</el-radio>
                </el-radio-group>
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
        <el-table-column prop="userNumber" label="用户编号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="workOrderCode" label="运维工单编号" min-width="200" align="center">
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
      oneToOneUserOptions: [],
      list: [],
      props: { value: 'id' },
      addForm: {
        returnReason: ''
      },
      returnDialogVisible: false,
      id: '',
      assignDialogVisible: false,
      operator: [],
      checkbox: [],
      replenishDialogVisible: false,
      operatorList: [],
      operatoeradd: {
        agentMaintainUnitId: '',
        constructionTeam: '',
        id: '',
        faultCause: '',
        faultTypeId: '',
        remark: '',
        repairStatus: '',
        agentMaintainUnitId: 0,
        distributeMaintenanceStaffVoList: []
      },
      search: {
        createTime: "",
        departmentId: "",
        maintenanceStaffId: "",
        repairCategory: [],
        repairContact: "",
        repairContactNumber: "",
        repairTime: "",
        userNumber: "",
        workOrderStatus: "",
        isTransferOrder: 1,
      },
      orderStatus: [
        {
          value: "PENDING_ORDER",
          label: "待接单",
        },

        {
          value: "PROCESSING",
          label: "处理中",
        },
        {
          value: "RETURN",
          label: "退回",
        },
        {
          value: "TURN_DOWN",
          label: "已驳回",
        },
        {
          value: "PENDING_BILL",
          label: "处理完成待结单",
        },
        {
          value: "CHECK",
          label: "已结单",
        },
      ],
      tableData: [],
      size: 10,
      total: null,
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
      deptId: null,
      faultTreeOptions: [],
      arr: [],
      agentList: []
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
    // 获取工单列表
    this.getOrderList()
    // 获取运维下拉框
    this.getOperator()
    // 获取部门下拉框
    this.getDeptList()
    // 获取故障类型下拉框
    this.getfaultTreeOption()
    // 获取用户编号下拉框
    this.getUserOptions()
    // 获取代维单位下拉框
    this.getAgentOptions()
  },
  methods: {
    // 获取代维单位下拉框
    getAgentOptions () {
      this.$Apis.agentOption().then(res => {
        console.log(res);
        this.agentList = res.data
      })
    },
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
    // 获取同部门运维人员 for 部门主管派单
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
        repairCategory: [],
        repairContact: "",
        repairContactNumber: "",
        repairTime: "",
        userNumber: "",
        workOrderStatus: "",
        isTransferOrder: 1,
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
      // console.log(row.type);
      this.$router.push({ name: "checkOrder", query: { id: row.id } });
    },
    handleAdd () {
      this.$router.push({ name: "addOrder" });
    },
    handleEdit (row) {
      this.$router.push({ name: "editOrder", query: { id: row.id } });
    },
    formatter (row) {
      return this.orderStatus.map((item) => {
        if (item.value == row.workOrderStatus) return item.label;
      });
    },
    // 退回加原因
    handleReturn (row) {
      this.returnDialogVisible = true
      this.id = row.id
    },
    submitReturn () {
      let data = {
        maintenanceWorkOrderId: this.id,
        returnReason: this.addForm.returnReason,
      }
      this.$Apis.returnWorkOrder(data).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.$message.success('操作成功')
          this.getOrderList()
        } else {
          this.$message.error(res.msg)
        }
        this.returnDialogVisible = false
      })
    },
    // 部门主管指派人员
    handleAssign (row) {
      this.assignDialogVisible = true
      this.id = row.id
    },
    submitAssign () {
      let data = {
        maintenanceWorkOrderId: this.id,
        maintenanceStaffIds: this.checkbox.join(','),
      }
      // console.log(data);
      this.$Apis.assignOrders(data).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.$message.success('操作成功')
          this.getOrderList()
        } else {
          this.$message.error(res.msg)
        }
        this.assignDialogVisible = false
      })
    },
    // 运维人员补充字段
    handleAddSome (row) {
      this.replenishDialogVisible = true
      this.operatoeradd.id = row.id
      this.operatorList = row.distributeMaintenanceStaffVoList
      this.operatoeradd.faultTypeId = row.faultTypeId.split(',').map(Number)
      this.operatoeradd.faultCause = row.faultCause
      this.operatoeradd.constructionTeam = row.constructionTeam
      this.operatoeradd.remark = row.remark
      this.operatoeradd.agentMaintainUnitId = row.agentMaintainUnitId
      this.operatoeradd.repairStatus = row.repairStatus
      // console.log(this.operatoeradd.faultTypeId);
      this.list = []
      // console.log(this.operatorList);
    },
    submitReplenish () {
      this.operatoeradd
      this.operator.forEach(e => {
        this.list.forEach(ope => {
          if (ope == e.id) {
            this.arr.push({ maintenanceStaffName: e.name, maintenanceStaffId: e.id })
          }
        })
      })
      this.operatoeradd.distributeMaintenanceStaffVoList = this.arr
      this.operatoeradd.faultTypeId = this.operatoeradd.faultTypeId.toString()
      let data = this.operatoeradd
      // console.log(data);
      this.$Apis.replenish(data).then(res => {
        if (res.code == 200) {
          this.$message.success('操作成功')
          this.getOrderList()
        } else {
          this.$message.error(res.msg)
        }
        this.replenishDialogVisible = false
      })
    },
    workOrderExport () {
      if (this.isTotalSchedule == '1') {
        console.log('总调度在查');
        window.location.href = 'https://jkywxt.fywasu.com/admin/maintenanceWorkOrderEntity/workOrderExport?userNumber=' + this.search.userNumber + '&repairContact=' + this.search.repairContact + '&repairContactNumber=' + this.search.repairContactNumber + '&repairCategory=' + this.search.repairCategory.toString() + '&repairTime=' + this.search.repairTime + '&createTime=' + this.search.createTime + '&departmentId=' + this.search.departmentId + '&maintenanceStaffId=' + this.search.maintenanceStaffId + '&workOrderStatus=' + this.search.workOrderStatus
      } else if (this.isDepartmentHeads == '1') {
        console.log('部门主管在查');
        this.search.departmentId = JSON.parse(localStorage.getItem('userInfo')).deptId
        window.location.href = 'https://jkywxt.fywasu.com/admin/maintenanceWorkOrderEntity/workOrderExport?userNumber=' + this.search.userNumber + '&repairContact=' + this.search.repairContact + '&repairContactNumber=' + this.search.repairContactNumber + '&repairCategory=' + this.search.repairCategory.toString() + '&repairTime=' + this.search.repairTime + '&createTime=' + this.search.createTime + '&departmentId=' + this.search.departmentId + '&maintenanceStaffId=' + this.search.maintenanceStaffId + '&workOrderStatus=' + this.search.workOrderStatus
      } else {
        console.log('运维人员在查待接单');
        this.search.departmentId = JSON.parse(localStorage.getItem('userInfo')).deptId
        this.search.maintenanceStaffId = JSON.parse(localStorage.getItem('userInfo')).id
        window.location.href = 'https://jkywxt.fywasu.com/admin/maintenanceWorkOrderEntity/workOrderExport?userNumber=' + this.search.userNumber + '&repairContact=' + this.search.repairContact + '&repairContactNumber=' + this.search.repairContactNumber + '&repairCategory=' + this.search.repairCategory.toString() + '&repairTime=' + this.search.repairTime + '&createTime=' + this.search.createTime + '&departmentId=' + this.search.departmentId + '&maintenanceStaffId=' + this.search.maintenanceStaffId + '&workOrderStatus=' + this.search.workOrderStatus
      }
    }
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
  // .el-button--text:nth-child(3) {
  //   color: #ec4040;
  // }
  .el-button--text:nth-child(3) {
    color: #ff9d0a;
  }
}
</style>
