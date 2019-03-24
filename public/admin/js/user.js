$(function () {
  // var page = 1
  var pageSize = 5
  var id, isDelete
  render(1)

  // 启用和禁用功能
  $('tbody').on('click', '.btn', function () {
    $('#userModal').modal('show')
    id = $(this).parent().data('id')
    isDelete = $(this).hasClass('btn-success') ? 1 : 0
  })
  $('.update').on('click', function () {

    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id : id,
        isDelete: isDelete
      },
      success: function (info) {
        if(info.success) {
          $('#userModal').modal('hide')
          render(1)
        }
      }
    })
  })



  // 渲染
  function render(page) {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        var html = template('user_tpl', info)
        $('tbody').html(html)

        // $('#paginator').bootstrapPaginator({
        //   // 版本号
        //   bootstrapMajorVersion: 3,
        //   currentPage: page,
        //   totalPages: Math.ceil(info.total / info.size),
        //   onPageClicked: function (a, b, c, newpage) {
        //     page = newpage
        //     render()
        //   }
        // })
        paginator(info,render)

      }
    })
  }

})