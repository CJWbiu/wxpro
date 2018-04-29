const fs = require('fs');
const path = require('path');
const getToken = require('./refreshToken');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

//常用type为view和click,分别为点击事件和链接
var menus = {
  "button": [
    {
      "name": "更多",
      "sub_button": [
        {
          "type": "click",
          "name": "小薇导航",
          "key": "c3_001"
        }]
    }]
};

function createMenu() {
    getToken(function(data) {
        console.log('[Menu] token = ' + data.access_token + '\n' + 'expires_in=' + data.expires_in);
        let token = data.access_token;
        let url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token;
        
        request({url:url,method:'POST',body:menus,json:true}).then(function(response){
            var _data = response.body;
            if(_data.errcode === 0){
                console.log('[Menu] 创建成功');
            }else{
                console.log('[Menu] 创建失败' + '\n' + _data.errmsg);
            }
        })
    })
}

module.exports = createMenu;

