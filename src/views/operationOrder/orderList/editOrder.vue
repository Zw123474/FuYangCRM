<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        编辑运维工单
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
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
              <!-- <el-input v-model="addBasicForm.userNumber" placeholder="用户编号" @change="getuserInfoList"></el-input> -->
              <el-select v-model="addBasicForm.userNumber" filterable placeholder="请选择用户编号" @change="getuserInfoList">
                <el-option v-for="(item,index) in oneToOneUserOptions" :key="index" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="addBasicForm.workOrderType== 'SPECIAL'">
            <el-form-item label="业务类型">
              <el-cascader v-model="addBasicForm.productLevel" :options="productOptions" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修类型">
              <!-- <el-input v-model="addBasicForm.repairCategory" placeholder="报修类型"></el-input> -->
              <el-cascader v-model="addBasicForm.repairCategory" :options="faultTreeOptions" :props="props"></el-cascader>
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
              <!-- <el-input v-model="addBasicForm.areaBelongs" placeholder="所属片区"></el-input> -->
              <el-select v-model="addBasicForm.areaBelongs" filterable placeholder="请选择所属片区">
                <el-option v-for="(item,index) in areaInfOption" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
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
        <div class="userTitle" v-if="addBasicForm.workOrderType== 'ROUTINE'">用户信息</div>
        <el-row :gutter="10" style="margin-bottom:20px" v-if="addBasicForm.workOrderType== 'ROUTINE'">
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
          <el-col :span="18">
            <el-form-item label="业务类型">
              <!-- <el-cascader v-model="infoTable.productLevel" :options="productOptions" :props="props" disabled></el-cascader> -->
              <el-input v-model="infoTable.productLevelNameStr" readonly></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="业务类型">
              <el-cascader v-model="infoTable.productLevel" :options="productOptions" :props="props" disabled></el-cascader>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="派发部门">
              <el-radio-group v-model="department">
                <el-radio label="1">默认派发</el-radio>
                <el-radio label="2">指定派发</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="department=='2'">
          <el-col :span="24">
            <el-form-item>
              <el-checkbox-group v-model="checkList">
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
    <!-- <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        运维人员补充字段
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="运维人员">
              <el-input v-model="responser.maintenanceStaffName" placeholder="运维人员"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="故障类型判定">
              <el-input v-model="addForm.faultTypeId" placeholder="故障类型判定"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代维单位">
              <el-input v-model="addForm.agentMaintainUnitId" placeholder="代维单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否调用工队">
              <el-select v-model="addForm.constructionTeam">
                <el-option label="是" value="YES"></el-option>
                <el-option label="否" value="NO">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:20px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="故障描述">
              <el-input type="textarea" placeholder="备注详情" v-model="addForm.faultCause">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card> -->
    <div class="submit">
      <!-- <el-button>重置</el-button> -->
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import website from '@/utils/website'
import multigraph from '@/components/multigraph'
export default {
  components: {
    multigraph
  },
  data () {
    return {
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
        repairSource: '',
        repairTime: '',
        areaBelongs: '',
        requireCompletionTime: '',
        faultLocation: '',
        faultDescription: '',
        distributeDepartmentAddFormList: []
      },
      department: '',
      productOptions: [],
      oneToOneUserOptions: [],
      fileList: [],
      typeOptions: [{ id: 1, label: '常规' }, { id: 2, label: '特殊' }],
      infoTable: {
        userName: '',
        productLevel: '',
        userAddress: '',
        contact: '',
        contactNumber: '',
        installationWorkOrderAddForms: {}
      },
      responser: {
        maintenanceStaffName: ''
      },
      addForm: {
        agentMaintainUnitId: '',
        constructionTeam: '',
        distributeMaintenanceStaffVoList: [],
        faultCause: '',
        faultTypeId: '',
        remark: ''
      },
      depList: [],
      checkList: [],
      areaInfOption: [],
      faultTreeOptions: [],
      annexList: [],
    }
  },
  mounted () {
    // console.log(this.checkList);

  },
  created () {
    this.id = this.$route.query.id
    this.getProductOptions()
    this.deptList()
    this.getOrderDetails()
    this.getareaInfOption()
    this.getfaultTreeOption()
    this.getUserOptions()
  },
  methods: {
    // 获取所属片区下拉框
    getareaInfOption () {
      this.$Apis.areaInfOption().then(res => {
        // this.faultTreeOptions = res.data
        this.areaInfOption = res.data

      })
    },
    // 获取故障类型下拉框
    getfaultTreeOption () {
      this.$Apis.faultTreeOption().then(res => {
        // this.faultTreeOptions = res.data
        let obj = res.data
        this.faultTreeOptions = this.deleteChildren(obj)
      })
    },
    // 获取一机一档用户信息编号下拉框
    getUserOptions () {
      this.$Apis.getUserOptions().then(res => {
        this.oneToOneUserOptions = res.data
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
        this.addBasicForm.repairCategory = this.addBasicForm.repairCategory.split(',').map(Number)
        this.addBasicForm.areaBelongs = this.addBasicForm.areaBelongs - 0
        if (this.addBasicForm.annex) {
          this.addBasicForm.annex = this.addBasicForm.annex.split(',')
        } else {
          this.addBasicForm.annex = []
        }
        // let data = JSON.parse(JSON.stringify(this.addBasicForm))
        // let img = data.annex.map(res => res.url ? res.url : res).join(',')
        // this.addBasicForm.annex = img
        // console.log(this.addBasicForm.distributeDepartmentVoList);
        this.addBasicForm.distributeDepartmentVoList.forEach(dep => {
          this.checkList.push(dep.departmentName)
        })
        this.department = this.checkList.length != 0 ? '2' : '1'
        // console.log(this.addBasicForm.annex);
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
    submit () {
      // console.log(this.checkList);
      this.addBasicForm.productLevel = this.addBasicForm.productLevel.toString()
      this.addBasicForm.repairCategory = this.addBasicForm.repairCategory.toString()
      if (this.department == '2') {
        this.addBasicForm.distributeDepartmentAddFormList = this.handleCheckList(this.checkList)
      } else {
        this.addBasicForm.distributeDepartmentAddFormList = []
      }
      // this.addBasicForm.annex = this.annexList.toString()
      // this.addSubmit()
      // let data = this.addBasicForm
      let data = JSON.parse(JSON.stringify(this.addBasicForm))
      let img = data.annex.map(res => res.url ? res.url : res).join(',')
      data.annex = img
      // console.log(data);
      this.$Apis.orderListSave(data).then(res => {
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.$router.push({ name: 'orderList' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // addSubmit(){
    //   this.addForm.distributeMaintenanceStaffVoList = this.addForm.distributeMaintenanceStaffVoList.push(this.responser)
    //   let data = this.addForm
    //   this.$Apis.addSubmit(data).then(res => {
    //     console.log(res);
    //   })
    // },
    handleRemove (file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview (file) {
      // console.log(file);
    },
    uploadHttp ({ file }) {
      const addData = new FormData()
      addData.append('file', file)
      addData.append('moduleName', 'crm')
      this.$Apis.uploadFile(addData).then(res => {
        // console.log(this.fileList);
        this.annexList.push(website.imgProxy + res.data)
        // this.addData.headUrl = website.imgProxy + res.data
        // console.log(res.data, 'res.data')
      })
    },
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
    margin: 20px 0;
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

