<template>
  <div class="app-container">
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column type="index" label="序号" width="100" align="center">
          <template scope="scope">
            <el-tag v-if="(scope.$index+1)%2 == 1" type="warning"> {{scope.$index+1}} </el-tag>
            <el-tag v-else type="primary"> {{scope.$index+1}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="角色描述" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handlerole(scope.row)">管理权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="分配角色" :visible.sync="roledialogVisible">
      <el-tree :data="menuList" show-checkbox :props="defaultProps" node-key="id" ref="tree" :check-strictly="isCheck">
      </el-tree>
      <template #footer>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="roledialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { logger } from 'runjs/lib/common'
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableData: [{ id: 1, role: '主管' }, { id: 2, role: '一级主管' }, { id: 3, role: '一级主管' }, { id: 4, role: '一级主管', }, { id: 5, role: '一级主管', }],
      size: 10,
      total: 20,
      currentPage: 1,
      roledialogVisible: false,
      checkList: [],
      fatherIdList: [],
      menuIds: [],
      search: '',
      menuList: [],
      roleId: '',
      isCheck: false
    }
  },
  created () {
    this.getRole()
    this.getMenuList()
  },
  methods: {
    // 获取表格数据，所有角色列表
    getRole () {
      let data = {
        current: this.currentPage,
        name: this.search,
        size: this.size,
      }
      this.$Apis.roleList(data).then(res => {
        this.tableData = res.data.list
        this.current = res.data.current
        this.size = res.data.size
        this.total = res.data.total
      })
    },
    // 获取弹框打开后的菜单列表
    getMenuList () {
      this.$Apis.menuList().then(res => {
        // console.log(res);
        this.menuList = res.data
      })
    },
    // 分页展示
    handleSizeChange (val) {
      this.currentPage = 1;
      this.size = val;
      this.getRole()
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getRole()
    },
    // 点击管理权限操作
    handlerole (row) {
      this.roledialogVisible = true
      this.roleId = row.id
      // console.log(this.$refs.tree.setCheckedKeys(row.menuIdList));
      // this.checkList = row.menuIdList
      this.isCheck = true //重点：回显之前一定要设置为true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(row.menuIdList) //给树节点赋值回显
        this.isCheck = false //重点： 赋值完成后 设置为false
      })
    },
    // 绑定菜单
    roleBinding () {
      this.checkList = this.$refs.tree.getCheckedKeys()
      this.fatherId = this.$refs.tree.getHalfCheckedKeys()
      this.menuIds = this.checkList.concat(this.fatherId)
      // console.log(this.menuIds, this.menuIds.toString());
      let data = {
        menuIds: this.menuIds.toString(),
        roleId: this.roleId
      }
      // console.log(data);
      // console.log(this.$refs.tree.getHalfCheckedKeys());
      // console.log(data);
      this.$Apis.roleBinding(data).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.getRole()
          this.roledialogVisible = false
        } else {
          this.$message.warning(res.msg);
        }
      })
    },
    // 弹框打开后点击确定操作
    // 给员工分配权限
    submit () {
      this.roleBinding()
      this.$refs.tree.getCheckedKeys()
    },
  }
}
</script>

<style lang="scss" scoped>
.tableCard {
  .el-button--text {
    color: #246ee7;
  }
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

  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: right;
  }
  .el-button--text {
    font-size: 16px;
  }
}
</style>

