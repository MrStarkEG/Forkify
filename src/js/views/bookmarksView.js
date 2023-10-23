import View from './View.js';
// import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No boomarks yet 🙌, find a recipe and bookmark it!';
  _message = '';

  _generateMarkup() {
    this._clear();
    return this._data.map(this._generateMarkupPreview).join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler());
  }

  _generateMarkupPreview(result) {
    return `
        <li class="preview">
          <a class="preview__link" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
        </li>
  `;
  }
}

export default new BookmarksView();
