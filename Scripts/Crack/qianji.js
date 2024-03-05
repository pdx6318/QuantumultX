/*************************************

项目名称：钱迹  记账
下载地址：https://apps.apple.com/cn/app/%E9%92%B1%E8%BF%B9-%E5%AD%98%E9%92%B1%E8%AE%B0%E8%B4%A6%E5%B0%8F%E8%83%BD%E6%89%8B/id1473785373
电报频道：https://t.me/pdx6318
更新日期：2024-03-05
脚本作者：派大星
使用声明：⚠️仅供参考，🈲转载与售卖！

解锁终身会员

**************************************

[rewrite_local]
#钱迹 ，解锁终身会员
^https:\/\/api\.qianjiapp\.com\/vip\/configios url script-response-body 492C25BBF661.js

[mitm]
hostname = api.qianjiapp.com


*************************************/


var pdx = JSON.parse($response.body);

pdx.data.config.userinfo.vipend = 209909099999;  //会员到期时间
pdx.data.config.userinfo.vipstart = 2024-03-05;  

pdx.data.config.userinfo.viptype =100;//永久会员

pdx.data.config.userinfo.name = "派大星破解vip";



$done({body : JSON.stringify(pdx)});
