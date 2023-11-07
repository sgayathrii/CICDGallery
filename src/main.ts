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
<input class="search" type="search"  placeholder="Search.."/>
<section class="image-container">
   
</section>
<section class="pagination">
  <button class="pagination__button">Prev</button>
  <button class="pagination__button">Next</button>
</section>
`;
