exports.service = function(api, next){
	var aws = require('../lib/aws.js')();
	var customer = require('../lib/Customer.js')(aws.dynamodb);
	var store = require('../lib/Store.js')(aws.dynamodb);
  var upload = require('../lib/Upload.js')(aws.s3);
	api.service = {
		customer: customer,
		store : store,
		upload : upload
	};
  next();
}
