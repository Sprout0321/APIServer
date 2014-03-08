module.exports = exports = nano = function(db){
	var api = {
		Create : function(params, next){
			next (null, '1111');
		}
		Get : function(params, next){
			next (null, '222');
		}
	}
	return api ;
}
