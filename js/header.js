// Dynamic Header Component
document.addEventListener('DOMContentLoaded', function() {
    const headerHTML = `
        <header class="bg-[#150f4b] shadow-lg fixed top-0 left-0 right-0 z-50" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
            <nav class="container mx-auto px-3 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16 sm:h-20">
                    <!-- Logo -->
                    <div class="flex-shrink-0">
                        <a href="index.html" class="flex items-center">
                            <div class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
                                <img src="js/orglogo.png" alt="Wolayo Child Restoration Logo" class="w-full h-full object-contain">
                            </div>
                        </a>
                    </div>

                    <!-- Desktop Navigation -->
                    <div class="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        <a href="index.html" class="text-white hover:text-[#22c55e] font-medium transition text-base" data-en="Home" data-pl="Strona Główna">Home</a>
                        <a href="about.html" class="text-white hover:text-[#22c55e] font-medium transition text-base" data-en="About" data-pl="O Nas">About</a>
                        <a href="programs.html" class="text-white hover:text-[#22c55e] font-medium transition text-base" data-en="Programs" data-pl="Programy">Programs</a>
                        <a href="get-involved.html" class="text-white hover:text-[#22c55e] font-medium transition text-base" data-en="Get Involved" data-pl="Zaangażuj Się">Get Involved</a>
                        <a href="contact.html" class="text-white hover:text-[#22c55e] font-medium transition text-base" data-en="Contact" data-pl="Kontakt">Contact</a>
                        <a href="donate.html" class="bg-[#22c55e] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#16a34a] transition text-base" data-en="Donate" data-pl="Przekaż Darowiznę">Donate</a>
                        
                        <!-- Language Toggle -->
                        <button id="language-toggle" class="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-sky-600 transition shadow-md hover:shadow-lg text-sm">
                            <i class="fas fa-globe"></i>
                            <span id="current-lang">EN</span>
                        </button>
                    </div>

                    <!-- Mobile Menu Button -->
                    <div class="lg:hidden flex items-center space-x-3">
                        <!-- Language Toggle Mobile -->
                        <button id="language-toggle-mobile" class="bg-sky-500 text-white px-3 py-2 rounded-full hover:bg-sky-600 transition shadow-md text-xs font-semibold">
                            <i class="fas fa-globe text-sm"></i>
                        </button>
                        <button id="mobile-menu-button" class="text-white hover:text-[#22c55e] focus:outline-none">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden lg:hidden pb-4 bg-[#0f0a3a]/95 -mx-3 sm:-mx-6 px-3 sm:px-6 mt-4 rounded-b-lg">
                    <div class="flex flex-col space-y-1">
                        <a href="index.html" class="text-white hover:bg-[#22c55e]/20 hover:text-[#22c55e] font-medium py-3 px-4 rounded-lg transition-all duration-300 text-base" data-en="Home" data-pl="Strona Główna">Home</a>
                        <a href="about.html" class="text-white hover:bg-[#22c55e]/20 hover:text-[#22c55e] font-medium py-3 px-4 rounded-lg transition-all duration-300 text-base" data-en="About" data-pl="O Nas">About</a>
                        <a href="programs.html" class="text-white hover:bg-[#22c55e]/20 hover:text-[#22c55e] font-medium py-3 px-4 rounded-lg transition-all duration-300 text-base" data-en="Programs" data-pl="Programy">Programs</a>
                        <a href="get-involved.html" class="text-white hover:bg-[#22c55e]/20 hover:text-[#22c55e] font-medium py-3 px-4 rounded-lg transition-all duration-300 text-base" data-en="Get Involved" data-pl="Zaangażuj Się">Get Involved</a>
                        <a href="contact.html" class="text-white hover:bg-[#22c55e]/20 hover:text-[#22c55e] font-medium py-3 px-4 rounded-lg transition-all duration-300 text-base" data-en="Contact" data-pl="Kontakt">Contact</a>
                        <a href="donate.html" class="bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#16a34a] transition-all duration-300 text-center mt-2 shadow-lg text-base" data-en="Donate" data-pl="Przekaż Darowiznę">Donate</a>
                    </div>
                </div>
            </nav>
        </header>
    `;

    // Insert header into the page
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
});

