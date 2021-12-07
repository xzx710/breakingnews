$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show();
    });
    // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.reg_box').hide();
        $('.login_box').show();
    });
    // 自定义layui验证规则
    var form = layui.form;
    form.verify({
        username: function(value) {
            //value：表单的值、item：表单的DOM对象
            if (!new RegExp('^[a-zA-Z0-9]+$').test(value)) {
                return '用户名不能有特殊字符';
            }
            if (!new RegExp('^.{2,20}$').test(value)) {
                return '用户名必须为2-20位';
            }
        },
        password: function(value, item) {
            //value：表单的值、item：表单的DOM对象

            if (!new RegExp('^.{8,16}$').test(value)) {
                return '密码必须为8-16位！';
            }
            if (!new RegExp('^[a-zA-Z0-9!@\\w]+$').test(value)) {
                return '密码不能出现数字，英文，！@_以外的字符！';
            }
            if (!new RegExp(
                    '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@\\w]+$'
                ).test(value)) {
                return '密码至少包含一个英文大写字母，一个英文小写字母，一个数字！';
            }
        },
        // 检验两次密码是否一致的校验
        rePassword: function(value) {
            const password = $('.reg_box [name =password]').val();
            if (password !== value) return '两次密码不一致';
        },
    });

    // 监听注册表单的提交事件
    form.on('submit(register)', function(data) {
        $.post(
            'http://localhost:8080/api/register', {
                username: data.field.username,
                password: data.field.password,
            },
            function(res) {
                if (res.status !== 0) return console.log(res.message);
                return console.log('注册成功！');
            }
        );
    });
});