document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('toggle-overlay');

  // Load the saved checkbox state
  browser.storage.local.get('showOverlay').then((result) => {
      checkbox.checked = result.showOverlay !== false; // Default to true if not set
  });

  // Listen for checkbox changes
  checkbox.addEventListener('change', () => {
      const showOverlay = checkbox.checked;

      // Save the checkbox state
      browser.storage.local.set({ showOverlay });

      // Notify the background script about the change
      browser.runtime.sendMessage({ action: 'updateOverlay', showOverlay });
  });

  // Display the current shortcut command
  browser.commands.getAll().then((commands) => {
      const shortcutCommand = commands.find(command => command.name === "open_letterboxd");
      if (shortcutCommand && shortcutCommand.shortcut) {
          document.getElementById('shortcut-info').textContent = `Redirect Shortcut: ${shortcutCommand.shortcut}`;
      } else {
          document.getElementById('shortcut-info').textContent = "Redirect Shortcut: Not set";
      }
  });
});

