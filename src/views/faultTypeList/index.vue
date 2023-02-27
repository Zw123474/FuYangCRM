<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <div slot="header">
        <svg-icon icon-class="apps" class="appsIcon"></svg-icon>
        {{currentLevel}} 级分类 <span class="num">{{total}}</span> 条
        <el-input v-model="search.typeName" placeholder="搜索分类名称" style="width:300px;margin-left:30px">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="getFaultType">
          </i>
        </el-input>
        <el-button type="primary" size="medium" style="float:right" @click="handleAdd" :disabled="search.parentId !== 0">
          <svg-icon icon-class="Group" style="margin-right:5px"></svg-icon>添加分类
        </el-button>
        <el-button type="primary" size="medium" style="float:right" plain @click="backLast">
          <svg-icon icon-class="GoBack" style="margin-right:5px"></svg-icon>返回上级
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
        <el-table-column prop="typeName" label="分类名称" align="center">
        </el-table-column>
        <el-table-column prop="typeLevel" label="分类级别" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handleAddNext(scope.row)">新增下一级</el-button>
            <el-button type="text" size="small" @click="handleCheckNext(scope.row)">查看下一级</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination> -->
    </el-card>
    <!-- 添加编辑抽屉栏 -->
    <el-drawer :title="dialogTitle" :visible.sync="dialogVisible" direction="rtl" size="25%" custom-class="drawer" ref="drawer">
      <div class="drawer__content">
        <el-form :label-position="labelPosition" :model="form">
          <el-form-item label="分类级别">
            <!-- <el-select v-model="form.typeLevel" placeholder="默认顶级">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <el-input v-model="form.typeLevel" placeholder="默认顶级" disabled></el-input>
            <!-- <el-select v-model="form.typeLevel" placeholder="默认二级" style="margin-top:20px" v-if="form.lastLastClass">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <!-- <el-input v-model="form.typeLevel" placeholder="默认二级"></el-input> -->
          </el-form-item>
          <el-form-item label="分类名称">
            <el-input v-model="form.typeName"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="submit">提交</el-button>
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
        parentId: 0,
        typeName: '',
        queryType: 'LIST'
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
        typeName: '',
        typeLevel: '',
        parentId: 0
      },
      options: [{ value: 1, label: '一级' }, { value: 2, label: '二级' }],
      isEdit: false,
      currentLevel: 1
    }
  },
  created () {
    this.getFaultType()
  },
  methods: {
    // 请求列表数据
    getFaultType () {
      let data = {
        parentId: this.search.parentId,
        typeName: this.search.typeName,
        queryType: this.search.queryType
      }
      this.$Apis.faultType(data).then(res => {
        // console.log(res);
        if (res.data[0]) {
          this.currentLevel = res.data[0].productLevel
          this.search.parentId = res.data[0].parentId
        } else {
          this.currentLevel = this.currentLevel + 1
        }
        this.total = res.data.length
        this.tableData = res.data
      })
    },
    // 查看下一级别列表
    handleCheckNext (row) {
      this.search.queryType = 'BELOW'
      this.search.parentId = row.id
      this.getFaultType()
    },
    // 返回上一级
    backLast () {
      if (this.search.parentId === 0) {
        this.$message({
          message: '已经是一级了！',
          type: 'warning'
        });
      } else {
        this.search.queryType = 'SENIOR'
        this.search.typeName = ''
        this.getFaultType()
      }
    },
    // 添加和编辑
    handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
      this.dialogTitle = "添加业务产品类型"
      this.form = {}
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.isEdit = true
      this.dialogTitle = "编辑业务产品类型"
      this.form = { ...row }
    },
    // 点击提交
    submit () {
      let data = {
        parentId: this.form.parentId,
        typeName: this.form.typeName,
      }
      if (this.form.id) {
        data.id = this.form.id
      }
      if (this.isEdit) {
        this.$Apis.faultTypeEdit(data).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.getFaultType()
          }
        })
      } else {
        this.$Apis.faultTypeSave(data).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.getFaultType()
          }
        })
      }
    },
    // 删除
    handleDel (row) {
      this.$confirm('确认删除？').then(_ => {
        let data = {
          id: row.id
        }
        this.$Apis.faultTypeDel(data).then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message.success('操作成功')
            this.getFaultType()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(_ => { })
    },
    // 增加下一级
    handleAddNext (row) {
      this.dialogTitle = '新增下一级'
      this.isEdit = false
      this.dialogVisible = true
      this.form.typeLevel = row.typeLevel + 1
      this.form.parentId = row.id
      this.form.typeName = ''
    }
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
  // .el-pagination {
  //   margin-top: 20px;
  //   display: flex;
  //   justify-content: right;
  // }
  .el-button--text {
    font-size: 16px;
  }
  .el-button--text:nth-child(1) {
    color: #34a47e;
  }
  .el-button--text:nth-child(2) {
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

