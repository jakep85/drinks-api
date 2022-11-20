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

  // TOD: make this a <template> in HTML with some hooks
  const displayDrinks = (list) => {
    const drinkListEl = document.getElementById('drink-list');
    drinkListEl.innerHTML = '';
    // Create the drink cards for each tiem
    list.forEach((drink) => {
      const li = document.createElement('li');
      li.innerHTML = `
      <h2 class='text-2xl font-bold my-3 mx-4 text-slate-700'>${drink.strDrink}</h2>  
      <div class='flex flex-col md:flex-row'>
        <div class='md:w-1/2'>
          <img src="${drink.strDrinkThumb}">
        </div>
        <div id='${drink.idDrink}-ingredients' class='p-5 pb-2 md:px-3 md:py-0 w-1/2'></div>
      </div>
      <div class='p-5'>
        <h3 class='text-lg leading-4 font-semibold text-slate-700 mb-2'>Instructions</h3>
        <p class='text-slate-700'>${drink.strInstructions}</p>
      </div>
      `;
      li.classList =
        'rounded-xl shadow-lg flex flex-col overflow-hidden border border-slate-200';
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
      ingList.innerHTML = itemList;
      ingList.classList = 'list-disc ml-5 text-slate-700 text-lg';
      // Adding unique drink ID
      const inglistWrapper = document.getElementById(
        `${drink.idDrink}-ingredients`
      );
      // const inglistUL = inglistWrapper.getElementsByClassName('ul');
      // inglistUL.classList = 'list-disc';
      inglistWrapper.append(ingList);
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
