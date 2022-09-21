<template>
  <div id="areaChart" style="height:100%;width:100%"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'AreaChart',
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
      this.chart = echarts.init(document.getElementById('areaChart'))
      // 绘制图表
      this.chart.setOption({
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderColor: 'rgba(0,0,0,0.4)',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联邦广告', '视频广告', '百度', '谷歌', '必应', '其它'],
          orient: 'vertical',
          left: 30,
          top: 20
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            top: 20,
            bottom: '10%',
            center: '55%',
            radius: [0, '30%'],
            label: {
              position: 'inner',
              fontSize: 12,
              color: '#fff',
              textBorderColor: '#5ab1ef',
              textBorderWidth: 1
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直达', selected: true },
              { value: 679, name: '营销广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['45%', '60%'],
            center: '55%',
            labelLine: {
              length: 30
            },
            top: 20,
            bottom: '10%',
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eeeeee',
              borderColor: '#b8b8b8',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#6E7079',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#b8b8b8',
                  width: '100%',
                  borderWidth: 1,
                  height: 0
                },
                b: {
                  // color: ['#5ab1ef', '#2ec7c9', '#b6a2de', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa'],
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33
                },
                per: {
                  color: '#fff',
                  backgroundColor: '#4C5058',
                  padding: [3, 4],
                  borderRadius: 4
                }
              }
            },
            data: [
              { value: 335, name: '直达', label: { color: '#5ab1ef' } },
              { value: 310, name: '邮件营销', label: { color: '#ffb980' } },
              { value: 234, name: '联邦广告', label: { color: '#d87a80' } },
              { value: 135, name: '视频广告', label: { color: '#8d98b3' } },
              { value: 1048, name: '百度', label: { color: '#e5cf0d' } },
              { value: 251, name: '谷歌', label: { color: '#97b552' } },
              { value: 147, name: '必应', label: { color: '#95706d' } },
              { value: 102, name: '其它', label: { color: '#dc69aa' } }
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