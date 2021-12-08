$(function () {
    // 调用获取用户基本信息
    getUerInfo()
    var layer = layui.layer
    $('#btn-logout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('是否确认退出?', {icon: 3, title: '提示'}, function (index) {
            // 清除本地存储的token
            localStorage.removeItem('token')
            location.href = './login.html'

            // 关闭confirm
            layer.close(index);
        })
    })
})

function getUerInfo() {
    // 获取用户基本信息
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象发送token
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用渲染头像函数
            renderAvatar(res.data)
        },
        // 不论成功还是失败最后都会调用complete函数
        // complete: function (res) {
        //     // complete回调函数中，可以使用responseJSON拿到返回的数据
        //     console.log(res.responseJSON)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href = './login.html'
        //     }
        // }
    })
}

// 渲染头像函数
function renderAvatar(user) {
    // 获取用户名称,有昵称先获取昵称
    const name = user.nickname || user.username
    // 设置欢迎文本
    $('.welcome').html(name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}