// GitHub Pages Base Path Fix
// This script detects the repository name and fixes all links and asset paths

(function() {
    // Detect base path
    function getBasePath() {
        const path = window.location.pathname;
        const hostname = window.location.hostname;
        let basePath = '/';
        
        if (hostname.includes('github.io')) {
            const pathParts = path.split('/').filter(p => p && p !== 'index.html' && p !== '');
            if (pathParts.length > 0) {
                const repoName = pathParts[0];
                if (repoName && !repoName.match(/\.(html|css|js|png|jpg|jpeg|svg|ico|gif|webp)$/i)) {
                    basePath = '/' + repoName + '/';
                }
            }
        }
        
        return basePath;
    }
    
    // Set global base path
    window.BASE_PATH = getBasePath();
    
    // Set base tag
    if (!document.querySelector('base')) {
        const base = document.createElement('base');
        base.href = window.BASE_PATH;
        document.head.insertBefore(base, document.head.firstChild);
    }
    
    // Helper function to fix a single path
    function fixPath(path) {
        if (!path || 
            path.startsWith('http://') || 
            path.startsWith('https://') ||
            path.startsWith('javascript:') ||
            path.startsWith('mailto:') ||
            path.startsWith('tel:') ||
            path.startsWith('#')) {
            return path;
        }
        
        const base = window.BASE_PATH || '/';
        if (base === '/') return path;
        
        if (path.startsWith('/')) {
            return base + path.substring(1);
        }
        return base + path;
    }
    
    // Function to fix all links in a container
    function fixLinksInContainer(container) {
        const base = window.BASE_PATH || '/';
        if (base === '/') return;
        
        // Fix all href attributes
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            const fixedHref = fixPath(href);
            if (fixedHref !== href) {
                link.setAttribute('href', fixedHref);
            }
        });
        
        // Fix all src attributes (for images, scripts, etc.)
        const images = container.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            const fixedSrc = fixPath(src);
            if (fixedSrc !== src) {
                img.setAttribute('src', fixedSrc);
            }
        });
    }
    
    // Enhanced component loader that fixes paths after loading
    window.loadComponentWithFix = function(paths, placeholderId) {
        let currentIndex = 0;
        const base = window.BASE_PATH || '/';
        
        function tryNext() {
            if (currentIndex >= paths.length) {
                console.error(`Failed to load component for ${placeholderId} from all paths:`, paths);
                return;
            }
            
            let currentPath = paths[currentIndex];
            // Fix the path if it starts with /
            if (currentPath.startsWith('/') && base !== '/') {
                currentPath = base + currentPath.substring(1);
            }
            
            fetch(currentPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    const placeholder = document.getElementById(placeholderId);
                    if (placeholder) {
                        placeholder.innerHTML = data;
                        fixLinksInContainer(placeholder);
                        console.log(`Successfully loaded ${placeholderId} from: ${currentPath}`);
                    }
                })
                .catch(err => {
                    console.warn(`Failed to load ${placeholderId} from ${currentPath}, trying next...`, err);
                    currentIndex++;
                    tryNext();
                });
        }
        
        tryNext();
    };
    
    // Fix links and assets when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Fix all existing links in the document
        fixLinksInContainer(document.body);
        
        // Also fix links after components are loaded (for pages that load components)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        fixLinksInContainer(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
    
    // Export fixPath for use in other scripts
    window.fixPath = fixPath;
    window.fixLinksInContainer = fixLinksInContainer;
})();

