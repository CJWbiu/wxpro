// const Promise = require('bluebird');
const request = require('request');
const config = require('../config');
const qs = require('querystring');
const path = require('path');
const fs = require('fs');

let queryParams = {
    'grant_type': 'client_credential',
    'appid': config.appID,
    'secret': config.appSecret
  };
let wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?'+qs.stringify(queryParams);
let fpath = path.join(__dirname, '../token/token.txt');
let options = {
    method: 'GET',
    url: wxGetAccessTokenBaseUrl
  };

function updateAccessToken() {
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
          if (res) {
            body = JSON.parse(body);
            var now = (new Date().getTime());
            var expires_in = now + (body.expires_in - 20) * 1000;

            body.expires_in = expires_in;
            console.log('[refreshToken] body = ' + '\n' + body);
            resolve(body);
          } else {
            reject(err);
          }
        });
      })
}
function isValidAccessToken(data) {
    if(!data || !data.access_token || !data.expires_in) {
        return false;
    }

    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    if(now < expires_in) {  //未过期
        return true;
    }else {
        return false;
    }
}
function refreshToken(callback) {
    let data = fs.readFileSync(fpath);
    console.log('[refreshToken] 文本读取结果：' + data);
    try {
        data = JSON.parse(data);
    }catch (e) {
        updateAccessToken().then(function(data) {
            fs.writeFile(fpath,JSON.stringify(data), function(err) {
                if(err) {
                    console.log('[refreshToken] token写入失败');
                }else {
                    console.log('[refreshToken] token更新成功')
                    callback(data);
                }
            });

        });
        return;
    }
    if(isValidAccessToken(data)) {
        console.log('[refreshToken] token有效')
        callback(data);
    }else {
        console.log('[refreshToken] token已失效')
        updateAccessToken().then(function(data) {
            fs.writeFile(fpath,JSON.stringify(data), function(err) {
                if(err) {
                    console.log('[refreshToken] token写入失败');
                }else {
                    callback(data);
                    console.log('[refreshToken] token更新成功')
                }
            });

        });
    }
}
module.exports = refreshToken;