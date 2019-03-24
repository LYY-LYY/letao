$(function() {
  var data = {
    title: '2018年注册人数',
    list: [
      { month: '1月', count: 1000, count1: 500 },
      { month: '2月', count: 2020, count1: 500 },
      { month: '3月', count: 1500, count1: 500 },
      { month: '4月', count: 2000, count1: 500 },
      { month: '5月', count: 3000, count1: 500 },
      { month: '6月', count: 800, count1: 500 }
    ]
  }
  var months = []
  var counts = []
  var counts1 = []
  for(var i = 0; i < data.list.length; i++) {
    months.push(data.list[i].month)
    counts.push(data.list[i].count)
    counts1.push(data.list[i].count1)
  }
  var myChart = echarts.init(document.querySelector('.lt_content .left'));
  var option = {
    title: {
        text: data.title
    },
    tooltip: {},
    legend: {
        data:['人数', '在线人数']
    },
    xAxis: {
        data: months
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: counts
    },
    {
      name: '在线人数',
      type: 'bar',
      data: counts1
    }]
  };
  myChart.setOption(option);
  


var rightChart = echarts.init(document.querySelector('.lt_content .right'))
var rightOptions = {
  title : {
      text: '热门品牌销售',
      subtext: '2019年3月',
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','阿迪王','新百伦','匡威']
  },
  series : [
      {
          name: '销售情况',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'阿迪王'},
              {value:135, name:'新百伦'},
              {value:1548, name:'匡威'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};
  rightChart.setOption(rightOptions)
})
