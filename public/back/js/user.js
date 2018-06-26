/**
 * Created by 、none on 2018/6/26.
 */

$(function () {
  var currentPage = 1;
  var pageSize = 5;

  var currentId;
  var isDelete;
  render();
  // 1.动态生成结构,并生成分页
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);
        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked(a, b, c ,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 2.点击按钮,弹出模态框,并获取到后台需要的数据
  $('tbody').on('click', '.btn', function () {
    $('#btnModal').modal('show');
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? '0' : '1';
  })

  // 3.点击确认按钮,修改当前id的数据
  $('#btnSure').click(function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 模态框消失
          $('#btnModal').modal('hide');
          // 重新渲染页面
          render();
        }
      }
    })
  })

})
