// ※init
let eggs = [...document.querySelectorAll('.spr')].map(e => e.parentNode);
// e.g.
// <a href="abandoned/{egg_id}/...">
//    <img class="spr" alt="egg" src="...">
// </a>
let textEggId = createTextElement('<egg_id>');

eggs.forEach(e => {
    e.addEventListener('mouseenter', ShowEggId);
    e.addEventListener('mouseenter', ShowEggLineage);
    e.addEventListener('mouseleave', HideEggId);
});

// ※functions
function ShowEggId() {
    const id = parseEggId(this.href);
    if (id === undefined) {
        return;
    }
    textEggId.innerText = id;
    this.appendChild(textEggId);
}

function ShowEggLineage() {
    const id = parseEggId(this.href);
    if (id === undefined) {
        return;
    }
    document.querySelector('.adsbygoogle').innerHTML =
        `<iframe
            src="https://dragcave.net/lineage/${id}" 
            display="block" width="100%" height="100%"
            frameborder="0"
            scrolling="yes""
        >
        </iframe>'`;
}

function HideEggId() {
    try {
        this.removeChild(textEggId);
    } catch {
    }
}

function parseEggId(url) {
    let u = new URL(url)
    return u.pathname.split('/')[2];
}

function createTextElement(value = '') {
    let e;
    e = document.createElement('span');
    e.innerText = value;
    e.style.relative = 'absolute';
    e.style.marginLeft = '-33px';
    e.style.backgroundColor = 'yellow';
    return e;
}
