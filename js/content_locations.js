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
        let d = e.getElementsByTagName('span')[0];
        let i = e.getElementsByTagName('img')[0];

        chrome.runtime.sendMessage(
            {method: 'GetEggByDescription', params: [d.innerText]},
            rs => {handleGetEggByDescriptionResponse(rs, i, d);}
        );
    });
}

function handleGetEggByDescriptionResponse(response, imgElement, spanElement) {
    if (response.error !== '') {
        console.log(response);
        return;
    }
    if (response.result.src !== '') {
        imgElement.src = response.result.src;
        imgElement.removeAttribute('width');
        imgElement.removeAttribute('height');
    }
}
