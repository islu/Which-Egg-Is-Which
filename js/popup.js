
window.onload = function init() {
	document.getElementById( 'rf-on' ).onclick = function()  { sendMessage('rf-on'); };
	document.getElementById( 'rf-off' ).onclick = function() { sendMessage('rf-off'); };
}

function sendMessage(msg) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, msg);
	});	
}