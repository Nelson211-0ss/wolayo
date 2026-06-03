// Language Toggle Functionality
// Manages English/Polish language switching

// Get current language from localStorage or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// Translation object with all text content
const translations = {
    en: {
        placeholders: {
            email: 'Your email'
        }
    },
    pl: {
        placeholders: {
            email: 'Twój email'
        }
    }
};

// Function to switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-en and data-pl attributes
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        const englishText = element.getAttribute('data-en');
        const polishText = element.getAttribute('data-pl');
        
        if (lang === 'en') {
            element.textContent = englishText;
        } else if (lang === 'pl') {
            element.textContent = polishText;
        }
    });

    // Update placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-en-placeholder]');
    placeholderElements.forEach(element => {
        const englishPlaceholder = element.getAttribute('data-en-placeholder');
        const polishPlaceholder = element.getAttribute('data-pl-placeholder');
        
        if (lang === 'en') {
            element.placeholder = englishPlaceholder;
        } else if (lang === 'pl') {
            element.placeholder = polishPlaceholder;
        }
    });
    
    // Update language indicator
    const langIndicator = document.getElementById('current-lang');
    if (langIndicator) {
        langIndicator.textContent = lang.toUpperCase();
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved language
    if (currentLanguage === 'pl') {
        switchLanguage('pl');
    }
    
    // Set up language toggle button (desktop)
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const newLang = currentLanguage === 'en' ? 'pl' : 'en';
            switchLanguage(newLang);
        });
    }
    
    // Set up language toggle button (mobile)
    const languageToggleMobile = document.getElementById('language-toggle-mobile');
    if (languageToggleMobile) {
        languageToggleMobile.addEventListener('click', function() {
            const newLang = currentLanguage === 'en' ? 'pl' : 'en';
            switchLanguage(newLang);
        });
    }
    
    // Update the language indicator
    const langIndicator = document.getElementById('current-lang');
    if (langIndicator) {
        langIndicator.textContent = currentLanguage.toUpperCase();
    }
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { switchLanguage, currentLanguage };
}

