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
      type: Array,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    centerData: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      chart: null,
      dataNew: []
    }
  },
  watch: {
    piedata () {
      if (this.piedata.length > 0) {
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
      this.piedata.map(item => {
        let obj = {
          name: item.label,
          value: item.value
        }
        this.dataNew.push(obj)
      })
      this.chart = echarts.init(this.$el, 'macarons')
      var data = this.dataNew
      this.chart.setOption({

        title: [{
          text: `${this.title}`,
          x: "center",
          y: "58%",
          left: "63%",
          textAlign: "center",
          textStyle: {
            fontSize: 14,
            color: "black",
          },
        },
        {
          text: `${this.centerData}`,
          x: "center",
          y: "40%",
          left: "63%",
          textAlign: "center",
          textStyle: {
            fontSize: 20,
            fontWeight: "bolder",
            color: "black",
          },
        }],
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          icon: "circle",
          left: 'left',
          // textStyle: {
          //   fontSize: '16'
          // },
          textStyle: {
            rich: {
              a: {
                color: 'black',
                fontSize: 16,
                padding: [0, 10, 0, 0]
              },
              b: {
                color: 'black',
                fontSize: 16,
                padding: [0, 10, 0, 0]
              }
            }
          },
          formatter: function (name) {
            // console.log(name);
            // console.log(data);
            var target;
            for (var i = 0, l = data.length; i < l; i++) {
              if (data[i].name == name) {
                target = data[i].value;
              }
            }
            return `{a| ${name}}{b| ${target}}`;
          }
        },
        series: [
          {
            // name: 'Access From',
            left: '30%',
            type: 'pie',
            radius: ['70%', '90%'],
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
            data: this.dataNew,
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
