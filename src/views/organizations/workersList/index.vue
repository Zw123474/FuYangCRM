<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <div slot="header">
        组织架构分类
        <!-- <el-button type="primary" size="medium" @click="syncDingding">
          <svg-icon icon-class="Vector" class="VectorIcon"></svg-icon>同步钉钉组织架构
        </el-button> -->
        <el-button type="primary" plain size="medium" @click="search.roleId = '';getTableData()">全部</el-button>
        <el-button type="primary" plain size="medium" v-for="(val,index) in roleList" :key="index" @click="search.roleId = val.id;getTableData()">{{val.roleName}}</el-button>
      </div>
      <div class="btn">
        <span>部门选择</span>
        <el-select v-model="search.deptId" placeholder="部门选择" style="margin-right:20px" clearable>
          <el-option v-for="(item,index) in depOptions" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <span>姓名搜索</span>
        <el-input v-model="search.userName" placeholder="按照姓名搜索" style="width:30%"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="toSearch">搜索</el-button>
      </div>
      <div class="dingdingBtn">
        <!-- <el-button type="primary" size="medium" style="margin-left:20px" @click="handleAdd">
          添加子管理员
        </el-button> -->
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px;margin-top:30px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column type="index" width="100" align="center">
          <template scope="scope">
            <el-tag v-if="(scope.$index+1)%2 == 1" type="warning"> {{scope.$index+1}} </el-tag>
            <el-tag v-else type="primary"> {{scope.$index+1}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="80">
          <template slot-scope="scope">
            <img v-if="scope.row.headUrl" :src="scope.row.headUrl" style="width:50px;height:50px;border-radius:25px">
            <img v-else :src="circleUrl" style="width:50px;height:50px;border-radius:25px">
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="left" width="120">
        </el-table-column>
        <!-- <el-table-column label="职位" align="center">
          <template slot-scope="scope">
            {{scope.row.isAdmin == 1 ? '主管理员' : scope.row.isTotalSchedule == 1 ? '总调度' : scope.row.isDepartmentHeads== 1 ? '部门主管' : '运维人员'}}
          </template>
        </el-table-column> -->
        <el-table-column prop="phone" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="deptName" label="所属部门" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="380">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkDetails(scope.row)">详情</el-button>
            <!-- <el-button type="text" size="small" @click="handleEdit(scope.row,1)">编辑</el-button>
            <el-button type="text" size="small" @click="handleAdd(scope.row)">删除</el-button> -->
            <el-button type="text" size="small" @click="handlerole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加编辑抽屉栏 -->
    <!-- <el-drawer :title="dialogTitle" :visible.sync="dialogVisible" direction="rtl" size="25%" custom-class="drawer" ref="drawer">
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
    </el-drawer> -->
    <!-- 分配权限对话框 -->
    <el-dialog title="分配用户管理权限" :visible.sync="roleDialog" width="35%">
      <el-radio-group v-model="roles">
        <el-radio v-for="(item,index) in checkedRoles" :label="item.id" :key="index">{{item.roleName}}</el-radio>
      </el-radio-group>
      <template #footer>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="roleDialog = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: {
        deptId: '',
        userName: '',
        roleId: '',
      },
      tableData: [],
      size: 10,
      total: 20,
      currentPage: 1,
      dialogVisible: false,
      roleDialog: false,
      dialogTitle: '',
      loading: false,
      labelPosition: 'top',
      checkAll: false,
      checkedRoles: [],
      roles: [],
      isIndeterminate: true,
      // form: {
      //   name: '',
      //   position: '',
      //   department: '',
      //   phone: '',
      //   pwd: '',
      //   email: ''
      // },
      circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      roleList: [],
      userId: '',
      depOptions: []
    }
  },
  created () {
    this.getTableData()
    this.getRoleOptions()
    this.getDeptList()
    // console.log(this.roles);
  },
  methods: {
    // 获取部门列表
    getDeptList () {
      let data = {
        current: 1,
        size: 999
      }
      this.$Apis.deptList(data).then(res => {
        this.depOptions = res.data.list
      })
    },
    submit () {
      let data = {
        roleId: this.roles,
        userId: this.userId
      }
      // console.log(data);
      this.$Apis.bindingRole(data).then(res => {
        // console.log(res);
        this.roleDialog = false
        if (res.code == 200) {
          this.$message.success('操作成功')
          this.getTableData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getRoleOptions () {
      this.$Apis.roleOptions().then(res => {
        // console.log(res);
        this.checkedRoles = res.data
        this.roleList = res.data
        console.log(res);
      })
    },
    syncDingding () {
      this.$Apis.syncDingding().then(res => {
        // console.log(res);
      })
    },
    toSearchroleId (row) {
      this.search.roleId = row.roleName
    },
    toSearch () {
      this.getTableData()
    },
    getTableData () {
      let data = {
        current: this.currentPage,
        userName: this.search.userName,
        roleId: this.search.roleId,
        size: this.size,
        deptId: this.search.deptId
      }
      this.$Apis.userList(data).then(res => {
        // console.log(res.data);
        this.tableData = res.data.list
        this.size = res.data.size
        this.current = res.data.current
        this.total = res.data.total
        // console.log(this.tableData);
        const arr = this.tableData.filter(item => {
          return item.roleName !== ''
        })
        // let map = new Map()
        // for (let item of arr) {
        //   if (!map.has(item.roleName)) {
        //     map.set(item.roleName, item)
        //   }
        // }
        // this.roleList = [...map.values()]
        // console.log(this.roleList);
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.size = val;
      this.getTableData()
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getTableData()
    },
    checkDetails (row) {
      this.$router.push({ name: 'details', query: { id: row.id, deptId: row.deptId, depName: row.deptName } })
    },
    handlerole (row) {
      this.roleDialog = true
      this.userId = row.id
      this.roles = row.roleId - 0
      console.log(row.roleId);
    },
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
  ::v-deep .el-card__header .el-button{
    float: none;
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
  // .el-button--text:nth-child(2) {
  //   color: #34a47e;
  // }
  // .el-button--text:nth-child(3) {
  //   color: #ec4040;
  // }
  .el-button--text:nth-child(2) {
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
::v-deep .el-checkbox__label {
  line-height: 30px;
  font-size: 16px;
}
</style>

