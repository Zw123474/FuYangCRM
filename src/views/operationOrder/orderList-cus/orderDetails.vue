<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        查看运维工单
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top" disabled>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="运维工单类型">
              <el-select v-model="addBasicForm.workOrderType">
                <el-option label="常规" value="ROUTINE"></el-option>
                <el-option label="特殊" value="SPECIAL">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNumber" placeholder="用户编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运维工单编号">
              <el-input v-model="addBasicForm.workOrderCode" placeholder="运维工单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务类型">
              <el-input v-model="addBasicForm.productLevelNameStr" placeholder="业务类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修类型">
              <el-input v-model="addBasicForm.repairCategoryName" placeholder="报修类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修地址">
              <el-input v-model="addBasicForm.repairAddress" placeholder="报修地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修联系人">
              <el-input v-model="addBasicForm.repairContact" placeholder="报修联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修联系电话">
              <el-input v-model="addBasicForm.repairContactNumber" placeholder="报修联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修来源">
              <el-input v-model="addBasicForm.repairSource" placeholder="报修来源"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修时间">
              <el-date-picker v-model="addBasicForm.repairTime" type="date" placeholder="报修时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属片区">
              <el-input v-model="addBasicForm.areaBelongsName" placeholder="所属片区"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="要求完工时间">
              <el-date-picker v-model="addBasicForm.requireCompletionTime" type="date" placeholder="要求完工时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="addBasicForm.workOrderType== 'SPECIAL'">
            <el-form-item label="故障地点">
              <el-input v-model="addBasicForm.faultLocation" placeholder="故障地点"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="userTitle">用户信息</div>
        <el-row :gutter="10" style="margin-bottom:20px">
          <el-col :span="6">
            <el-form-item label="用户名称">
              <el-input v-model="infoTable.userName" placeholder="用户名称" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户地址">
              <el-input v-model="infoTable.userAddress" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="VPN名称">
              <el-input v-model="infoTable.vpnName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户联系人">
              <el-input v-model="infoTable.contact" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="infoTable.contactNumber" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="移动电话">
              <el-input v-model="infoTable.mobilePhone" readonly></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="业务类型">
              <el-cascader v-model="infoTable.productLevel" :options="productOptions" :props="props" disabled></el-cascader>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="10" v-if="addBasicForm.workOrderType== 'SPECIAL'">
          <el-col :span="12">
            <el-form-item label="派发部门">
              <!-- <el-radio-group v-model="addBasicForm.department">
                <el-radio label="1">默认派发</el-radio>
                <el-radio label="2">指定派发</el-radio>
              </el-radio-group> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="addBasicForm.workOrderType== 'SPECIAL' && addBasicForm.distributeDepartmentVoList !== []">
          <el-col :span="24">
            <el-form-item>
              <el-checkbox-group v-model="showDept">
                <el-checkbox v-for="dept in depList" :key="dept.id" :label="dept.name"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:20px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="故障描述">
              <el-input type="textarea" placeholder="请输入其他备注说明，在300字以内" v-model="addBasicForm.faultDescription" maxlength="300" show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        运维人员补充字段
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20" v-for="responser in addBasicForm.distributeMaintenanceStaffVoList" :key="responser.id">
          <el-col :span="6">
            <el-form-item label="运维人员">
              <el-input v-model="responser.maintenanceStaffName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="故障原因">
              <el-input v-model="addBasicForm.faultCause" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="故障类型判定">
              <el-input v-model="addBasicForm.faultTypeId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代维单位">
              <el-input v-model="addBasicForm.agentMaintainUnitId" placeholder="agentMaintainUnitId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否调用工队">
              <el-input v-model="addBasicForm.constructionTeam" disabled :formatter="formatter1"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="运维工单状态">
              <el-select v-model="addBasicForm.workOrderStatus" placeholder="运维工单状态" disabled>
                <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:20px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="故障描述">
              <el-input type="textarea" placeholder="备注详情" v-model="addBasicForm.faultDescription" disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="submit">
      <el-button size="medium" @click="backOrder">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      props: { value: 'id' },
      addBasicForm: {
        workOrderType: '',
        workOrderCode: '',
        userNumber: '',
        productLevel: '',
        repairCategory: '',
        repairAddress: '',
        repairContact: '',
        repairContactNumber: '',
        userName: '',
        repairSource: '',
        repairTime: '',
        areaBelongs: '',
        requireCompletionTime: '',
        faultLocation: '',
        faultDescription: '',
        distributeDepartmentVoList: [],
        returnRecordVoList: [],
        turnDownRecordVoList: [],
        distributeMaintenanceStaffVoList: [{}]
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
      showDept: [],
      productOptions: [],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      typeOptions: [{ id: 1, label: '常规' }, { id: 2, label: '特殊' }],
      infoTable: {
        userName: '',
        productLevel: '',
        userAddress: '',
        contact: '',
        contactNumber: '',
      },
      depList: [],
      checkList: [],
      type: '',
      addBasicForm: {
        department: '',
        type: ''
      },
      id: '',
      options: [{ id: 1, label: '产品1' }, { id: 2, label: '产品2' }],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      typeOptions: [{ id: 1, label: '常规' }, { id: 2, label: '特殊' }],
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOrderDetails()
  },
  methods: {
    getOrderDetails () {
      let data = {
        id: this.id
      }
      this.$Apis.orderListDetails(data).then(res => {
        // console.log(res);
        this.addBasicForm = res.data
        this.addBasicForm.productLevel = this.addBasicForm.productLevel.split(',').map(Number)
        this.getuserInfoList()
        this.deptList()
      })
    },
    handleCheckList (arr) {
      let dept = []
      this.depList.map(ele => {
        arr.map(item => {
          if (ele.name == item) {
            return dept.push({ departmentId: ele.id, departmentName: ele.name })
          }
        })
      })
      return dept
    },
    deptList () {
      let data = {
        current: 1,
        size: 50,
      }
      this.$Apis.deptList(data).then(res => {
        // console.log(res);
        this.depList = res.data.list
        // console.log(this.addBasicForm.distributeDepartmentVoList);
        this.addBasicForm.distributeDepartmentVoList.forEach(element => {
          this.showDept.push(element.departmentName)
        });
      })
    },
    getuserInfoList () {
      let data = {
        userNumber: this.addBasicForm.userNumber,
      }
      this.$Apis.userInfoList(data).then(res => {
        // console.log(res.data);
        if (res.data.list[0]) {
          this.infoTable = res.data.list[0]
          this.infoTable.productLevel = this.infoTable.productLevel.split(',').map(Number)
        }
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
        // console.log(res);
        let obj = res.data
        this.productOptions = this.deleteChildren(obj)
      })
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview (file) {
      // console.log(file);
    },
    handleAdd () {

    },
    backOrder () {
      this.$router.push({ name: 'orderList-cus' })
    },
    formatter1 (value) {
      return value == 'YES' ? '是' : '否'
    }
  }
}
</script>

<style lang="scss" scoped>
.tableCard {
  margin-bottom: 30px;
  border-radius: 20px;
  ::v-deep .el-card__header {
    font-size: 24px;
    .el-button {
      font-size: 16px;
      float: right;
    }
  }
  ::v-deep .el-card__header,
  el-card__body {
    padding: 20px 0;
    margin: 0 35px;
    border-bottom: 1px solid #ebeef5;
  }
  ::v-deep .el-input__inner,
  ::v-deep .el-textarea__inner {
    border: 1px solid #9fbcfe;
  }
  .userTitle {
    margin: 20px 5px;
    font-size: 20px;
    color: #246ee7;
    font-weight: 700;
  }
  ::v-deep .el-form-item__label {
    font-size: 16px;
  }
  ::v-deep .el-card__body {
    margin: 0 35px;
    padding: 30px 0;
  }
}
::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409eff;
}
.submit {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  padding-left: 92%;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

