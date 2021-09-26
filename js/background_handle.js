// ※handles
chrome.runtime.onMessage.addListener(handleReciveMessage);

function handleReciveMessage(message, sender, sendResponse) {
    let response = NewResponse();

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

        locations[locationId].forEach((e) => {
            const d = e.split('$')[0].replace('\ufeff','');
            const f = e.split('$')[1];
            if (d == description) {
                result = chrome.extension.getURL('images/' + f);
            }
        });

        return result;
    }

    return {
        GetEggByDescription: GetEggByDescription,
    };
})(
    // from 'location.js'
    [null, coast, desert, forest, jungle, alpine, volcano, holiday]
);
