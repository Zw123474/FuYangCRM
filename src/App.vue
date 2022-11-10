<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'App',
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
            corpId: "dingdf914f4d1d753d5cf2c783f7214b6d69",
            onSuccess: (result) => {
              _this.$Apis.login({
                authCode: result.code
              }).then(res => {
                // localStorage.setItem('userInfo',res.data)
                // localStorage.getItem('userInfo').userName
                alert(res)
                alert(JSON.stringify(res))
              })
            },
            onFail: function (err) {
              alert(err)
            }
          });
        });
      }
    }
  },
  mounted () {
    this.Dingding()
  }
}
</script>
