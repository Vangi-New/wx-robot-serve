// const express = require('express');	// 导入express
import express from "express";	// 导入express

const adminRoute = express.Router();

// 数据库工具类
// const DBUtils = require('../db/DBUtils');
import DBUtils from "../db/DBUtils.js";

adminRoute.post("/", (req, res) => {
	req.on("data", function(data) {
		var params = JSON.parse(data.toString());
		console.log(params);
		
		res.send({
			stateCode: 200,
		})
	})
})

adminRoute.post("/getUser", async (req, res) => {
	await DBUtils.getUser().then((data) => {
		res.send({
			rows: data, // 列表数据
			total: data.length || 0, // 总记录数（如果没有总记录数，则需要返回getCount和hasMore）
			getCount: data.length || 0, // 是否执行了count请求，当total的值不是总记录数时需要返回 getCount: false
			hasMore: false, // 是否还有下一页，当total的值不是总记录数时需要返回是否还有下一页
		});
	});
})

adminRoute.post("/addUser", async (req, res) => {
	await DBUtils.addUser(req.body).then((data) => {
		res.send({
			code: 0,
			msg: "success"
		});
	});
})


// module.exports = adminRoute;
export default adminRoute;