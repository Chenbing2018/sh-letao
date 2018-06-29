/**
 * Created by 、none on 2018/6/29.
 */

$(function () {

  // 1.渲染历史记录
  render();
  function getArr () {
    var history = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(history);
    return arr;
  }
  function render() {
    var arr = getArr();
    $('.lt_history').html(template('historyTmp', {arr: arr}));
  }


  // 2.清空
  $('.lt_history').on('click', '.btn-empty', function () {
    mui.confirm('你是否要清空全部的历史记录', '温馨提示', ['取消', '确定'], function(e) {
      if (e.index == 1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  })

  // 3.点击x
  $('.lt_history').on('click', '.icon_delete', function () {
    var that = this;
    mui.confirm('你是否要删除该条数据', '温馨提示', ['取消', '确定'], function (e) {
      if (e.index == 1) {
        var index = $(that).data('index');
        var arr = getArr();
        arr.splice(index, 1);
        var str = JSON.stringify(arr)
        localStorage.setItem('search_list', str);
        render();
      }
    })
  })


  // 4.点击搜索按钮,获取输入框内容,将内容添加到历史记录中
  $('.btn-search').click(function () {

    var txt = $('.input_search').val();
    // 内容为空不给添加
    if (txt == '') {
      return;
    }
    var arr = getArr();
    // 如果添加的内容重复了,删除之前的
    var index = arr.indexOf(txt);
    if (index != -1) {
      arr.splice(index, 1);
    }
    // 限制历史记录长度,不大于10条
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(txt);
    var str = JSON.stringify(arr);
    localStorage.setItem('search_list', str);
    render();
    // 清空输入框
    $('.input_search').val('');
  })

})
