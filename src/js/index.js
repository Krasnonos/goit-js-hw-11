import Notiflix from 'notiflix';
import imgTemplate from '../hbs/img-template.hbs';
import fetchApiByName from '../api-service/pixabay-service';

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

    return;
  }

  API.resetPage();
  API.queryValue(inputValue);

  const result = await API.fetchDataFromPixabay();

  resetMarkup();
  rewrightMarkup(result);
  showShowMoreBtn();
}

async function onShowMore() {
  API.increasePage();

  const result = await API.fetchDataFromPixabay();

  rewrightMarkup(result);
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
