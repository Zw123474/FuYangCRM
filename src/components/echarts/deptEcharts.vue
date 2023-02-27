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
      default: 'chart1'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    departmentWorkloadStatistics: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      chart1: null
    }
  },
  watch: {
    departmentWorkloadStatistics: {
      immediate: true,
      handler (val) {
        if (val.value.length > 0) {
          this.initChart()
        }
      },
      deep: true
      // if (this.departmentWorkloadStatistics.value > 0) {
      //   console.log(this.departmentWorkloadStatistics);
      //   this.initChart()
      // }
    }
  },
  mounted () {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart1) {
        this.chart1.resize()
      }
    }, 1000)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy () {
    if (!this.chart1) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart1.dispose()
    this.chart1 = null
  },
  methods: {
    initChart () {
      if(this.chart1 != null){
        this.chart1.dispose()
      }
      // console.log(1);
      this.chart1 = echarts.init(this.$el, 'macarons')
      this.chart1.setOption({
        legend: {},
        //画布边距
        grid: {
          left: '5%',
          right: '8%',
          top: '3%',
          bottom: '3%',
          width: "90%", // 宽度
          height: "80%",// 高度
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitNumber: 5,
          splitLine: {//虚线
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#D0DEEE40'
            }
          },
          axisLabel: {
            color: '#333',//x字体颜色
            fontSize: '14px',
          },
        },
        yAxis: {
          type: 'category',
          data: this.departmentWorkloadStatistics.label,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#333',//y字体颜色
            fontSize: '12px',
          },

        },
        series: [
          {
            type: 'bar',
            barWidth: 12,
            data: this.departmentWorkloadStatistics.value,
            showBackground: true,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [ // color在这里
                {
                  offset: 0,
                  color: '#84a7fb'
                },
                {
                  offset: 1,
                  color: '#4578fb'
                }
              ])

            },
            label: {
              show: true,
              lineHeight: 20,
              position: 'right',
              color: 'black',
              fontSize: 10
            }
          }
        ]
      })
    }
  }
}
</script>
