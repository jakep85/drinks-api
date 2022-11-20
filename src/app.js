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
    // Create the drink cards for each tiem
    list.forEach((drink) => {
      const li = document.createElement('li');
      li.innerHTML = `
      <h2 class='text-2xl font-bold px-3 mt-5 mb-3 text-slate-700'>${drink.strDrink}</h2>  
      <div class='flex'>
        <div class='w-1/2'>
          <img src="${drink.strDrinkThumb}">
        </div>
        <div id='${drink.idDrink}-ingredients' class='px-3 w-1/2'></div>
      </div>
      <div>
        <h3 class='text-lg leading-4 font-semibold text-slate-700 mb-2'>Instructions</h3>
        <p class='text-slate-700'>${drink.strInstructions}</p>
      </div>
      `;
      li.classList =
        'rounded-xl shadow-md flex flex-col overflow-hidden border-2 border-slate-200';
      drinkListEl.append(li);

      // Get ingredient list
      const ingList = document.createElement('ul');
      let itemList = '';
      for (let i = 1; i <= 15; i++) {
        if (eval('drink.strIngredient' + i)) {
          itemList += `
            <li>${eval('drink.strIngredient' + i)}</li>
          `;
        }
      }
      console.log(ingList);
      ingList.innerHTML = itemList;
      const inglistEl = document.getElementById(`${drink.idDrink}-ingredients`);
      inglistEl.append(ingList);
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
