<template>
  <div id="raderChart" style="height:100%;width:100%"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'RadarChart',
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
      this.chart = echarts.init(document.getElementById('raderChart'))
      // 绘制图表
      this.chart.setOption({
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 图例组件
        legend: {
          bottom: '10', // 图例组件离容器下侧的距离
          left: '0',
          // 图例的数据数组
          data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
        },
        // 雷达图坐标系组件
        radar: {
          radius: '66%', // 雷达组件的半径
          center: ['50%', '40%'], // 雷达组件相对于中心坐标的位置
          splitNumber: 8, // 指示器轴的分割段数
          splitLine: {
            // 坐标轴在 grid 区域中的分隔线
            lineStyle: {
              color: '#c8c8c8' // 分隔线颜色
            }
          },
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示
            areaStyle: {
              // 分隔区域的样式设置。
              color: 'rgba(127,95,132,.3)', // 分隔区域颜色(背景)
              opacity: 1, // 图形透明度
              shadowBlur: 45, // 图形阴影的模糊大小
              shadowColor: 'rgba(0,0,0,.5)', // 阴影颜色
              shadowOffsetX: 0, // 阴影水平方向上的偏移距离
              shadowOffsetY: 15 // 阴影垂直方向上的偏移距离
            }
          },
          indicator: [
            // 雷达图的指示器，用来指定雷达图中的多个变量（维度）
            { name: 'Sales', max: 10000 },
            { name: 'Administration', max: 20000 },
            { name: 'Information Techology', max: 20000 },
            { name: 'Customer Support', max: 20000 },
            { name: 'Development', max: 20000 },
            { name: 'Marketing', max: 20000 }
          ]
        },
        // 雷达图 数据
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            symbol: 'none', // 标记的图形
            // symbolSize: 0, // 标记的大小
            // 区域填充样式
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            // 数据
            data: [
              {
                value: [5000, 7000, 12000, 11000, 15000, 14000],
                name: 'Allocated Budget'
              },
              {
                value: [4000, 9000, 15000, 15000, 13000, 11000],
                name: 'Expected Spending'
              },
              {
                value: [5500, 11000, 12000, 15000, 12000, 12000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>