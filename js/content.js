let thisLocationEggs = document.querySelector('.eggs').children;
let thisUrl = document.URL;
let thisLocationIndex = thisUrl[thisUrl.length-1];
let locations = [null, coast, desert, forest, jungle, alpine, volcano, holiday];

function removeFog(thisLocationEggs, local) {

	for (let c = 0; c < thisLocationEggs.length; c++) {
		let description = thisLocationEggs[c].getElementsByTagName('span')[0];
		let img = thisLocationEggs[c].getElementsByTagName('img')[0];

		for (let i = 0; i < local.length; i++) {
			let thisEgg = local[i].split('$');
			
			if (thisEgg[0].replace("\ufeff","") == description.innerText) {
				img.src = chrome.extension.getURL('images/'+thisEgg[1]);
				img.removeAttribute('width');
				img.removeAttribute('height');
				break;
			}
		}
	}
}

removeFog(thisLocationEggs, locations[thisLocationIndex]);
console.log('Fog Already Remved! ENJOY!');
