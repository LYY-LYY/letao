$(function () {
  // var page = 1
  var pageSize = 5
  render(1)

  // 添加分类
  $('.btn_add').click(function () {
    $('#addModal').modal('show')
  })

  // 表单校验
  var $form = $('form')
  $form.bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能为空'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  })
  // 表单校验成功的事件
  $form.on('success.form.bv', function(e) {
    // 阻止浏览器默认行为
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data: $form.serialize(),
      success: function(info) {
        if(info.success) {
          $('#addModal').modal('hide')
          $form.data('bootstrapValidator').resetForm(true)
          page = 1
          render()
        }
      }
    })
  })

  // 渲染
  function render(page) {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page :page,
        pageSize : pageSize
      },
      success: function (info) {
        $('tbody').html(template('tpl',info))
        // $('#paginator').bootstrapPaginator({
        //   bootstrapMajorVersion: 3,
        //   currentPage: page,
        //   totalPages: Math.ceil(info.total / info.size),
        //   onPageClicked: function (a, b, c, p) {
        //     page = p,
        //     render()
        //   }
        // })
        paginator(info,render)
      }
    })
  }
})