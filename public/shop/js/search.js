$(function () {
  var KEY = 'search_history'
  
  var getHistory = function () {
    var result = localStorage.getItem(KEY)
    return JSON.parse(result) || []
  }
  // 渲染历史记录
  var render = function () {
    var history = getHistory()
    // console.log(history);
    $('.lt_history').html( template ('tpl',{rows: history}))
  }
  render()

  // 清空历史记录
  $('.lt_history').on('click','.btn_empty',function() {
    mui.confirm(
      '你确定要清空历史记录吗?',
      '温馨提示',
      ['确定','取消'],
      function(e) {
        if(e.index == 0) {
          localStorage.removeItem(KEY)
          render()
        }
      }
    )
  })
  // 删除单条记录
  $('.lt_history').on('click','.fa-close',function() {
    var index = $(this).data('index')
    var history = getHistory()
    history.splice(index,1)
    localStorage.setItem(KEY,JSON.stringify(history))
    render()
  })
  // 增加历史记录功能
  $('.lt_search button').on('click', function () {
    var value = $('.lt_search input').val()
    $('.lt_search input').val('')
    var history = getHistory()
    // 去重操作
    var index = history.indexOf(value)
    // console.log(index);
    if(index != -1) {
      history.splice(index,1)
    }
    history.unshift(value)
    localStorage.setItem(KEY,JSON.stringify(history))
    // render()
    // 跳转到商品搜索页面
    location.href = 'searchlist.html?key=' + value
  })
})