!function(e,t){function a(){var t=n.getBoundingClientRect().width;t/l>750&&(t=750*l);var a=t/10;n.style.fontSize=a+"px",d.rem=e.rem=a}var i,r=e.document,n=r.documentElement,o=r.querySelector('meta[name="viewport"]'),s=r.querySelector('meta[name="flexible"]'),l=0,m=0,d=t.flexible||(t.flexible={}),c=e.navigator.appVersion.match(/android/gi),p=e.navigator.appVersion.match(/iphone/gi);e.navigator.userAgent.toLowerCase().match(/amcustomer/gi);if(o){console.warn("将根据已有的meta标签来设置缩放比例");var u=o.getAttribute("content").match(/initial\-scale=([\d\.]+)/);u&&(m=parseFloat(u[1]),l=parseInt(1/m))}else if(s){var f=s.getAttribute("content");if(f){var v=f.match(/initial\-dpr=([\d\.]+)/),h=f.match(/maximum\-dpr=([\d\.]+)/);v&&(l=parseFloat(v[1]),m=parseFloat((1/l).toFixed(2))),h&&(l=parseFloat(h[1]),m=parseFloat((1/l).toFixed(2)))}}if(!l&&!m){var g=e.devicePixelRatio;l=g||1,l=p&&e.navigator.userAgent.toLowerCase().match(/OS 9_3/)?g>=3&&(!l||l>=3)?3:g>=2&&(!l||l>=2)?2:1:2,m=1/l,(c||p)&&n.setAttribute("data-real-dpr",e.devicePixelRatio),c&&(n.className+=" device-android"),p&&(n.className+=" device-ios")}if(c||p?n.setAttribute("data-dpr",l):n.setAttribute("data-dpr",2),!o)if(o=r.createElement("meta"),o.setAttribute("name","viewport"),o.setAttribute("content","initial-scale="+m+", maximum-scale="+m+", minimum-scale="+m+", user-scalable=no"),n.firstElementChild)n.firstElementChild.appendChild(o);else{var x=r.createElement("div");x.appendChild(o),r.write(x.innerHTML)}e.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(a,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(i),i=setTimeout(a,300))},!1),"complete"===r.readyState?r.body.style.fontSize=12*l+"px":r.addEventListener("DOMContentLoaded",function(e){r.body.style.fontSize=12*l+"px"},!1),a(),d.dpr=e.dpr=l,d.refreshRem=a,d.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},d.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}));