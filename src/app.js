const searchField = document.getElementById('drink-search');
const searchButton = document.querySelector('button');

// Search Cocktail DB for drink
async function searchDrink() {
  // Check if no value;
  const searchfieldValue = searchField.value.trim();
  if (!searchfieldValue) {
    alert('Please enter a search value');
    return;
  }

  async function fetchRemoteData() {
    try {
      // Fetch data
      const endpoint = new URL(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchfieldValue}`
      );
      // const endpoint = new URL(`https://httpstat.us/500`);
      const response = await fetch(endpoint);
      if (!response.ok) {
        console.error(response.status);
        alert(`Sorry there was an error of type: ${response.status}`);
        return;
      }
      const data = await response.json();

      // If nothing found return and clear field
      if (!data.drinks) {
        alert('Sorry nothing was found for that');
        changeAttribute(searchField, '');
        return;
      }

      // Add to localStorage
      // localStorage.clear();
      localStorage.setItem(searchfieldValue, JSON.stringify(data.drinks));
      console.log(`added ${searchfieldValue} to localstorage for next time that search comes up`);
      console.log(localStorage);

      return data.drinks;
    } catch (error) {
      console.error(error);
      alert(`Sorry there was an error: ${error}`);
      return;
    }
  }

  // Prev display drinks function
  // const displayDrinks = (list) => {
  //   const drinkListEl = document.getElementById('drink-list');
  //   drinkListEl.innerHTML = '';
  //   list.forEach((drink, index) => {
  //     // Create animation delay per drink card
  //     // <img src="${drink.strDrinkThumb}" class='relative z-10'>
  //     const li = document.createElement('li');
  //     li.innerHTML = `
  //     <h2 class='text-2xl font-bold my-3 mx-4 text-slate-700'>${drink.strDrink}</h2>
  //     <div class='flex flex-col md:flex-row'>
  //       <div class='md:w-1/2 relative after:z-0 after:absolute after:left-[calc(50%_-_20px)] after:top-[calc(50%_-_20px)] after:w-10 after:h-10 after:rounded-full after:border-4 after:border-slate-500 after:border-t-transparent after:animate-[spinner_0.5s_ease-in-out_infinite]'>
  //         <img src="${drink.strDrinkThumb}" class='relative z-10 object-cover w-full h-full'>
  //       </div>
  //       <div id='${drink.idDrink}-ingredients' class='p-5 pb-2 md:px-3 md:py-0 w-1/2'></div>
  //     </div>
  //     <div class='p-5'>
  //       <h3 class='text-lg leading-4 font-semibold text-slate-700 mb-2'>Instructions</h3>
  //       <p class='text-slate-700'>${drink.strInstructions}</p>
  //     </div>
  //     `;
  //     li.classList =
  //       'opacity-0 rounded-xl shadow-lg flex flex-col overflow-hidden border border-slate-200 animate-[fadeup_0.3s_ease-in-out]';
  //     li.id = drink.idDrink;
  //     drinkListEl.append(li);

  //     // Get ingredient list
  //     const ingList = document.createElement('ul');
  //     let itemList = '';
  //     for (let i = 1; i <= 15; i++) {
  //       if (eval('drink.strIngredient' + i)) {
  //         itemList += `
  //           <li>${eval('drink.strIngredient' + i)}</li>
  //         `;
  //       }
  //     }
  //     ingList.innerHTML = itemList;
  //     ingList.classList = 'list-disc ml-5 text-slate-700 text-lg';
  //     // Adding unique drink ID
  //     const inglistWrapper = document.getElementById(`${drink.idDrink}-ingredients`);
  //     inglistWrapper.append(ingList);
  //     const eachElement = document.getElementById(drink.idDrink);
  //     // Adding staggered animation delay for each drink card
  //     eachElement.style = `animation-delay: 0.${index}s`;
  //     // Removing the tailwind opacity class with staggered timeout
  //     const timeMS = index * 100 + 100;
  //     setTimeout(() => {
  //       eachElement.classList.remove('opacity-0');
  //     }, timeMS);
  //   });
  //   // const firstLi = drinkListEl.getElementsByTagName('li');
  //   drinkListEl.scrollIntoView({ behavior: 'smooth' });
  // };

  // TODO: WIP make this a <template> in HTML with some hooks
  function displayDrinks(list) {
    if (!list) {
      return;
    }
    const drinkListEl = document.getElementById('drink-list');
    drinkListEl.innerHTML = '';
    console.log(list);
    list.forEach((drink, index) => {
      // Create animation delay per drink card
      // <img src="${drink.strDrinkThumb}" class='relative z-10'>
      const drinkCardTemplate = document.getElementById('drink-card-template');
      const drinkCardBody = document.importNode(drinkCardTemplate.content, true);
      drinkCardBody.getElementById('drink-card-element').classList =
        'opacity-0 rounded-xl shadow-lg flex flex-col overflow-hidden border border-slate-200 animate-[fadeup_0.3s_ease-in-out]';
      drinkCardBody.getElementById('drink-card-element').id = drink.idDrink;
      drinkCardBody.getElementById('drink-card-title').textContent = drink.strDrink;
      drinkCardBody.getElementById('drink-card-img').setAttribute('src', drink.strDrinkThumb);
      drinkCardBody.getElementById('drink-card-ingredients').id = `ingredients-${drink.idDrink}`;
      drinkCardBody.getElementById('drink-card-instructions').textContent = drink.strInstructions;

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
      drinkCardBody.getElementById(`ingredients-${drink.idDrink}`).append(ingList);
      // Adding staggered animation delay for each drink card
      drinkCardBody.getElementById(`${drink.idDrink}`).style = `animation-delay: 0.${index}s`;
      // Removing the tailwind opacity class with staggered timeout
      drinkListEl.append(drinkCardBody);

      const timeMS = index * 100 + 100;
      setTimeout(() => {
        document.getElementById(`${drink.idDrink}`).classList.remove('opacity-0');
      }, timeMS);

      // li.innerHTML = `
      // <h2 class='text-2xl font-bold my-3 mx-4 text-slate-700'>${drink.strDrink}</h2>
      // <div class='flex flex-col md:flex-row'>
      //   <div class='md:w-1/2 relative after:z-0 after:absolute after:left-[calc(50%_-_20px)] after:top-[calc(50%_-_20px)] after:w-10 after:h-10 after:rounded-full after:border-4 after:border-slate-500 after:border-t-transparent after:animate-[spinner_0.5s_ease-in-out_infinite]'>
      //     <img src="${drink.strDrinkThumb}" class='relative z-10 object-cover w-full h-full'>
      //   </div>
      //   <div id='${drink.idDrink}-ingredients' class='p-5 pb-2 md:px-3 md:py-0 w-1/2'></div>
      // </div>
      // <div class='p-5'>
      //   <h3 class='text-lg leading-4 font-semibold text-slate-700 mb-2'>Instructions</h3>
      //   <p class='text-slate-700'>${drink.strInstructions}</p>
      // </div>
      // `;
    });
    // const firstLi = drinkListEl.getElementsByTagName('li');
    drinkListEl.scrollIntoView({
      behavior: 'smooth',
    });
  }

  // Check for local or remote drinks
  if (localStorage.getItem(`${searchfieldValue}`)) {
    console.log('----------------------------------');
    console.log(`
██    ██ ███████ ███████ 
 ██  ██  ██      ██      
  ████   █████   ███████ 
   ██    ██           ██ 
   ██    ███████ ███████                          
    `);
    console.log(`YAAAAS ${searchfieldValue} was found in local storage`);
    console.log(localStorage);
    const localDrinks = JSON.parse(localStorage.getItem(`${searchfieldValue}`));
    // Display the drinks with local data
    displayDrinks(localDrinks);
    console.log('displayed drinklist with LOCAL data!');
  } else {
    console.log(`
    ███    ██  ██████  
    ████   ██ ██    ██ 
    ██ ██  ██ ██    ██ 
    ██  ██ ██ ██    ██ 
    ██   ████  ██████                               
        `);
    console.log(`NOOOOO, ${searchfieldValue} was not found in localStorage, better fetch API`);
    const remoteDrinks = await fetchRemoteData();
    if (remoteDrinks) {
      // Display the drinks with remote data
      displayDrinks(remoteDrinks);
      console.log('displayed drinklist with REMOTE data!');
    }
  }
}

// Change attribute helper
const changeAttribute = (element, value, attribute = 'value') => {
  element.setAttribute(`${attribute}`, '');
  element.setAttribute(`${attribute}`, value);
  if (attribute === 'value') {
    element.value = value;
  }
};

// TODO: show better errors
const showError = () => {};

// Populate search field from preload 'try things like:' buttons
const populateSearchField = (searchText) => {
  changeAttribute(searchField, searchText);
  searchDrink();
};

// Generate listeners for sample list and pass to populate binding elText as arg
const sampleList = () => {
  const list = document.getElementById('sample-list');
  list.childNodes.forEach((el) => {
    const elText = el.textContent.trim();
    el.addEventListener('click', populateSearchField.bind(this, elText));
  });
};

sampleList();

// Add listeners
searchField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchDrink();
  }
});
searchButton.addEventListener('click', searchDrink);
