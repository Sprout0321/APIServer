exports.service = function(api, next){
	var aws = require('../lib/aws.js')();
	var customer = require('../lib/Customer.js')(aws.dynamodb);
  api.service = {
		customer: customer
	};
  next();
}
