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
    workOrderStatistics: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      chart: null,
      dataNew: [],
      total: 0
    }
  },
  watch: {
    workOrderStatistics () {
      if (this.workOrderStatistics.length > 0) {
        this.initChart()
      }
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
      if (this.chart != null) {
        this.chart.dispose()
      }
      // console.log(1);
      this.workOrderStatistics.map(item => {
        let obj = {
          name: item.label,
          value: item.value
        }
        this.total = this.total + (item.value - 0)
        this.dataNew.push(obj)
      })

      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: [
          //   {
          //   text: '运维工单统计',
          //   textStyle: {
          //     color: 'black'
          //   }
          // },
          {
            text: "运维工单总计",
            x: "center",
            y: "30%",
            textStyle: {
              fontSize: 16,
              fontWeight: "bolder",
              color: "black",
            },
          },
          {
            text: `${this.total}`,
            x: "center",
            y: "38%",
            textStyle: {
              fontSize: 16,
              color: "black",
            },
          }],
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: true,
          bottom: '10%',
          textStyle: {
            fontSize: '10'
          }
        },
        series: [
          {
            // name: 'Access From',
            left: '0%',
            top:'-25%',
            type: 'pie',
            radius: ['45%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20',
                color: '#000',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            // data: this.workOrderStatistics,
            data: this.dataNew
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
