import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

// Обробник сабміту форми
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const newQuery = searchInput.value.trim();

  // Якщо новий пошук - скидаємо параметри
  if (newQuery !== currentQuery) {
    currentQuery = newQuery;
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
  }

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  await searchImages();
});

// Обробник кнопки "Load more"
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await searchImages();
});

// Функція пошуку зображень
async function searchImages() {
  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, currentPage);

    hideLoader();

    if (data && data.hits && data.hits.length > 0) {
      createGallery(data.hits);
      totalHits = data.totalHits;

      // Логування для діагностики
      const loadedImages = currentPage * 15;
      console.log(`Page: ${currentPage}, Images on page: ${data.hits.length}`);
      console.log(`Total hits from API: ${totalHits}`);
      console.log(`Calculated loaded images: ${loadedImages}`);
      console.log(`Should hide button: ${loadedImages >= totalHits}`);

      // Плавне прокручування після завантаження додаткових зображень (не для першої сторінки)
      if (currentPage > 1) {
        smoothScrollAfterLoad();
      }

      // Перевіряємо, чи є ще зображення для завантаження
      // Використовуємо реальну кількість завантажених зображень
      const actualLoadedImages =
        document.querySelectorAll('.photo-card').length;

      console.log(`Actual loaded images in DOM: ${actualLoadedImages}`);

      if (actualLoadedImages < totalHits) {
        // Є ще зображення - показуємо кнопку
        showLoadMoreButton();
        console.log('Showing Load More button');
      } else {
        // Досягли кінця - ховаємо кнопку і показуємо повідомлення
        hideLoadMoreButton();
        console.log('Hiding Load More button - reached end');

        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      hideLoadMoreButton();

      if (currentPage === 1) {
        iziToast.info({
          title: 'No results',
          message: 'Sorry, no images found. Try different keywords.',
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    hideLoader();
    hideLoadMoreButton();
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
  }
}

// Функція плавного прокручування
function smoothScrollAfterLoad() {
  const gallery = document.querySelector('.gallery');
  const photoCard = gallery.querySelector('.photo-card');

  if (photoCard) {
    const cardHeight = photoCard.getBoundingClientRect().height;
    const scrollDistance = cardHeight * 2;

    window.scrollBy({
      top: scrollDistance,
      behavior: 'smooth',
    });
  }
}
