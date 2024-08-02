import express from 'express'	// 导入express
                        
const app = express();							// 创建web服务器

const route = express.Router();
// const request = require('request');



// json解析中间件
app.use(express.json());
// 跨域
app.use(function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	//跨域允许的请求方式
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
	else next();
});

// openai
// const main = require("./openai/utils");
import aiUtils from "./openai/utils.js";
aiUtils.main();


// 后台api
// const adminRoute = require('./admin/adminRoute');
import adminRoute from './admin/adminRoute.js';
app.use('/api', adminRoute);

// 微信hook回調路由
// const wxRoute = require('./wx/wxRoute');
import wxRoute from './wx/wxRoute.js';
app.use('/wx', wxRoute);


app.listen(9999, () => {							// 调用回调函数，listen() 启动服务器
	console.log('express server running at http://127.0.0.1')
});