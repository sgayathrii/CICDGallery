const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
const apiUrl = import.meta.env.VITE_UNSPLASH_API_URL;

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
  console.log(response);

  console.log('found data');
  if (response) {
    console.log('found data');
    const imageContainer = document.querySelector(
      '.image-container'
    ) as HTMLElement;
    response.forEach((image) => {
      const img = document.createElement('img');
      img.classList.add('image-container__item');
      img.setAttribute('src', image.urls.thumb);
      imageContainer.appendChild(img);
    });
  }
};

export const eventListeners = () => {
  console.log('im running');

  const element = document.querySelector('.search-container');
  console.log(element);

  element?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
       const userInputField = form.elements['searchInput'];
       searchPhotos(userInputField.value)
  });
};

export const searchPhotos = async (searchTerm: string) => {
  const data = await fetch(`${apiUrl}/photos?page=1&per_page=9&query=${searchTerm}`, {
    headers: {
      Authorization: 'Client-ID ' + apiKey,
      'Content-Type': 'application/json',
    },
  });

  const response = await data.json();
  console.log(response);
}