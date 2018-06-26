/**
 * Created by 、none on 2018/6/26.
 */

$(function () {

  // 1.动态生成表格结构,并生成分页
  var currentPage = 1;
  var pageSize = 4;
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
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
          onPageClicked(a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 2.点击添加分类按钮,弹出模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');
  })
})
