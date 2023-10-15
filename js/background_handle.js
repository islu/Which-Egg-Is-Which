import biomes from './background_biome.js'

// ※handles
chrome.runtime.onMessage.addListener(handleReceiveMessage);

function handleReceiveMessage(message, sender, sendResponse) {
    let response = {error: '', result: {}}

    try {
        switch (message.method) {
            case 'GetEggByDescription':
                let url = new URL(sender.url);
                let pathname = url.pathname.split('/');
                response.result = weiw.GetEggByDescription(pathname[2][0], ...message.params);
                break;
            default:
                response.error = 'method no implement';
                response.result = {sender: sender, message: message};
                break;
        }
    } catch (err) {
        console.error(err);
        response.error = 'background script error';
        response.result = {sender: sender, message: message};
    }

    sendResponse(response);
}

// ※functions
const weiw = (function(locations) {

    function GetEggByDescription(locationId, description) {
        let result = {src: '', description: '', id: '', isTarget: false};

        locations[locationId].forEach(e => {
            let d = e.split('$')[0].replace('\ufeff','');
            let f = e.split('$')[1];
            if (d == description) {
                result.src = chrome.runtime.getURL('images/' + f);
            }
        });

        return result;
    }

    return {
        GetEggByDescription: GetEggByDescription,
    };
})(biomes);
