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
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);
        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          size: 'large',
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
    // 动态生成下拉框
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 50
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tpl', info));
      }
    })
  })

  // 3.事件委托,点击下拉菜单的选项并赋值给一级分类内容
  $('.dropdown-menu').on('click', 'li a', function () {
    var txt = $(this).text();
    $('#firstCate').text(txt);

    var categoryId = $(this).data('id');
    $('#categoryId').val(categoryId);
  })

  // 4.上传图片
  $("#fileUpload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data.result.picAddr);
      var src = data.result.picAddr;
      console.log(data.result.picAddr);
      $('#brandLogo').val(src);
      $('#imgBox img').attr('src', src);
    }
  });

  // 5.表单效验
  $('#form').bootstrapValidator({
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '必须选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '必须输入二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '必须上传图片'
          }
        }
      },
    }
  })

  // 6.表单效验成功后,组织默认提交进行ajax提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function () {
        // 关闭模态框
        $('#addModal').modal('hide');
        // 重置表单
        $('#form').data("bootstrapValidator").resetForm(true);
        // 重置一级分类和图片
        $('#firstCate').text('请输入一级分类');
        $('#imgBox img').attr('src', 'images/none.png');
        // 重新渲染
        currentPage = 1;
        render();
      }
    })
  })





















})
