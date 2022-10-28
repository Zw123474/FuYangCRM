<template>
  <div class="app-container">
    <!-- 大卡片 -->
    <el-card>
      <div slot="header">
        系统人员详情
      </div>
      <div class="cardBody">
        <!-- 左边卡片 -->
        <div class="sideCard">
          <el-card>
            <div class="block">
              <el-avatar :size="100" :src="circleUrl"></el-avatar>
            </div>
            <h3 style="font-size:32px;margin-left:70px">许三多</h3>
            <el-button type="primary" size="small" style="font-size:18px;margin-left:70px">
              <svg-icon icon-class="phone" class="phoneIcon"></svg-icon>13485521654
            </el-button>
            <p>
              <svg-icon icon-class="email" class="emailIcon"></svg-icon>1481430365@qq.com
            </p>
            <p>
              <svg-icon icon-class="email-1" class="emailIcon"></svg-icon>1481430365
            </p>
            <p>
              <svg-icon icon-class="email-2" class="emailIcon"></svg-icon>Avicii
            </p>
          </el-card>
        </div>
        <!-- 右边介绍 -->
        <div class="description">
          <!-- 上面详情描述 -->
          <div class="txt">
            <h3>个人信息描述</h3>
            <p>比尔盖茨1995 -2007年连续13年成为《福布斯》全球富翁榜首富, 连续20年成为《福布斯》美国富翁榜首富。2000年, 比尔盖茨成立比尔和梅琳达.盖茨基金会，2008年比尔盖茨宣 布将580亿美元个人财产捐给慈善基金会，2014年比尔盖茨辞去董事长一职并重回世界首富。2015年9月29日, 微软公司创始人盖茨凭借760亿美元净资产，连续第22年高居《福布斯》榜首2017年11月,比尔盖茨当选中国工程院外籍院士。</p>
            <!-- 中间三个卡片 -->
            <div class="threeCard">
              <div class="position">
                <svg-icon icon-class="desk" class="deskIcon"></svg-icon>
                <div class="right">
                  <h4>职位</h4>
                  <p>运维人员</p>
                </div>
              </div>
              <div class="position">
                <svg-icon icon-class="nav" class="deskIcon"></svg-icon>
                <div class="right">
                  <h4>部门</h4>
                  <p>研发部门</p>
                </div>
              </div>
              <div class="position">
                <svg-icon icon-class="man" class="deskIcon"></svg-icon>
                <div class="right">
                  <h4>性别</h4>
                  <p>女</p>
                </div>
              </div>
            </div>
            <span>同部门人员</span>
            <!-- 下面表格 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="avatar" width="width">
                <div class="avatar">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
              </el-table-column>
              <el-table-column prop="name" width="width">
              </el-table-column>
              <el-table-column prop="sex" width="width">
              </el-table-column>
              <el-table-column prop="position" width="width">
              </el-table-column>
              <el-table-column prop="department" width="width">
              </el-table-column>
              <el-table-column prop="phone" width="width">
              </el-table-column>
              <el-table-column prop="email" width="width">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      tableData: [{ avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', name: '许三多', sex: '1', position: '运维人员', department: '研发部', phone: '15635946125', email: '148143@qq.com' },{ avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', name: '许三多', sex: '1', position: '运维人员', department: '研发部', phone: '15635946125', email: '148143@qq.com' },{ avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', name: '许三多', sex: '1', position: '运维人员', department: '研发部', phone: '15635946125', email: '148143@qq.com' }]
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
::v-deep .el-card__header{
  font-size: 28px;
}
.cardBody {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  padding-bottom: 30px;
}
.sideCard .el-card {
  width: 320px;
  height: 680px;
  background-color: #e1eeff;
  border: 1px solid #e8e8e8;
  .block .el-avatar {
    margin-left: 80px;
    margin-top: 30px;
  }
  .phoneIcon {
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }
  p {
    margin-left: 70px;
    font-size: 18px;
    color: #246ee9;
    margin-top: 30px;
    .emailIcon {
      font-size: 20px;
      margin-right: 5px;
    }
  }
}
.description {
  margin-right: 30px;
  width: 60%;
  span {
    font-size: 28px;
  }
  h3 {
    font-size: 28px;
    margin-top: 0;
  }
  p {
    font-size: 18px;
    color: #666666;
    line-height: 30px;
  }
  .threeCard {
    margin-top: 50px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-around;
    .position {
      width: 300px;
      height: 100px;
      border: 1px solid #f1f1f1;
      border-radius: 10px;
      display: flex;
      .deskIcon {
        width: 50px;
        height: 50px;
        margin-top: 25px;
        margin-left: 30px;
      }
      .right {
        margin-left: 20px;
        display: flex;
        flex-direction: column;

        h4 {
          font-size: 16px;
          color: #ccc;
          margin-bottom: 5px;
        }
        p {
          font-size: 24px;
          margin: 0;
        }
      }
    }
  }
}
</style>

