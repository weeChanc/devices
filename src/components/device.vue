<template>
  <section class="device-card device">
    <div class="card-info">
      <span class="order">34235465784</span>
      <span class="work-id">一楼 第六个除尘间</span>
    </div>
    <div class="card-chart">
      <div class="chart press">
        <div :id="'chartright'+index"></div>
      </div>
      <div class="device-status">
        <span style="color: #c0a260;">设备状态</span>
        <div class="status-item nice actived">
          <span>良好</span>
          <i class="pointer "></i>
        </div>
        <div class="status-item bad actived">
          <span>警告</span>
          <i class="pointer"></i>
        </div>
      </div>
      <div class="chart temp">
        <div :id="'chartleft'+index"></div>
      </div>

    </div>
  </section>
</template>

<script>
  const echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/gauge')
  // 引入提示框和图例组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/dataZoom')
  require('echarts/lib/component/toolbox')
  export default {
    name: "device",
    props: {
      index:{
        require: true
      }
    },
    data: function () {
      return {
        ratio: 1
      }
    },
    mounted() {
      this.ratio = window.screen.availWidth/1920
      const myChart = echarts.init(document.getElementById('chartleft'+this.index));
      const option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: '设备温度',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            splitNumber: 10,
            detail: {
              formatter: function (value) {
                return (value).toFixed() + "/100"
              },
              offsetCenter: [0, '-120%'],
              fontSize: 20
            },
            axisLine: {
              lineStyle: {
                color: linearColorGradient(10,
                  {index: 0, color: '2fb880'},
                  {index: 9, color: 'ffcd42'},
                  {index: 10, color: 'e94235'}),
                width: 20,
              }
            },
            splitLine: {
              // show: false
            },
            axisTick: {
              // show: false
            },
            axisLabel: {
              show: false
            },
            data: [{value: 50}]
          }
        ]
      };

      setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        myChart.setOption(option, true);
      }, 2000);

      const myChart2 = echarts.init(document.getElementById('chartright'+this.index));
      const option2 = {

        tooltip: {
          formatter: "{a} <br/>{b} : {c}Pa"
        },
        series: [
          {
            name: '设备温度',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            max: 7000,
            min: 0,
            splitNumber: 7,
            detail: {
              formatter: function (value) {
                return (value).toFixed() + "/7000"
              },
              offsetCenter: [0, '-120%'],
              fontSize: 20,

            },

            axisLine: {
              lineStyle: {
                color: linearColorGradient(10, {index: 0, color: '2fb880'},
                  {index: 5, color: 'ffcd42'},
                  {index: 10, color: 'e94235'}),
                width: 20,
              }
            },
            splitLine: {
              // show: false
            },
            axisTick: {
              // show: false
            },
            axisLabel: {
              show: false
            },
            data: [{value: 50}]
          }
        ]
      };

      setInterval(function () {
        option2.series[0].data[0].value = (Math.random() * 7000).toFixed(2) - 0;
        myChart2.setOption(option2, true);
      }, 2000);

      function linearColorGradient(total) {
        const result = []
        for (let i = 2; i < arguments.length; i++) {
          const from = arguments[i - 1]
          const to = arguments[i]
          const r = parseInt(from.color.toString().substring(0, 2), 16)
          const g = parseInt(from.color.toString().substring(2, 4), 16)
          const b = parseInt(from.color.toString().substring(4, 6), 16)
          const tr = parseInt(to.color.toString().substring(0, 2), 16)
          const tg = parseInt(to.color.toString().substring(2, 4), 16)
          const tb = parseInt(to.color.toString().substring(4, 6), 16)
          const weight = (to.index - from.index)

          const ratio = 1 / weight
          const maxRatio = weight / total
          const preRatio = from.index / total
          for (let j = 1; j <= weight; j++) {
            const rr = r + (tr - r) * ratio * j
            const rg = g + (tg - g) * ratio * j
            const rb = b + (tb - b) * ratio * j
            result.push([(preRatio + ratio * j * maxRatio).toFixed(2), "#" + parseInt(rr.toString(16), 16).toString(16) + parseInt(rg.toString(16), 16).toString(16) + parseInt(rb.toString(16), 16).toString(16)])
          }
        }
        return result
      }

      linearColorGradient(200, {index: 0, color: '2fb880'}, {index: 100, color: '4485f2'}, {
        index: 200,
        color: 'e94235'
      })
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 星巴克字体;
    src: url("../assets/font-family/starbucks.otf");
  }

  html {
    font-family: 星巴克字体, sans-serif;
  }

  .device-card {
    border-radius: 18px;
    border: 2px solid #31b880;
    display: inline-block;
    min-width: 520px;
  }

  .device-card > .card-info {
    background: #31b880;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    padding: 8px;
    margin-bottom: 28px;
    color: white;
    letter-spacing: 1.3px;
  }

  .device-card > .card-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .device-card > .card-info > .order {
    margin-left: 8px;
  }

  .device-card > .card-info > .work-id {
    margin-right: 8px;
  }

  .device-card > .card-chart {
    display: flex;
    margin-bottom: 18px;
  }

  .device-status {
    border: 1px dashed #31b880;
    border-radius: 14px;
    width: 110px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    padding-bottom: 12px;
    padding-top: 8px;
  }

  .device-status > span {
    font-size: 16px;
    font-weight: 500;
  }

  .status-item {
    transition: all .32s;
    margin-top: 12px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .status-item.nice.actived {
    margin-top: 18px;
    color: #05a968;
    font-weight: bold;
  }

  .status-item.bad.actived {
    margin-top: 18px;
    color: #fa1617;
    font-weight: bold;
  }

  .pointer {
    width: 24px;
    height: 24px;
    display: inline-block;
    background-color: #bebebe;
    border-radius: 50%;
    margin-left: 8px;
  }

  .status-item.bad.actived .pointer {
    background: white;
    box-shadow: 0 0 4px 4px #fca5a4;
  }

  .status-item.actived .pointer {
    background: white;
    box-shadow: 0 0 4px 4px #ade4d4;
  }

  .status-item.nice.actived .pointer:before {
    content: '';
    display: inline-block;
    border-radius: 50%;
    background-color: #0baa68;
    width: 22px;
    height: 22px;
    position: relative;
    top: 1px;
    left: 1px;
  }

  .status-item.bad.actived .pointer:before {
    content: '';
    display: inline-block;
    border-radius: 50%;
    background-color: #fb0b0b;
    width: 22px;
    height: 22px;
    position: relative;
    top: 1px;
    left: 1px;
  }

  .chart {
    height: 132px;
    position: relative;
  }

  .chart > div {
    height: 205px;
    width: 205px;
  }

  .chart.temp:before {
    position: absolute;
    left: 18px;
    bottom: 8px;
    content: '-40°C';
    color: grey;
    font-size: 12px;
  }

  .chart.press:before {
    position: absolute;
    font-size: 12px;
    left: 22px;
    bottom: 8px;
    content: '0 Pa';
    color: grey;
  }

  .chart.temp:after {
    position: absolute;
    right: 18px;
    bottom: 8px;
    content: '100°C';
    color: grey;
    font-size: 12px;
  }

  .chart.press:after {
    position: absolute;
    right: 12px;
    bottom: 8px;
    content: '7000 Pa';
    color: grey;
    font-size: 12px;
  }

</style>
