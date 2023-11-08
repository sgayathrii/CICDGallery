import { eventListeners, getPhotos } from './api';
import './styles/index.css';

const rootElement = document.querySelector('#app') as HTMLElement;

rootElement.innerHTML = `
<header>
    <nav class="navigation">
        <span class="navigation__item">Logo</span>
        <a 
        class="navigation__item"
        target="_blank" href="https://www.github.com/abdejohan">GitHub</a>
    </nav>
</header>
<form class="search-container">
  <input class="search-container__input" type="search"  placeholder="Search.."/>
  <input type="submit"></input>
</form>


<section class="image-container">
   
</section>


<section class="pagination">
  <button class="pagination__button">Prev</button>
  <button class="pagination__button">Next</button>
</section>
`;

getPhotos();
eventListeners();
