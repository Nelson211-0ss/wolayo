// Dynamic Footer Component
document.addEventListener('DOMContentLoaded', function() {
    const footerHTML = `
        <footer class="bg-[#150f4b] text-white" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- About Section -->
                    <div>
                        <div class="flex items-center mb-4">
                            <div class="w-32 h-32 flex items-center justify-center">
                                <img src="js/orglogo.png" alt="Wolayo Child Restoration Logo" class="w-full h-full object-contain">
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm leading-relaxed text-justify" data-en="Dedicated to restoring hope and transforming the lives of vulnerable children through holistic care, education, and empowerment — nurturing their potential to build a brighter, self-reliant future." data-pl="Oddani przywracaniu nadziei i transformacji życia bezbronnych dzieci poprzez holistyczną opiekę, edukację i wzmacnianie — pielęgnując ich potencjał do budowy jaśniejszej, samodzielnej przyszłości.">Dedicated to restoring hope and transforming the lives of vulnerable children through holistic care, education, and empowerment — nurturing their potential to build a brighter, self-reliant future.</p>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h3 class="text-lg font-bold mb-4" style="font-family: 'Playfair Display', Georgia, serif;" data-en="Quick Links" data-pl="Szybkie Linki">Quick Links</h3>
                        <ul class="space-y-2">
                            <li><a href="index.html" class="text-gray-400 hover:text-white transition text-sm font-medium" data-en="Home" data-pl="Strona Główna">Home</a></li>
                            <li><a href="about.html" class="text-gray-400 hover:text-white transition text-sm font-medium" data-en="About Us" data-pl="O Nas">About Us</a></li>
                            <li><a href="programs.html" class="text-gray-400 hover:text-white transition text-sm font-medium" data-en="Our Programs" data-pl="Nasze Programy">Our Programs</a></li>
                            <li><a href="donate.html" class="text-gray-400 hover:text-white transition text-sm font-medium" data-en="Donate" data-pl="Przekaż Darowiznę">Donate</a></li>
                            <li><a href="contact.html" class="text-gray-400 hover:text-white transition text-sm font-medium" data-en="Contact" data-pl="Kontakt">Contact</a></li>
                        </ul>
                    </div>

                    <!-- Contact Info -->
                    <div>
                        <h3 class="text-lg font-bold mb-4" style="font-family: 'Playfair Display', Georgia, serif;" data-en="Contact Info" data-pl="Informacje Kontaktowe">Contact Info</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start text-sm">
                                <i class="fas fa-map-marker-alt text-[#22c55e] mt-1 mr-3 text-lg"></i>
                                <span class="text-gray-300">Mbale, Uganda</span>
                            </li>
                            <li class="flex items-center text-sm">
                                <i class="fas fa-phone text-[#22c55e] mr-3 text-lg"></i>
                                <span class="text-gray-300">+256775454357</span>
                            </li>
                            <li class="flex items-center text-sm">
                                <i class="fas fa-envelope text-[#22c55e] mr-3 text-lg"></i>
                                <span class="text-gray-300">info@wolayo.org</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Newsletter -->
                    <div>
                        <h3 class="text-lg font-bold mb-4" style="font-family: 'Playfair Display', Georgia, serif;" data-en="Newsletter" data-pl="Newsletter">Newsletter</h3>
                        <p class="text-gray-400 text-sm mb-4" data-en="Subscribe to receive updates and stories of impact." data-pl="Subskrybuj, aby otrzymywać aktualizacje i historie wpływu.">Subscribe to receive updates and stories of impact.</p>
                        <form action="https://formsubmit.co/info@wolayo.org" method="POST" class="flex flex-col space-y-2">
                            <input type="hidden" name="_subject" value="New Newsletter Subscription - Wolayo">
                            <input type="hidden" name="_captcha" value="false">
                            <input type="hidden" name="_template" value="table">
                            <input type="text" name="_honey" style="display:none">
                            <input type="email" name="email" placeholder="Your email" class="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#22c55e] focus:outline-none text-sm placeholder-gray-400" data-en-placeholder="Your email" data-pl-placeholder="Twój email" required>
                            <button type="submit" class="bg-[#22c55e] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#16a34a] transition text-sm" data-en="Subscribe" data-pl="Subskrybuj">Subscribe</button>
                        </form>
                    </div>
                </div>

                <!-- Social Media & Copyright -->
                <div class="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div class="flex space-x-4 mb-4 md:mb-0">
                        <a href="#" class="bg-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition transform hover:scale-110 shadow-lg">
                            <i class="fab fa-facebook-f text-lg"></i>
                        </a>
                        <a href="#" class="bg-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition transform hover:scale-110 shadow-lg">
                            <i class="fab fa-twitter text-lg"></i>
                        </a>
                        <a href="#" class="bg-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition transform hover:scale-110 shadow-lg">
                            <i class="fab fa-instagram text-lg"></i>
                        </a>
                        <a href="#" class="bg-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition transform hover:scale-110 shadow-lg">
                            <i class="fab fa-linkedin-in text-lg"></i>
                        </a>
                        <a href="#" class="bg-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#22c55e] transition transform hover:scale-110 shadow-lg">
                            <i class="fab fa-youtube text-lg"></i>
                        </a>
                    </div>
                    <p class="text-gray-400 text-sm">
                        &copy; ${new Date().getFullYear()} Wolayo Child Restoration. <span data-en="All rights reserved." data-pl="Wszystkie prawa zastrzeżone.">All rights reserved.</span>
                    </p>
                </div>
            </div>
        </footer>
    `;

    // Insert footer into the page
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
});

