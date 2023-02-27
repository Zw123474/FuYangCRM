<template>
  <div class="app-container">
    <!-- 主页内容 -->
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <div slot="header">
        菜单管理
        <el-button type="primary" size="medium" @click="handleAdd">添加菜单</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
        <el-table-column prop="sort" width="100" align="right" label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.sort%2 == 1" type="warning"> {{scope.row.sort}} </el-tag>
            <el-tag v-else type="primary"> {{scope.row.sort}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" align="center">
        </el-table-column>
        <el-table-column prop="icon" label="图标" align="center">
        </el-table-column>
        <el-table-column prop="id" label="id" align="center">
        </el-table-column>
        <el-table-column prop="path" label="菜单资源" align="center">
        </el-table-column>
        <el-table-column prop="perms" label="权限集" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="200" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row,1)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加编辑抽屉栏 -->
    <el-drawer :title="dialogTitle" :visible.sync="dialogVisible" direction="rtl" size="25%" custom-class="drawer" ref="drawer" :wrapperClosable="false" close-on-press-escape>
      <div class="drawer__content">
        <el-form :label-position="labelPosition" :model="form">
          <el-form-item label="菜单姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-select v-model="form.type" placeholder="请选择菜单类型">
              <el-option label="目录" value="0" />
              <el-option label="菜单" value="1" />
              <el-option label="按钮" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
          <el-form-item label="菜单资源">
            <el-input v-model="form.path" />
          </el-form-item>
          <el-form-item label="父级菜单名称">
            <el-input v-model="form.parentName" />
          </el-form-item>
          <el-form-item label="父级菜单ID">
            <el-input v-model="form.parentId" />
          </el-form-item>
          <el-form-item label="权限集">
            <el-input v-model="form.perms" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.sort" />
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
      tableData: [],
      dialogVisible: false,
      dialogTitle: '',
      labelPosition: 'left',
      form: {
        icon: '',
        name: '',
        path: '',
        parentName: '',
        parentId: '',
        remark: '',
        sort: '',
        type: '',
        perms: ''
      },
    }
  },
  created () {
    this.menuList()
  },
  methods: {
    menuList () {
      this.$Apis.menuList().then(res => {
        this.tableData = res.data
      })
    },
    handleAdd () {
      this.dialogVisible = true
      this.dialogTitle = "添加菜单"
      this.form = {}
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.dialogTitle = "编辑菜单"
      this.form = row
    },
    handleDel (row) {
      this.$confirm('确认删除？').then(_ => {
        let data = {
          menuId: row.id
        }
        this.$Apis.menuDel(data).then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message.success('操作成功')
            this.menuList()
            this.visible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(_ => { })
    },
    submit () {
      let data = {
        name: this.form.name,
        icon: this.form.icon,
        parentId: this.form.parentId,
        path: this.form.path,
        remark: this.form.remark,
        sort: this.form.sort,
        type: this.form.type,
        perms: this.form.perms,
      }
      if (this.form.id) {
        // form.append('id', this.form.id)
        data.id = this.form.id
      }
      this.$Apis.menuSaveOrUpdate(data).then(res => {
        if (res.code == 200) {
          this.$message.success('操作成功')
          this.menuList()
          this.dialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
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
  .el-button--text {
    font-size: 16px;
  }
  .el-button--text:nth-child(2) {
    color: #ec4040;
  }
}
.drawer__content {
  padding: 10px 30px;
  .el-select {
    width: 100%;
  }
  .demo-drawer__footer .el-button {
    width: 200px;
    margin-left: calc(12.5% - 100px - 30px);
    position: fixed;
    bottom: 10px;
  }
  ::v-deep .el-form-item__label {
    font-size: 18px;
    color: black;
  }
  ::v-deep .el-input__inner {
    background-color: #f1f1f1;
    height: 38px;
    line-height: 50px;
    border-radius: 5px;
  }
}
::v-deep .el-checkbox__label {
  line-height: 30px;
  font-size: 16px;
}
</style>

