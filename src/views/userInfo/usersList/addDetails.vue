<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        {{mode == 'a' ? '查看用户信息' : mode == 'b' ? '创建用户信息' : '编辑用户信息'}}
      </div>
      <el-form ref="addForm" :model="addBasicForm" label-width="100px" label-position="top" :rules="addFormRules">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="账户名称" prop="accountName">
              <el-input v-model="addBasicForm.accountName" placeholder="账户名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账户编号" prop="accountNumber">
              <el-input v-model="addBasicForm.accountNumber" placeholder="账户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户编号" prop="customerNumber">
              <el-input v-model="addBasicForm.customerNumber" placeholder="客户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户编号" prop="userNumber">
              <el-input v-model="addBasicForm.userNumber" placeholder="用户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="addBasicForm.userName" placeholder="用户名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18" v-if="mode === 'a'">
            <el-form-item label="业务类型">
              <el-input v-model="addBasicForm.productLevelNameStr" placeholder="业务类型" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18" v-else>
            <el-form-item label="业务类型" prop="productLevel">
              <el-cascader v-model="addBasicForm.productLevel" :options="productOptions" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="addBasicForm.contact" placeholder="联系人" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户地址" prop="userAddress">
              <el-input v-model="addBasicForm.userAddress" placeholder="用户地址" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="移动电话" prop="mobilePhone">
              <el-input v-model="addBasicForm.mobilePhone" placeholder="移动电话" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订购开始时间" prop="orderStartTime">
              <el-date-picker v-model="addBasicForm.orderStartTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订购结束时间" prop="orderEndTime">
              <el-date-picker v-model="addBasicForm.orderEndTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发展雇员" prop="developEmployees">
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
      <el-form ref="detailsForm" :model="addBasicForm" label-width="100px" label-position="top" :rules="detailsFormRules">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="促销">
              <el-input v-model="addBasicForm.promotion" placeholder="促销" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资信等级" prop="creditRating">
              <el-input v-model="addBasicForm.creditRating" placeholder="资信等级" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="addBasicForm.contactNumber" placeholder="联系电话" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="传真号码">
              <el-input v-model="addBasicForm.faxNumber" placeholder="传真号码" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱">
              <el-input v-model="addBasicForm.mail" placeholder="邮箱" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="VPN名称">
              <el-input v-model="addBasicForm.vpnName" placeholder="VPN名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="mode === 'a'">
            <el-form-item label="用户状态">
              <el-input v-model="addBasicForm.userStatus" placeholder="用户状态" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-else>
            <el-form-item label="用户状态">
              <el-select v-model="addBasicForm.userStatus" placeholder="用户状态">
                <el-option v-for="item in userStatusOptions" :key="item.id" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售员">
              <el-input v-model="addBasicForm.seller" placeholder="销售员" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账户开始时间">
              <el-date-picker v-model="addBasicForm.accountStartTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账户开通时间">
              <el-date-picker v-model="addBasicForm.accountOpeningTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户完工时间">
              <el-date-picker v-model="addBasicForm.userCompletionTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经纬度">
              <el-input v-model="addBasicForm.latitudeLongitude" placeholder="经纬度" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary" style="margin:20px 0">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">支持jpg/png文件，文件大小不超过500KB</div>
            </el-upload> -->
            <el-form label-width="100px" label-position="top" :disabled="mode === 'a'">
              <el-form-item label="点位照片">
                <multigraph :disabled="mode === 'a'" :class="mode === 'a' ? 'disabledplus' : ''" :url.sync="addBasicForm.imageUrl" :src="addBasicForm.imageUrl" :many="3"></multigraph>
                <div class="emptyImg" v-if="mode === 'a' && addBasicForm.imageUrl.length == 0">暂无照片信息~</div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px" id="miao">
      <div slot="header">
        安装工单信息
      </div>
      <el-form ref="form" :model="installationWorkOrderAddForms" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户名称">
              <el-input v-model="installationWorkOrderAddForms.userName" placeholder="用户名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工单实际编号">
              <el-input v-model="installationWorkOrderAddForms.ticketInstanceNumber" placeholder="工单实际编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="用户编号">
              <el-input v-model="installationWorkOrderAddForms.userNumber" placeholder="用户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="项目型名称">
              <el-input v-model="installationWorkOrderAddForms.itemName" placeholder="项目型名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目型编号">
              <el-input v-model="installationWorkOrderAddForms.itemNumber" placeholder="项目型编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="业务类型">
              <el-cascader v-model="installationWorkOrderAddForms.productLevel" :options="productOptions" :props="props" :readonly="mode === 'a'"></el-cascader>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="地址">
              <el-input v-model="installationWorkOrderAddForms.address" placeholder="地址" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="受理类型">
              <el-input v-model="installationWorkOrderAddForms.acceptanceType" placeholder="受理类型" v-if="mode === 'a'" readonly></el-input>
              <el-select v-model="installationWorkOrderAddForms.acceptanceType" v-else>
                <el-option label="批量新装" value="批量新装"></el-option>
                <el-option label="新装" value="新装">
                </el-option>
                <el-option label="移机" value="移机">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="要求完工日期">
              <el-date-picker v-model="installationWorkOrderAddForms.requiredCompletionDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实际完工时间">
              <el-date-picker v-model="installationWorkOrderAddForms.actualCompletionDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="mode === 'a'">
            <el-form-item label="工单流转情况">
              <el-input v-model="installationWorkOrderAddForms.workOrderFlow" placeholder="工单流转情况" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-else>
            <el-form-item label="工单流转情况">
              <el-select v-model="installationWorkOrderAddForms.workOrderFlow" placeholder="工单流转情况">
                <el-option v-for="item in orderFlowOptions" :key="item.id" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:10px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="其他备注">
              <el-input type="textarea" placeholder="请输入其他备注说明，在300字以内" v-model="installationWorkOrderAddForms.otherRemarks" :readonly="mode === 'a'" maxlength="300" show-word-limit>
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
          <el-col :span="6">
            <el-form-item label="用户编号" :model="onlyOneForm">
              <el-input v-model="addBasicForm.userNumber" placeholder="用户编号"></el-input>
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
        <el-row :gutter="20">
          <el-col :span="6" v-if="addBasicForm.userNumber">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNumber" placeholder="用户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-for="(item,index) in machineFileAddForms" :key="index">
            <el-form-item :label="item.attributeName">
              <el-input v-model="item.attributeValue" :placeholder="item.attributeName" :readonly="mode == 'a'"></el-input>
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
            <el-col :span="5" :key="it.id">
              <el-form-item label="属性名称">
                <el-input v-model="it.attributeName" placeholder="属性名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :key="it.id">
              <el-form-item label="属性值">
                <el-input v-model="it.attributeValue" placeholder="属性值"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" :key="it.id">
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
import multigraph from '@/components/multigraph'
import { validMobile, validLevel } from '@/utils/validate'
export default {
  components: {
    multigraph
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    const validateLevel = (rule, value, callback) => {
      if (value !== '') {
        validLevel(value) ? callback() : callback(new Error('资信等级请输入1-100的数字'))
      } else {
        callback()
      }
    }
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
        latitudeLongitude: '',
        installationWorkOrderAddForms: {},
        machineFileAddForms: [],
        imageUrl: []
      },
      addFormRules: {
        mobilePhone: [
          { required: true, message: '请输入移动电话', trigger: 'blur' },
          { validator: validateMobile, trigger: ['blur', 'change'] }
        ],
        accountName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        accountNumber: [
          { required: true, message: '请输入账户编号', trigger: 'blur' }
        ],
        customerNumber: [
          { required: true, message: '请输入客户编号', trigger: 'blur' }
        ],
        userNumber: [
          { required: true, message: '请输入用户编号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        productLevel: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        userAddress: [
          { required: true, message: '请输入用户地址', trigger: 'blur' }
        ],
        orderStartTime: [
          { required: true, message: '请选择订购开始时间', trigger: 'blur' }
        ],
        orderEndTime: [
          { required: true, message: '请选择订购结束时间', trigger: 'blur' }
        ],
        developEmployees: [
          { required: true, message: '请输入发展雇员', trigger: 'blur' }
        ],
      },
      detailsFormRules: {
        creditRating: [
          { validator: validateLevel, trigger: ['blur', 'change'] }
        ]
      },

      props: { value: 'id' },
      productOptions: [],
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      //    ！a : 详情 ；  b : 新增 ；  c ： 编辑   很重要！！！
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
      },
      userStatusOptions: [
        { id: 1, label: '开通' }, { id: 2, label: '销户' }, { id: 3, label: '移机' }, { id: 4, label: '预开通' }, { id: 5, label: '预销户' }, { id: 6, label: '暂停' }
      ],
      orderFlowOptions: [
        { id: 1, label: '回退' }, { id: 2, label: '退回延期' }, { id: 3, label: '延期' }, { id: 4, label: '正常流转' }
      ],
      addFormFlag: false,
      detailsFormFlag: false
    }
  },
  created () {
    if (this.$route.query.miao) {
      this.miao = this.$route.query.miao
    }
    this.getProductOptions()
    this.mode = this.$route.query.mode
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    // 判断如果模式不是b,为a和c的情况下，走请求详情的接口
    if (this.mode !== 'b') {
      this.getUserInfoDetails()
    }
    this.$nextTick(() => { this.toLocal() })
  },
  mounted () {
    let _this = this;
    _this.$nextTick(function () {
      window.addEventListener('scroll', _this.handleScroll)
    })
  },
  methods: {
    toLocal () {
      //查找存储的锚点id
      let Id = localStorage.getItem('toId');
      let toElement = document.getElementById(Id);
      //锚点存在跳转
      if (Id) {
        toElement.scrollIntoView()
      }
    },
    getUserInfoDetails () {
      let data = {
        id: this.id
      }
      this.$Apis.userInfoDetails(data).then(res => {
        // console.log(res);
        this.addBasicForm = res.data
        this.addBasicForm.productLevel = this.addBasicForm.productLevel.split(',').map(Number)
        // console.log(this.addBasicForm.productLevel);
        if (res.data.installationWorkOrderAddForms) {
          this.installationWorkOrderAddForms = res.data.installationWorkOrderAddForms
          this.installationWorkOrderAddForms.productLevel = this.installationWorkOrderAddForms.productLevel.split(',').map(Number)
        }
        if (this.addBasicForm.imageUrl) {
          this.addBasicForm.imageUrl = this.addBasicForm.imageUrl.split(',')
        } else {
          this.addBasicForm.imageUrl = []
        }
        if (res.data.machineFileAddForms) {
          this.machineFileAddForms = res.data.machineFileAddForms
        }
      })
    },
    valid () {
      this.$refs.addForm.validate((vaild) => {
        // console.log('验证成功')
        this.addFormFlag = vaild //表示第一个表单验证成功
      })
      if (this.addBasicForm.creditRating == '') {
        // console.log('字符串为空');
        this.detailsFormFlag = true
      } else {
        this.$refs.detailsForm.validate((valid) => {
          // console.log('验证成功')
          this.detailsFormFlag = valid
        })
      }
    },
    submit () {
      // this.$refs.addForm.validate().then(() => {
      //   console.log('验证成功')
      //   this.addFormFlag = true //表示第一个表单验证成功
      // }).catch(err => {
      //   // 验证失败
      //   console.log(err, '验证失败')
      // })
      // if (this.addBasicForm.creditRating == '') {
      //   console.log('字符串为空');
      //   this.detailsFormFlag = true
      // } else {
      //   this.$refs.detailsForm.validate().then(() => {
      //     console.log('验证成功')
      //     this.detailsFormFlag = true  //表示第二个表单验证成功
      //   }).catch(err => {
      //     // 验证失败
      //     console.log(err, '验证失败')
      //   })
      // }
      this.valid()
      // console.log(this.addBasicForm.productLevel);
      this.addBasicForm.productLevel = this.addBasicForm.productLevel.toString()
      // this.addBasicForm.imageUrl =
      this.installationWorkOrderAddForms.productLevel = this.installationWorkOrderAddForms.productLevel.toString()
      // 判断如果模式为b,即新增，则走新增接口提交表单
      if (this.mode == 'b') {
        this.addBasicForm.installationWorkOrderAddForms = this.installationWorkOrderAddForms
        if (this.addForm[0]) {
          this.onlyOneForm.userNumber = this.addBasicForm.userNumber
          this.addForm[0] = { ...this.addForm[0], ...this.onlyOneForm }
        }
        this.addBasicForm.machineFileAddForms = this.addForm
        // let data = this.addBasicForm
        let data = JSON.parse(JSON.stringify(this.addBasicForm))
        let img = data.imageUrl.map(res => res.url ? res.url : res).join(',')
        data.imageUrl = img
        if (this.addFormFlag && this.detailsFormFlag) {
          //表示两个表单同时验证成功
          //再进行接口请求
          this.$Apis.userInfoSave(data).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功')
              this.$router.push({ name: 'usersList' })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      } else if (this.mode == 'c') {
        this.addBasicForm.installationWorkOrderAddForms = this.installationWorkOrderAddForms
        // if (this.addForm[0]) {
        //   this.onlyOneForm.userNumber = this.addBasicForm.userNumber
        //   this.addForm[0] = { ...this.addForm[0], ...this.onlyOneForm }
        // }
        this.addBasicForm.machineFileAddForms = this.machineFileAddForms.concat(this.addForm)
        // let data = this.addBasicForm
        let data = JSON.parse(JSON.stringify(this.addBasicForm))
        let img = data.imageUrl.map(res => res.url ? res.url : res).join(',')
        data.imageUrl = img
        if (this.addFormFlag && this.detailsFormFlag) {
          this.$Apis.userInfoEdit(data).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功')
              this.$router.push({ name: 'usersList' })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
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
        // console.log(res);
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
::v-deep .disabledplus .el-upload--picture-card {
  display: none;
}
.emptyImg{
  color: #ccc;
  font-size: 12px;
}
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

