/**
 * @author 派大星  pdx
 * @function 获取应用的cookie或token通用脚本
 * @date 2024-05-02 12:00:00
获取token

^http:\/\/www\.myy2\.com\/h5\/17\/userCenter url script-response-body https://raw.githubusercontent.com/362240145/QuantumultX/main/Scripts/cookie/get_cookie2.js
 
 */

////////////////////////////////
const $ = new API("获取Cookie或Token通用脚本");
const req_url = $request.url;
const req_headers = $request.headers;
const req_body = $request.body;
const rsp_body = $response ? $response.body : "{}";

// console.log(`当前请求的url: ${req_url}`);
// 遍历头部对象并打印每个字段和值
console.log("当前版本20240502\n遍历头部对象并打印每个字段和值开始");
for (const headerField in req_headers) {
  console.log(`${headerField}: ${req_headers[headerField]}`);
}
console.log("遍历头部对象并打印每个字段和值结束🍓");

try {
  getCookieORToken();
} catch (e) {
  console.log('脚本运行出现错误，错误信息：' + e.message);
}
$done();
////////////////////////////////

function getCookieORToken() {

  

  /**
   * VIP 获取cookie
   *
   * @url http://myy2.com/h5/17/userCenter
   * @keyword pdx_vip_cookie2 打开个人中心页面获取
   */
    
if (req_url.includes("myy2.com/h5/17/userCenter")) {
    console.log('VIP 开始');

     cookieValue = req_headers["Cookie"];
    const token = cookieValue;
    console.log("获取到token：" + token);
    if (token.includes("JSESSIONID")) {
    $.write(token, '#pdx_vip_token2');
    $.notify('VIPtoken 获取成功✅', '', token);
} else {
    console.log("获取的token为空");
  }
  }
  /**
   * 返赞app 获取token
   *
   * @url ^https:\/\/api\.51fanzan\.com\/golds\/logs\?appid=10001&version=20250218&page=1

hostname = api.51fanzan.com
   * @keyword pdx_fz_cookie 打开我的-金币小镇-我的金币明细页面获取
   */
    
if (req_url.includes("api.51fanzan.com/golds/logs")) {
    console.log('返赞 开始');

     cookieValue = req_headers["token"];
    const token = cookieValue;
    console.log("获取到token：" + token);
    if (token.includes("ey")) {
    $.write(token, '#pdx_fz_token');
    $.notify('返赞token 获取成功✅', '', token);
} else {
    console.log("获取的token为空");
  }
}
/**
 * 石榴会选 获取token(PHPSESSID) + id
 * @url ^https:\/\/6\.16huixuan\.com\/api\/UserAmount\/index
 * @keyword pdx_sl_cookie 打开我的-余额页面获取
 */

/**
 * 16惠选 获取PHPSESSID及用户ID
 *
 * @url ^https:\/\/6\.16huixuan\.com\/api\/UserAmount\/index
 * hostname = 6.16huixuan.com
 * @keyword pdx_16hx_cookie 打开相关页面触发接口获取
 */

if (req_url.includes("6.16huixuan.com/api/UserAmount/index")) {
    console.log('16惠选 开始处理');

    // 1. 提取 PHPSESSID
    const fullCookie = req_headers["cookie"] || req_headers["Cookie"] || "";
    let phpsessid = "";
    
    // 使用正则精确匹配 PHPSESSID
    const sessionMatch = fullCookie.match(/PHPSESSID=([^;]+)/);
    if (sessionMatch && sessionMatch[1]) {
        phpsessid = sessionMatch[1];
        console.log("获取到PHPSESSID：" + phpsessid);
        $.write(phpsessid, '#pdx_16hx_phpsessid');
    } else {
        console.log("未找到有效的PHPSESSID");
    }

    // 2. 提取 Body 中的 ID
    // 注意：需确保此时 resp_body 已可用（取决于你的框架是否支持响应拦截）
    try {
        const body = JSON.parse(resp_body);
        // 常见ID字段路径，请根据实际返回结构调整
        const userId = body.data?.id || body.data?.userId || body.id || body.userId;
        
        if (userId) {
            console.log("获取到用户ID：" + userId);
            $.write(String(userId), '#pdx_16hx_user_id');
            $.notify('16惠选信息获取成功✅', `PHPSESSID: ${phpsessid}`, `用户ID: ${userId}`);
        } else {
            console.log("Body中未找到ID字段，原始Body：" + resp_body);
        }
    } catch (e) {
        console.log("解析响应Body失败：" + e.message);
    }
}
/**
   * 小程序 幸运锚点 获取token
   *
   * @url 
//hostname :wa.abby-club.com
//重写链接：^https?:\/\/wa\.abby-club\.com\/api\/PrizeWin\/winnerList
   * @keyword pdx_xymd_cookie 打开我的-中奖记录页面获取
   */
    
if (req_url.includes("wa.abby-club.com/api/PrizeWin/winnerList")) {
    console.log('幸运锚点 开始');

    cookieValue = req_headers["auth-token"];
    const token = cookieValue;
    console.log("获取到token：" + token);
    if(token){//判断token不为空 
        $.write(token, '#pdx_xymd_token');
        $.notify('幸运锚点token 获取成功✅', '', token);
    } else {
        console.log("获取的token为空");
    }
}
}


  
// 将数据字符串解析为对象
function parseDataString(dataString) {
  let data = {};
  // 使用正则表达式匹配换行符号和@符号进行拆分
  let parts = dataString.split(/[\n@]/);
  parts.forEach(part => {
    // 对每个部分再根据 "&" 符号拆分为 uid 和 token
    let [uid, token] = part.split("&");
    if (uid && token) {
      data[uid] = token;
    }
  });
  return data;
}

// 更新数据对象中指定 UID 的 Token
function updateToken(uidToUpdate, newToken, data) {
  if (data.hasOwnProperty(uidToUpdate)) {
    // 如果 UID 存在，则更新其对应的 Token
    data[uidToUpdate] = newToken;
    console.log("Token updated successfully for UID: " + uidToUpdate);
  } else {
    // 如果 UID 不存在，则新增 UID 和对应的 Token
    data[uidToUpdate] = newToken;
    console.log("New UID and Token added successfully: " + uidToUpdate);
  }
}

// 将对象转换为 uid&token 格式的字符串
function convertDataToString(data) {
  let result = "";
  for (let uid in data) {
    if (data.hasOwnProperty(uid)) {
      result += `${uid}&${data[uid]}@`;
    }
  }
  // 移除末尾的 '@' 符号
  result = result.slice(0, -1);
  return result;
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/
