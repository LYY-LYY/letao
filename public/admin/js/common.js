$(document).ajaxStart(function () {
  NProgress.start()
})
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done()
  },500)
})


// 二级菜单显示和隐藏
$('.second').prev().on('click',function () {
  // console.log('hahahah');
  
  $(this).next().stop().slideToggle()
})

// 菜单的显示和隐藏
$('.topbar .left').click(function (){
  $('.lt_aside,.lt_main,.topbar').toggleClass('now')
})

// 退出功能
$('.topbar .right').on('click', function () {
  $('#logoutModal').modal('show')
})

// 给确定按钮注册事件,注意: 不讨在事件中注册事件
$('.confirm').on('click', function () {
  // $.ajax ({
  //   type: 'get',
  //   url: '/employee/employeeLogout',
  //   success: function (info) {
  //     if(info.success) {
  //       location.href = 'login.html'
  //     }
  //   }
  // })

  $.get('/employee/employeeLogout',function (info) {
    if(info.success) {
      location.href = 'login.html'
    }
  })
})
/**
 * 
 * @param {*} info 分页的数据
 * @param {*} render 点击分页后的回调函数
 */
function paginator (info,render) {
  $('#paginator').bootstrapPaginator({
    bootstrapMajorVersion : 3,
    currentPage: info.page,
    totalPages: Math.ceil(info.total / info.size),
    onPageClicked: function (a , b, c, p) {
      render(p)
    }
  })
}