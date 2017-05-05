/**
 * Created by maxmao2 on 2017/5/3.
 */
//mockAPI.js

var fs = require('fs');
var path = require('path');
var url = require('url');

var mockbase = path.join(__dirname);

var mockApi = function (req, res, next) {
  var urlObj = url.parse(req.url, true);
  var method = req.method;
  var paramObj = urlObj.query;
  var pathname = urlObj.pathname;
  if (pathname.indexOf('asset') !== -1) {
    return;
  }
  var data = '';
  var jsonUrl = '';
  if (pathname === '/api/CommonApi') {
    switch (paramObj.API) {
      case 'Stark_GetMembershipIndexGaugeDatas':
        jsonUrl = '/asset/performan/js/randar.json';
        break;
      case 'Stark_GetNewUsedCarSales':
        jsonUrl = '/asset/performan/js/bar.json';
        break;
      case 'Stark_GetInsurancePercent':
        jsonUrl = '/asset/performan/js/line.json';
        break;
      case 'Stark_GetOverviewList':
        jsonUrl = '/asset/performan/js/table1.json';
        break;
      case 'Stark_GetAreaProvice':
        jsonUrl = '/asset/performan/js/area.json';
        break;
      default:
        jsonUrl = '/asset/performan/js/data2.json';
        break;
    }

    data = fs.readFileSync(path.join(__dirname, jsonUrl), 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Content-type', 'application/javascript');
    res.end(data);
  }
};

module.exports = mockApi;