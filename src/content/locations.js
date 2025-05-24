
// --------- Initialization

ShowOriginalEggs();

// --------- Functions

// Replaces egg images with their original versions based on descriptions.
// It finds elements with the class 'eggs', iterates through their children,
// and for each child, it reads a description from a <span> element.
// It then sends this description to a Chrome extension's background script
// to get a corresponding egg image URL. If a URL is returned,
// it updates the <img> element's src attribute and removes width/height attributes.
function ShowOriginalEggs() {
    // Check if the '.eggs' element exists on the page.
    if (document.querySelector('.eggs') === null) {
        return; // Exit if '.eggs' element is not found.
    }
    // Get all child elements of the '.eggs' element.
    const eggs = [...document.querySelector('.eggs').children];

    // Iterate over each egg element.
    eggs.forEach(e => {
        // Get the description span and image element for the current egg.
        let d = e.getElementsByTagName('span')[0];
        let i = e.getElementsByTagName('img')[0];

        // Send a message to the background script to get the egg image URL by its description.
        chrome.runtime.sendMessage(
            {method: 'GetEggByDescription', params: [d.innerText]}, // Message payload
            rs => {handleGetEggByDescriptionResponse(rs, i, d);} // Callback function to handle the response
        );
    });
}

// Handles the response from the background script after requesting an egg image.
// Updates the image source if a valid URL is received.
function handleGetEggByDescriptionResponse(response, imgElement, spanElement) {
    // Log any errors received in the response.
    if (response.error !== '') {
        console.log(response);
        return; // Exit if there's an error.
    }
    // If a valid image source is received, update the image element.
    if (response.result.src !== '') {
        imgElement.src = response.result.src; // Set the new image source.
        // Remove width and height attributes to allow the image to resize naturally.
        imgElement.removeAttribute('width');
        imgElement.removeAttribute('height');
    }
}
