<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'App',
  data () {
    return {
      // userId: '142250454420344787',// 运维人员调试
      // userId: '172026491135077456',// 部门主管调试
      userId: '010604033233788234',  // 总调度调试
      // userId:'01063733533223364929',
      // userId: ''
    }
  },
  methods: {
    // userLogin (callback, data) {
    //   this.$Apis.login(data).then(callback)
    // },
    Dingding () {
      if (dd.env.platform != 'notInDingTalk') {
        let _this = this
        dd.ready(function () {
          // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
          dd.runtime.permission.requestAuthCode({
            corpId: "dingdf914f4d1d753d5cf2c783f7214b6d69",// 我们的
            // corpId:"dingc4aa4304d998d0d2f5bf40eda33b7ba0",// 客户的
            onSuccess: (result) => {
              _this.$Apis.login({
                authCode: result.code
              }).then(res => {
                // localStorage.setItem('userInfo',res.data)
                // localStorage.getItem('userInfo').userName
                // alert(res)
                // alert(JSON.stringify(res))
                localStorage.setItem('token', res.data.tokenValue)
                _this.userId = res.data.loginId
                _this.getUserInfo()
              })
            },
            onFail: function (err) {
              alert(err)
            }
          });
        });
      }
    },
    getUserInfo () {
      let data = {
        id: this.userId
      }
      this.$Apis.userDetails(data).then(res => {
        // console.log(res);
        localStorage.setItem('userInfo', JSON.stringify(res.data))
      })
    }
  },
  created () {
    this.Dingding()
    this.getUserInfo()
    // console.log(localStorage.getItem('token'));
  }
}
</script>
