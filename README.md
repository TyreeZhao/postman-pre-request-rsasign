# postman-pre-request-rsasign

## 操作指南

// 第一步：
// 复制如下内容 ⬇️ 到 postman header 中
developerRn:{{developerRn}}
nonce:{{nonce}}
signature:{{signature}}
timestamp:{{timestamp}}
Content-Type:application/json
[demo1](./images/headers.jpg)

// 第二步：
// 复制下面内容到 postman pre-request Script 中
// 复制 private key 到这里
[demo2](./images/pre-request.jpg)
