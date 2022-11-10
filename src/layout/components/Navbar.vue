<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="@/assets/common/avatar.png" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-badge is-dot class="item" :hidden="clickIf">
      <svg-icon icon-class="bell" class="bellIcon" @click="goNotice"></svg-icon>
    </el-badge>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data () {
    return {
      clickIf: false,
      isShow: false
    }
  },
  watch: {
    $route (to, from) {
      if (to.path !== "/notice/notice") {
        this.clickIf = false
      } else {
        this.clickIf = true
      }
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    goNotice () {
      this.$router.push({ name: 'announcement', query: { btnShow: this.isShow } })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 75px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 75px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    line-height: 78px;
    font-size: 16px;
  }
  .item {
    margin-right: 40px;
    float: right;
    margin-top: 25px;
  }
  .bellIcon {
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 90px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
      }
    }
  }
}
</style>
