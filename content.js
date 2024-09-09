(function() {
    // Check if we are on a movie page by looking for the IMDb ID in the URL
    const imdbIdMatch = window.location.href.match(/tt\d+/);
    if (!imdbIdMatch) return;
  
    const imdbId = imdbIdMatch[0];
  
    // Create a div that acts as the overlay container
    const overlay = document.createElement('div');
    overlay.id = "letterboxd-overlay";
  
    // Create the button inside the overlay
    const button = document.createElement('button');
    button.innerText = "Go to Letterboxd";
    button.id = "letterboxd-button";

    // Add icon next to the button's text
    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('icon2.png');  // Correctly fetch the image
    button.appendChild(img);
  
    // Add click event listener to the button
    button.addEventListener('click', function() {
      const letterboxdUrl = `https://letterboxd.com/imdb/${imdbId}/`;
      window.open(letterboxdUrl, '_blank'); // Open Letterboxd page in a new tab
    });
  
    // Append the button to the overlay
    overlay.appendChild(button);
  
    // Append the overlay to the document body
    document.body.appendChild(overlay);
  })();