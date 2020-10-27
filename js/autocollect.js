// Collect collectibles automatically
// ( dragoncave.net/trickortreat )

window.onload = function () {
	getHalloweenCollections();
}

setTimeout(function () {
	window.location.reload();
}, 1000 * 60 * 5) // Refresh every 5 minutes

function getHalloweenCollections() {
	let img = document.getElementsByTagName('img');
	for (let i = 0; i < img.length; i++) {
		if (img[i]['alt'] == "Trick, or treat") { 
			img[i].click();
		} // Happy Halloween ~ 
	}
}