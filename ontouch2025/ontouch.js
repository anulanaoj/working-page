const imageUrls = [
  'ontouch_2025-1.jpg',
  'ontouch_2025-2.jpg',
  'ontouch_2025-3.jpg',
  'ontouch_2025-4.jpg',
  'ontouch_2025-5.jpg',
  'ontouch_2025-6.jpg',
  'ontouch_2025-7.jpg',
  'ontouch_2025-8.jpg',
];

// DO NOT shuffle or randomize the array
const imageColumn = document.getElementById('image-column');
imageUrls.forEach((url, idx) => {
  const img = document.createElement('img');
  img.src = url;
  img.alt = `Image ${idx+1}`;
  img.setAttribute('draggable', 'false');
  img.style.userSelect = 'none';
  img.addEventListener('click', function () {
    showModal(url);
  });
  imageColumn.appendChild(img);
});

// Modal logic (same as ofinsideof.html)
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

function showModal(src) {
  modalImage.src = src;
  modal.classList.add('active');
}

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  modalImage.src = '';
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('active');
    modalImage.src = '';
  }
});