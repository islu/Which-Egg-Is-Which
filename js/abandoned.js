let eggs = $(".spr").parent();
let eggImg;

// show egg name code
eggs.hover(show_code, hide_code);
eggs.hover(show_lineage, function(){});
// highlight();
show_lineage();

function show_code() {
  let code = this.href.split('/')[4];
	eggImg = this.firstChild;
	this.text = code;
}
function hide_code() {
	this.innerHTML = "";
	this.appendChild(eggImg);
}
function highlight() {
	for (let i = 0; i < eggs.length; i++) {
		let code = eggs[i].href.split('/')[4];
		
		if (code.match(/\d{4,}/g) != null) {
			eggs[i].style = "background-color: yellow"
		}
		if (code.match(/[a-z]{4,}/g) != null) {
			eggs[i].style = "background-color: yellow"
		}
		if (code.match(/[A-Z]{4,}/g) != null) {
			eggs[i].style = "background-color: yellow"
		}
	}
}
function show_lineage() {
	//https://dragcave.net/lineage/:code
	let code = this.href.split('/')[4];
	$('.adsbygoogle').html(function() {
		return '<iframe src="https://dragcave.net/lineage/'+code+'" display="block" width="100%" height="100%" frameborder="0" scrolling="yes""></iframe>'
	})
	//$('.online').append('<iframe src="https://dragcave.net/lineage/'+code+'" display="block" width="100%" height="400px" frameborder="0" scrolling="yes""></iframe>');
}