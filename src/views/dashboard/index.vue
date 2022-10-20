<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="userInfoBox">
          <h3>您好，{{name}}</h3>
          <p>总调度 | {{role}}</p>
          <p><span>您的上次登录信息：</span> {{time}}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="noticeBox">
          <div slot="header" class="clearfix">
            <span>最近公告</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // },
  data () {
    return {
      name: 'Avicii',
      role: '总管',
      time: '2022年10月20日'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .el-card{
      border-radius: 20px;
    }
    .userInfoBox {
      background: url("~@/./assets/common/userInfoBg.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      padding-left: 10px;
      h3{
        font-size: 34px;
        font-weight: normal;
      }
      p{
        font-size: 20px;
        margin-bottom: 35px;
      }
      p:nth-child(3){
        font-size: 16px;
        span{
          color: #e6e6e6;
        }
      }
    }
    .noticeBox{

    }
  }
}
</style>
