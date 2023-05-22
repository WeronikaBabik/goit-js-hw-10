const API_URL = 'https://restcountries.com/v3.1/name/';
const fields = new URLSearchParams({
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
});
export const fetchCountries = countryName =>
  fetch(`${API_URL}${countryName}?${fields}`).then(data => {
    if (!data.ok) {
      reject(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return data.json();
  });
