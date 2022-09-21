<template>
  <div class="echarts">
    <!-- 头部 四个展示图 -->
    <el-row>
      <el-col :span="6">
        <!-- 总销售量 -->
        <el-card class="box-card" :body-style="{padding:'5px 20px', minHeight:'230px'}">
          <div class="header">
            <span>总销售额</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="total">
            ￥126,560
          </div>
          <div class="trends">
            <span>周同比 12% <i class="el-icon-caret-top"></i></span>
            <span>日环比 11% <i class="el-icon-caret-bottom"></i></span>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>日均销售额</span>
            <span>￥12,243</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 访问量 雷达图 -->
        <el-card class="box-card" :body-style="{padding:'5px 20px', minHeight:'230px'}">
          <div class="header">
            <span>访问量</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <RadarChart></RadarChart>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>日访问量</span>
            <span>1243</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 支付笔数 饼图 -->
        <el-card class="box-card" :body-style="{padding:'5px 20px', minHeight:'230px'}">
          <div class="header">
            <span>支付笔数</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <PieChart></PieChart>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>转化率</span>
            <span>1,234</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <!-- 运营活动效果 柱状图 -->
        <el-card class="box-card" :body-style="{padding:'5px 20px', minHeight:'230px'}">
          <div class="header">
            <span>运营活动效果</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <BarChart></BarChart>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>周同比 12% <i class="el-icon-caret-top"></i></span>
            <span>日环比 11% <i class="el-icon-caret-bottom"></i></span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 中部 折线图 -->
    <el-row>
      <el-card class="line-card">
        <!-- 日期选择 -->
        <div class="line-header">
          <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <!-- 标签页选择 -->
        <el-tabs v-model="activeName" @tab-click="handleClickLineData">
          <el-tab-pane label="销售额" name="newVisitis"></el-tab-pane>
          <el-tab-pane label="访问量" name="messages"></el-tab-pane>
        </el-tabs>
        <el-row>
          <!-- 折线图 -->
          <el-col :span="16">
            <div class="chart">
              <LineChart :chartData="ChartData"></LineChart>
            </div>
          </el-col>
          <!-- 表格 -->
          <el-col :span="8">
            <div class="table">
              <h4>门店销售额排名</h4>
              <ul>
                <li>
                  <el-row v-for="(item,index) in salesData" :key="index" class="row">
                    <el-col :span="3">
                      <div :class="item.num > 3 ? 'circleGory' : 'circleBlack'">{{item.num}}</div>
                    </el-col>
                    <el-col :span="16">{{item.title}}</el-col>
                    <el-col :span="5">{{item.val}}</el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <!-- 热门搜索+饼图 -->
    <el-row>
      <el-col :span="12">
        <!-- 线上热门搜索 -->
        <el-card class="hots">
          <div slot="header" class="clearfix">
            <span>线上热门搜索</span>
            <el-dropdown style="float:right" trigger="click">
              <span class="el-dropdown-link">
                ...<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>菜单一</el-dropdown-item>
                <el-dropdown-item>菜单二</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-table :data="tableData" height="260" style="width:100%" :default-sort="{prop: 'numPeople', order: 'descending'}">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="keys" label="关键词" width="400">
            </el-table-column>
            <el-table-column prop="numPeople" sortable label="人数">
            </el-table-column>
            <el-table-column prop="increase" sortable label="周增长率">
            </el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="1000" class="pagination">
          </el-pagination>
        </el-card>
      </el-col>
      <el-col :span="12">
        <!-- 销售额类别占比 -->
        <el-card class="hots">
          <div slot="header" class="clearfix">
            <span>销售额类别占比</span>
            <el-dropdown style="float:right" trigger="click">
              <span class="el-dropdown-link">
                ...<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>菜单一</el-dropdown-item>
                <el-dropdown-item>菜单二</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-radio-group v-model="radio1">
              <el-radio-button label="全渠道"></el-radio-button>
              <el-radio-button label="直达"></el-radio-button>
              <el-radio-button label="百度"></el-radio-button>
              <el-radio-button label="谷歌"></el-radio-button>
              <el-radio-button label="必应"></el-radio-button>
              <el-radio-button label="其它"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="chart">
            <AreaChart></AreaChart>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="hots">
        <div slot="header" class="clearfix">
          <span>周搜索趋势</span>
          <el-dropdown style="float:right" trigger="click">
            <span class="el-dropdown-link">
              ...<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>菜单一</el-dropdown-item>
              <el-dropdown-item>菜单二</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="chart">
          <BarChart></BarChart>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import RadarChart from '@/components/RaderChart.vue'
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'
import AreaChart from '@/components/AreaChart.vue'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  components: { RadarChart, PieChart, BarChart, LineChart, AreaChart },
  name: 'Echarts',
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      activeName: 'newVisitis',
      radio1: '全渠道',
      ChartData: lineChartData.newVisitis,
      salesData: [],
      tableData: []
    }
  },
  created() {
    for (let i = 1; i < 9; i++) {
      this.salesData.push({
        num: i,
        title: `公专路 ${i} 号店`,
        val: '231,456'
      })
      this.tableData.push({
        num: i,
        keys: `搜索关键词-${i}`,
        numPeople: Math.round(Math.random() * 500 + 300),
        increase: `${Math.round(Math.random() * 50 + 40)}%`
      })
    }
  },
  methods: {
    // 标签页转换 获取相应数据
    handleClickLineData(tab) {
      let name = tab.$options.propsData.name
      this.ChartData = lineChartData[name]
    },
    handleClick() {}
  }
}
</script>

<style lang="less" scoped>
.echarts {
  .box-card {
    padding: 5px 10px;
    margin: 0 10px 10px 10px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25px;
    color: #97a8be;
    font-size: 14px;
  }
  .total {
    height: 140px;
    line-height: 100px;
    font-size: 30px;
  }
  .trends {
    font-size: 14px;
    height: 22px;
    span {
      display: inline;
      i {
        color: red;
      }
    }
    span:last-child {
      margin-left: 20px;
      i {
        color: green;
      }
    }
  }
  .hr {
    margin-bottom: 10px;
    border-top: 1px solid #e8e8e8;
  }
  .footer {
    font-size: 14px;
    height: 22px;

    span {
      display: inline;
      i {
        color: red;
      }
    }
    span:last-child {
      margin-left: 20px;
      i {
        color: green;
      }
    }
  }
  .chart {
    height: 160px;
  }

  .line-header {
    position: absolute;
    top: 15px;
    right: 20px;
  }
  .line-card {
    position: relative;
    margin: 10px;

    .chart {
      padding: 0 10px;
      width: 100%;
      height: 300px;
    }

    .table {
      padding: 0 10px;
      h4 {
        margin-bottom: 15px;
      }

      ul {
        list-style: none;

        .row {
          margin-bottom: 10px;
        }
      }
      .circleBlack {
        width: 20px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        background-color: #314659;
        color: #f1f5f2;
        border-radius: 50%;
        font-weight: 700;
      }
      .circleGory {
        width: 20px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        background-color: #f5f5f5;
        color: #665d6c;
        border-radius: 50%;
      }
    }
  }
  .hots {
    margin: 10px;
    height: 400px;

    .clearfix {
      color: #97a8be;
      font-size: 16px;
    }

    .pagination {
      position: absolute;
      bottom: 20px;
      left: 10%;
    }
    .chart {
      height: 290px;
    }
  }
}
</style>