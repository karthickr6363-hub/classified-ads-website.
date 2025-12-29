// Main JavaScript file for common functionality

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Tablet menu toggle
function toggleTabMenu() {
    const menu = document.getElementById('tabMenu');
    const backdrop = document.getElementById('tabMenuBackdrop');
    
    if (menu && backdrop) {
        const isHidden = menu.classList.contains('hidden') || menu.classList.contains('-translate-x-full');
        
        if (isHidden) {
            // Open menu - ensure backdrop is shown first
            backdrop.classList.remove('hidden');
            backdrop.style.display = 'block';
            backdrop.style.pointerEvents = 'auto';
            backdrop.style.zIndex = '9998';
            backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            backdrop.style.opacity = '1';
            backdrop.style.visibility = 'visible';
            
            // Then show menu
            menu.classList.remove('hidden');
            menu.style.display = 'block';
            menu.style.pointerEvents = 'auto';
            menu.style.zIndex = '9999';
            menu.style.backgroundColor = '#ffffff';
            menu.style.position = 'fixed';
            menu.style.top = '0';
            menu.style.left = '0';
            menu.style.height = '100vh';
            menu.style.width = '20rem';
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            
            // Trigger slide-in animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    menu.classList.remove('-translate-x-full');
                });
            });
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            // Close menu
            menu.classList.add('-translate-x-full');
            backdrop.style.pointerEvents = 'none';
            backdrop.style.opacity = '0';
            backdrop.style.visibility = 'hidden';
            menu.style.pointerEvents = 'none';
            // Wait for animation to complete before hiding backdrop
            setTimeout(() => {
                backdrop.classList.add('hidden');
                backdrop.style.display = 'none';
                backdrop.style.opacity = '0';
                backdrop.style.visibility = 'hidden';
                menu.classList.add('hidden');
                menu.style.display = 'none';
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                document.body.style.overflow = '';
            }, 300);
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = document.getElementById('menuButton');
    const tabMenu = document.getElementById('tabMenu');
    const tabMenuButton = document.getElementById('tabMenuButton');
    
    // Close mobile menu
    if (mobileMenu && menuButton && 
        !mobileMenu.contains(e.target) && 
        !menuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
    
    // Close tablet menu
    if (tabMenu && tabMenuButton) {
        const backdrop = document.getElementById('tabMenuBackdrop');
        const isMenuOpen = tabMenu && !tabMenu.classList.contains('hidden') && !tabMenu.classList.contains('-translate-x-full');
        
        if (isMenuOpen && 
            !tabMenu.contains(e.target) && 
            !tabMenuButton.contains(e.target) &&
            (!backdrop || !backdrop.contains(e.target))) {
            toggleTabMenu();
        }
    }
});

// Image upload preview
function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(previewId).src = e.target.result;
            document.getElementById(previewId).classList.remove('hidden');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Multiple image upload preview
