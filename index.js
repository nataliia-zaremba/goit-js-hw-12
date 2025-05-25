import{a as L,S as b,i as c}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&n(g)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const w="https://pixabay.com/api/",v="50347658-285688eb76e59c705e33623f4";async function S(e,o=1){const t={key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};try{return(await L.get(w,{params:t})).data}catch(n){throw console.error("Error fetching images:",n),n}}const m=document.querySelector(".gallery"),u=document.querySelector(".loader"),f=document.querySelector(".load-more");let $=new b(".gallery a");function q(e){const o=e.map(t=>`
    <li class="photo-card">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <span>${t.likes}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${t.views}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${t.comments}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${t.downloads}</span>
        </div>
      </div>
    </li>`).join("");m.insertAdjacentHTML("beforeend",o),$.refresh()}function I(){m.innerHTML=""}function M(){u&&u.classList.remove("is-hidden")}function h(){u&&u.classList.add("is-hidden")}function P(){f&&f.classList.remove("is-hidden")}function l(){f&&f.classList.add("is-hidden")}const p=document.querySelector(".form"),E=p.querySelector('input[name="search-text"]'),A=document.querySelector(".load-more");let d="",i=1,a=0;p.addEventListener("submit",async e=>{e.preventDefault();const o=E.value.trim();if(o!==d&&(d=o,i=1,I(),l()),!d){c.warning({title:"Warning",message:"Please enter a search term",position:"topRight"});return}await y()});A.addEventListener("click",async()=>{i+=1,await y()});async function y(){try{M();const e=await S(d,i);if(h(),e&&e.hits&&e.hits.length>0){q(e.hits),a=e.totalHits;const o=i*15;console.log(`Page: ${i}, Images on page: ${e.hits.length}`),console.log(`Total hits from API: ${a}`),console.log(`Calculated loaded images: ${o}`),console.log(`Should hide button: ${o>=a}`),i>1&&B();const t=document.querySelectorAll(".photo-card").length;console.log(`Actual loaded images in DOM: ${t}`),t<a?(P(),console.log("Showing Load More button")):(l(),console.log("Hiding Load More button - reached end"),c.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}else l(),i===1&&c.info({title:"No results",message:"Sorry, no images found. Try different keywords.",position:"topRight"})}catch(e){h(),l(),console.error("Error:",e),c.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"})}}function B(){const o=document.querySelector(".gallery").querySelector(".photo-card");if(o){const n=o.getBoundingClientRect().height*2;window.scrollBy({top:n,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
