/*
 * api-js-dadata / API integration using JavaScript 
 * Copyright (C) 2022 Baev
 *
 * MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * GNU General Public License, version 2
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * 
*/

function forms_LoadFromINN(efc) {
	if (api_dadata_token=="") {
		alert("The api_dadata_token must be specified in the api_dadata.js file. You can get it after registering in the dadata.ru service.");
		return;
	}
	efc.classList.add('disabledbtn');
	document.getElementById("from-innloader").style.display="block";
	api_dadata_LoadFromINN(efc,encodeHtml(document.getElementById('forms-inn').value),'forms_LoadFromINN_exec');
}
function forms_LoadFromINN_exec(efc,jsondata) {
	document.getElementById("forms-inn-json").innerHTML=jsondata;
	let databody=document.getElementById('forms-legalentities-data');
	let DataFromINN = JSON.parse(jsondata);
	if (DataFromINN.suggestions.length) {
		databody.innerHTML='\
			Name: <b>'+DataFromINN.suggestions[0].value+'</b><br />\
			KPP: <b>'+DataFromINN.suggestions[0].data.kpp+'</b><br />\
			OGRN: <b>'+DataFromINN.suggestions[0].data.ogrn+'</b><br />\
			Legal address: <b>'+DataFromINN.suggestions[0].data.address.value+'</b><br />\
		';
		databody.style.display="block";
	} else {
		databody.style.display="none";
		alert("There is no data on the organization and individual entrepreneur. Check the correctness of entering the TIN.");
		document.getElementById('forms-inn').focus();
		document.getElementById('forms-inn').select();
	}
	document.getElementById("from-innloader").style.display="none";
	efc.classList.remove('disabledbtn');
}
function encodeHtml(str) {
	var map = { '&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#039;' };
	return str.replace(/[&<>"']/g, function(m) {return map[m];});
}
function forms_InputValid(evnt,keymask) {
	if (keymask=="0-9") evnt.value = evnt.value.replace(/[^0-9]/g,"");
}
