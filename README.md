# Resolve OTC Website

A modern, expressive website for Resolve OTC trading platform built with Material 3 design principles.

## Features

- 🎨 **Material 3 Expressive Design** - Modern, beautiful UI with expressive gradients and animations
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes  
- ⚡ **Fast Performance** - Optimized loading and smooth animations
- 📧 **Contact Form** - Working contact form that sends emails to admin@resolve.ng
- 🔒 **Secure** - Built-in security headers and input sanitization
- ♿ **Accessible** - WCAG compliant with proper focus states and keyboard navigation

## Contact Form Setup

The contact form is configured to send emails to `admin@resolve.ng`. 

### For PHP Hosting:
1. Upload all files to your web server
2. Ensure PHP is enabled on your server
3. The contact form will work automatically

### For Static Hosting (without PHP):
If you're using a static hosting service that doesn't support PHP:

1. **Option 1: Use Formspree**
   - Sign up at [formspree.io](https://formspree.io)
   - Replace the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

2. **Option 2: Use Netlify Forms**
   - Add `netlify` attribute to the form tag:
   ```html
   <form name="contact" netlify>
   ```

3. **Option 3: Use a serverless function**
   - Deploy the contact handler as a serverless function on Vercel, Netlify, or AWS Lambda

## File Structure

```
resolve/
├── index.html              # Main website file
├── css/
│   └── style.css          # All styles including Material 3 design
├── js/
│   └── script.js          # Interactive functionality
├── img/                   # Images and logos
├── fonts/                 # Custom Sansation font files
├── contact-handler.php    # Contact form PHP handler
├── .htaccess             # Apache configuration
└── README.md             # This file
```

## Development

### Local Development
1. Use a local server that supports PHP (XAMPP, WAMP, MAMP, or `php -S localhost:8000`)
2. Open the website in your browser
3. Test the contact form functionality

### Customization
- **Colors**: Modify CSS variables in `:root` section of `style.css`
- **Content**: Edit text directly in `index.html`
- **Email**: Change `$to_email` in `contact-handler.php`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- Optimized images and fonts
- Gzip compression enabled
- Static asset caching
- Efficient CSS and JavaScript
- Reduced motion support for accessibility

## Security Features

- Input sanitization and validation
- CSRF protection
- Security headers
- XSS prevention
- Secure file access controls

## Contact

For technical support or questions about this website, email: admin@resolve.ng

---

Built with ❤️ using Material 3 Design principles
