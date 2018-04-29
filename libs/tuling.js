const querystring = require('querystring');
const http = require('http');

const config = {
	key: '6b71f43b7bf64d5ba9612ce357ed9452'
};

const options = {
  host: 'www.tuling123.com',
  port: 80,
  path: '/openapi/api',
  method: 'POST',
  rejectUnauthorized: false,
  headers: {
    "Content-Type": 'application/x-www-form-urlencoded', //这个一定要有
  }
};


function tuling(msg,callback) {
	config.info = msg;
    var post_data = querystring.stringify(config);
    
    var req = http.request(options, function(res){//建立连接 和 响应回调
        if(res.statusCode == 200){
            res.setEncoding('utf8');
            var body = "";
            res.on('data', function(recData){ body += recData;});
            res.on('end', function(){
                body = JSON.parse(body);
                callback(null, body.text); console.log(body);
            });
        }else{
            callback(500,null);
        }
    });
    req.write(post_data); //发送请求
    req.end(); //请求发送完毕
	
}

module.exports = tuling;