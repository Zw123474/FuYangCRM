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
        <el-table-column prop="name" label="部门" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleMatch(scope.row)">管理接收运维工单类型</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="产品业务类型" :visible.sync="centerDialogVisible" center width="40%">
      <el-cascader v-model="productStr" :options="formData" :props="props" clearable></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      props: { multiple: true, value: 'id' },
      options: [{
        id: 1,
        label: '东南',
        children: [{
          id: 2,
          label: '上海',
          children: [
            { id: 3, label: '普陀' },
            { id: 4, label: '黄埔' },
            { id: 5, label: '徐汇' }
          ]
        }, {
          id: 7,
          label: '江苏',
          children: [
            { id: 8, label: '南京' },
            { id: 9, label: '苏州' },
            { id: 10, label: '无锡' }
          ]
        }, {
          id: 12,
          label: '浙江',
          children: [
            { id: 13, label: '杭州' },
            { id: 14, label: '宁波' },
            { id: 15, label: '嘉兴' }
          ]
        }]
      }, {
        id: 17,
        label: '西北',
        children: [{
          id: 18,
          label: '陕西',
          children: [
            { id: 19, label: '西安' },
            { id: 20, label: '延安' }
          ]
        }, {
          id: 21,
          label: '新疆维吾尔族自治区',
          children: [
            { id: 22, label: '乌鲁木齐' },
            { id: 23, label: '克拉玛依' }
          ]
        }]
      }],
      formData: [],
      tableData: [],
      size: 10,
      total: 20,
      currentPage: 1,
      centerDialogVisible: false,
      deptId: '',
      productStr: [],
      id: [],
      value: []
    }
  },
  created () {
    this.deptList()
    this.treeOptionList()
  },
  methods: {
    deptList () {
      let data = {
        current: this.currentPage,
        size: this.size,
      }
      this.$Apis.deptList(data).then(res => {
        // console.log(res);
        this.tableData = res.data.list
        this.currentPage = res.data.current
        this.size = res.data.size
        this.total = res.data.total
      })
    },
    deptProBinding () {
      let data = {
        deptId: this.deptId,
        productStr: this.productStr
      }
      // console.log(data);
      this.$Apis.deptProBinding(data).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.$message.success('操作成功')
          this.deptList()
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
    treeOptionList () {
      this.$Apis.treeOptionList().then(res => {
        // console.log(res);
        let obj = res.data
        this.formData = this.deleteChildren(obj)
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1;
      this.size = val;
      this.deptList()
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.deptList()
    },
    handleMatch (row) {
      this.centerDialogVisible = true
      this.deptId = row.id
      this.productStr = []
      row.productLevelIdList.forEach(e => {
        // console.log(e);
        const arr = eval('[' + e + ']')
        this.productStr.push(arr)
      })
      // console.log(this.productStr);
      // console.log(row.productLevelIdList);
    },
    submit () {
      this.centerDialogVisible = false
      this.deptProBinding()
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

  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: right;
  }
  .el-button--text {
    font-size: 16px;
  }
}
.flex_square {
  display: flex;
  align-items: center;
  .tree-tranfer {
    width: 198px;
    height: 246px;
    border: 1px solid #ebeef5;
    padding: 10px;
    overflow-y: auto;
  }
  .transfer-btns {
    padding: 0px 30px;
  }
}
</style>

