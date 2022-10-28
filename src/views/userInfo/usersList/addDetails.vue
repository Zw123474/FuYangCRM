<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        基本信息
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账户编号">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户名称">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户编号">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品大类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="产品子类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品细类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品线">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品名称">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="联系人">
              <el-input v-model="addBasicForm.responser" placeholder="许三多"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户地址">
              <el-input v-model="addBasicForm.responser" placeholder="产品1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="移动电话">
              <el-input v-model="addBasicForm.responser" placeholder="16564654646"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订购开始时间">
              <el-date-picker v-model="addBasicForm.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订购结束时间">
              <el-date-picker v-model="addBasicForm.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="发展雇员">
              <el-input v-model="addBasicForm.responser" placeholder="许三多"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 详细信息 -->
    <el-card class="tableCard" shadow="never">
      <div slot="header">
        详细信息
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="促销">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="资信等级">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="联系电话">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="传真号码">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="邮箱">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="VPN名称">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="用户状态">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="销售员">
              <el-input v-model="addBasicForm.responser" placeholder="许三多"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订购开始时间">
              <el-date-picker v-model="addBasicForm.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="订购结束时间">
              <el-date-picker v-model="addBasicForm.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户完工时间">
              <el-date-picker v-model="addBasicForm.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary" style="margin:20px 0">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">支持jpg/png文件，文件大小不超过500KB</div>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        安装工单信息
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账户编号">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户名称">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户编号">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品大类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账户编号">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户名称">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户编号">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品大类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账户编号">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户名称">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户编号">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品大类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="border-top:1px solid #ccc;margin-top:10px;padding-top:10px">
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
        一机一档信息
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账户编号">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户名称">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户编号">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品大类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账户编号">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户名称">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户编号">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品大类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="账户编号">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="账户名称">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户编号">
              <el-input v-model="addBasicForm.userName" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户编号">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="用户名称">
              <el-input v-model="addBasicForm.userNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产品大类">
              <el-select v-model="addBasicForm.pro" placeholder="产品1">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="tableCard" shadow="never" style="margin-bottom:30px">
      <div slot="header">
        更多属性
        <el-button type="primary" size="medium" @click="handleAdd">
          <img src="@/assets/common/add.png" alt="">
          新增属性
        </el-button>
      </div>
      <el-form ref="form" :model="addBasicForm" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="属性名称">
              <el-input v-model="addBasicForm.accountName" placeholder="D-D56412"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="属性值">
              <el-input v-model="addBasicForm.cusNum" placeholder="D-D4515"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="submit">
      <el-button >重置</el-button>
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addBasicForm: {},
      options: [{ id: 1, label: '产品1' }, { id: 2, label: '产品2' }],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleAdd(){

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
    img {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
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
  ::v-deep .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  ::v-deep .el-form-item__label {
    font-size: 16px;
  }
  ::v-deep .el-card__body {
    margin: 0 35px;
    padding: 30px 0;
  }
}
.submit{
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

