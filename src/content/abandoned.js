
// --------- Initialization

// Select all elements with class 'spr' (likely images of eggs)
// and get their parent nodes (which are expected to be anchor tags <a>).
let eggs = [...document.querySelectorAll('.spr')].map(e => e.parentNode);
// e.g.
// <a href="abandoned/{egg_id}/...">
//    <img class="spr" alt="egg" src="...">
// </a>

// Create a text element that will be used to display the egg ID.
let textEggId = createTextElement('<egg_id>');

// Iterate over each egg element (anchor tag).
eggs.forEach(e => {
    // Add an event listener for 'mouseenter' to show the egg ID.
    e.addEventListener('mouseenter', ShowEggId);
    // Add an event listener for 'mouseenter' to show the egg lineage.
    e.addEventListener('mouseenter', ShowEggLineage);
    // Add an event listener for 'mouseleave' to hide the egg ID.
    e.addEventListener('mouseleave', HideEggId);
});

// --------- Functions

// Function to display the egg ID when the mouse enters an egg element.
function ShowEggId() {
    // Parse the egg ID from the href attribute of the current element (this).
    const id = parseEggId(this.href);
    // If no ID is found, exit the function.
    if (id === undefined) {
        return;
    }
    // Set the inner text of the textEggId element to the parsed ID.
    textEggId.innerText = id;
    // Append the textEggId element to the current egg element (this).
    this.appendChild(textEggId);
}

// Function to display the egg lineage in an iframe when the mouse enters an egg element.
function ShowEggLineage() {
    // Parse the egg ID from the href attribute of the current element (this).
    const id = parseEggId(this.href);
    // If no ID is found, exit the function.
    if (id === undefined) {
        return;
    }
    // Select the HTML element with class '_n_5' (presumably a container for the lineage).
    // Set its innerHTML to an iframe that loads the lineage page from dragcave.net.
    document.querySelector('._n_5').innerHTML =
        `<iframe
            src="https://dragcave.net/lineage/${id}"
            display="block" width="100%" height="100%"
            frameborder="0"
            scrolling="yes"
        >
        </iframe>`;
}

// Function to hide the egg ID when the mouse leaves an egg element.
function HideEggId() {
    try {
        // Attempt to remove the textEggId element from the current egg element (this).
        this.removeChild(textEggId);
    } catch {
        // If an error occurs (e.g., the element is already removed), do nothing.
    }
}

// Function to parse the egg ID from a given URL string.
function parseEggId(url) {
    // Create a URL object from the string.
    let u = new URL(url);
    // The pathname is expected to be like "/abandoned/{egg_id}/...".
    // Split the pathname by '/' and return the third segment, which should be the egg ID.
    return u.pathname.split('/')[2];
}

// Function to create a styled span element for displaying text.
function createTextElement(value = '') {
    let e;
    // Create a new span element.
    e = document.createElement('span');
    // Set its inner text to the provided value.
    e.innerText = value;
    // Apply some basic styling.
    e.style.relative = 'absolute'; // Note: This should likely be e.style.position = 'absolute';
    e.style.marginLeft = '-33px';
    e.style.backgroundColor = 'yellow';
    // Return the created element.
    return e;
}
