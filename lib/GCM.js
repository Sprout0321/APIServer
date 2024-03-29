module.exports = exports = nano = function(db){
	var Convert = require('./Helper.js').ConvertRecord;
	var Auth = require('./Helper.js').Auth;
	var tableName = "GcmToken";
	var gcm = require('node-gcm');
	var api = {
		Regist : function(params, next){
			//if(!Auth(params.auth)) return next('Auth error');
				var putParam = {
					TableName: tableName,
					Item:{
						customerid:{'S':params.customerid},
						token:{'S':params.token},
					},
				}
				db.putItem(putParam, function(error, data){
					if (error) return next(error);
					next(null, data);
			});
		},
		Get : function(params, next){
			if(!Auth(params.auth)) return next('Auth error');
			var param = {
				TableName : tableName,
				Select : 'ALL_ATTRIBUTES',
				KeyConditions : {
					customerid:{
						AttributeValueList : [{'S':params.customerid}],
						ComparisonOperator : 'EQ'
					},
				}
			}
			db.query(param, function(err, data){
				if(err) 
					return next(err);
				next(null, data.Items[0].token.S);
			});
				
		},
		Notice : function(params, next){
			function pushNotification(){
				var messageData = "您於" + params.name + "得到" + params.changepoints + "點，您目前有" + params.points + "點";
				var message = new gcm.Message({
					collapseKey: 'demo',
					delayWhileIdle: true,
					timeToLive : 3,
					data : {
						key:messageData
					}
				});
				var sender = new gcm.Sender('AIzaSyBapg39uwsIaHG2YFZaVjktPeuRIbqv6Ek');
				var registrationId = [params.token];
				sender.send(message, registrationId, 4, function(err, result){
					console.log(result);
					next(null, result);
				});
			}
			pushNotification();
		}
	}
	return api ;
}	
