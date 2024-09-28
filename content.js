console.log("content.js loaded successfully");

(function() {
    const imdbIdMatch = window.location.href.match(/tt\d+/);
    if (!imdbIdMatch) return;

    console.log("IMDb ID matched:", imdbIdMatch[0]);

    const imdbId = imdbIdMatch[0];

    // create the overlay
    function createOverlay() {
        // Check if the overlay already exists
        if (document.getElementById('letterboxd-overlay')) return;

        // Create a div that acts as the overlay container
        const overlay = document.createElement('div');
        overlay.id = "letterboxd-overlay";

        // Create the button inside the overlay
        const button = document.createElement('button');
        button.innerText = "Go to Letterboxd";
        button.id = "letterboxd-button";

       
       /* Placeholder
       
        // Create the info container that will appear on hover
        const info = document.createElement('div');
        info.id = "button-info";

        
        
        info.innerHTML = `
            <p>Rating: 8.2</p>
            <p>Watched by: 5000 members</p>
            <p>Fans: 2000</p>
        `;

        */

        // Add click event listener to the button
        button.addEventListener('click', function() {
            const letterboxdUrl = `https://letterboxd.com/imdb/${imdbId}/`;
            console.log(`Opening Letterboxd: ${letterboxdUrl}`);
            window.open(letterboxdUrl, '_blank'); // Open Letterboxd page in a new tab
        });

        // Append the button and info container to the overlay
        overlay.appendChild(button);
        /* overlay.appendChild(info); */

        // Append the overlay to the document body
        document.body.appendChild(overlay);
    }

    // Function to remove the overlay
    function removeOverlay() {
        const overlay = document.getElementById('letterboxd-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    // Load the checkbox state from storage and show/hide the overlay accordingly
    browser.storage.local.get('showOverlay').then((result) => {
        const showOverlay = result.showOverlay !== false; // Default to true if not set
        if (showOverlay) {
            createOverlay();
        } else {
            removeOverlay();
        }
    });

    // Listen for messages from the background script
    browser.runtime.onMessage.addListener((message) => {
        if (message.action === "toggleOverlay") {
            if (message.showOverlay) {
                createOverlay();
            } else {
                removeOverlay();
            }
        }
    });

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message) => {
    if (message.action === "open_letterboxd") {
        const letterboxdUrl = `https://letterboxd.com/imdb/${imdbId}/`;
        console.log(`Shortcut triggered: Opening Letterboxd: ${letterboxdUrl}`);
        window.open(letterboxdUrl, '_blank'); // Open Letterboxd page in a new tab
    }
});

})();
