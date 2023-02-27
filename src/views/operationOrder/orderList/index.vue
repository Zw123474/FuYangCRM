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
        运维工单列表
        <!-- <el-button plain type="primary" size="medium"><img src="@/assets/common/excel.png" alt="" /> 导出搜索结果</el-button> -->
        <el-button type="primary" size="medium" @click="handleAdd" v-if="isTotalSchedule=='1'">
          <img src="@/assets/common/add.png" alt="" />
          创建运维工单
        </el-button>
        <el-button plain type="primary" size="medium" @click="workOrderExport"><img src="@/assets/common/excel.png" alt="">导出搜索结果</el-button>
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
        <el-table-column prop="workOrderCode" label="运维工单编号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="userNumber" label="用户编号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="workOrderStatus" label="工单状态" min-width="200" align="center" :formatter="formatter">
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
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkDetails(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row, 1)" v-show="scope.row.workOrderStatus == 'PENDING_ORDER' ||scope.row.workOrderStatus== 'RETURN'" v-if="isTotalSchedule == '1'">编辑</el-button>
            <el-button type="text" size="small" v-show="scope.row.workOrderStatus == 'PENDING_ORDER'" @click="handleReturn(scope.row)" v-if="isTotalSchedule == '-1' && isDepartmentHeads == '1'">退回</el-button>
            <el-button type="text" size="small" v-show="scope.row.workOrderStatus == 'PENDING_ORDER'" @click="handleAssign(scope.row)" v-if="isTotalSchedule == '-1' && isDepartmentHeads == '1'">指定派发</el-button>
            <el-button type="text" size="small" v-show="scope.row.workOrderStatus == 'PROCESSING'|| scope.row.workOrderStatus== 'TURN_DOWN'" @click="handleAddSome(scope.row)" v-if="isOperator == '1' || (isDepartmentHeads == '1' && isDepartmentShow(scope.row))">处理结单</el-button>
            <!-- <el-button type="text" size="small" v-show="scope.row.workOrderStatus == 'PROCESSING'|| scope.row.workOrderStatus== 'TURN_DOWN'" @click="completePending(scope.row)" v-if="isOperator == '1'">处理完成</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 部门主管退回对话框 -->
    <el-dialog title="退回" :visible.sync="returnDialogVisible" center width="40%">
      <el-form ref="form" :model="addForm" label-width="100px" label-position="top">
        <el-row>
          <el-col :span="24">
            <el-form-item label="退回原因">
              <el-input type="textarea" placeholder="退回原因" v-model="addForm.returnReason" maxlength="300" show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="returnDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitReturn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 部门主管指派运维人员接单 -->
    <el-dialog title="指定派发" :visible.sync="assignDialogVisible" center width="40%">
      <el-form ref="form" :model="addForm" label-width="100px" label-position="top">
        <el-row>
          <el-col :span="24">
            <el-select v-model="checkbox" placeholder="请选择" multiple>
              <el-option v-for="(op,index3) in operator" :key="index3" :label="op.name" :value="op.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="returnDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAssign">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 运维人员补充字段 -->
    <el-dialog title="运维人员补充字段" :visible.sync="replenishDialogVisible" center width="50%" top="5vh">
      <el-form ref="form" :model="addForm" label-width="120px" label-position="left">
        <el-row>
          <el-col :span="24">
            <el-form-item label="运维人员" v-for="(operator,index4) in operatorList" :key="index4">
              <el-input v-model="operator.maintenanceStaffName" readonly></el-input>
            </el-form-item>
            <el-form-item label="添加运维人员">
              <!-- <el-input v-model="operatoeradd.distributeMaintenanceStaffVoList[1].maintenanceStaffName"></el-input> -->
              <el-select v-model="list" multiple placeholder="请选择运维人员">
                <el-option v-for="(ope,iddex) in operator" :key="iddex" :label="ope.name" :value="ope.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障原因">
              <el-input v-model="operatoeradd.faultCause" placeholder="请输入故障原因"></el-input>
            </el-form-item>
            <el-form-item label="故障类型判定">
              <!-- <el-input v-model="operatoeradd.faultTypeId"></el-input> -->
              <el-cascader v-model="operatoeradd.faultTypeId" :options="faultTreeOptions" :props="props" placeholder="请选择故障类型"></el-cascader>
            </el-form-item>
            <el-form-item label="修复状态">
              <el-select v-model="operatoeradd.repairStatus" placeholder="请选择修复状态">
                <el-option label="未修复" value="NOT_REPAIRED"></el-option>
                <el-option label="已修复" value="ALREADY_FIXED"></el-option>
                <el-option label="无法修复" value="CAN_NOT_FIX"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否调用施工队">
              <el-select v-model="operatoeradd.constructionTeam" placeholder="是否调用施工队">
                <el-option label="是" value="YES"></el-option>
                <el-option label="否" value="NO"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="代维单位">
              <el-select v-model="operatoeradd.agentMaintainUnitId" placeholder="请选择代维单位">
                <el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="operatoeradd.remark" type="textarea" maxlength="300" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <template v-for="(cost,index5) in costForm">
            <el-col :span="10" :key="index5 + 100">
              <el-form-item label="耗材名称" label-width="70px">
                <!-- <el-input v-model="cost.consumablesName" placeholder="输入耗材名称"></el-input> -->
                <el-autocomplete v-model="cost.consumablesName" :fetch-suggestions="querySearch" placeholder="输入耗材名称"></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="10" :key="index5 + 1000">
              <el-form-item label="耗材数量" label-width="70px">
                <el-input type="number" v-model="cost.consumablesQuantity" placeholder="输入耗材数量"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" :key="index5 + 10000">
              <el-form-item label-width="0px">
                <el-button size="medium" type="primary" @click="deleteCost(index5)">删除</el-button>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCost">新增耗材</el-button>
        <el-button @click="replenishDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitReplenish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      costForm: [],
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
        distributeMaintenanceStaffVoList: [],
        maintenanceConsumablesVoList: []
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
        isTransferOrder: 0,
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
      agentList: [],
      materails: [],
      isEmpty: false
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
    // 获取耗材名称下拉框
    this.getConsumablesOption()
  },
  methods: {
    isDepartmentShow (row) {
      // return true
      return row.distributeMaintenanceStaffVoList.some(e => {
        // console.log(e);
        // console.log(e.maintenanceStaffId == JSON.parse(localStorage.getItem('userInfo')).id);
        // if(e.maintenanceStaffId == JSON.parse(localStorage.getItem('userInfo')).id) return true
        return e.maintenanceStaffId == JSON.parse(localStorage.getItem('userInfo')).id
      })
    },
    // 输入框下拉搜索选择组件自带方法
    querySearch (queryString, cb) {
      console.log(queryString);
      console.log(cb);
      var materails = this.materails;
      var results = queryString ? materails.filter(this.createFilter(queryString)) : materails;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (materails) => {
        return (materails.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // 获取耗材名称下拉框
    getConsumablesOption () {
      this.$Apis.consumablesOption().then(res => {
        if (res.code == 200) {
          res.data.forEach(e => {
            this.materails.push({ value: e.name, id: e.id })
          })
        }
      })
    },
    // 前端交互，点击按钮，新增耗材名称和数量输入框
    addCost () {
      this.costForm.push({ consumablesName: '', consumablesQuantity: '' })
    },
    deleteCost (index) {
      this.costForm.splice(index, 1)
    },
    // 获取代维单位下拉框
    getAgentOptions () {
      this.$Apis.agentOption().then(res => {
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
      this.operatoeradd.agentMaintainUnitId = row.agentMaintainUnitId.toString()
      this.operatoeradd.repairStatus = row.repairStatus
      if (row.maintenanceConsumablesVoList.length > 0) {
        this.costForm = row.maintenanceConsumablesVoList
      } else {
        this.costForm = []
      }
      // console.log(this.operatoeradd.faultTypeId);
      this.list = []
      // console.log(this.operatorList);
    },
    submitReplenish () {
      this.operator.forEach(e => {
        this.list.forEach(ope => {
          if (ope == e.id) {
            this.arr.push({ maintenanceStaffName: e.name, maintenanceStaffId: e.id })
          }
        })
      })
      this.costForm.forEach(e => {
        if (e.consumablesName == '' || e.consumablesQuantity == '') {
          this.isEmpty = true
        } else {
          this.isEmpty = false
        }
      })
      if (this.isEmpty) {
        this.$message.warning('不可添加空的耗材名称或数量')
        return
      }
      this.operatoeradd.maintenanceConsumablesVoList = this.costForm
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
  .el-button--text:nth-child(4) {
    color: #34a47e;
  }
}
</style>
