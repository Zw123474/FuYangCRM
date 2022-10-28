<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import * as echarts from 'echarts'
import { debounce } from '@/utils'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      chart: null,
      data: [
        { value: 30, name: '处理中' },
        { value: 20, name: '处理完成待确认' },
        { value: 20, name: '已完结' },
        { value: 80, name: '待处理' },
      ]
    }
  },
  mounted () {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '运维工单统计',
          textStyle: {
            color: 'black'
          }
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: true,
          bottom:'0%',
          textStyle:{
            fontSize: '10'
          }
        },
        series: [
          {
            // name: 'Access From',
            left: '0%',
            type: 'pie',
            radius: ['45%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: '24',
            //     color: '#E6E6E6',
            //     fontWeight: 'bold',
            //   },
            // },
            labelLine: {
              show: false,
            },
            data: this.data,
          },
        ],
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: "#0080E2" },
            { offset: 1, color: '#6145c0' },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: "#FF7070" },
            { offset: 1, color: '#5fe1df' },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: "#FF7B1A" },
            { offset: 1, color: '#e2eefe' },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: "#FF7B1A" },
            { offset: 1, color: '#016eff' },
          ]),
        ],
      })
    }
  }
}
</script>
