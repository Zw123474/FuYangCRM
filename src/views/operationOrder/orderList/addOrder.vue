<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        创建运维工单
      </div>
      <el-form ref="workOrderForm" :rules="workOrderRules" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="运维工单类型" prop="workOrderType">
              <el-select v-model="addBasicForm.workOrderType">
                <el-option label="常规" value="ROUTINE"></el-option>
                <el-option label="特殊" value="SPECIAL">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="addBasicForm.workOrderType== 'ROUTINE'">
            <el-form-item label="用户编号" prop="userNumber">
              <!-- <el-input v-model="addBasicForm.userNumber" placeholder="用户编号" @change="getuserInfoList"></el-input> -->
              <el-select v-model="addBasicForm.userNumber" filterable placeholder="请选择用户编号" @change="getuserInfoList">
                <el-option v-for="(item,index) in oneToOneUserOptions" :key="index" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="addBasicForm.workOrderType== 'SPECIAL'">
            <el-form-item label="业务类型" prop="productLevel">
              <el-cascader v-model="addBasicForm.productLevel" :options="productOptions" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修类型" prop="repairCategory">
              <!-- <el-input v-model="addBasicForm.repairCategory" placeholder="报修类型"></el-input> -->
              <el-cascader v-model="addBasicForm.repairCategory" :options="faultTreeOptions" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修地址" prop="repairAddress">
              <el-input v-model="addBasicForm.repairAddress" placeholder="报修地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修联系人" prop="repairContact">
              <el-input v-model="addBasicForm.repairContact" placeholder="报修联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修联系电话" prop="repairContactNumber">
              <el-input v-model="addBasicForm.repairContactNumber" placeholder="报修联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修来源" prop="repairSource">
              <el-input v-model="addBasicForm.repairSource" placeholder="报修来源"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修时间" prop="repairTime">
              <el-date-picker v-model="addBasicForm.repairTime" type="date" placeholder="报修时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属片区" prop="areaBelongs">
              <!-- <el-input v-model="addBasicForm.areaBelongs" placeholder="所属片区"></el-input> -->
              <el-select v-model="addBasicForm.areaBelongs" filterable placeholder="请选择所属片区">
                <el-option v-for="(item,index) in areaInfOption" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="要求完工时间" prop="requireCompletionTime">
              <el-date-picker v-model="addBasicForm.requireCompletionTime" type="date" placeholder="要求完工时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="addBasicForm.workOrderType== 'SPECIAL'">
            <el-form-item label="故障地点" prop="faultLocation">
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
          <el-col :span="6" v-if="infoTable.installationWorkOrderAddForms">
            <el-form-item label="安装单状态">
              <el-input v-model="infoTable.installationWorkOrderAddForms.workOrderFlow" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="业务类型">
              <!-- <el-cascader v-model="infoTable.productLevel" :options="productOptions" :props="props" disabled></el-cascader> -->
              <el-input v-model="infoTable.productLevelNameStr" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="派发部门">
              <el-radio-group v-model="addBasicForm.department">
                <el-radio label="1">默认派发</el-radio>
                <el-radio label="2">指定派发</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="addBasicForm.department=='2'">
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
            <!-- <upload :url.sync="addData.headUrl" :src="addData.headUrl" type="img"></upload> -->
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
    <div class="submit">
      <el-button @click="backOrder">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import website from '@/utils/website'
import multigraph from '@/components/multigraph'
export default {
  components: {
    multigraph
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    return {
      props: { value: 'id' },
      addBasicForm: {
        annex: [],
        workOrderType: 'ROUTINE',
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
        distributeDepartmentAddFormList: [],
        department: '1',
        workOrderFlow:''
      },
      productOptions: [],
      fileList: [],
      annexList: [],
      typeOptions: [{ id: 1, label: '常规' }, { id: 2, label: '特殊' }],
      infoTable: {
        userName: '',
        productLevel: '',
        userAddress: '',
        contact: '',
        contactNumber: '',
        installationWorkOrderAddForms: {
          workOrderFlow: ''
        }
      },
      depList: [],
      checkList: [],
      oneToOneUserOptions: [],
      faultTreeOptions: [],
      areaInfOption: [],
      workOrderRules: {
        repairContactNumber: [
          { required: true, message: '请输入报修联系电话', trigger: 'blur' },
          { validator: validateMobile, trigger: ['blur', 'change'] }
        ],
        workOrderType: [
          { required: true, message: '请选择运维工单类型', trigger: 'blur' }
        ],
        userNumber: [
          { required: true, message: '请选择用户编号', trigger: 'blur' }
        ],
        productLevel: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        repairCategory: [
          { required: true, message: '请选择报修类型', trigger: 'blur' }
        ],
        repairAddress: [
          { required: true, message: '请输入报修地址', trigger: 'blur' }
        ],
        repairContact: [
          { required: true, message: '请输入报修联系人', trigger: 'blur' }
        ],
        repairSource: [
          { required: true, message: '请输入报修来源', trigger: 'blur' }
        ],
        repairTime: [
          { required: true, message: '请选择报修时间', trigger: 'blur' }
        ],
        areaBelongs: [
          { required: true, message: '请输入所属片区', trigger: 'blur' }
        ],
        requireCompletionTime: [
          { required: true, message: '请选择要求完工时间', trigger: 'blur' }
        ],
        faultLocation: [
          { required: true, message: '请输入故障地点', trigger: 'blur' }
        ],
      },
      specialRules: {}
    }
  },
  created () {
    this.getProductOptions()
    this.deptList()
    this.getUserOptions()
    this.getfaultTreeOption()
    this.getareaInfOption()
  },
  methods: {
    // 获取所属片区下拉框
    getareaInfOption () {
      this.$Apis.areaInfOption().then(res => {
        this.areaInfOption = res.data

      })
    },
    // 获取故障类型下拉框
    getfaultTreeOption () {
      this.$Apis.faultTreeOption().then(res => {
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
        this.infoTable = res.data.list[0]
        this.infoTable.productLevel = this.infoTable.productLevel.split(',').map(Number)
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
      this.addBasicForm.productLevel = this.addBasicForm.productLevel.toString()
      this.addBasicForm.repairCategory = this.addBasicForm.repairCategory.toString()
      this.addBasicForm.distributeDepartmentAddFormList = this.handleCheckList(this.checkList)
      let data = JSON.parse(JSON.stringify(this.addBasicForm))
      let img = data.annex.map(res => res.url ? res.url : res).join(',')
      data.annex = img
      // console.log(data)
      if (this.addBasicForm.workOrderType == 'SPECIAL') {
        delete this.workOrderRules.userNumber
      }
      this.$refs.workOrderForm.validate((vaild) => {
        if (vaild) {
          this.$Apis.orderListSave(data).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功')
              this.$router.push({ name: 'orderList' })
            } else {
              this.$message.error(res.msg)
            }
          })
          // console.log(this.annexList.toString());
        } else {
          this.$message.error('请完成工单编辑')
        }
      })
    },
    handleRemove (file) {
      // console.log(file);
    },
    handlePreview (file) {
      // console.log(file);
    },
    handleAdd () {

    },
    backOrder () {
      this.$router.push({ name: 'orderList' })
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
  ::v-deep .el-input.is-disabled .el-input__inner {
    background-color: #fff;
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
  padding-left: 88%;
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

