exports.CreateCustomer = {
	name: 'CreateCustomer',
	description: 'Create customer in customer table using in client app',
	version:1.0,
	inputs:{
		required: ['email','password'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			email : connection.params.email,
			password: connection.params.password
		}
		api.service.customer.Create(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				connection.response = result;
				return next(connection, true);
			}
		});
	}
}

exports.GetCustomer = {
	name: 'GetCustomer',
	description: 'Get customer in customer table using in client app',
	version:1.0,
	inputs:{
		required: ['email','password'],
		optional:[],
	},
	run: function(api, connection, next){
		var params = {
			email : connection.params.email,
			password: connection.params.password
		}
		api.service.customer.Get(params, function(error, result){
			if(error){
				connection.error = error ;
				return next(connection, true);
			}else{
				connection.response = result;
				return next(connection, true);
			}
		});
	}
}
