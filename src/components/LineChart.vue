<template>
  <div id="lineChart" style="height:100%;width:100%">

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  props: {
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptionChart(val)
      }
    }
  },
  methods: {
    setOptionChart({ expectedData, actualData } = {}) {
      this.chart.setOption({
        color: ['#5470C6', '#EE6666'],
        // 直角坐标系内绘图网格
        grid: {
          top: 30,
          left: '2%',
          right: '2%',
          bottom: '5%',
          // grid 区域是否包含坐标轴的刻度标签  防止标签溢出
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // 刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间---- 去掉留白
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#008acd'
            }
          },
          // 坐标轴刻度设置
          axisTick: {
            show: false
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#008acd'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f0f0f0'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#f9f9f9', '#fefefe']
            }
          }
        },
        // 提示框组件
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderColor: 'rgba(0,0,0,0.4)',
          textStyle: {
            color: '#fff'
          }
        },
        // 图例组件
        legend: {},
        series: [
          {
            name: 'actual',
            type: 'line',
            smooth: true,
            data: actualData,
            areaStyle: {
              color: '#f6fafe'
            }
          },
          {
            name: 'expected',
            type: 'line',
            smooth: true,
            data: expectedData
          }
        ]
      })
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('lineChart'))
      // 绘制图表
      this.setOptionChart(this.chartData)
    }
  }
}
</script>

<style>
</style>