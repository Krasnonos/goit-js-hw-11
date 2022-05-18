const Handlebars = require('handlebars');

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
    console.log('empty form');
    return;
  }

  API.queryValue(inputValue);

  const result = await API.fetchDataFromPixabay();
  resetMarkup();
  reWrightMarkup(result);
}

async function onShowMore() {
  API.increasePage();
  const result = await API.fetchDataFromPixabay();
  reWrightMarkup(result);
}

function reWrightMarkup(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', imgTemplate(markup));
}

function resetMarkup() {
  refs.gallery.innerHTML = '';
}
