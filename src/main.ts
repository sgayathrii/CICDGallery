import './style.css';
const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
const apiUrl = import.meta.env.VITE_UNSPLASH_API_URL;

/** HEADER:
 * Accept-Version: v1
 */

const main = async () => {
  const data = await fetch(`${apiUrl}/photos/random`, {
    headers: {
      Authorization: 'Client-ID ' + apiKey,
      'Content-Type': 'application/json',
    },
  });

  const response = await data.json();
  console.log(response);

  console.log('fefe');
};

main();
