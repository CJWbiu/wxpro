const router = require('express').Router();
const wxAccess = require('../libs/wxAccess');
const autoReply = require('../libs/autoReply');
const tuling = require('../libs/tuling');

router.get('/', wxAccess);

router.post('/', function (req, res) {
    
    //设置返回数据header
    res.writeHead(200, {'Content-Type': 'application/xml'});
    console.log('[weixin] request:')
    console.log(req.body.xml);
    if(req.body.xml.msgtype === 'event') {
      //关注后回复
      if (req.body.xml.event === 'subscribe') {
        let reply = `
            欢迎关注本公众号,回复：
            ① 注册账号
            ② 获取活动列表
            ③ 超看电子票
        `;
        var resMsg = autoReply('text', req.body.xml, reply);
        console.log('[weixin] reply message');
        console.log(resMsg);
        res.end(resMsg);
      }else if(req.body.xml.event === 'unsubscribe'){
          console.log('[weixin] 已取消关注');
          res.end();
      }
    }else if(req.body.xml.msgtype === 'text') {
      var content = req.body.xml.content;
      if(content == '1' || content == '注册') {
        let reply = 'http://www.pinkbluecp.cn:8000/xyh/register.php';
        var resMsg = autoReply('link', req.body.xml, reply, '账号注册');
        res.end(resMsg);
      }else if(content == '2' || content == '活动列表') {
        let reply = 'http://www.pinkbluecp.cn:8000/xyh/activity.php';
        var resMsg = autoReply('link', req.body.xml, reply, '活动列表');
        res.end(resMsg);
      }else if(content == '3' || content == '活动电子票') {
        let reply = 'http://www.pinkbluecp.cn:8000/xyh/ticket_list.php';
        var resMsg = autoReply('link', req.body.xml, reply, '活动电子票');
        res.end(resMsg);
      }else {
        tuling(content, function(err, reply) {
          if(err) {
              console.log(err);
              return;
          }

          var resMsg = autoReply('text', req.body.xml, reply);
          res.end(resMsg);
        })
      }
      
     
    }
    
  });

module.exports = router;