// LAYOUT

document.addEventListener('DOMContentLoaded', function() {
    // Fetch layout.html
    fetch('/layout.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract header and footer
            const header = doc.querySelector('header').innerHTML;
            const footer = doc.querySelector('footer').innerHTML;
            
            // Insert into current page
            if (document.querySelector('header')) {
                document.querySelector('header').innerHTML = header;
            }
            if (document.querySelector('footer')) {
                document.querySelector('footer').innerHTML = footer;
            }

            // Cargar explicitamente navbar.js
            const screensaverScript = document.createElement('script');
            screensaverScript.src = '/navbar.js';
            document.body.appendChild(screensaverScript);
            })
        .catch(error => console.error('Error loading header/footer:', error));
});

