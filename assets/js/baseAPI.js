// 每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPreFilter这个函数

$.ajaxPrefilter(function (options) {
    options.url = 'http://localhost:8080' + options.url;


    // 统一为有权限的接口设置header头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        options.complete = function (res) {
            // complete回调函数中，可以使用responseJSON拿到返回的数据
            console.log(res.responseJSON)
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制清空token
                localStorage.removeItem('token')
                // 强制跳转到登录页面
                location.href = './login.html'
            }
        }
    }

});
