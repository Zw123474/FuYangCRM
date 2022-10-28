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
    },
    piedata: {
      type: Array
    }
  },
  data () {
    return {
      chart: null,
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
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            fontSize: '16'
          }
        },
        series: [
          {
            // name: 'Access From',
            left: '20%',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
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
            data: this.piedata,
          },
        ],
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: "#FF7070" },
            { offset: 1, color: '#3149f4' },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: "#0080E2" },
            { offset: 1, color: '#74fbdb' },
          ]),
        ],
      })
    }
  }
}
</script>
