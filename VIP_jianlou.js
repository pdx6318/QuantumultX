const baseUrl = `http://www.myy2.com/h5/13/common/apply/task/`;
const method = `POST`;
const headers = {
  'Accept' : `*/*`,
  'Accept-Encoding' : `gzip, deflate`,
  'Origin' : `http://www.myy2.com`,
  'Cookie' : `JSESSIONID=${myJSESSIONID}`,
  'Connection' : `keep-alive`,
  'Host' : `www.myy2.com`,
  'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a32) NetType/4G Language/zh_CN`,
  'Referer' : `http://www.myy2.com/h5/13/common/index.jscr`,
  'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
  'X-Requested-With' : `XMLHttpRequest`
};

const expirationTime = new Date("2024-02-23T11:00:00Z"); // 到期时间

const currentTime = new Date();
if (currentTime > expirationTime) {
  console.log("脚本已过期，请联系派大星重新授权。");
$notify("派大星微信号","SDQD6318","脚本已过期，请联系派大星重新获取脚本。")
  $done();
} else 

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function runCode() {
  let success = false;
  let error = false;
  
  for (let i = 0; i < 50; i++) {
    const activityId = 10536 + i; // 每次循环增加url的最后一个数字
    const url = baseUrl + activityId;
    console.log("\n当前商品ID是：" + activityId); // 输出修改后的URL的最后一串数字
    const myRequest = {
      url: url,
      method: method,
      headers: headers,
      body: ''
    };

    const response = await $task.fetch(myRequest);
    console.log(response.statusCode + "\n\n" + response.body);

    if (response.body.includes("服务器错误,请联系管理员")) {
      console.log("\n当时时段捡漏失败，请下个小时试试");
     
      error = true;
      break;
    } 
      if (response.body.includes('data":null,"code":200,"msg')) {
      console.log("\n恭喜🎉🎉🎉捡漏成功！🎉🎉🎉\n");
     $notify("我是派大星","恭喜你！","Vip恭喜🎉捡漏成功！🎉🎉🎉\n")
      success = true;
      break;
    }
    
    await delay(10); // 延时5毫秒
  }

  if (!success && !error) {
    console.log("\n未能捡漏成功，请下个时间段重试\n \n");
  }

  $done();

}
runCode();

