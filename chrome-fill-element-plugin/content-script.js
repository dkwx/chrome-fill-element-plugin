(function () {
    const foowwLocalStorage = {
        set: function (key, value, ttl_ms) {
            var data = {value: value, expire: new Date(ttl_ms).getTime()};
            localStorage.setItem(key, JSON.stringify(data));
        },
        get: function (key) {
            var value = localStorage.getItem(key);
            if (typeof value == "undefined" || value == null || value == "") {
                return null;
            }
            var data = JSON.parse(value);
            if (data !== null) {
                debugger
                if (data.expire != null && data.expire < new Date().getTime()) {
                    localStorage.removeItem(key);
                } else {
                    return data.value;
                }
            }
            return null;
        },
    }
    console.log((new Date()).toLocaleTimeString());
    var sqlArea = document.evaluate("//*[@id='sql']", document).iterateNext();
    var sqlData;
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "sqlData") {
            sqlData = pair[1];
        }
    }
    if (typeof sqlData == "undefined" || sqlData == null || sqlData == "") {
        sqlData = foowwLocalStorage.get("sqlData");
        if (typeof sqlData == "undefined" || sqlData == null || sqlData == "") {
            return;
        }

    }

    sqlData = decodeURI(sqlData);
    sqlArea.value = sqlData;
    var date = new Date().getTime();
    // 设置3s有效期
    foowwLocalStorage.set("sqlData", sqlData, date + 3000);
})();

