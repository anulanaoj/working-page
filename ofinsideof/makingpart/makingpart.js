const imageUrls = [
    
];

// Render images in the column
const imageColumn = document.getElementById('image-column');

// Create a second image column below the first
const imageColumn2 = document.createElement('div');
imageColumn2.id = 'image-column-2';
imageColumn.parentNode.insertBefore(imageColumn2, imageColumn.nextSibling);

// Render images in the first column
imageUrls.forEach((url, idx) => {
  const img = document.createElement('img');
  img.src = url;
  img.alt = `Image ${idx+1}`;
  img.dataset.idx = idx;
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    showFullscreen(idx);
  });
  imageColumn.appendChild(img);
});

// Example: Render images in the second column (use a different array if needed)
const imageUrls2 = []; // Add URLs for the second column here
imageUrls2.forEach((url, idx) => {
  const img = document.createElement('img');
  img.src = url;
  img.alt = `Image 2nd col ${idx+1}`;
  img.dataset.idx = idx;
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    showFullscreen(idx); // or use a different handler if needed
  });
  imageColumn2.appendChild(img);
});

// Fullscreen overlay logic
const overlay = document.getElementById('fullscreen-overlay');
const fullscreenImg = document.getElementById('fullscreen-img');
const fullscreenContent = document.getElementById('fullscreen-content');
let currentIdx = null;

function showFullscreen(idx) {
  currentIdx = idx;
  // Remove previous gallery images
  fullscreenContent.innerHTML = '';
  // Create gallery images
  imageUrls.forEach((url, i) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Image ${i+1}`;
    img.className = 'fullscreen-gallery-img';
    img.style.boxShadow = 'none';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      // Optionally: close overlay if clicking again on the same image
      // closeFullscreen();
    });
    fullscreenContent.appendChild(img);
  });
  overlay.classList.remove('hidden');
  // Scroll to the selected image vertically
  setTimeout(() => {
    const galleryImgs = fullscreenContent.getElementsByClassName('fullscreen-gallery-img');
    if (galleryImgs[idx]) {
      galleryImgs[idx].scrollIntoView({behavior: 'auto', block: 'center', inline: 'nearest'});
    }
  }, 0);
}

function closeFullscreen() {
  overlay.classList.add('hidden');
  fullscreenContent.innerHTML = '';
  currentIdx = null;
}

// Close overlay when clicking outside the images
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeFullscreen();
});

// Prevent overlay close when clicking on content
fullscreenContent.addEventListener('click', (e) => {
  e.stopPropagation();
});

// ESC key closes overlay
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
    closeFullscreen();
  }
});