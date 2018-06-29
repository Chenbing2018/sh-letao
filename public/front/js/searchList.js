/**
 * Created by 、none on 2018/6/29.
 */

$(function () {
  //console.log(location.search);

  // 1.获取地址栏传输过来的数据,填充到搜索框中
  var txt = getNeed('txt');
  console.log(txt);
  $('.input_search').val(txt);


  render();
  // 2.根据输入框的内容到后台请求数据进行前端渲染
  function render () {
    $('.lt_product').html('<div class="loading"></div>');
    var product = {};
    product.proName = $('.input_search').val();
    product.page = 1;
    product.pageSize = 100;
    // 排序参数
    var $current = $('.lt_sort .current');
    if ($current,length > 0) {
      var sortName = $current.data('type');
      var sortValue =$current.find('i').hasClass('fa-angle-down') ? 2 : 1;
      product[sortName] = sortValue;
    }

    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: product,
        dataType: 'json',
        success: function (info) {
          console.log(info);
          $('.lt_product').html(template('tmp', info));
        }
      })
    }, 500)

  }

  // 3.点击搜索按钮,渲染页面
  $('.btn-search').click(function () {
    // 不能为空
    var key = $('.input_search').val();
    if ( key == '') {
      mui.toast('请输入搜索关键字');
      return;
    }
    render();
    // 将此次输入的搜索内容加入到历史记录中
    var history = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(history);
    var index = arr.indexOf(key);
    if (index != -1) {
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    var str = JSON.stringify(arr);
    localStorage.setItem('search_list', str);

    // 清空输入框
    $('.input_search').val();
  })

  // 4.点击判断排序
  $('.lt_sort a[date-type]').click(function () {
    console.log(1);
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      $(this).addClass('current').siblings().removeClass('current');
    }
    render();
  })
})
