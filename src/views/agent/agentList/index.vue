<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <div slot="header">
        <svg-icon icon-class="phone" class="phoneIcon"></svg-icon>
        一级分类 <span class="num">888</span> 条
        <el-input suffix-icon="el-icon-search" v-model="search.type" placeholder="搜索分类级别" style="width:300px;margin-left:30px"></el-input>
        <el-button type="primary" size="medium" style="float:right" icon="el-icon-folder-add" @click="handleAdd">添加分类</el-button>
        <el-button type="primary" size="medium" style="float:right" icon="el-icon-back">返回上级</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column type="index" width="100" height="70px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.id%2 == 1" type="warning"> {{scope.row.id}} </el-tag>
            <el-tag v-else type="primary"> {{scope.row.id}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="分类名称" align="center">
        </el-table-column>
        <el-table-column prop="class" label="分类级别" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">新增下一级</el-button>
            <el-button type="text" size="small">查看下一级</el-button>
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
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述信息">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '提 交' }}</el-button>
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
        class: '',
        name: ''
      },
      tableData: [{ id: 1, name: '许三多', class: '总调度' }, { id: 2, name: '许三多',  class: '总调度' }, { id: 3, name: '许三多', class: '总调度' }, { id: 4, name: '许三多',  class: '总调度' }, { id: 5, name: '许三多', class: '总调度' }],
      size: 10,
      total: 20,
      currentPage: 1,
      dialogVisible: false,
      roleDialog: false,
      dialogTitle: '',
      loading: false,
      labelPosition: 'top',
      form: {
        name: '',
        lastClass:'',
        lastLastClass:''
      },
      timer: null,
      options:[{value:1,label:'一级'},{value:2,label:'二级'}]
    }
  },
  methods: {
    handleSizeChange (val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    handleAdd () {
      this.dialogVisible = true
      this.dialogTitle = "添加代维单位"
      this.form = {}
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑代维单位"
      this.form = row
    },
    // 点击取消
    cancelForm () {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
.tableCard {
  border-radius: 20px;
  .btn {
    span {
      font-size: 16px;
      color: #92929a;
      margin-right: 20px;
    }
  }
  ::v-deep .el-card__header,
  el-card__body {
    font-size: 20px;
    padding: 30px 0;
    margin: 0 35px;
    border-bottom: none;
    .num{
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
  .demo-drawer__footer .el-button {
    width: 200px;
    margin-left: 100px;
    position: fixed;
    bottom: 10px;
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
::v-deep .el-checkbox__label{
    line-height: 30px;
    font-size: 16px;
  }
  ::v-deep .el-drawer__header{
    font-size: 20px;
    color: #000000;

  }
</style>

