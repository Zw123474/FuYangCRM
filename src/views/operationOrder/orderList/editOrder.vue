<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        基础信息
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="运维工单类型">
              <el-select v-model="addBasicForm.type" placeholder="常规">
                <el-option v-for="item in typeOptions" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-select v-model="addBasicForm.pro" placeholder="可搜索选择">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="addBasicForm.type == 2">
            <el-form-item label="业务类型">
              <el-select v-model="addBasicForm.pro" placeholder="可搜索选择">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="addBasicForm.type == 2">
            <el-form-item label="产品">
              <el-select v-model="addBasicForm.pro" placeholder="可搜索选择">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="报修类型">
              <el-select v-model="addBasicForm.pro" placeholder="常规">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="故障地址">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="所属片区">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="报修联系人">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="报修联系电话">
              <el-input v-model="addBasicForm.responser" placeholder="产品1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="报修来源">
              <el-input v-model="addBasicForm.responser" placeholder="许三多"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="报修时间">
              <el-date-picker v-model="addBasicForm.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="要求完成时间">
              <el-date-picker v-model="addBasicForm.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="userTitle" v-if="addBasicForm.type == 1">用户信息</div>
        <el-row :gutter="10" style="margin-bottom:20px" v-if="addBasicForm.type == 1">
          <el-col :span="4">
            <el-form-item label="业务类型">
              <el-input v-model="addBasicForm.responser" placeholder="许三多" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="具体业务">
              <el-input v-model="addBasicForm.responser" placeholder="D-D54561" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品">
              <el-input v-model="addBasicForm.responser" placeholder="D-D54561" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="地址">
              <el-input v-model="addBasicForm.responser" placeholder="富阳区富春路" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户昵称">
              <el-input v-model="addBasicForm.responser" placeholder="许三多" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户移动电话">
              <el-input v-model="addBasicForm.responser" placeholder="19210861761" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="安装单状态">
              <el-input v-model="addBasicForm.responser" placeholder="正常" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <div class="userTitle">用户信息</div>
          <h4 style="margin:20px 5px;font-weight:400">客户经理一号</h4>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary" style="margin:20px 0">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">支持jpg/png文件，文件大小不超过500KB</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:20px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="其他备注">
              <el-input type="textarea" placeholder="请输入其他备注说明，在300字以内" v-model="addBasicForm.textarea">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        运维人员补充字段
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="运维人员">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="其他运维人员">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他运维人员">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="故障类型判定">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代维单位">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否调用工队">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运维工单状态">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:20px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="故障描述">
              <el-input type="textarea" placeholder="备注详情" v-model="addBasicForm.textarea" disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        结单反驳记录
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row style="padding-top:10px">
          <el-col :span="24">
            <el-form-item label="结单反驳原因">
              <el-input type="textarea" placeholder="反驳原因" v-model="addBasicForm.textarea" disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        运维单退回记录
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="退回操作人">
              <el-input v-model="addBasicForm.accountName" placeholder="二级部门主管" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:20px;padding-top:10px">
          <el-col :span="24">
            <el-form-item label="退回原因">
              <el-input type="textarea" placeholder="退回原因" v-model="addBasicForm.textarea" disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="submit">
      <el-button>重置</el-button>
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addBasicForm: {
        type: '',
        department: ''
      },
      options: [{ id: 1, label: '产品1' }, { id: 2, label: '产品2' }],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      typeOptions: [{ id: 1, label: '常规' }, { id: 2, label: '特殊' }],
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleAdd () {

    }
  }
}
</script>

<style lang="scss" scoped>
.tableCard {
  margin-bottom: 30px;
  border-radius: 20px;
  ::v-deep .el-card__header {
    font-size: 24px;
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
  .userTitle {
    margin: 20px 5px;
    font-size: 20px;
    color: #246ee7;
    font-weight: 700;
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

