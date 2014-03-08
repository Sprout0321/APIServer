module.exports = exports = nano = function(db){
	var tableName = "Customer";
	var api = {
		Create : function(params, next){
			next (null, '1111');
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
					password:{
						AttributeValueList : [{'S':params.password}],
						ComparisonOperator : 'EQ'
					}
				},
				IndexName : 'Account'
			}
			db.query(param, function(err, data){
				if(err) return next(err);
				next(null, data);
			});
		}
	}
	return api ;
}
