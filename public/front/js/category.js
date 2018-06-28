/**
 * Created by 、none on 2018/6/28.
 */

$(function () {
  // 1.左侧一级分类动态渲染
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.lt_category_left ul').html(template('tmp', info));
      getSecMenu(info.rows[0].id)
    }
  })

  // 2.点击左侧获取当前id, 根据id动态渲染二级分类
  $('.lt_category_left ul').on('click', 'a', function () {
    var id = $(this).data('id');
    getSecMenu(id);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  })


  // 封装动态获取右侧获取二级菜单
  function getSecMenu (id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        $('.lt_category_right ul').html(template('tpl', info));
        console.log(1);
      }
    })
  }
})
