import biomes from '../modular/biome.js' // Imports biome data from a local JSON file.

// Adds a listener for messages sent from other parts of the Chrome extension.
chrome.runtime.onMessage.addListener(handleReceiveMessage);

/**
 * Handles incoming messages from other parts of the extension.
 * @param {object} message - The message sent by the calling script.
 * @param {chrome.runtime.MessageSender} sender - Metadata about the script that sent the message.
 * @param {function} sendResponse - Function to call to send a response.
 */
function handleReceiveMessage(message, sender, sendResponse) {
    let response = {error: '', result: {}} // Initialize response object.

    try {
        // Switch based on the method specified in the message.
        switch (message.method) {
            case 'GetEggByDescription':
                // Parses the sender's URL to extract a pathname component.
                let url = new URL(sender.url);
                let pathname = url.pathname.split('/');
                // Calls GetEggByDescription with the extracted pathname component and message parameters.
                response.result = weiw.GetEggByDescription(pathname[2][0], ...message.params);
                break;
            default:
                // Handles unimplemented methods.
                response.error = 'method no implement';
                response.result = {sender: sender, message: message};
                break;
        }
    } catch (err) {
        // Handles any errors during message processing.
        console.error(err);
        response.error = 'background script error';
        response.result = {sender: sender, message: message};
    }

    // Sends the response back to the caller.
    sendResponse(response);
}

// IIFE (Immediately Invoked Function Expression) to create the weiw module.
const weiw = (function(locations) {

    /**
     * Retrieves egg information based on location ID and description.
     * @param {string} locationID - The ID of the location.
     * @param {string} description - The description of the egg.
     * @returns {object} An object containing the egg's src, description, id, and isTarget status.
     */
    function GetEggByDescription(locationID, description) {
        let result = {src: '', description: '', id: '', isTarget: false}; // Initialize result object.

        // Iterates over the eggs in the specified location.
        locations[locationID].forEach(e => {
            // Splits the egg string into description and filename.
            // Removes BOM (Byte Order Mark) if present.
            let d = e.split('$')[0].replace('\ufeff','');
            let f = e.split('$')[1];
            // If the description matches, construct the image URL.
            if (d == description) {
                result.src = chrome.runtime.getURL('images/' + f);
            }
        });

        return result; // Returns the found egg information.
    }

    // Exposes the GetEggByDescription function.
    return {
        GetEggByDescription: GetEggByDescription,
    };

})(biomes); // Passes the imported biomes data to the IIFE.
