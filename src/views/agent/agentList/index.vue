<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <div slot="header">
        <svg-icon icon-class="apps" class="appsIcon"></svg-icon>
        一级分类 <span class="num">{{total}}</span> 条
        <el-input v-model="search.unitName" placeholder="搜索单位名称" style="width:300px;margin-left:30px">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="getAgentList">
          </i>
        </el-input>
        <el-button type="primary" size="medium" style="float:right" @click="handleAdd">
          <svg-icon icon-class="Group" style="margin-right:5px"></svg-icon>添加分类
        </el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column type="index" label="序号" width="100" align="center">
          <template scope="scope">
            <el-tag v-if="(scope.$index+1)%2 == 1" type="warning"> {{scope.$index+1}} </el-tag>
            <el-tag v-else type="primary"> {{scope.$index+1}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="unitName" label="单位名称" align="center">
        </el-table-column>
        <el-table-column prop="contact" label="联系人" align="center">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetails(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
            <!-- <el-button type="text" size="small" @click="handleCheck(scope.row)">转单记录</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加编辑抽屉栏 -->
    <el-drawer :title="dialogTitle" :visible.sync="dialogVisible" direction="rtl" size="25%" custom-class="drawer" ref="drawer">
      <div class="drawer__content">
        <el-form :label-position="labelPosition" :model="form">
          <el-form-item label="单位名称">
            <el-input v-model="form.unitName" :readonly="!isShow"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.contact" :readonly="!isShow"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phoneNumber" :readonly="!isShow"></el-input>
          </el-form-item>
          <el-form-item label="描述信息">
            <el-input type="textarea" v-model="form.remark" :readonly="!isShow"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="submit" v-show="isShow">提交</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: {
        unitName: '',
      },
      tableData: [{ id: 1, name: '许三多', class: '总调度' }, { id: 2, name: '许三多', class: '总调度' }, { id: 3, name: '许三多', class: '总调度' }, { id: 4, name: '许三多', class: '总调度' }, { id: 5, name: '许三多', class: '总调度' }],
      size: 10,
      total: 20,
      currentPage: 1,
      dialogVisible: false,
      roleDialog: false,
      dialogTitle: '',
      labelPosition: 'top',
      form: {
        unitName: '',
        contact: '',
        phoneNumber: '',
        remark: ''
      },
      // 模式判断   a:详情，b:新增，c:编辑
      mode: '',
      // 提交按钮是否显示，默认显示，详情模式时隐藏
      isShow: true
    }
  },
  created () {
    this.getAgentList()
  },
  methods: {
    // 请求列表数据
    getAgentList () {
      let data = {
        unitName: this.search.unitName,
        size: this.size,
        current: this.currentPage
      }
      this.$Apis.agentList(data).then(res => {
        console.log(res);
        this.tableData = res.data.list
        this.current = res.data.current
        this.size = res.data.size
        this.total = res.data.total
      })
    },
    // 查看详情
    handleDetails (row) {
      this.mode = 'a'
      this.isShow = false
      this.dialogVisible = true
      this.dialogTitle = "代维单位详情"
      this.form = { ...row }
    },
    handleAdd () {
      this.mode = 'b'
      this.isShow = true
      this.dialogVisible = true
      this.dialogTitle = "添加代维单位"
      this.form = {}
    },
    handleEdit (row) {
      this.mode = 'c'
      this.isShow = true
      this.dialogVisible = true
      this.dialogTitle = "编辑代维单位"
      this.form = { ...row }
    },
    // 点击提交
    submit () {
      let data = {
        unitName: this.form.unitName,
        contact: this.form.contact,
        phoneNumber: this.form.phoneNumber,
        remark: this.form.remark,
      }
      if (this.form.id) {
        data.id = this.form.id
      }
      if (this.mode == 'c') {
        this.$Apis.agentListEdit(data).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.getAgentList()
          }
        })
      } else if (this.mode == 'b') {
        this.$Apis.agentListSave(data).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.getAgentList()
          }
        })
      } else {
        this.isShow = true
      }
    },
    // 删除
    handleDel (row) {
      this.$confirm('确认删除？').then(_ => {
        let data = {
          id: row.id
        }
        this.$Apis.agentListDel(data).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success('操作成功')
            this.getAgentList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(_ => { })
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.tableCard {
  border-radius: 20px;
  ::v-deep .el-card__header,
  el-card__body {
    font-size: 20px;
    padding: 30px 0;
    margin: 0 35px;
    border-bottom: none;
    .num {
      color: blue;
    }
  }
  ::v-deep .el-card__body {
    margin: 0 35px;
    padding: 30px 0;
  }
  .el-button {
    margin: 0 15px;
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
  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: right;
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
.drawer__content {
  padding: 30px;
  margin-top: 50px;
  .el-select {
    width: 100%;
  }
  ::v-deep .el-form-item__label {
    font-size: 18px;
    color: black;
  }
  ::v-deep .el-input__inner {
    background-color: #f1f1f1;
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
  }
  ::v-deep .el-textarea__inner {
    background-color: #f1f1f1;
    height: 150px;
    line-height: 50px;
    border-radius: 8px;
  }
}
::v-deep .el-checkbox__label {
  line-height: 30px;
  font-size: 16px;
}
::v-deep .el-drawer__header {
  font-size: 20px;
  color: #000000;
}
</style>

