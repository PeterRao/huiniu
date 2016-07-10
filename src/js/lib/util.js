;(function() {
    function search(str) {
        if (!str) {
            return {};
        }

        var ret = {};
        str = str.slice(1).split('&');
        for (var i = 0, arr; i < str.length; i++) {
            arr = str[i].split('=');
            ret[arr[0]] = decodeURIComponent(arr[1]);
        }
        return ret;
    }
    var util = {
        urlParser: function(url) {
            var a = document.createElement('a');
            a.href = url || window.location.href;
            return {
                origin: a.origin,
                protocol: a.protocol,
                host: a.host,
                hostname: a.hostname,
                pathname: a.pathname,
                search: search(a.search),
                hash: a.hash
            };
        }
    };
    window.util = util;
})();

