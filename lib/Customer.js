module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var uuid = require('node-uuid');
	var tableName = "Customer";
	var api = {
		Create : function(params, next){
			var indexParam = {
				TableName : 'Index',
				Key : {
					name : {S:'cusindex'}
				},
				AttributeUpdates:{
					index:{
						Action: 'ADD',
						Value: {N:'1'}
					}
				},
				ReturnValues: 'ALL_NEW'
			}
			db.updateItem(indexParam, function(err, data){
				if(err) 
					return next(err);
				console.log(data.Attributes.index);
				var newCusindex = parseInt(data.Attributes.index.N);
				var customerid = uuid.v4().replace(/-/g,'');
				var putParam = {
					TableName: tableName,
					Item:{
						cusindex:{'N':data.Attributes.index.N},
						customerid:{'S':customerid},
						email:{'S':params.email},
						password:{'S':params.password}
					}
				}
				db.putItem(putParam, function(error, data){
					if (error) return next(error);
					var result = {
						cusindex : newCusindex,
						customerid : customerid
					}
					next(null, result);
				});
			});
		},
		Get : function(params, next){
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					email:{
						AttributeValueList : [{'S':params.email}],
						ComparisonOperator : 'EQ'
					},
					/*
					password:{
						AttributeValueList : [{'S':params.password}],
						ComparisonOperator : 'EQ'
					}
					*/
				},
				IndexName : 'Account'
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);
				var result = Convert(data.Items[0]);
				result.Count = data.Count ;
				next(null, result);
			});
		},
		GetLogin: function(params, next){
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					email:{
						AttributeValueList : [{'S':params.email}],
						ComparisonOperator : 'EQ'
					},
					password:{
						AttributeValueList : [{'S':params.password}],
						ComparisonOperator : 'EQ'
					}
				},
				IndexName : 'Account'
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);
				var result = Convert(data.Items[0]);
				result.Count = data.Count ;
				next(null, result);
			});
		}
	}
	return api ;
}
