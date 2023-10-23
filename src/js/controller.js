// to polyfill --> npm i core-js regenerator-runtime
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import BookmarksView from './views/bookmarksView.js';
import PaginationView from './views/paginationView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

// https://forkify-api.herokuapp.com/v2

// speeds up Development phase
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    BookmarksView.render(model.state.bookmarks);

    // 1- Loading Recipe
    await model.loadRecipe(id);

    // 2- Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function (query) {
  try {
    // 1) Get search query
    query = searchView.getQuery();
    if (!query) return;
    ResultsView.renderSpinner();

    // 2) Load the query search results
    await model.loadSearchResults(query);
    ResultsView.render(model.getSearchResultsPage());

    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));

  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings
  model.updateServings(newServings);

  //Update the recipe view
  recipeView.render(model.state.recipe);
  // recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // render the new recipe view
  recipeView.render(model.state.recipe);
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);

  recipeView.addHandlerRender(controlRecipes);

  recipeView.addHandlerUpdateServings(controlServings);

  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandler(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);
};
init();
