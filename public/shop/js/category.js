$(function () {
  var renderFirst = function () {
    $.ajax ({
      url: '/category/queryTopCategory',
      success: function (info) {
        // console.log(info);
        $('.main_left ul').html(template('tpl',info))
        // 默认渲染第一个一级分类的二级分类
        renderSecond(info.rows[0].id)
      }
    })
  }

  // 渲染指定的一级的二级分类
  var renderSecond = function(id) {
    $.ajax ({
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      success : function (info) {
        // console.log(info);
        $('.main_right ul').html(template('tpl2',info))
      }
    })
  }

  renderFirst()

  // 点击一级分类,动态渲染二级分类
  $('.main_left').on ('click','li',function() {
    $(this).addClass('active').siblings().removeClass('active')

    var id = $(this).data('id')
    renderSecond(id)
  })


})