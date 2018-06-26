
// 5.判断用户是否登陆过,是否让用户继续访问
 if(location.href.indexOf('login.html') == '-1') {
   $.ajax({
     type: 'get',
     url: '/employee/checkRootLogin',
     dataType: 'json',
     success: function (info) {
       if (info.error == 400) {
         location.href = "login.html";
       }
     }
   })
 }


// 进度条
$(document).ajaxStart(function () {
  NProgress.start();
})
$(document).ajaxStop(function () {
  setInterval(function () {
    NProgress.done();
  }, 500)
})

// 公共部分
$(function () {

  // 1.左侧二级菜单
  $('.lt_aside .category').click(function () {
    $('.lt_aside .child').stop().slideToggle();
  })

  // 2.侧边栏显示与隐藏
  $('.lt_main .lt_topbar .icon_menu').click(function () {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_main .lt_topbar').toggleClass('hidemenu');
  })

  // 3.点击topbar部分退出按钮,显示模态框
  $('.icon_logout').click(function () {
    $('#logoutModal').modal('show');
  })

  // 4.点击退出按钮,退出
  $('#logoutBtn').click(function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  })

})