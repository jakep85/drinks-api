const searchField = document.getElementById('drink-search');
searchField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchDrink();
  }
});
const searchButton = document.querySelector('button');
searchButton.addEventListener('click', searchDrink);

async function searchDrink() {
  const searchfieldValue = searchField.value.trim();

  if (!searchfieldValue) {
    alert('Please enter a search value');
    return;
  }

  const endpoint = new URL(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchfieldValue}`
  );

  const response = await fetch(endpoint);
  const data = await response.json();
  if (!data.drinks) {
    alert('Sorry nothing was found for that');
    changeAttribute(searchField, '');
    return;
  }
  console.log(data.drinks);
  const drinkList = data.drinks;

  const displayDrinks = (list) => {
    const drinkListEl = document.getElementById('drink-list');
    drinkListEl.innerHTML = '';
    list.forEach((drink) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h2 class='text-2xl font-bold mt-5 mb-3'>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}">
        <h3>Instructions</h3>
        <p>${drink.strInstructions}</p>
      `;
      drinkListEl.append(li);
    });
  };

  displayDrinks(drinkList);
}

const changeAttribute = (element, value, attribute = 'value') => {
  element.setAttribute(`${attribute}`, '');
  element.setAttribute(`${attribute}`, value);
  if (attribute === 'value') {
    element.value = value;
  }
};

const showError = () => {};

const populateSearchField = (searchText) => {
  changeAttribute(searchField, searchText);
  searchDrink();
};

const sampleList = () => {
  const list = document.getElementById('sample-list');
  list.childNodes.forEach((el) => {
    const elText = el.textContent.trim();
    el.addEventListener('click', populateSearchField.bind(this, elText));
  });
};

sampleList();
