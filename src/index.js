import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
('use strict');
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');
let countryName = '';
input.addEventListener('input', debounce(listOfCoutries, DEBOUNCE_DELAY));
function removeAll() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function listOfCoutries() {
  countryName = input.value.trim();
  if (!countryName) removeAll();
  fetchCountries(countryName)
    .then(data => {
      if (data.length === 1) {
        removeAll();
        countryInfo.innerHTML = allAboutCountry(data);
      } else if (data.length > 1 && data.length <= 10) {
        removeAll();
        countryList.innerHTML = listOfAllCountries(data);
      } else {
        removeAll();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(err => {
      removeAll();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function allAboutCountry(data) {
  const languages = Object.values(data[0].languages).join(',');
  return data
    .map(({ capital, flags, name, population }) => {
      return `<div><img src="${flags.svg}" alt="${name.official}" width ="150"/><p><b>${name.official}</b></p></div>
                <p><b>Capital:</b> ${capital}</p>
                <p><b>Population:</b> ${population}</p>
                <p><b>Languages:</b> ${languages}</p>`;
    })
    .join('');
}

function listOfAllCountries(data) {
  return data
    .map(({ flags, name }) => {
      return `<li><img src="${flags.svg}" alt="Flag of ${name.official}" width="40"><p>${name.official}</p></li>`;
    })
    .join('');
}
