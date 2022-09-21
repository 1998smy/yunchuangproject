<template>
  <div id="barChart" ref="barChart" style="height:100%;width:100%"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarChart',
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.barChart)
      this.$nextTick(() => {
        this.chart.resize()
      })
      // 绘制图表
      this.chart.setOption({
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef'],
        // 直角坐标系内绘图网格
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          // grid 区域是否包含坐标轴的刻度标签  防止标签溢出
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // 坐标轴线相关设置
          axisLine: {
            show: true,
            lineStyle: {
              color: '#5db4df',
              width: 1
            }
          },
          // 坐标轴刻度相关设置
          axisTick: {
            // 保证刻度线和标签对齐
            alignWithLabel: true,
            lineStyle: {
              color: '#5db4df',
              width: 1
            }
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#5db4df',
              width: 1
            }
          },
          // 坐标轴在 grid 区域中的分隔线
          splitLine: {
            lineStyle: {
              color: '#efefef',
              width: 1
            }
          },
          // 坐标轴在 grid 区域中的分隔区域
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#f9f9f9', '#fff']
            }
          }
        },
        // 提示框组件
        tooltip: {
          trigger: 'axis', // 坐标轴触发
          // 坐标轴指示器配置项
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderColor: 'rgba(0,0,0,0.4)',
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: 'Email',
            type: 'bar',
            stack: 'Ad',
            // 高亮的图形样式和标签样式
            emphasis: {
              focus: 'none' // 不淡出其它图形
            },
            data: [79, 52, 200, 334, 390, 330, 220]
          },
          {
            name: 'Union Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'none'
            },
            data: [80, 52, 200, 334, 390, 330, 220]
          },
          {
            name: 'Video Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'none'
            },
            data: [30, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>