$(function () {

  // 获取key对应的值
  var search = decodeURI(location.search)
  var key = search.split('=')[1]
  $('.lt_search input').val(key)
  render()

$('.lt_search button').on('click',function() {
  location.href = 'searchList.html?key=' + $('.lt_search input').val()
})
  // 排序功能
  $('.lt_sort li[data-type]').on('click',function() {
    var $this =$(this)
    if($this.hasClass('active')) {
      $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down')
    }else {
      $this.addClass('active').siblings().removeClass('active')
      // 让所有的小箭头默认向下
      $('.lt_sort span').addClass('fa-angle-down').removeClass('fa-angle-up')
    }
    render()
  })

  // 商品渲染
  function render() {
    $('.product').html('<div class="loading"></div>')
    var obj = {
      page: 1,
      pageSize: 100,
      proName: $('.lt_search input').val()
    }
    // 判断是否传递第四个参数
    var $active = $('.lt_sort li.active')
    if($active.length) {
      var type = $active.data('type')
      var value = $active.find('span').hasClass('fa-angle-up')? 1: 2
      obj[type] = value
    }

    $.ajax({
      url: '/product/queryProduct',
      data: obj,
      success: function(info) {
        // console.log(info);
        setTimeout(function(){
          $('.product').html(template('tpl',info))
        },1000)
      }
    })
  }
})