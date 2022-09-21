

var $ = jQuery;



var util = {

	formatSend (json) {
		var newJson = {};
		$.each(json, (prop,val) => {
			newJson[prop] = val;
			if($.isPlainObject(val) /*&& !$.isEmptyObject(val)*/) {
				newJson[prop] = JSON.stringify(val);
			}
		});
		return newJson;
	},

	formatRecv (json) {

		if(!json)return null;
		var newJson = $.isArray(json)? [] : {};
		$.each(json, (prop,val) => {
			newJson[prop] = val;
			if( typeof val == "string" && prop.indexOf("json") !== -1 ) {
				try{
					newJson[prop] = JSON.parse(val);
				}catch(e){
					newJson[prop]= "Error parsing :"+ e;
				}
			}
			if($.isPlainObject(val) || $.isArray(val)) {
				newJson[prop] = this.formatRecv(val);
			}

		});
		return newJson;
	},


	post (url,data,callback) {
		data = this.formatSend(data);
		$.ajax({
			type:'POST',
			url: url,
			contentType:"application/json",
			data: JSON.stringify(data),
			success: (res) => {
				res = this.formatRecv(res);
				callback(res);
			},
			error: (e) => {
				callback(e);
			}
		});
	},

	get (url, data_, callback) {
		$.get(url, (json) => {
			callback(this.formatRecv(json));
		});
	}
};


var httpApi = {

	get (url, data, callback){

		util.get(url, data, (res) => {
			callback(res);
		});
	},

	post (url, data, callback){

		util.post(url, data, (res) => {
			callback(res);
		});
	}
};





export default httpApi;
