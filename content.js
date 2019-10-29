let thisLocationEggs = document.querySelector('.eggs').children;
let thisUrl = document.URL;
let thisLocationIndex = thisUrl[thisUrl.length-1];
let locations = [null, coast, desert, forest, jungle, alpine, volcano, holiday];

function remove_fog(thisLocationEggs, local)
{
	for (let c = 0; c < thisLocationEggs.length; c++)
	{
		let description = thisLocationEggs[c].getElementsByTagName('span')[0];
		let img = thisLocationEggs[c].getElementsByTagName('img')[0];
		
		for (let i = 0; i < local.length; i++)
		{
			let thisEgg = [];	
			thisEgg = local[i].split('$');
			
			if (thisEgg.includes(description.innerText) == true)
			{
				img.src = chrome.extension.getURL('images/'+thisEgg[1]);
				img.removeAttribute('width');
				img.removeAttribute('height');
				break;
			}
		}
	}
}

remove_fog(thisLocationEggs, locations[thisLocationIndex]);

console.log('Fog Already Remved! ENJOY!');

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

let c = ['﻿This drab egg rests far from the water’s edge.$e1.png'];
let a = c[0].split('$');
let str = 'This drab egg rests far from the water’s edge.';
console.log(a);

console.log(a.includes(str)); // why false?
console.log(a[0] == str); // why???

*/

