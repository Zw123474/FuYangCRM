<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        {{mode == 'a' ? '查看用户信息' : mode == 'b' ? '创建用户信息' : '编辑用户信息'}}
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账户名称">
              <el-input v-model="addBasicForm.accountName" placeholder="账户名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户编号">
              <el-input v-model="addBasicForm.accountNumber" placeholder="账户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户编号">
              <el-input v-model="addBasicForm.customerNumber" placeholder="客户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNumber" placeholder="用户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userName" placeholder="用户名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品层级">
              <el-cascader v-model="addBasicForm.productLevel" :options="productOptions" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="联系人">
              <el-input v-model="addBasicForm.contact" placeholder="联系人" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户地址">
              <el-input v-model="addBasicForm.userAddress" placeholder="用户地址" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="移动电话">
              <el-input v-model="addBasicForm.mobilePhone" placeholder="移动电话" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订购开始时间">
              <el-date-picker v-model="addBasicForm.orderStartTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订购结束时间">
              <el-date-picker v-model="addBasicForm.orderEndTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="发展雇员">
              <el-input v-model="addBasicForm.developEmployees" placeholder="发展雇员" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 详细信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        详细信息
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="促销">
              <el-input v-model="addBasicForm.promotion" placeholder="促销" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="资信等级">
              <el-input v-model="addBasicForm.creditRating" placeholder="资信等级" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="联系电话">
              <el-input v-model="addBasicForm.contactNumber" placeholder="联系电话" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="传真号码">
              <el-input v-model="addBasicForm.faxNumber" placeholder="传真号码" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="邮箱">
              <el-input v-model="addBasicForm.mail" placeholder="邮箱" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="VPN名称">
              <el-input v-model="addBasicForm.vpnName" placeholder="VPN名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户状态">
              <!-- <el-select v-model="addBasicForm.userStatus" placeholder="用户状态">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select> -->
              <el-input v-model="addBasicForm.userStatus" placeholder="用户状态" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="销售员">
              <el-input v-model="addBasicForm.seller" placeholder="销售员" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户开始时间">
              <el-date-picker v-model="addBasicForm.accountStartTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户开通时间">
              <el-date-picker v-model="addBasicForm.accountOpeningTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户完工时间">
              <el-date-picker v-model="addBasicForm.userCompletionTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="10">
          <el-col :span="6">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary" style="margin:20px 0">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">支持jpg/png文件，文件大小不超过500KB</div>
            </el-upload>
          </el-col>
        </el-row> -->
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        安装工单信息
      </div>
      <el-form ref="form" :model="installationWorkOrderAddForms" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="installationWorkOrderAddForms.userName" placeholder="用户名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="工单实际编号">
              <el-input v-model="installationWorkOrderAddForms.ticketInstanceNumber" placeholder="工单实际编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="installationWorkOrderAddForms.userNumber" placeholder="用户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="项目型名称">
              <el-input v-model="installationWorkOrderAddForms.itemName" placeholder="项目型名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="项目型编号">
              <el-input v-model="installationWorkOrderAddForms.itemNumber" placeholder="项目型编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品层级">
              <el-cascader v-model="installationWorkOrderAddForms.productLevel" :options="productOptions" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="地址">
              <el-input v-model="installationWorkOrderAddForms.address" placeholder="地址" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="受理类型">
              <el-input v-model="installationWorkOrderAddForms.acceptanceType" placeholder="受理类型" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="要求完工日期">
              <el-date-picker v-model="installationWorkOrderAddForms.requiredCompletionDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="实际完工时间">
              <el-date-picker v-model="installationWorkOrderAddForms.actualCompletionDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="工单流转情况">
              <el-input v-model="installationWorkOrderAddForms.workOrderFlow" placeholder="工单流转情况" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:10px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="其他备注">
              <el-input type="textarea" placeholder="请输入其他备注说明，在300字以内" v-model="installationWorkOrderAddForms.otherRemarks" :readonly="mode === 'a'">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 判断如果模式为新增，一机一档模块框只显示用户编号一个输入框，将获取到的值放到请求参数中 -->
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px" v-if="mode == 'b'">
      <div slot="header">
        一机一档信息
      </div>
      <el-form ref="form" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="用户编号" :model="onlyOneForm">
              <el-input v-model="onlyOneForm.userNumber" placeholder="用户编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px" v-else>
      <div slot="header">
        一机一档信息
      </div>
      <el-form ref="form" label-width="100px" label-position="top">
        <el-row :gutter="20" v-for="(item,index) in machineFileAddForms" :key="index">
          <el-col :span="4" v-if="item.userNumber">
            <el-form-item label="用户编号">
              <el-input v-model="item.userNumber" placeholder="用户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="item.attributeName">
              <el-input v-model="item.attributeValue" :placeholder="item.attributeName" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px" v-show="mode !== 'a'">
      <div slot="header">
        更多属性
        <el-button type="primary" size="medium" @click="handleAdd">
          <img src="@/assets/common/add.png" alt="">
          新增属性
        </el-button>
      </div>
      <el-form label-width="100px" label-position="top">
        <el-row :gutter="20">
          <template v-for="it in addForm">
            <el-col :span="4" :key="it.id">
              <el-form-item label="属性名称">
                <el-input v-model="it.attributeName" placeholder="属性名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" :key="it.id">
              <el-form-item label="属性值">
                <el-input v-model="it.attributeValue" placeholder="属性值"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" :key="it.id">
              <el-form-item label="操作">
                <el-button size="medium" type="primary" @click="handleDel">删除</el-button>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </el-card>
    <div class="submit" v-show="mode !== 'a'">
      <el-button>重置</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
