// ※init
window.onload = function () {
	clickHalloweenCollections();
	clickEasterCollections();
}

setTimeout(function () {
	window.location.reload();
}, 1000 * 60 * 5) // Refresh every 5 minutes

// ※functions
// Collect collectibles automatically.
function clickHalloweenCollections() {
	let img = document.getElementsByTagName('img');
	for (let i = 0; i < img.length; i++) {
		if (img[i]['alt'] == 'Trick, or treat') { 
			img[i].click();
		} // Happy Halloween ~ 
	}
}

function clickEasterCollections() {
	let img = document.getElementsByTagName('img');
	for (let i = 0; i < img.length; i++) {
		if (img[i]['alt'] == 'Festival of Eggs egg') { 
			img[i].click();
		}
	}
}
