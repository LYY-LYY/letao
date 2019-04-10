$(function() {
  $('.btn_login').on('click', function() {
    var username = $('[name=username]').val().trim()
    if(!username) {
      mui.toast('用户名不能为空')
      return
    }
    var password = $('[name=password]').val().trim()
    if(!password) {
      mui.toast('用户密码不能为空')
      return
    }
    $.ajax ({
      type: 'post',
      url: '/user/login',
      data: $('form').serialize(),
      success: function(info) {
        if(info.error) {
          mui.toast('用户名或者密码错误')
        }
        if(info.success) {
          var from = location.search.replace('?from=','')
          if(from) {
            location.href  = from
          }else {
            location.href = 'index/html'
          }

        }
      }
    })
  })
})