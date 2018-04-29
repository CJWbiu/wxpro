
/**
 *
 * @param msgType {string} 收到的信息的内容
 * @param info {string} 返回消息的内容
 * @returns {string} 返回xml字符串用作消息内容
 */

function autoReply(msgType, requestData, info, desc) {
  switch (msgType) {
    case 'text':
      var resMsg = '<xml>' +
        '<ToUserName><![CDATA[' + requestData.fromusername + ']]></ToUserName>' +
        '<FromUserName><![CDATA[' + requestData.tousername + ']]></FromUserName>' +
        '<CreateTime>' + (new Date().getTime()) + '</CreateTime>' +
        '<MsgType><![CDATA[text]]></MsgType>' +
        '<Content><![CDATA['+info+']]></Content>' +
        '</xml>';
      break;
      case 'link':
      var resMsg = '<xml>' + 
        '<ToUserName><![CDATA[' + requestData.fromusername + ']]></ToUserName>' +  
        '<FromUserName><![CDATA[' + requestData.tousername + ']]></FromUserName>' +  
        '<CreateTime>' + (new Date().getTime()) + '</CreateTime>' +  
        '<MsgType><![CDATA[text]]></MsgType>' +  
        '<Content>&lt;a href=&quot;' + info + '&quot;&gt;' + desc + '&lt;/a&gt;</Content>' +  
        '<FuncFlag>0</FuncFlag>' +  
        '</xml>';
      break;
  }
  console.log(resMsg);
  return resMsg;
}

module.exports = autoReply;