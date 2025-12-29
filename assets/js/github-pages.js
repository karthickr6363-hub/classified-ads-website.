// GitHub Pages Base Path Detection
// Include this script in all HTML pages for GitHub Pages compatibility

(function() {
    // Only run if base tag doesn't exist
    if (document.querySelector('base')) {
        return;
    }
    
    const path = window.location.pathname;
    let basePath = '/';
    
    // Check if we're on GitHub Pages (repository subdirectory)
    // Pattern: /username.github.io/repository-name/ or /repository-name/
    const pathParts = path.split('/').filter(p => p);
    
    // If path has more than one part, it's likely a subdirectory
    if (pathParts.length > 1) {
        const firstPart = pathParts[0];
        
        // Skip common patterns that aren't repository names
        if (firstPart && 
            !firstPart.includes('.') && 
            firstPart !== 'index.html' && 
            firstPart !== 'index' &&
            !firstPart.match(/\.(html|css|js|png|jpg|svg|ico|json)$/i)) {
            basePath = '/' + firstPart + '/';
        }
    }
    
    // Special case: if path explicitly contains repository name
    if (path.includes('/classified-ads-websites/')) {
        basePath = '/classified-ads-websites/';
    }
    
    // Store base path globally
    window.BASE_PATH = basePath;
    
    // Set base tag
    const base = document.createElement('base');
    base.href = basePath;
    document.head.insertBefore(base, document.head.firstChild);
})();

