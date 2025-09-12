#!/usr/bin/env python3

import re

# Read the image list
with open('image_list.txt', 'r') as f:
    images = [line.strip() for line in f.readlines()]

# Read the HTML file
with open('index.html', 'r') as f:
    html_content = f.read()

# Replace main clock images (1-12) with hand images
hand_images = [img for img in images if '/hand/' in img][:12]
for i in range(1, 13):
    placeholder_pattern = f'<div class="image-placeholder">IMG {i}</div>'
    if i <= len(hand_images):
        replacement = f'<img src="{hand_images[i-1]}" alt="Hand Image {i}" class="clock-image">'
        html_content = html_content.replace(placeholder_pattern, replacement)

# Replace additional images (13-24) with collection/polka images
additional_images = [img for img in images if '/collection/' in img or '/polka/' in img or 'inspo' in img][:12]
for i in range(13, 25):
    placeholder_pattern = f'<div class="image-placeholder">IMG {i}</div>'
    if i-13 < len(additional_images):
        replacement = f'<img src="{additional_images[i-13]}" alt="Additional Image {i}" class="additional-clock-image">'
        html_content = html_content.replace(placeholder_pattern, replacement)

# Write the updated HTML
with open('index.html', 'w') as f:
    f.write(html_content)

print("Images updated successfully!")
