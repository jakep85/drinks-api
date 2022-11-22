# Drinks API Project

## About

This project uses [TheCocktailDB](https://www.thecocktaildb.com/) to fetch cocktails based on user search and buttons that pre-fill the search field as examples.

View the [demo here](https://drinks-api.vercel.app/)

## Getting started

In the package.json there are a number of scripts

- First off do `npm install`
- You can build the project using `npm run build`
- For local dev faster to have [tailwind installed globally](https://tailwindcss.com/docs/installation) and using `npx tailwindcss -i ./src/main.css -o ./build/main.css --watch`
- Or you can use the `npm run watch`

## Updates

WIP for

- card template in HTML using importNode
- better error messages (red input field with message underneath)

### Nov 21st 2022

_Localstorage complete_

Next update to this project will be to utilize 'localStorage' to add previously searched items and opt to retrieve locally instead of requesting from the API again.
