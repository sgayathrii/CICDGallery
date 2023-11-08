const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
const apiUrl = import.meta.env.VITE_UNSPLASH_API_URL;
type Image = {
  urls: {
    thumb: string;
  };
};

type State = {
  pageNumber: number;
  mode: string
}
/** HEADER:
 * Accept-Version: v1
 */

const state: State = {
  pageNumber: 1,
  mode: 'random'
}

export const getPhotos = async () => {
  const data = await fetch(`${apiUrl}/photos?page=${window.history.state.pageNumber}&per_page=9`, {
    headers: {
      Authorization: 'Client-ID ' + apiKey,
      'Content-Type': 'application/json',
    },
  });

  const response = await data.json();
  if (response) {
    window.history.pushState({ ...state, mode:'random'}, '')
    appendToView(response);
  }
};

const nextPage = () => {
  const { mode, searchTerm } = window.history.state
  state.pageNumber = state.pageNumber + 1
  window.history.pushState({ ...state, pageNumber:state.pageNumber}, '')
  if(mode === 'random'){
    getPhotos()
  }
  if(mode === 'search'){
    searchPhotos(searchTerm)
  }
}

export const eventListeners = () => {
  const element = document.querySelector('.search-container');
  element?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // @ts-expect-error expect error
    const userInputField = form.elements['searchInput'];
    window.history.pushState({ ...state, searchTerm: userInputField.value}, '')
    searchPhotos(userInputField.value);
  });
  const buttonNext = document.querySelector("#next");
  buttonNext?.addEventListener('click', nextPage)
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
    window.history.pushState({ ...state, mode:'search'}, '')
    appendToView(response.results);
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
  });
};
