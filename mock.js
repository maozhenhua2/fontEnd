/**
 * Created by maxmao2 on 2017/5/3.
 */
//mockAPI.js

const fs = require('fs');
const path = require('path');
const url = require('url');
// 使用 Mock
const Mock = require('mockjs');


const mockApi = function (req, res, next) {
  let urlObj = url.parse(req.url, true);
  //let method = req.method;
  let paramObj = urlObj.query;
  let pathname = urlObj.pathname;
  if (pathname.indexOf('/api/CommonApi') === -1 && pathname.indexOf('/api/commonapi') === -1) {
    return;
  }

  let fileUrl = 'src/asset/data/';
  let file = '';
  let json = '';
  let fullUrl = pathname + '?API=' + paramObj.API;
  let data;

  if (fullUrl.indexOf('F1ListGetByCompanyID') !== -1) {
    file = `${fileUrl}F1ListGetByCompanyID.json`;
  }

  else if (fullUrl.indexOf('UsersDataGetBySheetIDBrowser_IMX') !== -1) {
    file = `${fileUrl}UsersDataGetBySheetIDBrowser_IMX.json`;
  }

  else if (fullUrl.indexOf('KeyCodeListGetByUserID_IMX') !== -1) {
    file = `${fileUrl}KeyCodeListGetByUserID_IMX.json`;
  }

  else if (fullUrl.indexOf('MyJobListGetByUserIDWF') !== -1) {
    file = `${fileUrl}MyJobListGetByUserIDWF.json`;
  }

  else if (fullUrl.indexOf('MyUnfinishJobListGetByUserIDWF') !== -1) {
    file = `${fileUrl}MyUnfinishJobListGetByUserIDWF.json`;
  }

  else if (fullUrl.indexOf('MyProcessingJobListGetByUserIDWF') !== -1) {
    file = `${fileUrl}MyProcessingJobListGetByUserIDWF.json`;
  }

  else if (fullUrl.indexOf('KeyCodeInfoListWf_IMX') !== -1) {
    file = `${fileUrl}KeyCodeInfoListWf_IMX.json`;
  }

  else if (fullUrl.indexOf('ProcessInfoGet') !== -1) {
    file = `${fileUrl}ProcessInfoGet.json`;
  }

  else if (fullUrl.indexOf('SheetSelectVin_IMX') !== -1) {
    file = `${fileUrl}SheetSelectVin_IMX.json`;
  }


  if (file) {
    data = JSON.parse(fs.readFileSync(file));
    json = JSON.stringify(data);
  }


  //if (pathname === '/api/CommonApi') {
  //  json = 'js/map.json';
  //} else if (pathname === '/api/CommonApi2') {
  //  json = 'js/cities.json';
  //  //req.on('data', function (...values) {
  //  //  //console.log(values);
  //  //  let arr = Array.from(values[0]);
  //  //  t = String.fromCharCode.apply(null, arr);
  //  //  t = decodeURIComponent(t);
  //  //});
  //}

  //req.on('end', function () {
  //  if (t) {
  //    data = JSON.parse(t);
  //  }
  //  data = fs.readFileSync(path.join(__dirname, json), 'utf-8');
  //  res.setHeader('Content-Type', 'application/json');
  //  res.end(data);
  //});

  res.setHeader('Content-Type', 'application/json');
  res.end(json);
};

module.exports = mockApi;
