/**
 * Created by 、none on 2018/6/26.
 */

$(function () {

  var currentPage = 1;
  var pageSize = 3;
  // 1.动态生成结构,并生成分页
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function(info) {
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
  $('#addGory').click(function () {
    $('#addModal').modal('show');
  })

  // 3.表单效验
  $('#form').bootstrapValidator({
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类不能为空'
          }
        }
      }
    }
  })

  // 4.阻止submit提交,ajax提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal('hide');
          // 重新渲染
          currentPage = 1;
          render();
        }
      }
    })
  })


})