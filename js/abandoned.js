let eggs = $(".spr").parent();
let eggImg;

// show egg name code
eggs.hover(hoverIn, hoverOut);

function hoverIn() {
  let code = this.href.split('/')[4];
	eggImg = this.firstChild;
	this.text = code;	
}
function hoverOut() {
	this.innerHTML = "";
	this.appendChild(eggImg);
}