//    ！a : 详情 ；  b : 新增 ；  c ： 编辑   很重要！！！
export default {
  data () {
    return {
      addBasicForm: {
        accountName: '',
        accountNumber: '',
        customerNumber: '',
        userNumber: '',
        userName: '',
        productLevel: '',
        contact: '',
        userAddress: '',
        mobilePhone: '',
        orderStartTime: '',
        orderEndTime: '',
        developEmployees: '',
        promotion: '',
        creditRating: '',
        contactNumber: '',
        faxNumber: '',
        mail: '',
        vpnName: '',
        userStatus: '',
        seller: '',
        accountStartTime: '',
        accountOpeningTime: '',
        userCompletionTime: '',
        installationWorkOrderAddForms: {},
        machineFileAddForms: []
      },
      props: { value: 'id' },
      productOptions: [],
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      mode: '',
      installationWorkOrderAddForms: {
        userName: '',
        ticketInstanceNumber: '',
        userNumber: '',
        itemName: '',
        itemNumber: '',
        productLevel: '',
        address: '',
        acceptanceType: '',
        requiredCompletionDate: '',
        actualCompletionDate: '',
        workOrderFlow: '',
        otherRemarks: '',
      },
      machineFileAddForms: [],
      id: null,
      addForm: [],
      onlyOneForm: {
        userNumber: ''
      }
    }
  },
  created () {
    this.getProductOptions()
    this.mode = this.$route.query.mode
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    // 判断如果模式不是b,为a和c的情况下，走请求详情的接口
    if (this.mode !== 'b') {
      this.getUserInfoDetails()
    }
  },
  methods: {
    getUserInfoDetails () {
      let data = {
        id: this.id
      }
      this.$Apis.userInfoDetails(data).then(res => {
        console.log(res);
        this.addBasicForm = res.data
        this.addBasicForm.productLevel = this.addBasicForm.productLevel.split(',').map(Number)
        console.log(this.addBasicForm.productLevel);
        if (res.data.installationWorkOrderAddForms) {
          this.installationWorkOrderAddForms = res.data.installationWorkOrderAddForms
          this.installationWorkOrderAddForms.productLevel = this.installationWorkOrderAddForms.productLevel.split(',').map(Number)
        }
        if (res.data.machineFileAddForms) {
          this.machineFileAddForms = res.data.machineFileAddForms
        }
      })
    },
    submit () {
      console.log(this.addBasicForm.productLevel);
      this.addBasicForm.productLevel = this.addBasicForm.productLevel.toString()
      this.installationWorkOrderAddForms.productLevel = this.installationWorkOrderAddForms.productLevel.toString()
      // 判断如果模式为b,即新增，则走新增接口提交表单
      if (this.mode == 'b') {
        this.addBasicForm.installationWorkOrderAddForms = this.installationWorkOrderAddForms
        if (this.addForm[0]) {
          this.addForm[0] = { ...this.addForm[0], ...this.onlyOneForm }
        }
        this.addBasicForm.machineFileAddForms = this.addForm
        let data = this.addBasicForm
        this.$Apis.userInfoSave(data).then(res => {
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.$router.push({ name: 'usersList' })
          }else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.mode == 'c') {
        this.addBasicForm.installationWorkOrderAddForms = this.installationWorkOrderAddForms
        if (this.addForm[0]) {
          this.addForm[0] = { ...this.addForm[0], ...this.onlyOneForm }
        }
        this.addBasicForm.machineFileAddForms = this.addForm
        let data = this.addBasicForm
        this.$Apis.userInfoEdit(data).then(res => {
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.$router.push({ name: 'usersList' })
          }else {
            this.$message.error(res.msg)
          }
        })
      }
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
    // handleRemove (file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview (file) {
    //   console.log(file);
    // },
    handleAdd () {
      this.addForm.push({ attributeName: '', attributeValue: '' })
    },
    handleDel () {
      this.addForm.splice(this.addForm.length - 1, 1)
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
    padding: 20px 0;
    margin: 0 35px;
    border-bottom: 1px solid #ebeef5;
  }
  ::v-deep .el-input__inner,
  ::v-deep .el-textarea__inner {
    border: 1px solid #9fbcfe;
  }
  ::v-deep .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
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

