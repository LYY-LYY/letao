var page = 1
$(function() {
  var pageSize = 5

  render()
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
        console.log(info);
        
        $('.dropdown-menu').html(template('tpl2',info))
      }
    })
  })

  // 一级分类选择功能
  $('.dropdown-menu').on('click','li',function () {
    var id = $(this).data('id')
    console.log(id);
    
    $('.dropdown-text').text($(this).children().text())
    $('[name=categoryId]').val(id)
    // 手动修改一级分类校验成功
    $form.data('bootstrapValidator').updateStatus('categoryId','VALID')
  })

  // 图片上传功能
  $('#file').fileupload({
    done: function (e, data) {
      var result = data.result.picAddr
      $('.img_box img').attr('src',result)
      $('[name=brandLogo]').val(result)
      $form.data('bootstrapValidator').updateStatus('brandLogo','VALID')
    }
  })

  // 表单校验功能
  var $form = $('form')
  $form.bootstrapValidator({
    excluded : [],
    fields: {
      categoryId: {
        validators: {
          notEmpty:{
            message: '请选择一个一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类的名称'
          }
        }
      },
      brandLogo:{ 
        validators: {
          notEmpty: {
            message: '请上传二级分类的图片'
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

  // 注册表单校验成功事件
  $form.on('success.form.bv',function (e) {
    e.preventDefault()

    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $form.serialize(),
      success: function (info) {
        if(info.success) {
          $('#addModal').modal('hide')
          $form.data('bootstrapValidator').resetForm(true)
          page = 1
          render()
          $('.dorpdown-text').text('请选择一级分类')
          $('.img_box img').attr('src','images/none.png')
        }
      }      
    })
  })


  // 渲染 
  function render() {
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