// const express = require('express');	// 导入express
import express from "express";
// const request = require('request');
import request from "request";

const wxRoute = express.Router();

const MY_WXID = "wxid_0c331m073k3y22";
const WX_HTTP_API_URL = "http://127.0.0.1:7777/DaenWxHook/httpapi/?wxid=" + MY_WXID;
const WX_HTTP_API_PATH = "DeanWxHook/httpapi/";

wxRoute.post("/", (req, res) => {
    var params = req.body;
    switch (params.event) {
        case 10009:     //收到私聊消息
            sendText("自动秒回：想学吗，教你啊", params.data.data.fromWxid);
            break;
        case 10008:     //收到群聊消息
            sendText("自动秒回：想学吗，教你啊", params.data.data.fromWxid);
            break;
    }

    res.send({
        stateCode: 200,
    })
})

function sendText(text, fromWxId) {
    console.log(fromWxId)
    let data = {
        type: "Q0001",
        data: {
            wxid: fromWxId || "hetaozhendeliu",
            msg: "发了：" + text
        }
    }
    let options = {
        url: WX_HTTP_API_URL,
        method: "POST",
        path: WX_HTTP_API_PATH,
        body: JSON.stringify(data),
    }
    console.log(options)
    request.post(options);
}

// module.exports = wxRoute;
export default wxRoute;