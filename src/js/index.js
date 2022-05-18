const Handlebars = require('handlebars');

import Notiflix from 'notiflix';
import imgTemplate from '../hbs/img-template.hbs';
import fetchApiByName from '../api-service/pixabay-service';

const API = new fetchApiByName();
console.log(API);

const refs = {
  form: document.querySelector('.search-form'),
};

refs.form.addEventListener('submit', onSearchForm);

async function onSearchForm(e) {
  e.preventDefault();

  const queryValue = e.currentTarget.elements.searchQuery.value;
  const result = await API.fetchDataFromPixabay();
  console.log(result);
}
