const pages=[...document.querySelectorAll('.page')];
const nav=[...document.querySelectorAll('.nav-btn')];
function showPage(name,updateHash=true){
const target=document.getElementById('page-'+name) || document.getElementById('page-home');
pages.forEach(p=>p.classList.toggle('active',p===target));
nav.forEach(b=>b.classList.toggle('active',b.dataset.page===name));
if(updateHash) history.replaceState(null,'','#'+name);
window.scrollTo({top:0,behavior:'smooth'});
document.title=(name==='home'?'Zachary Carroll':target.querySelector('h2')?.textContent+' | Zachary Carroll')+' | Industrial Engineering Portfolio';
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-page],[data-page-jump]');if(!b)return;showPage(b.dataset.page||b.dataset.pageJump)});
const start=(location.hash||'#home').slice(1);showPage(start,false);
window.addEventListener('hashchange',()=>showPage((location.hash||'#home').slice(1),false));
document.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;const current=nav.findIndex(b=>b.classList.contains('active'));if(current<0)return;const next=e.key==='ArrowRight'?(current+1)%nav.length:(current-1+nav.length)%nav.length;showPage(nav[next].dataset.page);nav[next].focus();});