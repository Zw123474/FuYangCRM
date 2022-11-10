<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-menu :default-active="defaultActive" :collapse="isCollapse" router = router @select="handSelect" background-color="#101336" :text-color="variables.menuText" :unique-opened="true" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
      <template v-for="(item,index) in menuList">
        <el-submenu :key="index" v-if="item.children && item.children.length!=0" :index="item.name" class="titleText">
          <template slot="title">
            <svg-icon :icon-class="item.icon" class="Icon"></svg-icon>
            <span >{{item.name}}</span>
          </template>
          <el-menu-item v-for="val in item.children" :index="val.path" :key="val.id">
            <template slot="title">
              <i :class="val.icon" alt=""></i>
              <span>{{val.name}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item class="left" v-else :key="item.id" :index="item.path">
          <svg-icon :icon-class="item.icon" class="Icon"></svg-icon>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data () {
    return {
      router: true,
      label: false,
      defaultActive: '0',
      menuList: [],
      show: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  watch:{
    $route(){
      this.setCurrentRoute()
    }
  },
  created () {
    this.getMenu()
    console.log(this.$route);
    console.log(this.$route.path);
  },
  mounted () {
    this.setCurrentRoute()
  },
  methods: {
    handSelect (index, indexPath) {
      this.show = index
      console.log(index)
    },
    setCurrentRoute () {
      this.defaultActive = this.$route.name;//关键   通过他就可以监听到当前路由状态并激活当前菜单
      console.log(this.defaultActive, 'defaultActive')
      // console.log(this.$route.name)
    },
    getMenu () {
      this.$Apis.menuNav().then(res => {
        this.menuList = res.data
        console.log(this.menuList)
        if (this.menuList[0].path) {
          localStorage.setItem('menu', this.menuList[0].path)
        } else {
          localStorage.setItem('menu', this.menuList[0].children[0].path)
        }
        console.log(this.menuList[0].path)
        var perms = []
        for (let i in this.menuList) {
          for (let j in this.menuList[i].children) {
            for (let z in this.menuList[i].children[j].children) {
              perms.push(this.menuList[i].children[j].children[z].id)
            }
          }
        }
        localStorage.setItem('btn', perms)
        console.log(perms)
      })
    }
  }
}
</script>
<style scoped>
.svg-icon{
  width: 16px !important;
  height: 16px !important;
}
</style>
