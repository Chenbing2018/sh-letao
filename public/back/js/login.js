
// 1.登录页面表单效验
$(function () {
  // 表单校验初始化
  $('#form').bootstrapValidator({
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
          }
        }
      }
    }
  });
})