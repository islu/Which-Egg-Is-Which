import biomes from './background_biome.js'

// ※handles
chrome.runtime.onMessage.addListener(handleReciveMessage);

function handleReciveMessage(message, sender, sendResponse) {
    let response = NewResponse();

    try {
        switch (message.method) {
            case 'GetEggByDescription':
                response.results.push(weiw.GetEggByDescription(
                    sender.url[sender.url.length - 1],
                    message.params[0]
                ));
            break;
            default:
                response.error = 'method no implement';
                response.results = [sender, message];
            break;
        }
    } catch (err) {
        console.error(err);
        response.error = 'background script error';
        response.results = [sender, message];
    }

    sendResponse(response);
}

function NewResponse() {
    return {
        error: '',
        results: [],
    };
}

// ※functions
const weiw = (function(locations) {

    function GetEggByDescription(locationId, description) {
        let result;

        locations[locationId].forEach(e => {
            const d = e.split('$')[0].replace('\ufeff','');
            const f = e.split('$')[1];
            if (d == description) {
                result = chrome.runtime.getURL('images/' + f);
            }
        });

        return result;
    }

    return {
        GetEggByDescription: GetEggByDescription,
    };
})(biomes);
