const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
const apiUrl = import.meta.env.VITE_UNSPLASH_API_URL;
type Image = {
  urls: {
    thumb: string;
  };
};
/** HEADER:
 * Accept-Version: v1
 */

export const getPhotos = async () => {
  const data = await fetch(`${apiUrl}/photos?page=1&per_page=9`, {
    headers: {
      Authorization: 'Client-ID ' + apiKey,
      'Content-Type': 'application/json',
    },
  });

  const response = await data.json();
  if (response) {
    appendToView(response);
  }
};

export const eventListeners = () => {
  const element = document.querySelector('.search-container');
  element?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // @ts-expect-error expect error
    const userInputField = form.elements['searchInput'];
    searchPhotos(userInputField.value);
  });
};

export const searchPhotos = async (searchTerm: string) => {
  const data = await fetch(
    `${apiUrl}/search/photos?page=1&per_page=9&query=${searchTerm}`,
    {
      headers: {
        Authorization: 'Client-ID ' + apiKey,
        'Content-Type': 'application/json',
      },
    }
  );

  const response = await data.json();
  if (response) {
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
