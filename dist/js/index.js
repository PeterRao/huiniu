!function(){function e(){s=$("#j-code-send"),c=$("#j-code-wait"),d=$("#j-code-timer"),i=$("#j-agreement"),a=$("#j-phone-input"),t=$("#j-code-input"),r=$("#j-password-input"),n=$("#j-reg"),C.bind()}var n,a,t,r,i,s,c,d,o=util.urlParser().search.id,l=0,u=!1,f="/api",h={agreementCheck:function(e){var n=i.find(".icon");e?(n.removeClass("icon-check").addClass("icon-checked"),i.addClass("checked")):(n.removeClass("icon-checked").addClass("icon-check"),i.removeClass("checked"))},setCodeTimer:function(e){function n(){e>0?(d.text(e),e--,setTimeout(n,1e3)):(c.addClass("hide"),s.removeClass("hide"))}console.log("test"),d.text(e),s.addClass("hide"),c.removeClass("hide"),n()}},m={register:function(e,n,a){e.ajax=1,e.site=o,$.ajax({type:"POST",url:f+"/activity/register",data:e,dataType:"json",success:n,fail:a})},sendVerifyCode:function(e,n,a){e.ajax=1,e.type=1,$.ajax({type:"POST",dataType:"json",url:f+"/send/sendVerifyCode",data:e,success:n,fail:a})},verifyPassword:function(e){var n=/[a-zA-Z0-9]{6,}$/gi;return n.test(e)}},C={bind:function(){n.on("click",C.handleRegister),i.on("click",C.handleAgreement),s.on("click",C.handleCodeSend)},handleRegister:function(){var e=a.val(),n=t.val(),s=r.val(),c=i.hasClass("checked");if(!e)return alert("请输入正确的手机号码"),!1;if(!n)return alert("请输入验证码"),!1;if(!s)return alert("请按要求输入密码"),!1;if(!c)return alert("请阅读并勾选用户协议"),!1;var d={mob:e,pwd:md5(s),code:n};m.register(d,function(e){"00000"==e.code?location.href="./success.html":alert(e.msg)})},handleAgreement:function(){var e=i.hasClass("checked");h.agreementCheck(!e)},handleCodeSend:function(){if(u)return alert("正在发送验证码，请稍等"),!1;var e=a.val();if(!e)return alert("请输入正确的手机号码"),!1;var n={retry:l,mob:e};l++,u=!0,m.sendVerifyCode(n,function(e){u=!1,"00000"==e.status?h.setCodeTimer(59):alert(e.msg)},function(){u=!1})}};$(document).ready(function(){e()})}(window);