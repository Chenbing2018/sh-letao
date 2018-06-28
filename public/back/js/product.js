/**
 *
 * Created by 、none on 2018/6/28.
 */


$(function () {
  var currentPage = 1;
  var pageSize = 4;
  var picArr = [];

  // 1.动态生成表格结构,并生成分页
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('tmp', info));

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked(a, b, c, page) {
            currentPage = page;
            render();
          },
          itemTexts(type, page, current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'page':
                return page;
            }
          },
          tooltipTitles(type, page, current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'page':
                return '前往第' + page + '页';
            }
          }
        })
      }
    })
  }

  // 2.点击添加商品按钮,弹出模态框,并动态生成二级分类下拉菜单
  $('#addBtn').click(function () {
    $('#addModal').modal('show');

    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 50
      },
      dataType: 'json',
      success: function (info) {
        $('.dropdown-menu').html(template('tpl', info));
      }
    })
  })

  // 3.点击二级分类下拉菜单的选项并将内容赋值给上面的button按钮中的span
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('#secondCate').text(txt);

    // 将当前id 存下来
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);

    // 手动重置隐藏域校验状态
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  })

  // 4.图片上传
  $('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      picArr.unshift(data.result);
      var picSrc = data.result.picAddr;

      $('#imgBox').prepend('<img src="'+ picSrc +'" style="width: 100px; height: 100px;">');

      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }

      if (picArr.length == 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }
    }
  })

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
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品尺码必须是 xx-xx 的格式, 例如 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价格'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品价格'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      },
    }
  })

  // 6.表单效验完成后阻止默认提交,用ajax进行提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    var formData = $('#form').serialize();
    // 还需要拼接上图片的地址和名称
    // &picAddr1=xx&picName1=xx
    formData += '&picAddr1='+ picArr[0].picAddr +'&picName1='+ picArr[0].picName;
    formData += '&picAddr2='+ picArr[1].picAddr +'&picName2='+ picArr[1].picName;
    formData += '&picAddr3='+ picArr[2].picAddr +'&picName3='+ picArr[2].picName;
    console.log(formData);
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: formData,
      dataType: 'json',
      success: function (info) {
        console.log(info);
        // 关闭模态框
        $('#addModal').modal('hide');
        // 重置表单内容
        $('#form').data('bootstrapValidator').resetForm(true);
        $('#secondCate').text('请选择二级分类');
        $('#imgBox img').remove();

        // 重新渲染页面
        currentPage = 1;
        render();
      }
    })
  })


})