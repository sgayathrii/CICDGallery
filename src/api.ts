const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
const apiUrl = import.meta.env.VITE_UNSPLASH_API_URL;
type Image = {
  urls: {
    thumb: string;
  };
};

type State = {
  pageNumber: number;
  mode: string;
  images: Image[];
};
/** HEADER:
 * Accept-Version: v1
 */

const state: State = {
  pageNumber: 1,
  mode: 'random',
  images: [],
};

export const getPhotos = async () => {
  const data = await fetch(
    `${apiUrl}/photos?page=${window.history.state.pageNumber}&per_page=9`,
    {
      headers: {
        Authorization: 'Client-ID ' + apiKey,
        'Content-Type': 'application/json',
      },
    }
  );

  const response = await data.json();
  if (response) {
    window.history.pushState(
      { ...state, mode: 'random', images: response },
      ''
    );
    window.dispatchEvent(new Event('statechange'));
  }
};

const nextPage = () => {
  const { mode, searchTerm } = window.history.state;
  state.pageNumber = state.pageNumber + 1;
  window.history.pushState({ ...state, pageNumber: state.pageNumber }, '');
  if (mode === 'random') {
    getPhotos();
  }
  if (mode === 'search') {
    searchPhotos(searchTerm);
  }
};

export const searchPhotos = async (searchTerm: string) => {
  const data = await fetch(
    `${apiUrl}/search/photos?page=${window.history.state.pageNumber}&per_page=9&query=${searchTerm}`,
    {
      headers: {
        Authorization: 'Client-ID ' + apiKey,
        'Content-Type': 'application/json',
      },
    }
  );

  const response = await data.json();
  if (response) {
    const suggestions = window.localStorage.getItem('suggestions');
    if (suggestions) {
      const suggestionsJson = JSON.parse(suggestions);
      console.log(suggestionsJson);
      suggestionsJson.push(searchTerm);
      window.localStorage.setItem(
        'suggestions',
        JSON.stringify(suggestionsJson)
      );
    } else {
      window.localStorage.setItem('suggestions', JSON.stringify([searchTerm]));
    }
    window.history.pushState(
      { ...state, mode: 'search', images: response.results },
      ''
    );
    window.dispatchEvent(new Event('statechange'));
  }
};

const appendToView = (images: Image[]) => {
  const imageContainer = document.querySelector(
    '.image-container'
  ) as HTMLElement;
  imageContainer.innerHTML = '';
  images.forEach((image: Image) => {
    const img = document.createElement('img');
    img.classList.add('image-container__item');
    img.setAttribute('src', image.urls.thumb);
    imageContainer.appendChild(img);
    img.addEventListener('click', flipImage);
  });
};

export const eventListeners = () => {
  // Search container event
  const searchContainer = document.querySelector('.search-container');
  searchContainer?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearSuggestions();
    const form = e.target as HTMLFormElement;
    // @ts-expect-error expect error
    const userInputField = form.elements['searchInput'];
    window.history.pushState(
      { ...state, searchTerm: userInputField.value },
      ''
    );
    searchPhotos(userInputField.value);
    userInputField.blur();
  });
  // Button event
  const buttonNext = document.querySelector('#next');
  buttonNext?.addEventListener('click', nextPage);

  const inputElement = document.querySelector('.search-container__input');
  inputElement?.addEventListener('focus', displaySuggestions);
  inputElement?.addEventListener('blur', clearSuggestions);

  window.addEventListener('statechange', () => {
    return appendToView(window.history.state.images);
  });
};

const clearSuggestions = () => {
  const ulElement = document.querySelector(
    '.search-container__suggestions'
  ) as HTMLElement;
  ulElement.innerHTML = '';
  ulElement.style.display = 'none';
};

const displaySuggestions = () => {
  const ulElement = document.querySelector(
    '.search-container__suggestions'
  ) as HTMLElement;
  const suggestions = window.localStorage.getItem('suggestions');
  if (suggestions) {
    const suggestionsArr = JSON.parse(suggestions);
    suggestionsArr.forEach((suggestion: string) => {
      const liElement = document.createElement('li');
      liElement.textContent = suggestion;
      ulElement?.appendChild(liElement);
    });
    ulElement.style.display = 'block';
  }
};

const flipImage = (e) => {
  e.target.classList.toggle("image-container__item--flipped")

};
