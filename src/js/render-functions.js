import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      image => `
    <li class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <span>${image.likes}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${image.views}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${image.comments}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${image.downloads}</span>
        </div>
      </div>
    </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (loader) {
    loader.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.add('is-hidden');
  }
}

export function showLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
  }
}
