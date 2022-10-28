<template>
  <div class="app-container">
    <PageTool style="margin-bottom:20px"></PageTool>
    <el-card class="tableCard" style="border-radius:20px" shadow="never">
      <el-table :data="tableData" stripe style="width: 100%;font-size:18px" :header-cell-style="{
      background:'#e4eaf6',color:'#000000',height:'70px'}">
        <el-table-column type="index" width="100" height="70px" label="序号" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.id%2 == 1" type="warning"> {{scope.row.id}} </el-tag>
            <el-tag v-else type="primary"> {{scope.row.id}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色名称" align="center">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{ id: 1, role: '主管' }, { id: 2, role: '一级主管' }, { id: 3, role: '一级主管' }, { id: 4, role: '一级主管', }, { id: 5, role: '一级主管', }],
      size: 10,
      total: 20,
      currentPage: 1
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

