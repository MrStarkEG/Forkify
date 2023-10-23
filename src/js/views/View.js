import icons from 'url:../../img/icons.svg';

export default class View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'Wrong recipe! please select another one 🙌';
  _message = '';

  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // update(data) {
  //   if (!data || (Array.isArray(data) && data.length === 0))
  //     return this.renderError();

  //   const curElements = Array.from(this._parentElement.querySelectorAll('*'));

  //   this._data = data;
  //   const newMarkup = this._generateMarkup();

  //   //
  //   const newDom = document.createRange().createContextualFragment(newMarkup);
  //   const newElements = Array.from(newDom.querySelectorAll('*'));

  //   newElements.forEach((newEl, i) => {
  //     const curEl = curElements[i];
  //     console.log(curEl, newEl.isEqualNode(curEl));

  //     if (
  //       !newEl.isEqualNode(curEl) &&
  //       newEl.firstChild.nodeValue.trim() !== ''
  //     ) {
  //       console.log(newEl.firstChild?.nodeValue.trim(), '🙌');
  //       curEl.textContent = newEl.textContent;
  //     }
  //   });

  //   console.log(newElements);
  //   console.log(curElements);
  // }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
  <div class="error">
    <div>
        <svg>
          <use href="${icons}/icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
  </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
  <div class="message">
    <div>
        <svg>
          <use href="${icons}#icon-smile">${message}</use>
        </svg>
      </div>
      <p>${message}</p>
  </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
