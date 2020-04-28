let thisLocationEggs = document.querySelector('.eggs').children;
let thisUrl = document.URL;
let thisLocationIndex = thisUrl[thisUrl.length-1];
let locations = [null, coast, desert, forest, jungle, alpine, volcano, holiday];

function remove_fog(thisLocationEggs, local) {

	for (let c = 0; c < thisLocationEggs.length; c++) {
		let description = thisLocationEggs[c].getElementsByTagName('span')[0];
		let img = thisLocationEggs[c].getElementsByTagName('img')[0];

		for (let i = 0; i < local.length; i++) {
			let thisEgg = local[i].split('$');
			
			if (thisEgg[0].replace("\ufeff","") == description.innerText) {
				img.src = chrome.extension.getURL('images/'+thisEgg[1]);
				img.removeAttribute('width');
				img.removeAttribute('height');
				label_rarity(description, thisEgg[1]);
				break;
			}
		}
	}
}

function label_rarity(element, key) {
	if (RARITY[key] != undefined) {
		switch (RARITY[key].rarity) {
			case "Uncommon":    element.style = "background-color:"+SILVER; break;
			case "Rare":        element.style = "background-color:"+GOLD; break;
			case "Mythic Rare": element.style = "background-color:"+RED; break;
		}
	}
}

remove_fog(thisLocationEggs, locations[thisLocationIndex]);
console.log('Fog Already Remved! ENJOY!');
