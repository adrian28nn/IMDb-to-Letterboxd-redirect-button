// background.js


// Listen for the keyboard shortcut
browser.commands.onCommand.addListener(function(command) {
    if (command === "open_letterboxd") {
        // Query the active tab and send a message to the content script
        browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            browser.tabs.sendMessage(tabs[0].id, { action: "open_letterboxd" });
        });
    }
});