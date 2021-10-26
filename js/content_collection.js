// ※init
setTimeout(() => {AutoCollectCollectibles(5);}, 100);

// ※functions
// Collect collectibles automatically.
function AutoCollectCollectibles(refreshMinute = 5) {
    const c = [...document.getElementsByTagName('img')];
    
    for (let i = 0; i < c.length; i++) {
        if (isCollectible(c[i].alt)) {
            c[i].click();
            break;
        }
    }

    setTimeout(() => {window.location.reload();}, 1000 * 60 * refreshMinute)
}

function isCollectible(s) {
    return s === 'Trick, or treat' || s === 'Festival of Eggs egg';
}
