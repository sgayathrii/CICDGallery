(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const l="_nF-PyHSHjCpsmhmJoawBEBMZTnzB_Kt-chxx-g7Op8",u="https://api.unsplash.com/",r={pageNumber:1,mode:"random",images:[]},p=async()=>{const n=await(await fetch(`${u}/photos?page=${window.history.state.pageNumber}&per_page=9`,{headers:{Authorization:"Client-ID "+l,"Content-Type":"application/json"}})).json();n&&(window.history.pushState({...r,mode:"random",images:n},""),window.dispatchEvent(new Event("statechange")))},m=()=>{const{mode:t,searchTerm:n}=window.history.state;r.pageNumber=r.pageNumber+1,window.history.pushState({...r,pageNumber:r.pageNumber},""),t==="random"&&p(),t==="search"&&g(n)},g=async t=>{const o=await(await fetch(`${u}/search/photos?page=${window.history.state.pageNumber}&per_page=9&query=${t}`,{headers:{Authorization:"Client-ID "+l,"Content-Type":"application/json"}})).json();if(o){const a=window.localStorage.getItem("suggestions");if(a){const e=JSON.parse(a);console.log(e),e.push(t),window.localStorage.setItem("suggestions",JSON.stringify(e))}else window.localStorage.setItem("suggestions",JSON.stringify([t]));window.history.pushState({...r,mode:"search",images:o.results},""),window.dispatchEvent(new Event("statechange"))}},h=t=>{const n=document.querySelector(".image-container");n.innerHTML="",t.forEach(o=>{const a=document.createElement("div"),e=document.createElement("div"),s=document.createElement("div"),i=document.createElement("div");a.classList.add("flip-outer"),e.classList.add("flip-inner"),s.classList.add("flip-back"),i.classList.add("flip-front"),s.innerHTML=`
    <p>${o.description??o.alt_description}</p>
    <p>Likes: ${o.likes}</p>
    `;const c=document.createElement("img");c.classList.add("image-container__item"),c.setAttribute("src",o.urls.thumb),i.appendChild(c),e.appendChild(s),e.appendChild(i),a.appendChild(e),n.appendChild(a)})},f=()=>{const t=document.querySelector(".search-container");t==null||t.addEventListener("submit",a=>{a.preventDefault(),d();const s=a.target.elements.searchInput;window.history.pushState({...r,searchTerm:s.value},""),g(s.value),s.blur()});const n=document.querySelector("#next");n==null||n.addEventListener("click",m);const o=document.querySelector(".search-container__input");o==null||o.addEventListener("focus",w),o==null||o.addEventListener("blur",d),window.addEventListener("statechange",()=>h(window.history.state.images))},d=()=>{const t=document.querySelector(".search-container__suggestions");t.innerHTML="",t.style.display="none"},w=()=>{const t=document.querySelector(".search-container__suggestions"),n=window.localStorage.getItem("suggestions");n&&(JSON.parse(n).forEach(a=>{const e=document.createElement("li");e.textContent=a,t==null||t.appendChild(e)}),t.style.display="block")};const y=document.querySelector("#app");y.innerHTML=`
<header>
    <nav class="navigation">
        <span class="navigation__item">Logo</span>
        <a 
        class="navigation__item"
        target="_blank" href="https://www.github.com/abdejohan">GitHub</a>
    </nav>
</header>
<form class="search-container">
  <input class="search-container__input" autocomplete="off" type="search" name="searchInput" placeholder="Search.."/>
  <ul class="search-container__suggestions"></ul>
  <input type="submit"></input>
</form>


<section class="image-container">
   
</section>


<section class="pagination">
  <button id="prev" class="pagination__button">Prev</button>
  <button id="next" class="pagination__button">Next</button>
</section>
`;p();f();
