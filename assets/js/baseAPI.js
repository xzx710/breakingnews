// 每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPreFilter这个函数

$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:8080' + options.url;
})