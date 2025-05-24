
// --------- Initialization

setTimeout(() => {AutoCollectCollectibles(5);}, 5000);

// --------- Functions

// Collect collectibles automatically.
/**
 * Automatically finds and clicks on the first collectible image element on the page
 * and then reloads the page after a specified number of minutes.
 *
 * @param {number} [refreshMinute=5] - The number of minutes to wait before reloading the page. Defaults to 5 minutes.
 */
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
