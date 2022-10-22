<?php

// by Baev, 2022

?>
<script src="api_dadata.js" type="text/javascript"></script>
<style type="text/css">
.loadbtn { cursor:pointer; background:linear-gradient(#27A2F8,#64B3F1,#27A2F8); border-radius:6px; color:#fff; font-size:11px; font-weight:normal; text-align:center; width: max-content; }
.leftbtn { float:left; }
.disabledbtn { cursor:default; background:linear-gradient(#929292,#A8A8A8,#929292); }
.clockloading { width:26px; height:24px; background: url('clock_white-30.gif') left top no-repeat; }
.loadbtn {
	margin:10px 0;
	padding:6px 25px;
}
.clockloading {
	margin:12px 0;
}
.legalentities {
	border:1px dashed #9A9A9A;
	border-radius:3px;
	padding:5px 10px;
	font-size:14px !important;
	font-weight:normal !important;
}
.nopopup-botlist {
	margin-top:3px;
	background-color:#fff;
	color:#555;
	padding:1px 4px;
	z-index:1;
	border:1px dashed #9A9A9A;
	border-radius:3px;
	height:300px;
	width:auto;
	overflow-y:scroll;
}
</style>

<div class="entry-content">

<div class="backlink"><a href="javascript:history.back();">&laquo; назад (back) &laquo;</a></div>

<h3 style="margin-top:10px;">Поиск по ИНН и загрузка данных юридических лиц через API</h3>
<p>
	Введите ИНН организации или ИП, данные по которым вы хотите получить. 
</p>

<input type="text" value="" id="forms-inn" style="width:358px; min-width:358px;" class="" maxlength="300" placeholder="" onkeyup="javascript:forms_InputValid(this,'0-9');">
<div style="clear:both;"></div>
<div onclick="javascript:forms_LoadFromINN(this);" id="from-innbutton" class="loadbtn leftbtn">Загрузить данные</div><div class="clockloading leftbtn" id="from-innloader" style="margin-left:20px;display:none;"></div>
<div style="clear:both;"></div>
<div id="forms-legalentities-data" class="legalentities" style="display:none;"></div>

<p>
	Технически данный сервис может взаимодействовать с любым API, выдающим по запросу данные организации.
	<br /><i>Для передачи и получения данных используется формат JSON:</i>
</p>

<div id="forms-inn-json" class="nopopup-botlist"></div>

<div class="backlink"><a href="javascript:history.back();">&laquo; назад (back) &laquo;</a></div>

</div>
<script type="text/javascript">
function forms_LoadFromINN(efc) {
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
			Наименование: <b>'+DataFromINN.suggestions[0].value+'</b><br />\
			КПП: <b>'+DataFromINN.suggestions[0].data.kpp+'</b><br />\
			ОГРН: <b>'+DataFromINN.suggestions[0].data.ogrn+'</b><br />\
			Юр.адрес: <b>'+DataFromINN.suggestions[0].data.address.value+'</b><br />\
		';
		databody.style.display="block";
	} else {
		databody.style.display="none";
		alert("Нет данных по организации и ИП. Проверьте правильность ввода ИНН.");
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
</script>
