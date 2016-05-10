var koa = require('koa');
var app = new koa();

var mongoose = require('mongoose');


var hbs = require('koa-hbs');
var co = require("co");
var safejson = require("safejson");

var staticCache = require('koa-static-cache');
var path = require('path');

var route = require('koa-route');

var rp = require("request-promise");
//var controller = require('./datas/catelistController.js');

//对post进行parse
var post_parse = require('co-body');



app.use(hbs.middleware({
  viewPath: __dirname + '/views'
})); 

app.use(staticCache(path.join(__dirname, 'publics')));


app.use(route.get('/uri',function *(){
	yield this.render('uri_input',{"name":"adad"});
}));


app.use(route.post('/uri',function *(){
  var body = yield post_parse(this.request);
  var url = body.uri;

  var options = {
  	method: 'POST',
  	uri: "http://127.0.0.1:7999/uri",
  	form: {
  		uri: url
  	}
  };
  var result = yield rp(options);
  var jsonresult = JSON.parse(result);

  if (jsonresult.status == 200) {
  	console.log(jsonresult.message);
  	var out = {status:200,message:jsonresult.message};
  	this.body = out;
  } else {
  	var out = {status:201,message:"Some error"};
  	this.body = out;
  }

}));

app.use(route.get('/result',function *(){
	var options = {
		uri: 'http://127.0.0.1:7999/result',
		qs: {
			referer: this.query.referer
		}
	}
	var errors = yield rp(options);
	var formedErrors = JSON.parse(errors)
	console.log(formedErrors.list);
	if (formedErrors.status == 200) {
		yield this.render('error_result',formedErrors);
	}
	
	
}));


app.listen(3000);

