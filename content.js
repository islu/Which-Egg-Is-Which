let thisLocationEggs = document.querySelector('.eggs').children;
let thisUrl = document.URL;
let thisLocationIndex = thisUrl[thisUrl.length-1];
let locations = [null, coast, desert, forest, jungle, alpine, volcano];

function FogRmoved(thisLocationEggs, local)
{
	for (let c = 0; c < thisLocationEggs.length; c++)
	{
		for (let i = 0; i < local.length; i++)
		{
			let thisEgg = [];
			let description = thisLocationEggs[c].getElementsByTagName('span')[0];
			let img = thisLocationEggs[c].getElementsByTagName('img')[0]
			
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


FogRmoved(thisLocationEggs, locations[thisLocationIndex]);


console.log('fog already remved! enjoy!');
