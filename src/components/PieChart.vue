<template>
  <div id="pieChart" style="height:100%;width:100%"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'PieChart',
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
      this.chart = echarts.init(document.getElementById('pieChart'))
      // 绘制图表
      this.chart.setOption({
        color: ['#2ec7c9', '#b6a2de', '#63c2ff', '#ffb980', '#d87a80'],
        // 提示框组件
        tooltip: {
          trigger: 'item', // 数据项图形触发
          // 提示框浮层内容格式器
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderColor: 'rgba(0,0,0,0.4)',
          textStyle: {
            color: '#fff'
          }
        },
        // 图例组件
        legend: {
          bottom: '10',
          left: 0
        },
        // 饼图数据
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            radius: [15, 95], // 饼图的半径
            center: ['50%', '40%'],
            // 是否展示成南丁格尔图
            roseType: 'radius', // 扇区圆心角展现数据的百分比，半径展现数据的大小
            // 图形样式
            itemStyle: {
              borderRadius: 1 // 指定饼图扇形区块的内外圆角半径
            },
            data: [
              { value: 320, name: 'Industries', label: { color: '#2ec7c9' } },
              { value: 240, name: 'Technology', label: { color: '#b6a2de' } },
              { value: 149, name: 'Forex', label: { color: '#63c2ff' } },
              { value: 100, name: 'Gold', label: { color: '#ffb980' } },
              { value: 59, name: 'Forecasts', label: { color: '#d87a80' } }
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