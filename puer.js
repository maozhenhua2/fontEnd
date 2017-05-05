/**
 * Created by m.max on 2017/5/4.
 */
var puer = require('puer');
puer({
  // GET
  'GET /api/CommonApi': function(req, res, next){
    console.log(req,res);
    // response json format
    res.send({
      title: 'title changed',
      content: 'tow post hahahah'
    })
  }
});