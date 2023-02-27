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
          <el-col :span="6" v-if="addBasicForm.workOrderType== 'ROUTINE'">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNumber" placeholder="用户编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="addBasicForm.workOrderType== 'SPECIAL'">
            <el-form-item label="业务类型">
              <el-input v-model="addBasicForm.productLevelNameStr" placeholder="业务类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运维工单编号">
              <el-input v-model="addBasicForm.workOrderCode" placeholder="运维工单编号"></el-input>
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
          <el-col :span="6">
            <el-form-item label="安装单状态" v-if="infoTable.installationWorkOrderAddForms">
              <el-input v-model="infoTable.installationWorkOrderAddForms.workOrderFlow" readonly></el-input>
            </el-form-item>
            <el-form-item label="安装单状态" v-else>
              <el-input v-model="addBasicForm.workOrderFlow" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经纬度">
              <el-input v-model="infoTable.latitudeLongitude" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="业务类型">
              <!-- <el-cascader v-model="infoTable.productLevel" :options="productOptions" :props="props" disabled></el-cascader> -->
              <el-input v-model="infoTable.productLevelNameStr" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="点位照片">
              <multigraph disabled class="disabledplus" :url.sync="infoTable.imageUrl" :src="infoTable.imageUrl" :many="3"></multigraph>
              <div class="emptyImg" v-if="infoTable.imageUrl.length == 0">暂无照片信息~</div>
            </el-form-item>
          </el-col>
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
        <div class="userTitle">附件</div>
        <el-row :gutter="10">
          <el-col :span="24">
            <!-- <el-upload class="upload-demo" :http-request="uploadHttp" action="name" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary" style="margin:20px 0">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">支持jpg/png文件，文件大小不超过500KB</div>
            </el-upload> -->
            <multigraph :url.sync="addBasicForm.annex" :src="addBasicForm.annex" :many="30"></multigraph>
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
        <el-row :gutter="20">
          <el-col :span="6" v-for="responser in addBasicForm.distributeMaintenanceStaffVoList" :key="responser.id">
            <el-form-item label="运维人员">
              <el-input v-model="responser.maintenanceStaffName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="故障原因">
              <el-input v-model="addBasicForm.faultCause" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="故障类型判定">
              <el-input v-model="addBasicForm.faultTypeName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代维单位">
              <el-input v-model="addBasicForm.agentMaintainUnitId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否调用工队">
              <el-input v-model="addBasicForm.constructionTeam" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-for="cost in addBasicForm.maintenanceConsumablesVoList" :key="cost.id">
            <el-form-item :label="cost.consumablesName + '耗材数量'">
              <el-input v-model="cost.consumablesQuantity" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="addBasicForm.maintenanceConsumablesVoList.length == 0">
            <el-form-item label="使用材料">
              <el-input v-model="consumable" disabled></el-input>
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
              <el-input type="textarea" v-model="addBasicForm.faultDescription" disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        结单反驳记录
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top" v-for="turnItem in addBasicForm.turnDownRecordVoList" :key="turnItem.id">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="驳回操作人">
              <el-input v-model="turnItem.operatorName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:20px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="结单反驳原因">
              <el-input type="textarea" v-model="turnItem.turnDownReason" disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        运维单退回记录
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top" v-for="returnItem in addBasicForm.returnRecordVoList" :key="returnItem.id">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="退回操作人">
              <el-input v-model="returnItem.operatorName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:20px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="退回原因">
              <el-input type="textarea" v-model="returnItem.returnReason" disabled>
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
import multigraph from '@/components/multigraph'
export default {
  components: {
    multigraph
  },
  data () {
    return {
      consumable: '未使用材料',
      props: { value: 'id' },
      addBasicForm: {
        annex: [],
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
        distributeMaintenanceStaffVoList: [],
        agentMaintainUnitId: '',
        constructionTeam: '',
        maintenanceConsumablesVoList: []
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
      showDept: [],
      productOptions: [],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      typeOptions: [{ id: 1, label: '常规' }, { id: 2, label: '特殊' }],
      infoTable: {
        userName: '',
        latitudeLongitude: '',
        imageUrl: [],
        productLevel: '',
        userAddress: '',
        contact: '',
        contactNumber: '',
        installationWorkOrderAddForms: {}
      },
      depList: [],
      checkList: [],
      type: '',
      id: '',
      options: [{ id: 1, label: '产品1' }, { id: 2, label: '产品2' }],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      typeOptions: [{ id: 1, label: '常规' }, { id: 2, label: '特殊' }],
      agentList: []
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOrderDetails()
    // this.getAgentOptions()
  },
  methods: {
    // 获取代维单位下拉框
    getAgentOptions () {
      this.$Apis.agentOption().then(res => {
        // console.log(res);
        this.agentList = JSON.parse(JSON.stringify(res.data))
        // console.log(this.agentList[0].id);
        // console.log(this.addBasicForm.agentMaintainUnitId);
        this.agentList.map(e => {
          if (this.addBasicForm.agentMaintainUnitId == e.id) {
            this.addBasicForm.agentMaintainUnitId = e.name
          }
        })
      })
    },
    getOrderDetails () {
      let data = {
        id: this.id
      }
      this.$Apis.orderListDetails(data).then(res => {
        // console.log(res);
        this.addBasicForm = res.data
        this.addBasicForm.productLevel = this.addBasicForm.productLevel.split(',').map(Number)
        if (this.addBasicForm.annex) {
          this.addBasicForm.annex = this.addBasicForm.annex.split(',')
        } else {
          this.addBasicForm.annex = []
        }
        if (this.addBasicForm.constructionTeam !== '') {
          this.addBasicForm.constructionTeam = this.addBasicForm.constructionTeam == 'YES' ? '是' : '否'
        }
        // if(this.addBasicForm.maintenanceConsumablesVoList){

        // }
        this.getAgentOptions()
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
          if (this.infoTable.imageUrl) {
            this.infoTable.imageUrl = this.infoTable.imageUrl.split(',')
          } else {
            this.infoTable.imageUrl = []
          }
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
      this.$router.push({ name: 'orderList' })
    },
    formatter1 (value) {
      return value == 'YES' ? '是' : '否'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-upload--picture-card {
  display: none;
}
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

