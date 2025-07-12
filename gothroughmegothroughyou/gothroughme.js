const imageUrls = [
  'gothroughmegothroughyou_2025-01.jpg',
  'gothroughmegothroughyou_2025-02.jpg',
  'gothroughmegothroughyou_2025-03.jpg',
  'gothroughmegothroughyou_2025-04.jpg',
  'gothroughmegothroughyou_2025-05.jpg',
  'gothroughmegothroughyou_2025-06.jpg',
  'gothroughmegothroughyou_2025-07.jpg',
  'gothroughmegothroughyou_2025-08.jpg',
  'gothroughmegothroughyou_2025-09.jpg',
  'gothroughmegothroughyou_2025-10.jpg',
  'gothroughmegothroughyou_2025-11.jpg',
  'gothroughmegothroughyou_2025-12.jpg',
  'gothroughmegothroughyou_2025-13.jpg',
  'gothroughmegothroughyou_2025-14.jpg',
  'gothroughmegothroughyou_2025-15.jpg'
];

// Render images in the column
const imageColumn = document.getElementById('image-column');
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