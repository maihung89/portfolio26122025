// ===== THEME SWITCHER =====

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const colorToggle = document.getElementById('color-toggle');
const colorPalette = document.getElementById('color-palette');
const colorOptions = document.querySelectorAll('.color-option');

// Get saved preferences or use defaults
const savedTheme = localStorage.getItem('theme') || 'dark';
const savedColor = localStorage.getItem('color') || 'default';

// Initialize theme on page load
function initTheme() {
    // Set theme (light/dark)
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Set color
    if (savedColor !== 'default') {
        document.documentElement.setAttribute('data-color', savedColor);
    }
    updateColorActive(savedColor);
}

// Update theme icon
function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Update active color option
function updateColorActive(color) {
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.color === color) {
            option.classList.add('active');
        }
    });
}

// Toggle Light/Dark theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add animation
    themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// Toggle color palette visibility
colorToggle.addEventListener('click', () => {
    colorPalette.classList.toggle('active');

    // Add animation
    colorToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        colorToggle.style.transform = '';
    }, 200);
});

// Change color theme
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const color = option.dataset.color;

        // Remove previous color
        document.documentElement.removeAttribute('data-color');

        // Set new color (if not default)
        if (color !== 'default') {
            document.documentElement.setAttribute('data-color', color);
        }

        localStorage.setItem('color', color);
        updateColorActive(color);

        // Close palette after selection
        setTimeout(() => {
            colorPalette.classList.remove('active');
        }, 300);
    });
});

// Close color palette when clicking outside
document.addEventListener('click', (e) => {
    if (!colorToggle.contains(e.target) && !colorPalette.contains(e.target)) {
        colorPalette.classList.remove('active');
    }
});

// Detect system theme preference
if (window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Only use system preference if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
        const systemTheme = prefersDark.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
        updateThemeIcon(systemTheme);
    }

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initTheme);

// Run immediately if DOM already loaded
if (document.readyState !== 'loading') {
    initTheme();
}
