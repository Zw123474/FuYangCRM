<template>
  <div class="app-container">
    <!-- 大卡片 -->
    <el-card style="border-radius:20px" shadow="never">
      <div slot="header">
        系统人员详情
      </div>
      <div class="cardBody">
        <!-- 左边卡片 -->
        <div class="sideCard">
          <el-card>
            <div class="block" v-if="userDetails.headUrl">
              <el-avatar :size="100" :src="userDetails.headUrl"></el-avatar>
            </div>
            <div class="block" v-else>
              <el-avatar :size="100" :src="circleUrl"></el-avatar>
            </div>
            <h3 style="font-size:32px;margin-left:70px">{{userDetails.userName}}</h3>
            <el-button type="primary" size="small" style="font-size:18px;margin-left:70px">
              <svg-icon icon-class="phone" class="phoneIcon"></svg-icon>{{userDetails.phone}}
            </el-button>
            <!-- <p>
              <svg-icon icon-class="email" class="emailIcon"></svg-icon>
              1481430365@qq.com
            </p> -->
            <!-- <p>
              <svg-icon icon-class="email-1" class="emailIcon"></svg-icon>
              1481430365
            </p> -->
            <p>
              <svg-icon icon-class="email-2" class="emailIcon" style="font-size:24px;margin-right:3px"></svg-icon>
              {{userDetails.phone}}
            </p>
          </el-card>
        </div>
        <!-- 右边介绍 -->
        <div class="description">
          <!-- 上面详情描述 -->
          <div class="txt">
            <h3>个人信息</h3>
            <p style="height:120px" v-if="userDetails.remark != ''">{{userDetails.remark}}</p>
            <!-- 中间三个卡片 -->
            <div class="threeCard">
              <div class="position">
                <svg-icon icon-class="desk" class="deskIcon"></svg-icon>
                <div class="right">
                  <h4>职位</h4>
                  <p>{{userDetails.isAdmin == 1 ? '主管理员' : userDetails.isTotalSchedule == 1 ? '总调度' : userDetails.isDepartmentHeads== 1 ? '部门主管' : '运维人员'}}</p>
                </div>
              </div>
              <div class="position">
                <svg-icon icon-class="nav" class="deskIcon"></svg-icon>
                <div class="right">
                  <h4>部门</h4>
                  <p>{{depName}}</p>
                </div>
              </div>
              <!-- <div class="position">
                <svg-icon icon-class="man" class="deskIcon"></svg-icon>
                <div class="right">
                  <h4>性别</h4>
                  <p>女</p>
                </div>
              </div> -->
            </div>
            <span>同部门人员</span>
            <!-- 下面表格 -->
            <el-table :data="tableData" style="width: 100%" height="420">
              <el-table-column>
                <template slot-scope="scope">
                  <img v-if="scope.row.headUrl" :src="scope.row.headUrl" style="width:50px;height:50px;border-radius:25px">
                  <img v-else :src="circleUrl" style="width:50px;height:50px;border-radius:25px">
                </template>
              </el-table-column>
              <el-table-column prop="userName" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="phone" label="手机号" align="center">
              </el-table-column>
              <el-table-column prop="roleName" label="职称" align="center">
              </el-table-column>
              <el-table-column prop="deptName" label="所属部门" align="center">
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
      tableData: [],
      id: '',
      deptId: '',
      depName: '',
      userDetails: {}
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.deptId = this.$route.query.deptId
    this.depName = this.$route.query.depName
    this.getUserDetails()
    this.getTableData()
  },
  methods: {
    getUserDetails () {
      let data = {
        id: this.id
      }
      // console.log(data);
      this.$Apis.userDetails(data).then(res => {
        // console.log(res.data);
        this.userDetails = res.data
      })
    },
    getTableData () {
      let data = {
        deptId: this.deptId.split(',')[0].toString()
      }
      this.$Apis.userList(data).then(res => {
        // console.log(res.data);
        this.tableData = res.data.list
      })
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
::v-deep .el-card__header {
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
          font-size: 18px;
          margin: 0;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

