// Listen for tab updates (when the user navigates to a new page)
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only run if the page has fully loaded and is an IMDb movie page
    if (changeInfo.status === 'complete' && tab.url.includes("imdb.com/title/tt")) {
        // Check the stored checkbox state
        browser.storage.local.get('showOverlay').then((result) => {
            const showOverlay = result.showOverlay !== false; // Default to true if not set
            // Send a message to the content script to show/hide the overlay based on the saved state
            browser.tabs.sendMessage(tabId, { action: 'toggleOverlay', showOverlay });
        });
    }
});

// Listen for messages from the popup
browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateOverlay') {
        // Get imdb movie tabs
        browser.tabs.query({ url: '*://www.imdb.com/title/tt*' }, (tabs) => {
            // Send the updateOverlay message to all imdb movie tabs
            tabs.forEach((tab) => {
                browser.tabs.sendMessage(tab.id, { action: 'toggleOverlay', showOverlay: message.showOverlay });
            });
        });
    }
});

// Listen for the keyboard shortcut command
browser.commands.onCommand.addListener((command) => {
    if (command === "open_letterboxd") {
        // Query the active tab and send a message to the content script
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                // Send the message only if there's an active tab
                browser.tabs.sendMessage(tabs[0].id, { action: "open_letterboxd" });
            }
        });
    }
});