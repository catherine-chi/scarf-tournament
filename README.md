# Scarf Color Tournament 🎨

A simple web application that helps you find your favorite scarf color through head-to-head comparisons. Perfect for when you can't decide between multiple options!

## Features

- Hardcoded scarf color images
- 1v1 comparison interface (left vs right)
- Tournament-style elimination until one winner remains
- Clean, modern UI with responsive design
- Works entirely in the browser (no backend required)

## Setup

1. **Add Your Images**:
   - Place your scarf images in the `images/` folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

2. **Configure Images**:
   - Open `script.js`
   - Update the `IMAGE_PATHS` array at the top with your image filenames:
   ```javascript
   const IMAGE_PATHS = [
       'images/scarf1.jpg',
       'images/scarf2.jpg',
       'images/scarf3.jpg',
       // Add more as needed
   ];
   ```

3. **Test Locally**: Open `index.html` in your browser

## How to Use

1. **Start Tournament**: Click "Start Tournament" when you're ready

2. **Make Choices**: For each comparison, click "Choose This" on your preferred option (left or right)

3. **Find Your Winner**: Keep choosing until one scarf color remains!

4. **Start Over**: Click "Start New Tournament" to begin again

## Deployment to GitHub Pages

1. **Create a GitHub repository** (if you haven't already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/scarf-tournament.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" section
   - Under "Source", select "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access your site**: Your site will be available at:
   `https://yourusername.github.io/scarf-tournament/`

## Local Development

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Browser Support

Works in all modern browsers that support:
- ES6 JavaScript
- FileReader API
- CSS Grid

## License

MIT License - feel free to use and modify as needed!

