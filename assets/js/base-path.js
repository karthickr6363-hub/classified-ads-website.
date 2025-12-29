// Base path detection for GitHub Pages
// This script detects if the site is running on GitHub Pages and adjusts paths accordingly

(function() {
    // Detect base path
    const getBasePath = () => {
        const path = window.location.pathname;
        // Check if we're on GitHub Pages (not root domain)
        // GitHub Pages URLs look like: username.github.io/repository-name/
        if (path.includes('/classified-ads-websites/') || path.match(/\/[^\/]+\/[^\/]+\//)) {
            // Extract repository name from path
            const match = path.match(/\/([^\/]+)\//);
            if (match && match[1] !== 'index.html' && match[1] !== '') {
                return '/' + match[1] + '/';
            }
        }
        return '/';
    };

    // Set base path globally
    window.BASE_PATH = getBasePath();

    // Helper function to get full path
    window.getPath = (path) => {
        // If path already starts with http:// or https://, return as is
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        // Return with base path
        return window.BASE_PATH === '/' ? '/' + cleanPath : window.BASE_PATH + cleanPath;
    };

    // Update all links and assets on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Update base tag if exists, or create one
        let baseTag = document.querySelector('base');
        if (!baseTag) {
            baseTag = document.createElement('base');
            baseTag.href = window.BASE_PATH;
            document.head.insertBefore(baseTag, document.head.firstChild);
        } else {
            baseTag.href = window.BASE_PATH;
        }
    });
})();

