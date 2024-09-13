document.addEventListener('DOMContentLoaded', () => {
    // Get all commands defined in the manifest
    chrome.commands.getAll((commands) => {
      // Find the specific command for your extension
      const shortcutCommand = commands.find(command => command.name === "open_letterboxd");
  
      // If a shortcut is found, display it
      if (shortcutCommand && shortcutCommand.shortcut) {
        document.getElementById('shortcut-info').textContent = `Redirect Shortcut: ${shortcutCommand.shortcut}`;
      } else {
        document.getElementById('shortcut-info').textContent = "Redirect Shortcut: Not set";
      }
    });
  });