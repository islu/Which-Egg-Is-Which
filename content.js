let thisLocationEggs = document.querySelector('.eggs').children;
let thisUrl = document.URL;
let thisLocationIndex = thisUrl[thisUrl.length-1];
let locations = [null, coast, desert, forest, jungle, alpine, volcano, holiday];
// controll from popup.js
let rfBtn = 'rf-on' 

function removeFog(thisLocationEggs, local) {
	
	for (let c = 0; c < thisLocationEggs.length; c++) {
		let description = thisLocationEggs[c].getElementsByTagName('span')[0];
		let img = thisLocationEggs[c].getElementsByTagName('img')[0];
		
		for (let i = 0; i < local.length; i++) {
			let thisEgg = [];	
			thisEgg = local[i].split('$');
			
			if (thisEgg.includes(description.innerText) == true) {
				img.src = chrome.extension.getURL('images/'+thisEgg[1]);
				img.removeAttribute('width');
				img.removeAttribute('height');
				break;
			}
		}
	}
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request == 'rf-off' || request == 'rf-on') rfBtn = request;
		
		console.log(request);
		//console.log(sender);
		//console.log(sendResponse);
	
	}
)


if (rfBtn == 'rf-on') {
	removeFog(thisLocationEggs, locations[thisLocationIndex]);
	console.log('Fog Already Remved! ENJOY!');
}	


/// new function ///

//document.getElementsByClassName('ap')[0].children
//HTMLCollection(30)
//document.getElementsByClassName('ap')[0].children[0]
/*
<div>
	<a href="abandoned/Sb6Hu/ih2Eb09u">
		<img class="spr" alt="egg" src="/images/aXpC.png">
	</a>
	4 days and 2 hours left
</div>
*/

//let a = document.getElementsByClassName('ap')[0].children[0];


//// a bug :( /////
/*

// This egg was buried in a sand dune.        does't show img

let c = ['﻿This drab egg rests far from the water’s edge.$e1.png'];
let a = c[0].split('$');
let str = 'This drab egg rests far from the water’s edge.';
console.log(a);

console.log(a.includes(str)); // why false?
console.log(a[0] == str); // why???

*/

