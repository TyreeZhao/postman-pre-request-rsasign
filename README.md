# postman-pre-request-rsasign

## 操作指南

// 第一步：<br/>
// 复制如下内容 ⬇️ 到 postman header 中<br/>
developerRn:{{developerRn}}<br/>
nonce:{{nonce}}<br/>
signature:{{signature}}<br/>
timestamp:{{timestamp}}<br/>
Content-Type:application/json<br/>
![demo1](./images/headers.jpg)

// 第二步：<br/>
// 复制下面内容到 postman pre-request Script 中<br/>
// 复制 private key 到这里<br/>
![demo2](./images/pre-request.jpg)<br/>
