function initialFont(){
    var width = document.documentElement.clientWidth;
    var fontSize = (width/10);
    fontSize = fontSize>75?75+'px':fontSize+'px';
    document.documentElement.style.fontSize=fontSize;
    window.onresize=initialFont;
}
initialFont();
// 原生桥接
window.appinit = function (cb) {
    // 判断ios 和 android
    var device = (function () {
        var sUserAgent = window.navigator.userAgent.toLowerCase(),
            bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
            bIsIphoneOs = sUserAgent.match(/iphone/i) == "iphone",
            bIsAndroid = sUserAgent.match(/android/i) == "android";

        if (bIsIpad || bIsIphoneOs) {
            return 'ios';
        } else if (bIsAndroid) {
            return 'android';
        }
    })();
    //判断是否在一生约app内
    var isApp = (function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        if (sUserAgent.match(/yishengyue/i) == "yishengyue") {
            return true;
        } else {
            return false;
        }
    })();
    //ios桥接
    if (isApp) {
        if (device == "ios") {
            function connectToSwiftWebViewBridge(callback) {
                if (window.SwiftWebViewBridge) {
                    callback(SwiftWebViewBridge);
                } else {
                    document.addEventListener('SwiftWebViewBridgeReady', function () {
                        callback(SwiftWebViewBridge);
                    }, false);
                }
            }

            connectToSwiftWebViewBridge(function (bridge) {
                bridge.init();
                var app = function (obj) {

                    var send = obj.data ? obj.data : '';
                    bridge.callSwiftHandler(obj.funName, send, function (res) {
                        typeof obj.callback == "function" && obj.callback(res);
                    })
                }

                typeof cb == "function" && cb(app);
            });
        } else if (device == "android") {//安卓实际不需桥接 但是为了传参数与ios一致 还是进行了封装
            var app = function (obj) {

                if (obj.data) {
                    var send = JSON.stringify(obj.data);
                    var res = JsToNative[obj.funName](send);
                } else {
                    var res = JsToNative[obj.funName]();
                }
                setTimeout(function () {
                    typeof obj.callback == "function" && obj.callback(JSON.parse(res));
                },1)
            }
            typeof cb == "function" && cb(app);
        }
    } else {
        typeof cb == "function" && cb();
    }
};