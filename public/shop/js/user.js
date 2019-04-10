$.ajax ({
  url: '/user/queryUserMessage',
  success: function(info ){
    if(info.error) {
      location.href = 'login.html?from=' + location.href
    }
    $('.userinfo').html(template('tpl',info))
  }
})
