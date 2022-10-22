
// by Baev, 2022

var api_dadata_INNurl="https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
var api_dadata_BIKurl="https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank";
var api_dadata_token="";

function api_dadata_xhr(url,jsonstr) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST",url);
		xhr.setRequestHeader("Content-Type","application/json");
		xhr.setRequestHeader("Accept","application/json");
		xhr.setRequestHeader("Authorization","Token "+api_dadata_token);
		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.responseText);
			} else {
				reject({status: xhr.status, statusText: xhr.statusText});
			}
		};
		xhr.onerror = function () {
			reject({status: xhr.status, statusText: xhr.statusText});
		};
		xhr.send(jsonstr);
	});
}

function api_dadata_LoadFromINN(efc,DataINN,execfunc="") {
	let jsonstr = JSON.stringify({
		'query': DataINN
	});
	api_dadata_xhr(api_dadata_INNurl,jsonstr)
	.then(function(xhr_resp) {
		if (execfunc!="") eval(execfunc+'(efc,xhr_resp);');
	})
	.catch(function(xhr_err) {

	});
}

function api_dadata_LoadFromBIK(efc,DataBIK,execfunc="") {
	let jsonstr = JSON.stringify({
		'query': DataBIK
	});
	api_dadata_xhr(api_dadata_BIKurl,jsonstr)
	.then(function(xhr_resp) {
		if (execfunc!="") eval(execfunc+'(efc,xhr_resp);');
	})
	.catch(function(xhr_err) {

	});
}
