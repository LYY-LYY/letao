var $form = $('#form');

$form.bootstrapValidator({
  fields: {
    username: {
      validators: {
        notEmpty: {
          message: '用户名不能为空'
        },
        stringLength: {
          min: 3,
          max: 9,
          message: '用户名长度必须是3-9位'
        }
      }
    },
    password: {
      validators: {
        notEmpty: {
          message: '用户密码不能为空'
        },
        stringLength: {
          min: 6,
          max: 12,
          message: '用户密码长度必须6-12位'
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

$form.on('success.form.bv', function(e) {
  e.preventDefault();
  $.ajax({
    type: 'post',
    url: '/employee/employeeLogin',
    data: $form.serialize(),
    success: function (info) {
      if(info.error === 1000) {
        alert('用户名不存在')
      }
      if(info.orror === 1001) {
        alert('密码错误')
      }
      if(info.success) {
        location.href = 'index.html'
      }
    }

  })
})