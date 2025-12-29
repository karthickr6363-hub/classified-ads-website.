// GitHub Pages Base Path Detection and Fix
// Include this script in all HTML pages for GitHub Pages compatibility

(function() {
    // Detect base path from URL
    function detectBasePath() {
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
    window.BASE_PATH = detectBasePath();
    
    // Set base tag in head
    if (!document.querySelector('base')) {
        const base = document.createElement('base');
        base.href = window.BASE_PATH;
        document.head.insertBefore(base, document.head.firstChild);
    }
    
    // Helper to get path with base
    window.getPathWithBase = function(path) {
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
        
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return base + cleanPath;
    };
    
    // Fix all links in a container
    window.fixLinksInContainer = function(container) {
        const base = window.BASE_PATH || '/';
        if (base === '/') return;
        
        // Fix href attributes
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && 
                !href.startsWith('http://') && 
                !href.startsWith('https://') && 
                !href.startsWith('javascript:') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:') &&
                !href.startsWith('#') &&
                !href.startsWith(base)) {
                if (href.startsWith('/')) {
                    link.setAttribute('href', base + href.substring(1));
                }
            }
        });
        
        // Fix src attributes for images
        const images = container.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && src.startsWith('/') && !src.startsWith(base) && !src.startsWith('http')) {
                img.setAttribute('src', base + src.substring(1));
            }
        });
    };
    
    // Load component with path fixing
    window.loadComponent = function(placeholderId, componentName) {
        const base = window.BASE_PATH || '/';
        const paths = [
            base + 'components/' + componentName + '.html',
            'components/' + componentName + '.html',
            '/components/' + componentName + '.html',
            '../components/' + componentName + '.html',
            '../../components/' + componentName + '.html'
        ];
        
        let currentIndex = 0;
        
        function tryNext() {
            if (currentIndex >= paths.length) {
                console.error(`Failed to load ${componentName} for ${placeholderId}`);
                return;
            }
            
            fetch(paths[currentIndex])
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return response.text();
                })
                .then(data => {
                    const placeholder = document.getElementById(placeholderId);
                    if (placeholder) {
                        placeholder.innerHTML = data;
                        window.fixLinksInContainer(placeholder);
                        console.log(`Loaded ${componentName} from ${paths[currentIndex]}`);
                    }
                })
                .catch(err => {
                    currentIndex++;
                    tryNext();
                });
        }
        
        tryNext();
    };
    
    // Fix all links in document when DOM is ready
    function fixAllDocumentLinks() {
        window.fixLinksInContainer(document.body);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixAllDocumentLinks);
    } else {
        fixAllDocumentLinks();
    }
})();

