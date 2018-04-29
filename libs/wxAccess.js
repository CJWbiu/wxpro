const sha1 = require('sha1');
const config = require('../config');

/**
 * 公众号接入验证
 * @param {*} req request 
 * @param {*} res response
 */
function wxAccess(req, res) {
    var token = config.token;
	var signature = req.query.signature;
	var nonce = req.query.nonce;
	var timestamp = req.query.timestamp;
	var echostr = req.query.echostr;
	var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    
    if(sha === signature) {
        res.end(echostr + '');
        console.log("[wxAccess] 授权成功!");
    }else {
        res.end('wrong');
        console.log("[wxAccess] 授权失败!");
    }
}

module.exports = wxAccess;