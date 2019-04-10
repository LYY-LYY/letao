$(function () {
  var id = location.search.split('=')[1]
  render()

  // 加入购物车功能
  $('#addCart').on('click', function (){
    var size = $('.lt_size span.current').text()
    if(!size) {
      mui.toast("请选择一个尺码")
      return
    }
    var num = $('.mui-numbox-input').val()
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: id,
        num: num,
        size: size
      },
      success: function(info) {
        if(info.error == 400) {
          location.href = 'login.html?from=' + location.href
        }
        if(info.success) {
          mui.confirm('恭喜你，添加购物车成功了', '温馨提示', ['去购物车', '继续浏览'],function(e) {
            if(e.index == 0) {
              location.href = 'cart.html'
            }
          })
        }
      }
    })
  })

  function render() {
    $.ajax({
      url: '/product/queryProductDetail',
      data: {
        id:id
      },
      success: function (info) {
        $('.mui-scroll').html(template('tpl',info))

        // 渲染模版完成后,重新初始化轮播图
        mui('.mui-slider').slider({
          interval: 3000
        })
        // 手动初始化numberbox
        mui('.mui-numbox').numbox()
        // 尺码选择功能
        $('.lt_size span').on('click',function() {
          $(this).addClass('current').siblings().removeClass('current')
        })
      }
    })
  }
})