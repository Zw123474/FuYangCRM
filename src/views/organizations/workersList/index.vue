<template>
  <div class="app-container">
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <div slot="header">
        组织架构分类
        <el-button type="primary" size="medium">全部</el-button>
        <el-button type="primary" plain size="medium">平台管理员</el-button>
        <el-button type="primary" plain size="medium">总调度人员</el-button>
        <el-button type="primary" plain size="medium">二级部门主管</el-button>
        <el-button type="primary" plain size="medium">运维人员</el-button>
      </div>
      <div class="btn">
        <span>部门选择</span>
        <el-select v-model="search.department" placeholder="部门选择" style="margin-right:20px">
          <el-option v-for="item in tableData" :key="item.id" :label="item.department" :value="item.id">
          </el-option>
        </el-select>
        <span>关键字搜索</span>
        <el-input v-model="search.name" placeholder="按照名称搜索" style="width:500px"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="dingdingBtn">
        <el-button type="primary" size="medium">
          <svg-icon icon-class="Vector" class="VectorIcon"></svg-icon>同步钉钉组织架构
        </el-button>
        <el-button type="primary" size="medium" style="margin-left:20px" @click="handleAdd">
          添加子管理员
        </el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column type="index" width="100" height="70px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.id%2 == 1" type="warning"> {{scope.row.id}} </el-tag>
            <el-tag v-else type="primary"> {{scope.row.id}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="200" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="position" label="职称" width="200" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="220" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.sex == 2" type="warning" color="#fef5f6"> 女 </el-tag>
            <el-tag v-else type="primary"> 男 </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="所属部门" width="200" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="380" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkDetails(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row,1)">编辑</el-button>
            <el-button type="text" size="small" @click="handleAdd(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handlerole(scope.row)">分配用户管理权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-drawer :title="dialogTitle" :visible.sync="dialogVisible" direction="rtl" size="25%" custom-class="drawer" ref="drawer">
      <div class="drawer__content">
        <div class="block">
          <el-avatar :size="120" :src="circleUrl"></el-avatar>
          <svg-icon icon-class="Camera" class="CameraIcon"></svg-icon>
        </div>
        <el-form :label-position="labelPosition" :model="form">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="form.department" placeholder="">
              <el-option v-for="item in tableData" :key="item.id" :label="item.department" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="form.position" placeholder="">
              <el-option v-for="item in tableData" :key="item.id" :label="item.position" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '提 交' }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog title="分配用户管理权限" :visible.sync="roleDialog" width="35%">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="roles" @change="handlecheckedRolesChange">
        <el-checkbox v-for="(item,index) in checkedRoles" :label="item" :key="index">{{item}}</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: {
        department: '',
        name: ''
      },
      tableData: [{ id: 1, name: '许三多', phone: '13123456789', position: '主管', sex: 1, department: '总调度' }, { id: 2, name: '许三多', phone: '13123456789', position: '一级主管', sex: 2, department: '总调度' }, { id: 3, name: '许三多', phone: '13123456789', position: '一级主管', sex: 1, department: '总调度' }, { id: 4, name: '许三多', phone: '13123456789', position: '一级主管', sex: 2, department: '总调度' }, { id: 5, name: '许三多', phone: '13123456789', position: '一级主管', sex: 1, department: '总调度' }],
      size: 10,
      total: 20,
      currentPage: 1,
      dialogVisible: false,
      roleDialog: false,
      dialogTitle: '',
      loading: false,
      labelPosition: 'top',
      checkAll: false,
      checkedRoles: ['用户1名称 用户编号', '用户2名称 用户编号', '用户3名称 用户编号', '用户4名称 用户编号', '用户5名称 用户编号', '用户6名称 用户编号', '用户7名称 用户编号', '用户8名称 用户编号', '用户9名称 用户编号'],
      roles: [],
      isIndeterminate: true,
      form: {
        name: '',
        position: '',
        department: '',
        phone: '',
        pwd: '',
        email: ''
      },
      timer: null,
      circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedRoles = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handlecheckedRolesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.roles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length;
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    checkDetails (row) {
      this.$router.push({ name: 'Details', query: { id: row.id } })
    },
    handleAdd () {
      this.dialogVisible = true
      this.dialogTitle = "添加子管理员"
      this.form = ''
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑子管理员"
      this.form = row
    },
    handlerole (row) {
      this.roleDialog = true
    },
    // 关闭抽屉表单回调
    handleClose (done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => { });
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
    padding: 30px 0;
    margin: 0 35px;
    border-bottom: 2px solid #ebeef5;
  }
  ::v-deep .el-card__body {
    margin: 0 35px;
    padding: 30px 0;
  }
  .el-button {
    margin: 0 15px;
  }
  .dingdingBtn .el-button {
    margin: 30px 0;
    font-size: 16px;
    .VectorIcon {
      margin-right: 5px;
    }
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
  .block {
    margin-left: 35%;
    position: relative;
    margin-bottom: 20px;
    .CameraIcon {
      position: absolute;
      font-size: 25px;
      bottom: 0;
      left: 32%;
      color: black;
    }
  }
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
</style>

