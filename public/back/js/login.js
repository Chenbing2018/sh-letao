

$(function () {
  // 1.登录页面表单效验
  // 表单校验初始化
  $('#form').bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 指定校验字段
    fields: {
      username: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          // 配置长度校验
          stringLength: {
            min: 4,
            max: 10,
            message: "用户名长度必须在 4-10位"
          },
          callback: {
            message: '此用户名不存在'
          }
        }
      },
      password: {
        // 配置校验规则
        validators: {
          // 配置非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          // 配置长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在 6-12位"
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  });

  // 2.表单提交按钮, 阻止,用ajax请求
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "index.html";
        }
        if (info.error == 1000) {
          console.log('用户名不存在');
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }
        if (info.error == 1001) {
          console.log('密码错误');
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    })
  });

  // 3.表单重置按钮
  $('[type="reset"]').click(function () {
    $('#form').data('bootstrapValidator').resetForm();
  })
})