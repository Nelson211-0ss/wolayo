# Wolayo Child Restoration - NGO Website

A beautiful, responsive website for Wolayo Child Restoration NGO, featuring bilingual support (English/Polish) and modern design.

## Features

✨ **Bilingual Support** - Toggle between English and Polish with persistent language preference
📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
🎨 **Modern Design** - Beautiful UI with Tailwind CSS and gradient effects
🔄 **Dynamic Components** - Header and footer loaded dynamically on all pages
📄 **Multiple Pages** - Home, About, Programs, Donate, and Contact pages
🖼️ **High-Quality Images** - Relevant images from Unsplash to enhance visual appeal

## Project Structure

```
wolayo/
│
├── index.html          # Home page
├── about.html          # About us page
├── programs.html       # Programs page
├── donate.html         # Donation page
├── contact.html        # Contact page
├── README.md           # This file
│
└── js/
    ├── header.js       # Dynamic header component
    ├── footer.js       # Dynamic footer component
    └── language.js     # Language toggle functionality
```

## Pages Overview

### 1. Home Page (`index.html`)
- Hero section with call-to-action
- Mission statement
- Impact statistics
- Programs overview
- Success stories/testimonials
- Call-to-action section

### 2. About Page (`about.html`)
- Organization history
- Vision and mission
- Core values
- Team members

### 3. Programs Page (`programs.html`)
- Education & Learning program details
- Healthcare & Nutrition program details
- Safe Housing & Care program details
- Additional support programs

### 4. Donate Page (`donate.html`)
- Donation impact examples
- Donation form with preset amounts
- Custom donation amount option
- One-time and monthly donation options
- Other ways to help section

### 5. Contact Page (`contact.html`)
- Contact information
- Contact form
- Location map
- Social media links
- Volunteer information

## How to Use

### Local Development
1. Simply open `index.html` in your web browser
2. No build process or server required
3. All resources are loaded via CDN

### Language Toggle
- Click the globe icon in the header to switch between English and Polish
- Language preference is saved in browser's localStorage
- Works across all pages

### Customization

#### Changing Colors
The site uses a purple-indigo color scheme. To change colors, update the Tailwind CSS classes:
- Primary: `purple-600`, `indigo-600`
- Hover states: `purple-700`, `indigo-700`

#### Updating Content
All content has bilingual attributes:
```html
<element data-en="English text" data-pl="Polish text">English text</element>
```

#### Adding New Pages
1. Create a new HTML file
2. Copy the structure from any existing page
3. Include the header and footer containers:
```html
<div id="header-container"></div>
<!-- Your content here -->
<div id="footer-container"></div>
```
4. Include the scripts at the bottom:
```html
<script src="js/header.js"></script>
<script src="js/footer.js"></script>
<script src="js/language.js"></script>
```

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **JavaScript** - Dynamic components and language switching
- **Font Awesome** - Icons (via CDN)
- **Google Fonts** - Poppins font family
- **Unsplash** - High-quality images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Future Enhancements

- Backend integration for donation processing
- Blog section for news and updates
- Gallery for photos and videos
- Event calendar
- Volunteer application system
- Newsletter subscription backend

## Contact Information

For questions or support, contact:
- Email: info@wolayo.org
- Phone: +48 22 123 4567
- Address: 123 Hope Street, Warsaw, Poland

## License

© 2025 Wolayo Child Restoration. All rights reserved.

---

Built with ❤️ for making a difference in children's lives.

