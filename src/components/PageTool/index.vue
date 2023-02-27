<template>
  <el-card>
    <svg-icon icon-class="message" class="messageIcon"></svg-icon>
    <p>您好，欢迎使用富阳集合运维系统，如果有使用疑问请查看说明文档</p>
    <!-- <a href="http://gongdan.java.68hanchen.com/file/%E5%AF%8C%E9%98%B3%E5%8D%8E%E6%95%B0%E8%BF%90%E7%BB%B4%E5%B7%A5%E5%8D%95%E7%B3%BB%E7%BB%9F%E6%93%8D%E4%BD%9C%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf">查看详情</a> -->
    <a href="https://jkywxt.fywasu.com/file/%E5%AF%8C%E9%98%B3%E5%8D%8E%E6%95%B0%E8%BF%90%E7%BB%B4%E5%B7%A5%E5%8D%95%E7%B3%BB%E7%BB%9F%E6%93%8D%E4%BD%9C%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf">查看详情</a>
  </el-card>
</template>

<script>
export default {
  filters: {},
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  .messageIcon {
    width: 20px;
    height: 20px;
  }
  padding: 10px;
  background-color: #d8e4f2;
  border: 1px solid #246ee9;
  border-radius: 5px;
  display: flex;
  align-items: center;
  p {
    margin: 0 10px;
    font-size: 16px;
  }
  a {
    font-size: 14px;
    color: #246ee9;
  }
}
</style>
