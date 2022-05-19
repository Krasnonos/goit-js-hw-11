import Notiflix from 'notiflix';
import imgTemplate from '../hbs/img-template.hbs';
import fetchApiByName from '../api-service/pixabay-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API = new fetchApiByName();

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  showMoreBtn: document.querySelector('.load-more '),
};

refs.form.addEventListener('submit', onSearchForm);
refs.showMoreBtn.addEventListener('click', onShowMore);

async function onSearchForm(e) {
  e.preventDefault();

  const inputValue = e.currentTarget.elements.searchQuery.value;

  if (inputValue === '') {
    Notiflix.Notify.failure('Please enter something in search field');

    hideShowMoreBtn();
    resetMarkup();

    // refs.gallery.removeEventListener('click', showFullPhoto);

    return;
  }

  API.resetPage();
  API.queryValue(inputValue);

  try {
    const result = await API.fetchDataFromPixabay();

    API.setTotalHits(result.data.totalHits);
    resetMarkup();
    rewrightMarkup(result);

    Notiflix.Notify.success(`Hooray! We found ${API.totalHits} images.`);

    showShowMoreBtn();
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
}

async function onShowMore() {
  API.increasePage();

  const result = await API.fetchDataFromPixabay();

  rewrightMarkup(result);
  API.lastTotalHits();
  Notiflix.Notify.success(`Hooray! We found ${API.totalHits} images.`);
}

function rewrightMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', imgTemplate(markup));
}

function resetMarkup() {
  refs.gallery.innerHTML = '';
}

function hideShowMoreBtn() {
  refs.showMoreBtn.classList.add('is-hidden');
}

function showShowMoreBtn() {
  refs.showMoreBtn.classList.remove('is-hidden');
}

// ---------------- simplebox---------------

refs.gallery.addEventListener('click', showFullPhoto);

function showFullPhoto(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const imgLinkEl = e.target.closest('.photo-link');
}
