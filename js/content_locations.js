// ※init
ShowOriginalEggs();

// ※functions
// Replace the hidden egg with the original one.
function ShowOriginalEggs() {
    if (document.querySelector('.eggs') === null) {
        return;
    }
    const eggs = [...document.querySelector('.eggs').children];

    eggs.forEach(e => {
        const d = e.getElementsByTagName('span')[0];
        const i = e.getElementsByTagName('img')[0];

        chrome.runtime.sendMessage(
            {method: 'GetEggByDescription', params: [d.innerText]},
            rs => {handleGetEggByDescriptionResponse(rs, i);}
        );
    });
}

function handleGetEggByDescriptionResponse(response, ...params) {
    if (response.error !== '') {
        console.log(response);
        return;
    }
    if (response.results[0] === null) {
        console.log('no match');
        return;
    }
    params[0].src = response.results[0];
    params[0].removeAttribute('width');
    params[0].removeAttribute('height');
}
