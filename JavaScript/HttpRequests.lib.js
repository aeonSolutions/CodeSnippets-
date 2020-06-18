/* last update: 6-2-2016 */
/* common method to get XMLHttp request object */
function getXMLHttpRequest(){
	var req;
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	return ajaxRequest;
}

/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function getNoCacheValue(url){
	var d = new Date();
	var appendstring = (url.indexOf("?") != -1) ? "&" : "?";
	var nocachevalue = appendstring + "no-cache=" + d.getTime();
	return nocachevalue;
}

/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function MakeResponse(ajaxRequest, method, url, params){
	if (method=='P' || method=='p' || method=='post') {
		method ='POST';
	} else if (method=='g' || method=='G' || method=='get') {
		method ='GET;'
	} else {
		method='GET';
	}
	
	ajaxRequest.open(method, url, true);
	if (method=='POST') {
		ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
		ajaxRequest.send(params); //POST VARS ONLY
	} else {
		ajaxRequest.send(null); 
	}
}

/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function PrepareParameters(params) {
	if (params != null || params !='') {
		var data2send='';
		var value='';
		for (var i = 0; i < params.length; i++) {
		  	data2send += (i > 0 ? "&" : "");
		  	if (document.getElementById(params[i]).type == 'checkbox' || document.getElementById(params[i]).type == 'radio'){
				if(document.getElementById(params[i]).checked==false){
					value=0;
				}else {
					value=1;
				}
		  	}else { // other input fields
		  		value = document.getElementById(params[i]).value;
		  	}
			data2send += params[i] + '=' + encodeURI(value);
		}
		return data2send;
	}else {
		return '';
	}
}
/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function invokeScript(divid){
	var DivIdObj = document.getElementById(divid);
	var scriptObj = DivIdObj.getElementsByTagName("script");
	var len = scriptObj.length; // number of script tags found
	for(var i=0; i<len; i++){
		var scriptText = scriptObj[i].text;
		var scriptFile = scriptObj[i].src;		
		var scriptTag = document.createElement("script");

		if ((scriptFile != null) && (scriptFile != "")){
			scriptTag.src = scriptFile;
		}
		scriptTag.text = scriptText;
		if (!document.getElementsByTagName("head")[0]) {
			document.createElement("head").appendChild(scriptTag);
		} else {
			document.getElementsByTagName("head")[0].appendChild(scriptTag);
		}
	}
}
/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//missing when there are only script code and extremes of string
function FindScript(Str){ // returns array Pos 0: script Pos 1: remaining code
	if (Str.indexOf("script")!=-1) {
		var start_pos = Str.indexOf( 'script' ) -1;
		var end_pos = Str.lastIndexOf( 'script' ) +7;
		var result = [];
		result[0] = Str.substring(start_pos, end_pos); // script code
		result[1] = Str.substring(0, start_pos) + Str.substring(end_pos, Str.length); //remaining code
		return result;
	}else {
		return false;
	}
}


/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/* generic sample to add on html frontend */



function AjxSilent(InputId, url, method, params){
	// missing status_ok var init
	url = url + getNoCacheValue(url);
	
	var ajaxRequest = getXMLHttpRequest();
	ajaxRequest.onreadystatechange = function(){
										if (ajaxRequest.readyState == 4) {
											if (ajaxRequest.status == 200) {
												var code = ajaxRequest.responseText;
												var check_script= FindScript(code);
												document.getElementById(InputId).innerHTML  =  code;
												
												if (check_script===true) {
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

function AjxFileUpload(InputFileId,InputBtnId, url, params, Pbar){
	
	var method='post';
	var file = document.getElementById(InputFileId);
	/* Create a FormData instance */
	var formData = new FormData();
	/* Add the file */ 
	formData.append(InputBtnId, file.files[0]);
	
	url = url + getNoCacheValue(url);
	var progressBar = document.getElementById(Pbar);
	
	var ajaxRequest = getXMLHttpRequest();
	
	 ajaxRequest.upload.onprogress = function(e) {
		 if (e.lengthComputable) {
			var percentComplete = (e.loaded / e.total) * 100;
			progressBar.value = percentComplete;
		 } else {
		 	console.log("Unable to compute progress information since the total size is unknown");
		 }
	};
	
	ajaxRequest.onreadystatechange = function(){
			if (ajaxRequest.readyState == 4) {
				if (ajaxRequest.status == 200) {
					//file upload completed sucessfully
					document.getElementById(InputId).value  =  ajaxRequest.responseText;
				}else {
					document.getElementById(InputId).value  =  ajaxRequest.responseText;
				}
			}
	};
	
	MakeResponse(ajaxRequest, method, url, formData);
}

/////////////////////////////////////////////////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
