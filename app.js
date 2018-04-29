const express = require('express');
const weixin = require('./routes/weixin');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

//创建菜单
// const createMenu = require('./libs/createMenu');
// createMenu();

const app = express();

//解析xml
app.use(bodyParser.xml({
    limit: '1MB',
    xmlParseOptions: {
      normalize: true,
      normalizeTags: true,
      explicitArray: false
    }
  }));

app.use('/',weixin);

app.listen(80,() => {
    console.log('listening 80 port...');
})