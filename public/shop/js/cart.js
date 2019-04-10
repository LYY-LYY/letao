$(function () {
  render()

  $('#OA_task_1').on('click','.btn_delete',function (){
    var id = $(this).data('id')
    mui.confirm('你确定要删除吗?不买一回就没了哟', '警告', ['确定', '取消'], function(e) {
      if(e.index == 0) {
        $.ajax ({
          url: '/cart/deleteCart',
          data: {
            id:[id]
          },
          success: function(info) {
            if(info.success) {
              render()
            }
          }
        })
      }
  })
  })



  function render() {
    $.ajax({
      url: '/cart/queryCart',
      success:　function (info) {
        if(info.error) {
          location.href = 'login.html?from=' + location.href
        }
        $('#OA_task_1').html(template('tpl',{rows: info}))
      }
    })
  }
})