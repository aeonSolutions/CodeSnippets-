/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function AjxSimpleHtml(InputId, url, DivId, method, params){
	if(Boolean(DivId)){
	    url = url + '?debug=' + document.getElementById(DivId).value;
	}
	if(Boolean(params)){
	    url = url + params;
	}
	url = url + getNoCacheValue(url);

	var ajaxRequest = getXMLHttpRequest();
	ajaxRequest.onreadystatechange = function(){
										if (ajaxRequest.readyState == 4) {
											if (ajaxRequest.status == 200) {
												var code = ajaxRequest.responseText;
												var check_script= FindScript(code);
												document.getElementById(InputId).innerHTML  =  code;
												if (check_script!= false) {
													invokeScript(InputId); 												
												}
											}else {
												document.getElementById(InputId).innerHTML  =  ajaxRequest.responseText;
											}
										}
									};
	MakeResponse(ajaxRequest, method, url, params);
}
/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
