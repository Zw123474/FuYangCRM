<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        {{mode == 'a' ? '查看用户信息' : '编辑用户信息'}}
      </div>
      <el-form :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userName" placeholder="用户名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNumber" placeholder="用户编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目型名称">
              <el-input v-model="addBasicForm.itemName" placeholder="项目型名称" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目型编号">
              <el-input v-model="addBasicForm.itemNumber" placeholder="项目型编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地址">
              <el-input v-model="addBasicForm.address" placeholder="地址" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="受理类型">
              <el-input v-model="addBasicForm.acceptanceType" placeholder="受理类型" v-if="mode === 'a'" readonly></el-input>
              <el-select v-model="addBasicForm.acceptanceType" placeholder="受理类型" v-else>
                <el-option label="批量新装" value="批量新装"></el-option>
                <el-option label="新装" value="新装">
                </el-option>
                <el-option label="移机" value="移机">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间">
              <el-input v-model="addBasicForm.createTime" placeholder="创建时间" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="修改时间">
              <el-input v-model="addBasicForm.updateTime" placeholder="修改时间" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工单实例编号">
              <el-input v-model="addBasicForm.ticketInstanceNumber" placeholder="工单实例编号" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务类型">
              <el-input v-model="addBasicForm.productLevelNameStr" v-if="mode === 'a'" readonly=""></el-input>
              <el-cascader v-model="addBasicForm.productLevel" :options="productOptions" :props="props" v-else></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="mode == 'a'">
            <el-form-item label="工单流转情况">
              <el-input v-model="addBasicForm.workOrderFlow" placeholder="工单流转情况" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-else>
            <el-form-item label="工单流转情况">
              <el-select v-model="addBasicForm.workOrderFlow" placeholder="工单流转情况">
                <el-option v-for="item in orderFlowOptions" :key="item.id" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="要求完工日期">
              <el-date-picker v-model="addBasicForm.requiredCompletionDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实际完工日期">
              <el-date-picker v-model="addBasicForm.actualCompletionDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" :readonly="mode === 'a'">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他备注">
              <el-input v-model="addBasicForm.otherRemarks" placeholder="其他备注" :readonly="mode === 'a'"></el-input>
            </el-form-item>
          </el-col>
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
        userName: '',
        userNumber: '',
        itemName: '',
        itemNumber: '',
        address: '',
        ticketInstanceNumber: '',
        createTime: '',
        updateTime: '',
        actualCompletionDate: '',
        acceptanceType: '',
        workOrderFlow: '',
        productLevel: '',
        requiredCompletionDate: '',
        actualCompletionDate: ''
      },
      props: { value: 'id' },
      productOptions: [],
      mode: '',
      id: null,
      orderFlowOptions: [
        { id: 1, label: '回退' }, { id: 2, label: '退回延期' }, { id: 3, label: '延期' }, { id: 4, label: '正常流转' }
      ]
    }
  },
  created () {
    this.getProductOptions()
    this.mode = this.$route.query.mode
    this.id = this.$route.query.id
    this.getworkOrderDetails()
  },
  methods: {
    getworkOrderDetails () {
      let data = {
        id: this.id
      }
      this.$Apis.workOrderDetails(data).then(res => {
        // console.log(res);
        this.addBasicForm = res.data
        this.addBasicForm.productLevel = this.addBasicForm.productLevel.split(',').map(Number)
        // console.log(this.addBasicForm.productLevel);
      })
    },
    submit () {
      // console.log(this.addBasicForm.productLevel);
      this.addBasicForm.productLevel = this.addBasicForm.productLevel.toString()
      let data = this.addBasicForm
      this.$Apis.workOrderEdit(data).then(res => {
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.$router.push({ name: 'workOrderList' })
        } else {
          this.$message.error(res.msg)
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

