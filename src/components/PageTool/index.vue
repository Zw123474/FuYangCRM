<template>
      <el-card>
        <svg-icon icon-class="message" class="messageIcon"></svg-icon>
        <p>您好，欢迎使用富阳集合运维系统，如果有使用疑问请查看说明文档</p>
        <a href="#">查看详情</a>
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
  p{
    margin: 0 10px;
    font-size: 16px;
  }
  a{
    font-size: 14px;
    color: #246ee9;
  }
}
</style>
