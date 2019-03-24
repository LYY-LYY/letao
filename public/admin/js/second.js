$(function() {
  // var page = 1
  var pageSize = 5

  render(1)
  // 添加二级分类功能
  $('.btn_add').on('click',function () {
    $('#addModal').modal('show')

    // 动态渲染一级分类,发送ajax请求
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function(info) {
        $('.dropdown-menu').html(template('tpl2',info))
      }
    })
  })

  // 一级分类选择功能
  $('.dropdown-menu').on('click','li',function () {
    var id = $(this).data('id')
    $('.dropdown-text').text($(this).children().text())
  })


  // 渲染 
  function render(page) {
    $.ajax({
      type: 'get',
      url:'/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        $('tbody').html(template('tpl',info))
        paginator(info,render)
      }
    })
  }
})