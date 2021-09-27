// ※init
ShowOriginalEggs();

// ※functions
// Replace the hidden egg with the original one.
function ShowOriginalEggs() {
    if (document.querySelector('.eggs') === null) {
        return;
    }
    const eggs = document.querySelector('.eggs').children;

    for (let c = 0; c < eggs.length; c++) {
        const d = eggs[c].getElementsByTagName('span')[0];
        const i = eggs[c].getElementsByTagName('img')[0];

        chrome.runtime.sendMessage(
            {method: 'GetEggByDescription', params: [d.innerText]},
            response => {handleGetEggByDescriptionResponse(response, i);}
        );
    }
}

function handleGetEggByDescriptionResponse(response, ...params) {
    if (response.results[0] === null) {
        return;
    }
    params[0].src = response.results[0];
    params[0].removeAttribute('width');
    params[0].removeAttribute('height');
}