function previewMultipleImages(input, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (input.files) {
        Array.from(input.files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const div = document.createElement('div');
                div.className = 'relative group';
                div.innerHTML = `
                    <img src="${e.target.result}" class="w-full h-32 object-cover rounded-lg">
                    <button type="button" onclick="removeImage(this)" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                `;
                container.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    }
}

function removeImage(button) {
    button.closest('.relative').remove();
}

// Price range slider
function updatePriceRange() {
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const minValue = document.getElementById('minValue');
    const maxValue = document.getElementById('maxValue');
    
    if (minPrice && minValue) {
        minValue.textContent = `$${minPrice.value}`;
    }
    if (maxPrice && maxValue) {
        maxValue.textContent = `$${maxPrice.value}`;
    }
}

// Toggle filters
function toggleFilters() {
    const filters = document.getElementById('filters');
    if (filters) {
        filters.classList.toggle('hidden');
    }
}

// View toggle (list/grid)
function toggleView(viewType) {
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    
    if (viewType === 'grid') {
        if (gridView) gridView.classList.remove('hidden');
        if (listView) listView.classList.add('hidden');
        localStorage.setItem('viewPreference', 'grid');
    } else {
        if (gridView) gridView.classList.add('hidden');
        if (listView) listView.classList.remove('hidden');
        localStorage.setItem('viewPreference', 'list');
    }
}

// Ensure backdrop is hidden on page navigation
window.addEventListener('pageshow', (event) => {
    const tabMenu = document.getElementById('tabMenu');
    const tabMenuBackdrop = document.getElementById('tabMenuBackdrop');
    
    if (tabMenuBackdrop) {
        tabMenuBackdrop.classList.add('hidden');
        tabMenuBackdrop.style.display = 'none';
        tabMenuBackdrop.style.opacity = '0';
        tabMenuBackdrop.style.visibility = 'hidden';
        tabMenuBackdrop.style.pointerEvents = 'none';
    }
    if (tabMenu) {
        tabMenu.classList.add('hidden');
        tabMenu.classList.add('-translate-x-full');
        tabMenu.style.display = 'none';
        tabMenu.style.opacity = '0';
        tabMenu.style.visibility = 'hidden';
    }
    document.body.style.overflow = '';
});

// Load saved view preference
window.addEventListener('DOMContentLoaded', () => {
    const savedView = localStorage.getItem('viewPreference');
    if (savedView) {
        toggleView(savedView);
    }
    
    // Ensure dropdowns are hidden on page load
    const homeDropdown = document.getElementById('homeDropdown');
    const accountDropdown = document.getElementById('accountDropdown');
    const homeArrow = document.getElementById('homeDropdownArrow');
    const accountArrow = document.getElementById('accountDropdownArrow');
    
    if (homeDropdown) {
        homeDropdown.classList.add('hidden');
    }
    if (accountDropdown) {
        accountDropdown.classList.add('hidden');
    }
    if (homeArrow) {
        homeArrow.style.transform = 'rotate(0deg)';
    }
    if (accountArrow) {
        accountArrow.style.transform = 'rotate(0deg)';
    }
    
    // Ensure tablet menu and backdrop are hidden on page load
    const tabMenu = document.getElementById('tabMenu');
    const tabMenuBackdrop = document.getElementById('tabMenuBackdrop');
    
    if (tabMenu) {
        tabMenu.classList.add('hidden');
        tabMenu.classList.add('-translate-x-full');
        tabMenu.style.display = 'none';
        tabMenu.style.opacity = '0';
        tabMenu.style.visibility = 'hidden';
    }
    if (tabMenuBackdrop) {
        tabMenuBackdrop.classList.add('hidden');
        tabMenuBackdrop.style.display = 'none';
        tabMenuBackdrop.style.opacity = '0';
        tabMenuBackdrop.style.visibility = 'hidden';
        tabMenuBackdrop.style.pointerEvents = 'none';
    }
    
    // Ensure body scroll is enabled on page load
    document.body.style.overflow = '';
});

// Toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    toast.classList.add(colors[type] || colors.info);
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize tooltips (if using a tooltip library)
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            // Tooltip implementation
        });
    });
}

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Home dropdown toggle
function toggleHomeDropdown() {
    const dropdown = document.getElementById('homeDropdown');
    const arrow = document.getElementById('homeDropdownArrow');
    
    if (dropdown) {
        const isHidden = dropdown.classList.contains('hidden');
        dropdown.classList.toggle('hidden');
        
        // Rotate arrow
        if (arrow) {
            if (isHidden) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    }
}

// Account dropdown toggle
function toggleAccountDropdown() {
    const dropdown = document.getElementById('accountDropdown');
    const arrow = document.getElementById('accountDropdownArrow');
    
    if (dropdown) {
        const isHidden = dropdown.classList.contains('hidden');
        dropdown.classList.toggle('hidden');
        
        // Rotate arrow
        if (arrow) {
            if (isHidden) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const homeDropdown = document.getElementById('homeDropdown');
    const homeDropdownButton = document.getElementById('homeDropdownButton');
    const arrow = document.getElementById('homeDropdownArrow');
    
    if (homeDropdown && homeDropdownButton && 
        !homeDropdown.contains(e.target) && 
        !homeDropdownButton.contains(e.target)) {
        homeDropdown.classList.add('hidden');
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
        }
    }
    
    // Close account dropdown when clicking outside
    const accountDropdown = document.getElementById('accountDropdown');
    const accountDropdownButton = document.getElementById('accountDropdownButton');
    const accountArrow = document.getElementById('accountDropdownArrow');
    
    if (accountDropdown && accountDropdownButton && 
        !accountDropdown.contains(e.target) && 
        !accountDropdownButton.contains(e.target)) {
        accountDropdown.classList.add('hidden');
        if (accountArrow) {
            accountArrow.style.transform = 'rotate(0deg)';
        }
    }
});

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show scroll to top button when scrolled
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove('hidden');
        } else {
            scrollBtn.classList.add('hidden');
        }
    }
});

