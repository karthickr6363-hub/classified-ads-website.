# AdClassify - Classified Ads Website

A modern, responsive classified ads website built with HTML, JavaScript, and TailwindCSS.

## Features

- 🎨 Modern, unique design for each page
- 📱 Fully responsive (Mobile, Tablet, Desktop)
- 🚀 Fast and lightweight
- 🎯 User-friendly interface
- 💼 Complete classified ads functionality

## GitHub Pages Deployment

This website is configured to work on GitHub Pages. To deploy:

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select the branch (usually `main` or `master`)
4. Select the folder (usually `/root`)
5. Click Save

The website will be available at: `https://yourusername.github.io/repository-name/`

### Important Notes for GitHub Pages:

- The website uses a dynamic base path detection system
- All paths are relative and work with the base tag
- The `.nojekyll` file is included to prevent Jekyll processing
- Make sure your repository name matches the path in the base detection script

## Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Project Structure

```
├── index.html              # Homepage
├── components/            # Reusable components
│   ├── header.html
│   └── footer.html
├── pages/                 # All page files
│   ├── ads/              # Ad-related pages
│   ├── auth/             # Authentication pages
│   ├── user/             # User dashboard pages
│   ├── admin/            # Admin panel
│   ├── payment/         # Payment pages
│   └── misc/            # Other pages (about, contact, etc.)
├── assets/
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   └── images/          # Images
└── favicon.svg          # Website favicon
```

## Technologies Used

- HTML5
- JavaScript (Vanilla)
- TailwindCSS (CDN)
- Font Awesome (Icons)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for use.
