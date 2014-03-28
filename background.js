var ws = new WebSocket("ws://127.0.0.1:45000/foo");

ws.onclose = function() { 
	console.log("WebSocket closed!");
};

ws.onerror = function(e) { 
	console.log("WebSocket error! Whaney! ", e); 
};

ws.onopen = function() { 
	console.log("WebSocket opened!");
	console.log(ws);
};

/*chrome.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {
	if ( typeof changeInfo.url == "undefined" ) {
		return;
	}
	
	if ( changeInfo.url == "chrome://newtab/" ) {
		return;
	}
	
	console.log( "Tab ", tabId, " navigated to ", changeInfo.url );
	
	
	ws.send( JSON.stringify( {
		url: changeInfo.url
	} ) );
} );*/

chrome.extension.onRequest.addListener( function( data, sender, sendResponse ) {
	console.log(data);
	ws.send( JSON.stringify( data ) );
	sendResponse();
} );
