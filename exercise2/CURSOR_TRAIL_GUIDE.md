# Cursor Trail System - Setup Guide

## 🎯 What This Does

Creates a cursor trail that follows your mouse movement in the intro story section, leaving a trail of images from your album.

## ✨ Features

- **Section-specific activation** - Only works in the intro story section
- **Random album images** - Uses images from your existing collection
- **Varied sizes** - Different image sizes for visual interest
- **Random rotation** - Each trail image has random rotation
- **Fade out effect** - Images fade out after 2 seconds
- **Performance optimized** - Throttled mouse events and limited trail length
- **Mobile responsive** - Adjusts sizes for mobile devices

## 🎨 How It Works

1. **Mouse movement detection** - Tracks cursor position
2. **Section detection** - Only activates in intro story section
3. **Image spawning** - Creates trail images at cursor position
4. **Random properties** - Each image gets random rotation, scale, and size
5. **Fade out** - Images automatically fade and disappear after 2 seconds
6. **Trail management** - Maintains maximum of 20 images in trail

## 📁 Files Created

- **`cursor_trail.js`** (4.8KB) - Main cursor trail system
- **`cursor_trail_styles.css`** (1.4KB) - Styling and animations

## 🎵 Image Sources

The system uses images from your existing collection:
- GIF animations from `images/gif/`
- Clock photos from `images/clock photos/`
- Additional images from your album

## 🔧 Customization Options

### Change Trail Length
Edit `maxTrailLength` in `cursor_trail.js`:
```javascript
this.maxTrailLength = 20; // Change this number
```

### Change Image Display Time
Edit the timeout in `addTrailImage()`:
```javascript
setTimeout(() => {
  this.fadeOutTrailImage(trailImage);
}, 2000); // Change 2000ms to desired time
```

### Change Mouse Sensitivity
Edit `mouseThrottle` in `cursor_trail.js`:
```javascript
this.mouseThrottle = 50; // Lower = more sensitive, Higher = less sensitive
```

### Add More Images
Edit the `imagePaths` array in `cursor_trail.js`:
```javascript
this.imagePaths = [
  'your/new/image/path.jpg',
  // ... existing paths
];
```

### Change Image Sizes
Edit the CSS in `cursor_trail_styles.css`:
```css
.cursor-trail-image {
  width: 60px;  /* Change base size */
  height: 60px;
}
```

## 🎯 Usage

1. **Navigate to intro section** - Scroll to the "all this running around" section
2. **Move your mouse** - Trail images will appear following your cursor
3. **Scroll away** - Trail automatically deactivates when leaving intro section

## 🚨 Troubleshooting

- **No trail appearing?** Make sure you're in the intro story section
- **Too many images?** Increase `mouseThrottle` value
- **Images too big/small?** Adjust CSS sizes
- **Performance issues?** Reduce `maxTrailLength`

## 🎉 Ready to Use!

The cursor trail system is now active and will work automatically when you're in the intro story section!
