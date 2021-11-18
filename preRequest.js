// 第一步：
// 复制如下内容 ⬇️ 到 postman header 中
// developerRn:{{developerRn}}
// nonce:{{nonce}}
// signature:{{signature}}
// timestamp:{{timestamp}}
// Content-Type:application/json

// 第二步：
// 复制下面内容到 postman pre-request Script 中
// 复制 private key 到这里
 var private_key = ``

// 复制 developerRn 到这里
var developerRn = ""

function doHttpSig() {
    var navigator = {}; //fake a navigator object for the lib
    var window = {}; //fake a window object for the lib

    var now = new Date().getTime();

    // 12 位长度的随机字符串
    var nonce = getRandomString()

    eval(postman.getGlobalVariable("jsrsasign-js")); //import javascript jsrsasign

    function computeHttpSignature() {
        var data = `${developerRn}${now}${nonce}`
        var kjursig = new KJUR.crypto.Signature({"alg": "SHA256withRSA"});
        kjursig.init(private_key);
        kjursig.updateString(data);
        var hash = kjursig.sign();
        var signature = hextob64(hash);
        return  signature
    }

    var sig = computeHttpSignature();
    postman.setEnvironmentVariable('nonce', nonce);
    postman.setEnvironmentVariable('signature', sig);
    postman.setEnvironmentVariable("timestamp", now);
    postman.setEnvironmentVariable("developerRn", developerRn);
}

// 生成 12 位长度的随机字符串的方法
function getRandomString(length = 12) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

if (globals['jsrsasign-js'] === undefined ) {
    console.log("jsrasign library not already downloaded. Downloading now. ")
    pm.sendRequest({
        url: "http://kjur.github.io/jsrsasign/jsrsasign-latest-all-min.js",
        method: "GET",
        body: {}
    }, function (err, res) {
        postman.setGlobalVariable("jsrsasign-js", res.text());
        doHttpSig();
    });
} else {
    doHttpSig();
}
