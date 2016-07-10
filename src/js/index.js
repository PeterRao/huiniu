;(function () {
    var $reg, $phoneInput, $codeInput, $passwordInput, $agreement,
        $codeSend, $codeWait, $codeTimer;
    var site = util.urlParser().search.id;
    // 尝试次数
    var retry = 0;
    // var apiServer = 'http://dev.hnlidev.ncfgroup.com/api';
    // 反向代理
    var apiServer = '/api';
    var _view = {
        agreementCheck: function (checked) {
            var $icon = $agreement.find('.icon');
            if (checked) {
                $icon.removeClass('icon-check').addClass('icon-checked');
                $agreement.addClass('checked');
            } else {
                $icon.removeClass('icon-checked').addClass('icon-check');
                $agreement.removeClass('checked');
            }
        },
        setCodeTimer: function (second) {
            $codeTimer.text(second);
            $codeSend.addClass('hide');
            $codeWait.removeClass('hide');
            function _timerFunc() {
                if (second > 0) {
                    $codeTimer.text(second);
                    second--;
                    setTimeout(_timerFunc, 1000);
                } else {
                    $codeWait.addClass('hide');
                    $codeSend.removeClass('hide');
                }
            }

            _timerFunc();
        }
    };
    var _data = {
        register: function (params, success, fail) {
            params.ajax = 1;
            params.site = site;
            $.ajax({
                type: 'POST',
                url: apiServer + '/activity/register',
                data: params,
                dataType: 'json',
                success: success,
                fail: fail
            });
        },
        sendVerifyCode: function (params, success, fail) {
            params.ajax = 1;
            params.type = 1;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: apiServer + '/send/sendVerifyCode',
                data: params,
                success: success,
                fail: fail
            });
        },
        verifyPassword: function (password) {
            var reg = /[a-zA-Z0-9]+{6,}$/;
            return reg.test(password);
        }
    };
    var _event = {
        bind: function () {
            $reg.on('click', _event.handleRegister);
            $agreement.on('click', _event.handleAgreement);
            $codeSend.on('click', _event.handleCodeSend);
        },
        handleRegister: function () {
            var phone = $phoneInput.val();
            var code = $codeInput.val();
            var password = $passwordInput.val();
            var argument = $agreement.hasClass('checked');
            if (!phone) {
                alert('请输入正确的手机号码');
                return false;
            }
            if (!code) {
                alert('请输入验证码');
                return false;
            }
            if (!password) {
                alert('请按要求输入密码');
                return false;
            }
            if (!argument) {
                alert('请阅读并勾选用户协议');
                return false
            }
            var params = {
                mob: phone,
                pwd: md5(password),
                code: code
            };
            // console.log(phone, code, password, md5(password));
            _data.register(params, function() {

            });
        },
        handleAgreement: function () {
            var checked = $agreement.hasClass('checked');
            _view.agreementCheck(!checked);
        },
        handleCodeSend: function () {
            var phone = $phoneInput.val();
            if (!phone) {
                alert('请输入正确的手机号码');
                return false;
            }
            var params = {
                retry: retry,
                mob: phone
            };
            _data.sendVerifyCode(params, function (code) {
                if (code.status == '00000') {
                    // 验证成功
                    _view.setCodeTimer(59);
                }
            });
        }
    };

    function init() {
        $codeSend = $('#j-code-send');
        $codeWait = $('#j-code-wait');
        $codeTimer = $('#j-code-timer');

        $agreement = $('#j-agreement');

        $phoneInput = $('#j-phone-input');
        $codeInput = $('#j-code-input');
        $passwordInput = $('#j-password-input');

        $reg = $('#j-reg');

        _event.bind();
    }

    $(document).ready(function () {
        init();
    });

})(window);
